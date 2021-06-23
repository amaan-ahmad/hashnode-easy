const {
  TRENDING,
  NEW,
  FEATURED,
  // TH_ARTICLES,
  // SEARCH_ARTICLES,
  COMMUNITY,
  EXIT,
  TH_ARTICLES,
  SEARCH_ARTICLES,
} = require("../values/choices");
const {
  trending,
  featured,
  newStories,
  community,
  townhall,
  searchInput,
} = require("./posts");
const inquirer = require("inquirer");
const vorpal = require("../utils/vorpal");

async function menu() {
  vorpal.hide();
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "what you want to read? ",
        choices: [
          TRENDING,
          FEATURED,
          NEW,
          TH_ARTICLES,
          SEARCH_ARTICLES,
          COMMUNITY,
          EXIT,
        ],
      },
    ])
    .then((answers) => {
      switch (answers.type) {
        case TRENDING:
          vorpal.log("Loading...\n");
          trending();
          break;

        case NEW:
          vorpal.log("Loading...\n");
          newStories();
          break;

        case FEATURED:
          vorpal.log("Loading...\n");
          featured();
          break;

        case COMMUNITY:
          vorpal.log("Loading...\n");
          community();

        case TH_ARTICLES:
          townhall();
          break;

        case SEARCH_ARTICLES:
          searchInput();
          break;

        case EXIT:
          break;
        default:
          vorpal.log(chalk.yellow("Invalid selection"));
          break;
      }
    })
    .catch(vorpal.log);
}

module.exports = menu;
