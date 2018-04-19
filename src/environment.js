import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml'; // eslint-disable-line import/no-extraneous-dependencies

// Only loaded in local dev environment
// ENVs are loaded by serverless.yml in staging/production
if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'local') {
  const envs = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../env.yaml')));
  Object.keys(envs.local).forEach((key) => {
    process.env[key] = envs.local[key];
  });
}
