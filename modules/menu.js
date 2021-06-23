const {
  TRENDING,
  NEW,
  FEATURED,
  COMMUNITY,
  EXIT,
  TH_ARTICLES,
  SEARCH_ARTICLES,
  ARTICLES_BY_USER,
} = require("../values/choices");
const {
  trending,
  featured,
  newStories,
  community,
  townhall,
  searchInput,
  userInput,
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
          ARTICLES_BY_USER,
          COMMUNITY,
          EXIT,
        ],
        pageSize: 10,
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
          break;

        case TH_ARTICLES:
          vorpal.log("Loading...\n");
          townhall();
          break;

        case SEARCH_ARTICLES:
          searchInput();
          break;

        case ARTICLES_BY_USER:
          userInput();
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
