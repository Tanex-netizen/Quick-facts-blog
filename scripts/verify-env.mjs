import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function parseEnvFile(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  return raw
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .reduce((acc, line) => {
      const [key, ...rest] = line.split('=');
      const value = rest.join('=').trim();
      acc[key.trim()] = value;
      return acc;
    }, {});
}

const root = join(process.cwd());
const frontendEnv = parseEnvFile(join(root, 'frontend/.env.local'));
const backendEnv = parseEnvFile(join(root, 'backend/.env'));

const backendPort = backendEnv.PORT || '4000';
const apiBaseUrl = frontendEnv.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  console.error('Missing NEXT_PUBLIC_API_BASE_URL in frontend/.env.local');
  process.exit(1);
}

let apiPort;
try {
  const apiUrl = new URL(apiBaseUrl);
  apiPort = apiUrl.port || (apiUrl.protocol === 'https:' ? '443' : '80');
} catch (error) {
  console.error(`Invalid NEXT_PUBLIC_API_BASE_URL: ${apiBaseUrl}`);
  process.exit(1);
}

if (apiPort !== backendPort) {
  console.error(
    `Port mismatch: frontend NEXT_PUBLIC_API_BASE_URL uses port ${apiPort}, but backend PORT is ${backendPort}`
  );
  process.exit(1);
}

console.log('Environment connection verified: frontend points to backend port', backendPort);
