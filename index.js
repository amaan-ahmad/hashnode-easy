#!/usr/bin/env node

const chalk = require("chalk");
const vorpal = require("./utils/vorpal");

const menu = require("./modules/menu");
const hashnode = require("./values/art");

console.clear();

vorpal.log(chalk.blueBright(hashnode));

vorpal.log(chalk.bgBlueBright.white.bold("--- Welcome to Hashnode easy ---"));

vorpal.command("read", "enables reading").action(function (args, cb) {
  menu();
  cb();
});

vorpal.delimiter("hashnode-easy $ : ").show();
