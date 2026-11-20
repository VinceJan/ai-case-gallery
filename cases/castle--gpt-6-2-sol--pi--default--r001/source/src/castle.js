// Thistle Manor — the rear earthworks, island, and castle.
export function buildCastle(ctx) {
  const { T, root, group, box, cyl, ball, beam, mesh, rng, water, updates } = ctx;
  const manor = group(root);
  const earth = group(manor), fort = group(manor);
  const ivory = 0xddd0aa, sand = 0xc6b48e, pale = 0xf1dfb8, shadow = 0x9c8769;
  const stones = [0xc8b790, 0xd4c29b, 0xd9c9a2, 0xe3d2ac, 0xbda986, 0xd5bf98];
  const slate = [0x536993, 0x5a71a0, 0x6279a9, 0x6b80ad, 0x7183ae, 0x5e709a, 0x687dab];
  const iron = 0x3d3d40, brass = 0xcc9e52, oak = 0x815237, darkOak = 0x503b30;
  const lawn = 0x78995c, dark = 0x393644;
  const tau = Math.PI * 2;
  const pick = a => a[Math.floor(rng() * a.length)];
  const lerp = (a, b, t) => a + (b - a) * t;

  // Bucket the many little roof facets by finish before handing them to the static batcher.
  const panels = new Map();
  function face(color, points, normal) {
    if (!panels.has(color)) panels.set(color, []);
    const p = panels.get(color);
    for (let i = 1; i < points.length - 1; i++) {
      const a = points[0], b = points[i], c = points[i + 1];
      const u = b.map((v, j) => v - a[j]), v = c.map((v, j) => v - a[j]);
      const dot = (u[1] * v[2] - u[2] * v[1]) * normal[0] +
        (u[2] * v[0] - u[0] * v[2]) * normal[1] + (u[0] * v[1] - u[1] * v[0]) * normal[2];
      p.push(...a, ...(dot < 0 ? c : b), ...(dot < 0 ? b : c));
    }
  }
  function outline(x, back, front, c) {
    return [[-x+c,front],[x-c,front],[x,front-c],[x,back+c],
      [x-c,back],[-x+c,back],[-x,back+c],[-x,front-c]];
  }
  const ring = (a, b, ya, yb, colors) => {
    for (let i = 0; i < a.length; i++) {
      const j = (i + 1) % a.length, pt = (p, y) => [p[0], y, p[1]];
      const n = [a[i][1] - a[j][1], ya === yb ? 1 : 0, a[j][0] - a[i][0]];
      face(colors[i % colors.length], [pt(a[i], ya), pt(a[j], ya), pt(b[j], yb), pt(b[i], yb)], n);
    }
  };
  const lid = (p, y, c) => face(c, p.map(([x,z]) => [x,y,z]), [0,1,0]);
  function plaque(parent, points, depth, z, color) {
    const s = new T.Shape();
    points.forEach(([x,y], i) => i ? s.lineTo(x,y) : s.moveTo(x,y));
    s.closePath();
    return mesh(parent, new T.ExtrudeGeometry(s, { depth, bevelEnabled: false, steps: 1 }), color, 0, 0, z);
  }

  // Battered retaining wall, coping, and a grass-covered rim around the basin.
  const toe = outline(11.40,-19.60,-6.10,.46);
  const skirt = outline(11.30,-19.51,-6.20,.43);
  const brow = outline(11.24,-19.46,-6.26,.41);
  const coping = outline(11.40,-19.60,-6.10,.46);
  const wetEdge = outline(10.53,-18.96,-6.76,.30);
  ring(toe, skirt, .04, .33, [shadow, sand, 0xad9878, sand]);
  ring(skirt, brow, .33, 2.21, [0xb5a285, shadow, 0xbba98a, shadow]);
  ring(brow, coping, 2.21, 2.34, [sand, ivory]);
  ring(coping, coping, 2.34, 2.45, [0x8a935e, 0x839362]);
  ring(coping, wetEdge, 2.45, 2.45, [lawn, 0x72945a, lawn, 0x719052]);
  ring(wetEdge, wetEdge, 2.21, 2.45, [0x918c66, 0x9b916f]);
  lid(wetEdge, 2.21, 0x57807a);
  water(earth, 21.02, 12.15, 0, 2.53, -12.86, 7);
  // A narrow stone collar meets the water surface while the turf remains at y=2.45.
  const collar = outline(10.87,-19.19,-6.51,.39);
  ring(collar, wetEdge, 2.545, 2.575, [0xb6aa88, 0xbfae8e, 0xc5b698]);
  ring(wetEdge, wetEdge, 2.40, 2.575, [0x9f9678, 0xaa9f81]);
  ring(collar, collar, 2.45, 2.545, [0xa69b76, 0xaca480]);

  function stoneCourses(poly, y0, rows, step, width, thickness, colors, shift) {
    for (let i = 0; i < poly.length; i++) {
      const [ax,az] = poly[i], [bx,bz] = poly[(i+1) % poly.length];
      const dx = bx-ax, dz = bz-az, len = Math.hypot(dx,dz), angle = Math.atan2(-dz,dx);
      const n = [-dz/len, dx/len];
      for (let r = 0; r < rows; r++) {
        let at = 0;
        while (at < len - .001) {
          let next = Math.min(len, at + (at === 0 && r % 2 ? .53 : .83 + rng() * .32) * width);
          if (len - next < .25) next = len;
          const t = (at + next) / (2*len), off = shift(r) + rng() * .022;
          const o = box(earth, Math.max(.055,next-at-.031), step-.025, thickness,
            lerp(ax,bx,t)+off*n[0], y0 + step*(r+.5), lerp(az,bz,t)+off*n[1], pick(colors));
          o.rotation.y = angle;
          at = next;
        }
      }
    }
  }
  stoneCourses(skirt, .31, 5, .38, 1.08, .13, [0xbba888, 0xbead8e, 0xc7b698, 0xb5a184, 0xc1af90], r => .018-r*.011);
  const lowIsland = outline(8.59,-17.94,-8.92,.47);
  const island = outline(8.43,-17.83,-9.02,.44);
  ring(lowIsland,island,2.24,2.98,[0xb6a787, shadow, sand]);
  stoneCourses(lowIsland, 2.43, 2, .265, .88, .13, stones, r => -.045-r*.047);
  ring(island,island,2.96,3.05,[0x8c9261, 0x818d61]);
  lid(island,3.05,0x80965f);

  // Stair flights are built from solid treads; the front edge ends at the village road.
  const stairStone = [0xbfae8f, 0xcebfa1, 0xc5b497, 0xd7c5a6];
  function paving(parent, length, width, xc, zc, y, rows, cols, palette) {
    const d = length / rows, w = width / cols;
    for (let j = 0; j < rows; j++) {
      let left = 0;
      while (left < width - .01) {
        const right = Math.min(width, left + (left === 0 && j%2 ? w*.5 : w));
        const stone = box(parent, right-left-.035, .048, d-.035, xc-width/2+(left+right)/2,
          y+.011+rng()*.011, zc-length/2+(j+.5)*d, pick(palette));
        stone.rotation.y = (rng()-.5)*.034;
        left = right;
      }
    }
  }
  for (let i=0; i<9; i++) {
    const z = -3.20-(i+.5)*.337, y = lerp(.28,2.45,i/8);
    box(earth,3.37,y-.119,.337,0,(y+.041)/2,z,0xac9879);
    for(let j=0;j<5;j++) box(earth,.65,.090,.350,(j-2)*.667,y-.045,z-.007,pick(stairStone));
    for (const s of [-1,1]) {
      box(earth,.44,y+.13,.337,s*1.82,(y+.13)/2,z,pick(stairStone));
      box(earth,.53,.10,.354,s*1.82,y+.17,z-.009,ivory);
    }
  }
  for (const s of [-1,1]) for (const [z,y] of [[-3.53,.1],[-6.29,2.39]]) {
    box(earth,.62,.57,.58,s*1.82,y+.285,z,sand);
    box(earth,.70,.12,.66,s*1.82,y+.58,z,pale);
    box(earth,.64,.12,.60,s*1.82,y+.058,z,0xb09a77);
    ball(earth,.16,s*1.82,y+.75,z,ivory,0);
  }
  box(earth,2.98,.215,.66,0,2.548,-6.45,sand);
  paving(earth,.64,2.87,0,-6.44,2.657,2,5,stairStone);
  paving(earth,2.55,2.58,0,-10.28,3.05,7,5,stairStone);

  // Bits of greenery and rubble are concentrated at the banks, leaving large quiet surfaces.
  for (let i=0;i<51;i++) {
    const s=i%2 ? 1 : -1, x=s*(i<26 ? 10.97+rng()*.22 : 7.4+rng()*.81);
    const z=i<26 ? lerp(-18.98,-6.55,rng()) : lerp(-17.59,-9.34,rng());
    const y=i<26 ? 2.45 : 3.05;
    if(i%6===0) {
      const o=ball(earth,.21,x,y+.06,z, pick([0xa9aa82,0xa8a789,0xbcb397]),0);
      o.scale.multiply(new T.Vector3(1.16,.49,.84));
    } else {
      for(let j=0;j<3;j++) {
        const h=.09+rng()*.16, o=cyl(earth,0,.034,h,x+(j-1)*.056,y+.41*h,z,pick([0x65844c,0x8ba266,0x8da75e]),3);
        o.rotation.z=(j-1)*.28;
      }
    }
  }
  for(const [x,z] of [[-9.8,-6.47],[7.1,-6.43],[10.99,-17.7],[-10.97,-12.6],[-5.3,-19.34]]) {
    for(let i=0;i<5;i++) {
      const o=ball(earth,.15+rng()*.14,x+(i-2)*.138,2.5+rng()*.11,z+(rng()-.5)*.21,pick([0x5d7947,0x6c8950,0x819857]),1);
      o.scale.y*=.78;
    }
  }

  const rubyCloth = new T.MeshStandardMaterial({color:0x97364d, side:T.DoubleSide, roughness:.93});
  const creamCloth = new T.MeshStandardMaterial({color:0xf5d9a0, side:T.DoubleSide, roughness:.92});
  const burgundyCloth = new T.MeshStandardMaterial({color:0x692b42, side:T.DoubleSide, roughness:.93});
  function textile(parent,x,y,z,w,h,pennant,angle=0,phase=0) {
    const g=group(parent,x,y,z);
    g.rotation.y=angle;
    g.userData.dynamic=true;
    const pieces=[];
    function patch(triangles,material,offset=0) {
      const ref=triangles.flat(2), geo=new T.BufferGeometry();
      const attr=new T.Float32BufferAttribute(new Float32Array(ref.length/2*3),3);
      attr.setUsage(T.DynamicDrawUsage);
      geo.setAttribute('position',attr);
      const m=new T.Mesh(geo,material);
      m.userData.dynamic=true;
      m.frustumCulled=false;
      m.castShadow=offset===0;
      g.add(m); pieces.push({ref,attr,geo,offset});
    }
    const point=(u,v)=>pennant ? [u*w*(.77+.23*Math.abs(2*v-1)), -h*v*(1-.29*u)] :
      [(u-.5)*w,-v*h*(.89+.11*Math.abs(2*u-1))];
    const grid=(u0,u1,v0,v1,n,m)=>{
      const out=[];
      for(let i=0;i<n;i++) for(let j=0;j<m;j++) {
        const a=lerp(u0,u1,i/n),b=lerp(u0,u1,(i+1)/n),c=lerp(v0,v1,j/m),d=lerp(v0,v1,(j+1)/m);
        const p=point(a,c),q=point(a,d),r=point(b,d),s=point(b,c);
        out.push([p,q,r],[p,r,s]);
      }
      return out;
    };
    patch(grid(0,1,0,1,12,8),rubyCloth);
    patch([...grid(0,1,.015,.095,12,1),...grid(0,1,.86,.93,12,1)],burgundyCloth,.007);
    patch([...grid(0,1,.101,.128,12,1),...grid(0,1,.818,.841,12,1)],creamCloth,.009);
    // A miniature thistle: stem, paired leaves, calyx and a three-point crown.
    const cx=pennant ? w*.34 : 0, sz=Math.min(w,h)*.62, cy=-h*.44;
    const motif=[[[0,-.37],[-.055,-.37],[-.04,.12],[.02,.12]],
      [[-.018,-.23],[-.27,-.19],[-.39,.02],[-.22,-.02]],
      [[0,-.2],[.24,-.11],[.36,.075],[.17,.035]],
      [[-.15,.10],[0,.015],[.15,.10],[.19,.23],[-.19,.23]],
      [[-.18,.26],[-.23,.42],[-.095,.35],[0,.49],[.09,.35],[.23,.42],[.18,.26]]];
    const symbol=[];
    for(const poly of motif) {
      const middle=poly.reduce(([x,y],[u,v])=>[x+u/poly.length,y+v/poly.length],[0,0]);
      for(let i=0;i<poly.length;i++) symbol.push([middle,poly[i],poly[(i+1)%poly.length]].map(([u,v])=>[cx+u*sz,cy+v*sz]));
    }
    const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
    const stitched=symbol.flatMap(([a,b,c])=>{
      const ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);
      return [[a,ab,ca],[ab,b,bc],[ca,bc,c],[ab,bc,ca]];
    });
    patch(stitched,creamCloth,.016);
    if(pennant) patch(stitched,creamCloth,-.016);
    function flutter(t,dt,weather) {
      const wind=Number.isFinite(weather?.wind) ? Math.min(1.6,Math.abs(weather.wind)) : .32;
      for(const {ref,attr,geo,offset} of pieces) {
        for(let i=0;i<attr.count;i++) {
          const u=ref[i*2],v=ref[i*2+1], f=pennant ? u/w : -v/h;
          const a=t*(2.8+wind)+phase, pulse=Math.sin(a-f*7.7+v*1.4)+.29*Math.sin(a*1.53-f*15);
          attr.setXYZ(i,u,v+(pennant ? Math.sin(a-f*4.1)*f*.095-v*f*.075 : 0),offset+pulse*f*(pennant?.15:.046)*(.57+wind*.54));
        }
        attr.needsUpdate=true;
        geo.computeVertexNormals();
      }
    }
    flutter(0,0,{});
    updates.push(flutter);
  }

  // Curtain wall masonry, oriented in local façade coordinates (outward is +z).
  function courses(g,w,low,high,z,amount=.48) {
    for(let y=low,r=0; y<high-.25; y+=amount,r++) {
      for(let x=-w/2+(r%2?.44:0);x<w/2-.27;x+=.89) {
        const bw=Math.min(.64+rng()*.24,w/2-x-.08);
        if(rng()<.47 && bw>.14) box(g,bw,amount*(.66+rng()*.21),.044,x+bw/2,y+amount*.44,z,pick(stones));
      }
    }
  }
  function slit(g,x,y,z,width,height) {
    const b=y-height/2,t=y+height/2;
    plaque(g,[[x-width/2,b],[x+width/2,b],[x+width/2,t-width*.6],[x,t],[x-width/2,t-width*.6]],.018,z,dark);
    box(g,width+.18,.09,.13,x,b-.035,z+.032,pale);
    for(const s of [-1,1]) box(g,.073,height-width*.62,.08,x+s*(width/2+.033),(b+t-width*.62)/2,z+.023,sand);
    for(const s of [-1,1]) beam(g,[x,t+.055,z+.04],[x+s*(width/2+.067),t-width*.62,z+.04],.08,pale,.095);
  }
  function gothic(g,x,y,z,w,h) {
    const l=x-w/2,r=x+w/2, spring=y+h*.56, top=y+h;
    plaque(g,[[l,y],[r,y],[r,spring],[x+w*.34,y+h*.83],[x,top],[x-w*.34,y+h*.83],[l,spring]],.026,z,0x394753);
    for(const s of [-1,1]) {
      box(g,.098,h*.57,.105,x+s*(w/2+.031),y+h*.28,z+.042,ivory);
      const a=[x+s*(w/2+.034),spring,z+.055], b=[x+s*w*.37,y+h*.84,z+.055], c=[x,top+.052,z+.055];
      beam(g,a,b,.105,pale); beam(g,b,c,.106,pale);
      box(g,w*.33,h*.41,.020,x+s*w*.235,y+h*.264,z+.031,s<0?0x698690:0x76959e);
    }
    box(g,.065,h*.73,.049,x,y+h*.386,z+.054,ivory);
    box(g,w+.25,.115,.19,x,y-.055,z+.046,pale);
    box(g,w*.96,.049,.044,x,y+h*.34,z+.055,0x9fb1aa);
  }
  function curtain(x,z,w,angle) {
    const g=group(fort,x,0,z); g.rotation.y=angle;
    box(g,w,3.34,.66,0,4.72,0,sand);
    box(g,w,3.20,.67,0,4.84,0,ivory);
    box(g,w,.26,.84,0,3.26,0,sand);
    box(g,w,.13,.93,0,6.43,0,shadow);
    box(g,w,.19,.90,0,6.54,0,pale);
    courses(g,w,3.58,6.32,.34);
    const n=Math.max(2,Math.round(w/.97));
    for(let i=0;i<n;i++) {
      const a=((i+.5)/n-.5)*w;
      box(g,.56,.51,.68,a,6.86,.060,ivory);
      box(g,.62,.084,.74,a,7.12,.063,pale);
      if(i%2===0) slit(g,a,5.35,.35,.135,.57);
    }
  }
  curtain(-4.43,-10.38,4.55,0); curtain(4.43,-10.38,4.55,0);
  curtain(6.79,-13.39,5.85,Math.PI/2); curtain(-6.79,-13.39,5.85,-Math.PI/2);
  curtain(0,-16.34,13.55,Math.PI);

  // Drawbridge floor follows the short slope from the terrace landing to the sill.
  const bridgeStart=-9.61, bridgeEnd=-6.64;
  const deckY=z=>lerp(3.073,2.686,(z-bridgeStart)/(bridgeEnd-bridgeStart));
  for(const x of [-1.07,1.07]) beam(fort,[x,deckY(bridgeStart)-.14,bridgeStart],[x,deckY(bridgeEnd)-.14,bridgeEnd],.18,darkOak);
  for(let i=0;i<16;i++) {
    const z=lerp(bridgeStart,bridgeEnd,(i+.5)/16),y=deckY(z);
    const plank=box(fort,2.58+(rng()-.5)*.045,.12,.174,0,y-.052,z,pick([0x946449,0xaa7754,0xb4815d,0x9f6d4d,0xb98a63]));
    plank.rotation.x=.129;
    for(const s of [-1,1]) if(i%3!==1) cyl(fort,.028,.028,.018,s*1.09,y+.018,z,iron,6);
  }
  for(const s of [-1,1]) {
    const x=s*1.27, a=[s*1.66,5.96,-9.03], b=[x, deckY(-6.94)+.16,-6.94];
    beam(fort,[x,deckY(-9.48)+.019,-9.48],[x,deckY(-6.71)+.019,-6.71],.082,oak);
    box(fort,.27,.31,.103,a[0],a[1],-9.205,sand);
    box(fort,.10,.12,.20,a[0],a[1]+.017,-9.115,iron);
    box(fort,.16,.083,.13,b[0],b[1]-.14,b[2],iron);
    for(const [xx,yy,zz] of [a,b]) {
      const eye=mesh(fort,new T.TorusGeometry(.105,.025,4,10),iron,xx,yy,zz);
      eye.rotation.y=s*.45;
    }
    const point=t=>new T.Vector3(lerp(a[0],b[0],t),lerp(a[1],b[1],t)-Math.sin(Math.PI*t)*.13,lerp(a[2],b[2],t));
    const linkGeo=new T.TorusGeometry(.061,.016,5,10);
    linkGeo.scale(.80,1.29,1);
    for(let i=0;i<35;i++) {
      const t=(i+.5)/35, p=point(t), dir=point(t+.01).sub(point(t-.01)).normalize();
      const link=mesh(fort,linkGeo,i%3===0?0x534945:iron,p.x,p.y,p.z);
      link.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir);
      link.rotateY(i%2*Math.PI/2+.25);
    }
  }

  // Deeply cut arch, separate voussoirs and a hanging iron grille.
  const base=3.05, spring=4.85, archR=1.185, gateFace=-9.29, gateW=2.18, gateTop=8.0;
  const arc=(r,t)=>[r*Math.cos(t),spring+r*Math.sin(t)];
  const gateOutline=[[-gateW,base],[-archR,base]];
  for(let i=0;i<=16;i++) gateOutline.push(arc(archR,Math.PI-i*Math.PI/16));
  gateOutline.push([archR,base],[gateW,base],[gateW,gateTop],[-gateW,gateTop]);
  plaque(fort,gateOutline,1.67,gateFace-1.67,ivory);
  for(const z of [gateFace,gateFace-1.67-.115]) {
    for(let k=0;k<11;k++) {
      const a=k*Math.PI/11+.017,b=(k+1)*Math.PI/11-.017, r=archR+(k===5?.34:.24);
      plaque(fort,[arc(archR-.025,a),arc(r,a),arc(r,b),arc(archR-.025,b)],.115,z,k===5?pale:stones[(k+2)%stones.length]);
    }
    for(const s of [-1,1]) for(let j=0;j<5;j++)
      box(fort,.263,.338,.131,s*(archR+.11),base+(j+.5)*.36,z+.054,stones[(j+3)%stones.length]);
  }
  for(let i=-5;i<=5;i++) {
    const x=i*.205, top=spring+Math.sqrt(Math.max(0,archR*archR-x*x))-.06;
    const tip=3.39+(i%2===0?.03:0);
    box(fort,.055,top-tip,.065,x,(top+tip)/2,-9.52,iron);
    cyl(fort,.044,0,.16,x,tip-.057,-9.52,iron,4).rotation.y=Math.PI/4;
  }
  for(const y of [3.64,4.48,5.16,5.63]) {
    const w=2*Math.sqrt(archR*archR-Math.max(0,y-spring)**2)-.012;
    box(fort,w,.081,.082,0,y,-9.543,0x4f4740);
    for(let i=-5;i<=5;i++) if(Math.abs(i*.205)<w/2)
      ball(fort,.04,i*.205,y,-9.493,0x7a6450,0).scale.z*=.55;
  }
  for(const s of [-1,1]) {
    box(fort,.30,4.84,.30,s*2.04,5.50,-9.216,sand);
    for(let i=0;i<9;i++) box(fort,.34+(i%2)*.14,.46,.125,s*2.04,3.36+i*.49,-9.071,stones[i%6]);
    for(let i=0;i<5;i++) box(fort,.20+i%2*.18,.25,.052,s*(1.65+i%2*.11),3.65+i*.46,-9.27,pick(stones));
    const g=group(fort,s*2.194,0,-10.09); g.rotation.y=s*Math.PI/2;
    courses(g,1.55,3.33,7.85,.26);
    slit(g,0,6.84,.024,.15,.78);
    const lx=s*1.77, lz=-8.97, ly=4.76;
    box(fort,.14,.21,.066,lx,ly+.23,-9.25,iron);
    beam(fort,[lx,ly+.28,-9.24],[lx,ly+.25,lz],.058,iron);
    box(fort,.139,.23,.139,lx,ly,lz,0xe0aa62);
    for(const dx of [-.071,.071]) for(const dz of [-.071,.071])
      box(fort,.023,.244,.023,lx+dx,ly,lz+dz,0x5c4638);
    cyl(fort,.049,.143,.117,lx,ly+.17,lz,0x58515a,4).rotation.y=Math.PI/4;
    box(fort,.196,.049,.196,lx,ly-.126,lz,iron);
    ball(fort,.038,lx,ly-.174,lz,brass,1);
  }
  box(fort,4.57,.17,1.93,0,7.89,-10.12,shadow);
  box(fort,4.68,.21,2.06,0,8.05,-10.12,pale);
  for (const s of [-1,1]) {
    for(let i=-2;i<=2;i++) {
      box(fort,.54,.55,.35,i*.99,8.385,-10.12+s*.86,ivory);
      box(fort,.61,.086,.41,i*.99,8.692,-10.12+s*.86,pale);
    }
    box(fort,.40,.55,.49,s*2.06,8.385,-10.12,ivory);
    box(fort,.46,.086,.56,s*2.06,8.692,-10.12,pale);
  }
  for(let i=-3;i<=3;i++) box(fort,.21,.30,.20,i*.57,7.73,-9.26,sand);
  const shield=[[-.42,7.62],[.42,7.62],[.38,7.07],[.25,6.87],[0,6.72],[-.25,6.87],[-.38,7.07]];
  plaque(fort,shield,.115,-9.25,shadow);
  plaque(fort,shield.map(([x,y])=>[x*.86,7.21+(y-7.21)*.86]),.035,-9.12,0x83354b);
  plaque(fort,[[-.034,6.94],[.034,6.94],[.034,7.31],[.15,7.32],[.22,7.50],[.096,7.44],[0,7.55],[-.096,7.44],[-.22,7.50],[-.15,7.32],[-.034,7.31]],.020,-9.076,0xf2d6a1);
  for (const s of [-1,1]) {
    const x=s*3.18, y=6.33, z=-9.90;
    beam(fort,[x-.54,y,z],[x+.54,y,z],.061,darkOak);
    for(const j of [-1,1]) ball(fort,.072,x+j*.54,y,z,brass,1);
    textile(fort,x,y-.015,z+.026,.83,1.64,false,0,s*1.3);
  }

  function cone(x,z,y,h,r,phase) {
    const profile=[[0,1],[.12,.89],[.42,.55],[.66,.31],[.87,.12],[1,.022]];
    const rad=f=>{
      const j=profile.findIndex(p=>p[0]>=f);
      if(j<1) return r*(j===0?1:.022);
      const [[a,b],[c,d]]=profile.slice(j-1,j+1);
      return r*lerp(b,d,(f-a)/(c-a));
    };
    const p=(a,f,extra=0)=>[x+(rad(f)+extra)*Math.sin(a),y+h*f,z+(rad(f)+extra)*Math.cos(a)];
    for(let j=0;j<profile.length-1;j++) for(let i=0;i<24;i++) {
      const a=i*tau/24,b=a+tau/24,m=(a+b)/2;
      face(0x475777,[p(a,profile[j][0]),p(b,profile[j][0]),p(b,profile[j+1][0]),p(a,profile[j+1][0])],[Math.sin(m),.5,Math.cos(m)]);
    }
    const bands=[0,.10,.20,.305,.411,.518,.625,.725,.814,.894,.957];
    for(let j=0;j<bands.length-1;j++) {
      const f=bands[j], hi=bands[j+1], n=[24,24,22,20,18,16,14,12,10,8][j];
      for(let i=0;i<n;i++) {
        const a=(i+(j%2)*.50+.04)*tau/n, b=a+tau/n*.95, m=(a+b)/2, df=rng()*.009;
        const a0=p(a,f+df,.044),b0=p(b,f+df,.044), mid=p(m,f+df*.6,.066), c=p(b,hi+.029,.027), d=p(a,hi+.029,.027);
        face(pick(slate),[d,a0,mid,b0,c],[Math.sin(m),.6,Math.cos(m)]);
        face(0x4b5e83,[a0,p(a,f+df,.005),p(b,f+df,.005),b0,mid],[0,-1,0]);
      }
    }
    cyl(fort,r*.99,r*1.022,.088,x,y-.014,z,0x455574,24);
    cyl(fort,.034,r*.105,h*.137,x,y+h*.956,z,0x465a82,10);
    cyl(fort,.103,.125,.070,x,y+h+.071,z,brass,10);
    ball(fort,.093,x,y+h+.162,z,brass,1);
    const pole=y+h+.196;
    cyl(fort,.023,.035,1.18,x,pole+.56,z,darkOak,8);
    ball(fort,.073,x,pole+1.17,z,brass,1);
    textile(fort,x,pole+1.07,z,1.06,.55,true,-.22,phase);
  }
  function tower(x,z,eave,r,phase) {
    const top=eave-.71;
    cyl(fort,r,r*1.05,top-3.49,x,(top+3.49)/2,z,ivory,16);
    cyl(fort,r*1.105,r*1.18,.39,x,3.245,z,sand,16);
    cyl(fort,r*1.05,r*1.11,.16,x,3.49,z,pale,16);
    cyl(fort,r*1.07,r*1.07,.12,x,top-.53,z,sand,16);
    cyl(fort,r*1.205,r*1.015,.37,x,top-.14,z,sand,16);
    cyl(fort,r*1.21,r*1.21,.22,x,top+.13,z,pale,16);
    cyl(fort,r*1.17,r*1.17,.22,x,top+.33,z,ivory,16);
    cyl(fort,r*.73,r*.78,.73,x,top+.45,z,sand,16);
    for(let i=0;i<16;i++) {
      const a=(i+.5)*tau/16;
      const g=group(fort,x,0,z); g.rotation.y=a;
      box(g,.27,.32,.29,0,top-.28,r*1.035,sand);
      if(i%2===0) {
        box(g,.44,.48,.305,0,top+.63,r*1.005,ivory);
        box(g,.50,.085,.35,0,top+.908,r*1.005,pale);
      }
      for(let j=0;j<10;j++) if(rng()<.40) {
        const y=3.79+j*(top-4.22)/10;
        if((i%4===0 && Math.abs(y-(top-2.03))<.8)||(i%4===2 && Math.abs(y-(4.69+(i%3)*.33))<.56)) continue;
        const rr=r*lerp(1.05,1,(y-3.49)/(top-3.49))*Math.cos(Math.PI/16);
        box(g,(.25+rng()*.36)*r/1.45,.25+rng()*.19,.042,(rng()-.5)*.12,y,rr,pick(stones));
      }
      if(i%4===0) gothic(g,0,top-2.58,r*1.011,.36,1.16);
      if(i%4===2) slit(g,0,4.69+(i%3)*.33,r*1.049,.14,.61);
    }
    cyl(fort,r*1.01,r*1.01,.095,x,top-2.77,z,sand,16);
    cone(x,z,eave,eave>10.4?3.68:3.42,r*1.025,phase);
  }
  tower(-6.81,-10.49,10.10,1.34,1.2);
  tower(6.81,-10.49,10.76,1.43,2.5);
  tower(-6.81,-16.24,10.65,1.39,4.0);
  tower(6.81,-16.24,10.20,1.34,5.6);

  // Hammerbeam hall and the smaller solar wing; gabled roofs have staggered slate courses.
  function gabled(x,z,w,d,eave,peak) {
    const half=w/2+.25, reach=d/2+.31, front=z+reach, back=z-reach;
    const roofP=(s,f,zz,o=0)=>[x+s*half*(1-f),lerp(eave,peak,f)+o,zz];
    for(const s of [-1,1]) {
      const a=roofP(s,0,back),b=roofP(s,0,front),c=roofP(s,1,front),d0=roofP(s,1,back);
      face(0x465675,[a,b,c,d0],[s,1,0]);
      beam(fort,a,b,.15,0x4c5b7b,.17);
      const n=9, step=.55;
      for(let j=0;j<n;j++) {
        const f=j/n, hi=Math.min(1,(j+1.53)/n);
        let zz=back;
        while(zz<front-.008) {
          let next=Math.min(front,zz+(zz===back&&j%2===1?step*.50:step));
          if(front-next<.14) next=front;
          const r1=roofP(s,f,zz+.011,.080),r2=roofP(s,f,next-.011,.080);
          face(pick(slate),[r1,r2,roofP(s,hi,next-.011,.020),roofP(s,hi,zz+.011,.020)],[s,1,0]);
          face(0x4a5e85,[r1,roofP(s,f,zz+.011),roofP(s,f,next-.011),r2],[s,-.4,0]);
          zz=next;
        }
      }
      for(const zz of [back,front]) {
        beam(fort,roofP(s,0,zz,.028),roofP(s,1,zz,.076),.147,0x475b81,.16);
        const inZ=zz===back?zz+.14:zz-.14;
        beam(fort,roofP(s,0,inZ,.073),roofP(s,1,inZ,.121),.062,0x8192bc);
      }
    }
    for(let at=back;at<front-.015;at+=.65) {
      const end=Math.min(front,at+.636);
      beam(fort,[x,peak+.05,at],[x,peak+.05,end],.18,0x546990,.25);
    }
    for(const zz of [front-.10,back+.10]) {
      cyl(fort,.041,.16,.28,x,peak+.17,zz,0x53658d,8);
      ball(fort,.072,x,peak+.348,zz,brass,1);
    }
  }
  function hall(x,z,w,d,eave,peak,wing=false) {
    box(fort,w,eave-3.05,d,x,(3.05+eave)/2,z,wing?0xd8c69c:ivory);
    box(fort,w+.17,.20,d+.16,x,3.19,z,sand);
    box(fort,w+.165,.22,d+.17,x,eave-.17,z,sand);
    box(fort,w+.23,.095,d+.25,x,eave-.063,z,pale);
    const dy=peak-eave, tip=eave+dy*(w/2)/(w/2+.25);
    for(const s of [-1,1]) {
      const g=group(fort,x,0,z+s*d/2); g.rotation.y=s===1?0:Math.PI;
      plaque(g,[[-w/2,eave-.06],[w/2,eave-.06],[0,tip]],.035,-.025,0xd5bd92);
      courses(g,w,3.45,eave-.24,0,.42);
      const glassY=eave-(wing?2.13:2.22);
      for(const a of [-1,1]) gothic(g,a*w*.273,glassY,.037,wing?.42:.60,wing?1.2:1.46);
      gothic(g,0,glassY+.037,.037,wing?.47:.73,wing?1.30:1.67);
      box(g,w+.035,.15,.12,0,eave+.035,.06,oak);
      for(const a of [-1,1]) {
        beam(g,[a*w*.488,eave+.01,.064],[0,tip-.10,.064],.14,darkOak);
        beam(g,[a*w*.28,eave+.055,.065],[a*w*.28,eave+dy*.41,.065],.10,oak);
        if(!wing) beam(g,[a*w*.24,eave+.10,.075],[a*w*.077,eave+dy*.63,.075],.092,oak);
      }
      if(!wing) gothic(g,0,eave+.19,.072,.45,dy*.54);
      else slit(g,0,eave+dy*.41,.071,.13,.49);
      for(const a of [-1,1]) for(let j=0;j<Math.floor((eave-3.44)/.54);j++)
        box(g,.32+(j%2)*.16,.37,.10,a*(w/2-.13),3.62+j*.54,.038,stones[(j+2)%6]);
      const side=group(fort,x+s*w/2,0,z); side.rotation.y=s*Math.PI/2;
      courses(side,d,3.44,eave-.24,.002,.43);
      for(let j=-1;j<=1;j++) {
        const a=j*d*.291;
        gothic(side,a,glassY-.02,.038,wing?.36:.57,wing?1.23:1.65);
        if(!wing) slit(side,a,glassY-1.58,.035,.16,.73);
      }
      box(side,d,.13,.125,0,glassY-.185,.035,sand);
    }
    gabled(x,z,w,d,eave,peak);
  }
  hall(-1.18,-14.56,6.30,5.48,10.61,13.65);
  hall(4.17,-13.64,3.48,4.10,7.93,9.91,true);
  // Chimney with moulded courses and two dark flues on the visible roof slope.
  box(fort,.59,2.17,.73,.91,12.73,-15.77,sand);
  for(let i=0;i<5;i++) box(fort,.615,.062,.748,.91,12.40+i*.234,-15.77,ivory);
  box(fort,.72,.145,.87,.91,13.83,-15.77,ivory);
  for(const z of [-15.96,-15.58]) {
    cyl(fort,.145,.18,.28,.91,14.016,z,0x9e7256,8);
    cyl(fort,.145,.145,.075,.91,14.141,z,0xb38565,8);
    cyl(fort,.093,.093,.011,.91,14.183,z,0x393038,8);
  }

  for(const [color,list] of panels) {
    const geo=new T.BufferGeometry();
    geo.setAttribute('position',new T.Float32BufferAttribute(list,3));
    geo.computeVertexNormals();
    mesh(manor,geo,color);
  }
}
