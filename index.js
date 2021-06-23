const chalk = require("chalk");
const vorpal = require("./utils/vorpal");

const menu = require("./modules/menu");
const hashnode = require("./values/art");

console.clear();

vorpal.log(chalk.blue(hashnode));

vorpal.log(chalk.bgBlue.white.bold("--- Welcome to Hashnode easy ---"));

vorpal.command("read", "enables reading").action(function (args, cb) {
  menu();
  cb();
});

vorpal.delimiter("hashnode-easy $ : ").show();
