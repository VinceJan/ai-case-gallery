import {test} from 'node:test';
import assert from 'node:assert/strict';
import {allocateId,formatId,formatTitle,canonicalHarness} from './naming.mjs';
import {promoteCase} from './promote-case.mjs';
import {readCases,caseDir} from './lib.mjs';
test('别名与稳定组合不会覆盖既有运行',async()=>{const c=(await readCases())[0];const next=await allocateId({...c,harness:c.harness==='Pi'?'PI':c.harness});assert.notEqual(next.id,c.id);assert.ok(next.serial>c.serial);assert.equal(formatId({...c,harness:canonicalHarness(c.harness)},c.serial),c.id);assert.equal(formatTitle(c),c.title);});
test('失败产物和未人工检查的候选不能进入正式案例',async()=>{for(const status of ['pending','built','runtime-failed','build-failed'])await assert.rejects(promoteCase({id:'rejected',status,cover:'x',demoFingerprint:'x',verification:{manualReview:{summary:'x'}}}),/必须通过/);await assert.rejects(promoteCase({id:'rejected',status:'verified',cover:'x',demoFingerprint:'x',verification:{}}),/人工复核/);});
test('案例入口拒绝路径越界',async()=>{await assert.rejects(caseDir('../cases'),/ID|非法/);});
