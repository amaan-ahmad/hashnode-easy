const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const contentMD = require('./content.js');
marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});


// Show the parsed data
console.log(marked(contentMD));
