const {
  TRENDING,
  NEW,
  FEATURED,
  TH_ARTICLES,
  SEARCH_ARTICLES,
  EXIT,
} = require("../values/choices");
const trending = require("./trending");
const inquirer = require("inquirer");
const vorpal = require("../utils/vorpal");

function menu() {
  vorpal.hide();
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "what you want to read? ",
        choices: [TRENDING, NEW, FEATURED, TH_ARTICLES, SEARCH_ARTICLES, EXIT],
      },
    ])
    .then((answers) => {
      switch (answers.type) {
        case TRENDING:
          vorpal.log("Loading...\n");
          trending();
          break;

        case NEW:
          break;

        case FEATURED:
          break;

        case TH_ARTICLES:
          break;

        case SEARCH_ARTICLES:
          // vorpal.delimiter("Search: ").show();
          break;

        case EXIT:
          break;
        default:
          vorpal.log(chalk.yellow("Invalid selection"));
          break;
      }
    });
}

module.exports = menu;
