const contentMD = require('./content.js');
const { marked } = require('./config.js');

// Show the parsed data
console.log(marked(contentMD));
