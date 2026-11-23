export const START = {stage:0,seconds:0,zone:'outside',x:1.25,z:10.8};
export const SAVE_KEY='sakura-town-save-v1';
export function loadState(raw) {
  try {
    const s=JSON.parse(raw);
    if(Number.isInteger(s?.stage)&&s.stage>=0&&s.stage<=7&&Number.isFinite(s.seconds)&&s.seconds>=0&&s.seconds<1e8&&
      ['outside','cafe','station'].includes(s.zone)&&Number.isFinite(s.x)&&Math.abs(s.x)<34&&Number.isFinite(s.z)&&Math.abs(s.z)<36) {
      return {stage:s.stage,seconds:s.seconds,zone:s.zone,x:s.x,z:s.z};
    }
  } catch { /* starting a fresh stroll */ }
  return {...START};
}

export function clockAt(seconds) {
  const ticks=495+Math.floor(seconds*.77), minute=ticks%1440;
  const two=n=>String(n).padStart(2,'0');
  return {minute,hour:minute/60,day:Math.floor(ticks/1440)+1,text:`${two(Math.floor(minute/60))}:${two(minute%60)}`};
}

export function localRailBlocked(x,z,closed,fromZ) {
  if (z < -14.58 || z > -11.42) return false;
  if (x < -1.65 || x > 3.65) return true;
  if (!closed) return false;
  // Once inside the track envelope the player can always continue towards the nearest side.
  if (fromZ>-14.58 && fromZ<-11.42) return Math.abs(z+13)<Math.abs(fromZ+13)-.00001;
  return true;
}

// A* with a grid only for wayfinding; actual movement uses continuous collision.
export function findPath(start, goal, free, step=.65) {
  const cell=p=>p.map(v=>Math.round(v/step)), point=p=>p.map(v=>v*step), key=(x,z)=>`${x}:${z}`;
  function snap(p) {
    const [x,z]=cell(p);let best=null,bestD=Infinity;
    for(let j=-3;j<=3;j++)for(let i=-3;i<=3;i++) {
      const q=[x+i,z+j], w=point(q), d=Math.hypot(w[0]-p[0],w[1]-p[1]);
      if(d<bestD && free(...w)){best=q;bestD=d;}
    } return best;
  }
  const a=snap(start), b=snap(goal); if(!a||!b)return [];
  const heuristic=(x,z)=>Math.hypot(x-b[0],z-b[1]);
  const s={x:a[0],z:a[1],g:0,f:heuristic(...a),prev:null};
  const open=[s], best=new Map([[key(...a),0]]);
  const dist=(a,b)=>Math.hypot(b[0]-a[0],b[1]-a[1]);
  for(let count=0;open.length&&count<8500;count++) {
    let k=0;for(let i=1;i<open.length;i++)if(open[i].f<open[k].f)k=i;
    let cur=open[k];open[k]=open.at(-1);open.pop();
    if(cur.g>best.get(key(cur.x,cur.z)))continue;
    if(cur.x===b[0]&&cur.z===b[1]){
      const list=free(...goal)?[goal]:[];while(cur){list.push(point([cur.x,cur.z]));cur=cur.prev;}
      list.reverse();
      const clear=(a,b)=>{
        const n=Math.ceil(dist(a,b)/.21);
        for(let i=1;i<=n;i++){const t=i/n;if(!free(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t))return false;}
        return true;
      };
      const route=[];let anchor=start;
      for(let i=0;i<list.length;){let j=list.length-1;while(j>i&&!clear(anchor,list[j]))j--;
        if(dist(anchor,list[j])>.14)route.push(list[j]);anchor=list[j];i=j+1;
      } return route;
    }
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
      if(!dx&&!dz)continue;
      const x=cur.x+dx,z=cur.z+dz,id=key(x,z),g=cur.g+Math.hypot(dx,dz);
      if(g>=(best.get(id)??Infinity)||!free(x*step,z*step))continue;
      if(dx&&dz&&(!free(cur.x*step,z*step)||!free(x*step,cur.z*step)))continue;
      best.set(id,g);open.push({x,z,g,f:g+heuristic(x,z),prev:cur});
    }
  }return [];
}
