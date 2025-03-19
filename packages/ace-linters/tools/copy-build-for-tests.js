const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const targetDir = path.join(__dirname, '..', 'tests', 'ui', 'dist', 'build');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

fs.cpSync(buildDir, targetDir, { recursive: true, force: true });
