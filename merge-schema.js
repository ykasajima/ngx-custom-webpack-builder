const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const commonSchema = 'src/schema.ext.json';

const targets = [{
    src: 'node_modules/@angular-devkit/build-angular/src/browser/schema.json',
    dst: 'dist/browser/schema.json',
  },
  {
    src: 'node_modules/@angular-devkit/build-angular/src/dev-server/schema.json',
    dst: 'dist/dev-server/schema.json',
  },
  {
    src: 'node_modules/@angular-devkit/build-angular/src/karma/schema.json',
    dst: 'dist/karma/schema.json',
  },
  {
    src: 'node_modules/@angular-devkit/build-angular/src/server/schema.json',
    dst: 'dist/server/schema.json',
  },
];

function mkdirSync(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

mkdirSync('dist');
for (const target of targets) {
  const dst = {};
  const src = JSON.parse(fs.readFileSync(target.src, 'utf8'));
  _.merge(dst, src);
  const ext = JSON.parse(fs.readFileSync(commonSchema, 'utf8'));
  _.merge(dst, ext);

  mkdirSync(path.dirname(target.dst));
  fs.writeFileSync(target.dst, JSON.stringify(dst, null, 2), 'utf-8');
}
