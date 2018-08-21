const md = require('markdown-it')({html: true});
const fs = require('fs');

module.exports = getContent;

function getContent (src) {
  const cv = getMarkdown(src);
  return md.render(cv);
}

function getMarkdown (fileName) {
  return fs.readFileSync(fileName, 'utf8');
}


