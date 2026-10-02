export function sameArtifact(a,b){return !!a?.sourceFingerprint&&!!a?.demoFingerprint&&a.demoFingerprint===b?.demoFingerprint&&a.sourceFingerprint===b?.sourceFingerprint;}
export function verificationCurrent(c){return c.verification?.ok===true&&sameArtifact(c,c.verification);}
export function reviewCurrent(c){return verificationCurrent(c)&&sameArtifact(c,c.verification.manualReview)&&!!c.verification.manualReview?.summary;}
export function assertReady(c){if(c.status!=='verified'||!c.cover||!c.demoFingerprint||!reviewCurrent(c))throw Error('必须通过当前产物的浏览器验证和画面人工复核：'+c.id);}
