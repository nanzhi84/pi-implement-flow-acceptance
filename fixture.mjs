import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.env.FLOW_RESOURCE_DIR;
if (!root) throw new Error('FLOW_RESOURCE_DIR required');
const mode = process.argv[2];
if (mode === 'prepare') {
  if (process.env.FLOW_FIXTURE_FAIL_PREPARE === '1') throw new Error('Injected preparation failure');
  if (process.env.FLOW_FIXTURE_CHANGE_HEAD === '1') execFileSync('git', ['checkout', '--detach', 'HEAD^'], { stdio: 'pipe' });
  await mkdir(join(root, 'data'), { recursive: true });
} else if (mode === 'cleanup') {
  await rm(join(root, 'data'), { recursive: true, force: true });
} else if (mode === 'check') {
  execFileSync(process.execPath, ['--check', 'app.mjs'], { stdio: 'pipe' });
} else if (mode === 'accept') {
  const greeting = execFileSync(process.execPath, ['app.mjs', 'Ada'], { encoding: 'utf8' });
  if (greeting !== 'Hello, Ada!\n') throw new Error('greeting contract failed');
  let rejected = false;
  try { execFileSync(process.execPath, ['app.mjs'], { stdio: 'pipe' }); }
  catch (error) { rejected = error.status === 2; }
  if (!rejected) throw new Error('missing-name contract failed');
  for (const name of [' ', '   ', '\t', '\t\t', ' \t ']) {
    let whitespaceRejected = false;
    try { execFileSync(process.execPath, ['app.mjs', name], { encoding: 'utf8', stdio: 'pipe' }); }
    catch (error) { whitespaceRejected = error.status === 2 && error.stdout === ''; }
    if (!whitespaceRejected) throw new Error('whitespace-only contract failed');
  }
  for (const name of [' Ada ', '\tAda\t', ' A da\t']) {
    const result = execFileSync(process.execPath, ['app.mjs', name], { encoding: 'utf8' });
    if (result !== `Hello, ${name}!\n`) throw new Error('meaningful-whitespace contract failed');
  }
  for (const name of ['Ada\n', '\rAda', 'A\nda', '\n', '\r']) {
    let newlineRejected = false;
    try { execFileSync(process.execPath, ['app.mjs', name], { encoding: 'utf8', stdio: 'pipe' }); }
    catch (error) { newlineRejected = error.status === 2 && error.stdout === ''; }
    if (!newlineRejected) throw new Error('newline-name contract failed');
  }
  process.stdout.write(JSON.stringify({ passed: true, assertions: [
    { name: 'greeting-for-name', passed: true },
    { name: 'missing-name-rejected', passed: true },
    { name: 'whitespace-only-rejected', passed: true },
    { name: 'meaningful-whitespace-preserved', passed: true },
    { name: 'newline-name-rejected', passed: true },
  ] }) + '\n');
} else {
  throw new Error('Unsupported fixture phase');
}
