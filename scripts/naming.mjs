import fs from 'node:fs/promises';
import path from 'node:path';
import {ROOT,writeJson} from './lib.mjs';
export const slug=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const harnessNames={'pi':'Pi','codex':'Codex CLI','codex-cli':'Codex CLI','antigravity':'Antigravity','mimo-desktop':'MiMo Desktop','mimodesktop':'MiMo Desktop','zcode':'ZCode','hermes':'Hermes'};
export const canonicalHarness=value=>harnessNames[slug(value)]||value||'Harness 未记录';
export const canonicalModel=value=>({'gpt-6-1-sol':'GPT-6.1 Sol','gpt-6-sol':'GPT-6 Sol','gpt-6-luna':'GPT-6 Luna','stealth-space-bunny-alpha':'Space Bunny Alpha','space-bunny-alpha':'Space Bunny Alpha','gpt-5-6-luna':'GPT-5.6 Luna','gpt-5-6-sol':'GPT-5.6 Sol','gpt-5-6-terra':'GPT-5.6 Terra'})[slug(value)]||value||'模型未记录';
export function components(record){return {topic:slug(record.topic),model:slug(canonicalModel(record.model)),harness:slug(canonicalHarness(record.harness)),variant:slug(record.variant||'default')};}
export function formatId(record,serial=1){const c=components(record);if(Object.values(c).some(v=>!v))throw Error('题目、模型、Harness 与版本必须有可用的英文标识');if(!Number.isInteger(serial)||serial<1||serial>999)throw Error('运行序号应为 1–999');return `${c.topic}--${c.model}--${c.harness}--${c.variant}--r${String(serial).padStart(3,'0')}`;}
export const formatTitle=c=>`${c.topicLabel} · ${canonicalModel(c.model)} · ${canonicalHarness(c.harness)}`;
export async function allocateId(record){const roots=[path.join(ROOT,'cases'),path.join(ROOT,'.work/incoming')];const used=new Set();for(const root of roots){try{for(const name of await fs.readdir(root))used.add(name);}catch{}}for(let n=1;n<=999;n++){const id=formatId(record,n);if(!used.has(id))return {id,serial:n};}throw Error('该组合的序号已用完');}
export async function register(record){for(const [file,id,label,extra] of [['topics',record.topic,record.topicLabel,{}],['models',components(record).model,record.model,{exactId:record.exactModelId||null}],['harnesses',components(record).harness,record.harness,{}]]){const target=path.join(ROOT,'registry',file+'.json');const data=await fs.readFile(target,'utf8').then(JSON.parse).catch(()=>({}));if(!data[id])data[id]={label,...extra};await writeJson(target,data);}}
