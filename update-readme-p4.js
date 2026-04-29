const fs = require('fs');
let c = fs.readFileSync('README.md', 'utf8');
const OLD = '| 3 | GitHub Actions CI (backend + frontend + Docker) | \u2705 Done |';
const NEW = OLD + '\n| 4 | Find My Voting Info (city/PIN lookup, 10 regions) | \u2705 Done |';
c = c.replace(OLD, NEW);
fs.writeFileSync('README.md', c);
console.log('done');
