const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dist, 'style.css'), 'utf8');
const offline = html.replace('<link rel="stylesheet" href="style.css">', () => `<style>${css}</style>`)
  .replace(/<script src="([^"]+)"><\/script>/g, (_, file) => `<script>\n${fs.readFileSync(path.join(dist, file), 'utf8')}\n</script>`);
fs.writeFileSync(path.join(root, '训练师研习室-离线版.html'), offline);
const context = vm.createContext({});
for (const file of ['data.js', 'research.js', 'calculations.js']) {
  vm.runInContext(fs.readFileSync(path.join(dist, file), 'utf8'), context, { filename: file });
}
const questions = vm.runInContext('questions', context);
fs.writeFileSync(path.join(root, '完整原创题库.json'), JSON.stringify(questions, null, 2));
console.log(`Built offline HTML and exported ${questions.length} questions.`);
