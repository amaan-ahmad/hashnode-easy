const {
  getPostContent,
  getStories,
  getTownHallStories,
  search,
  getArticlesByUsername,
} = require("../services/data");
const inquirer = require("inquirer");
const vorpal = require("../utils/vorpal");
const { marked } = require("../config");
const { BEST, FEATURED, NEW } = require("../values/stories");
const { COMMUNITY } = require("../values/stories");

function trending() {
  getStories(BEST).then(renderList).catch(vorpal.error);
}

function featured() {
  getStories(FEATURED).then(renderList).catch(vorpal.error);
}

function newStories() {
  getStories(NEW).then(renderList).catch(vorpal.error);
}

function community() {
  getStories(COMMUNITY).then(renderList).catch(vorpal.error);
}

function townhall() {
  getTownHallStories().then(renderList).catch(vorpal.error);
}

function searchInput() {
  inquirer
    .prompt({
      type: "input",
      name: "query",
      message: "Search a keyword: ",
    })
    .then(({ query }) => {
      search(query).then(renderList).then(vorpal.error);
    })
    .catch(vorpal.error);
}

function userInput() {
  inquirer
    .prompt({
      type: "input",
      name: "user_name",
      message: "Username: ",
    })
    .then(({ user_name }) => {
      getArticlesByUsername(user_name).then(renderList).then(vorpal.error);
    })
    .catch(vorpal.error);
}

function renderList({ data }) {
  const { storiesFeed } = data;
  if (storiesFeed.length === 0) {
    vorpal.log("No results returned. ");
    return;
  }
  const titles = [];
  storiesFeed.forEach(({ title }) => {
    titles.push(title);
  });

  inquirer
    .prompt({
      type: "list",
      name: "article",
      message: "Here are your awesome articles from hashnode!",
      choices: titles,
      loop: false,
      pageSize: 7,
    })
    .then((answer) => {
      storiesFeed.forEach((story) => {
        if (story.title === answer.article) {
          const { slug, cuid } = story;
          getPostContent(slug, cuid)
            .then((data) => {
              vorpal.log(marked(data));
            })
            .catch(vorpal.log);
        }
      });
      vorpal.delimiter("hashnode-easy $ : ").show();
    })
    .catch((err) => {
      vorpal.log(err);
    });
}

module.exports = {
  trending,
  featured,
  newStories,
  community,
  townhall,
  searchInput,
  userInput,
};
