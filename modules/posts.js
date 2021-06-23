const { getPostContent, getStories } = require("../services/data");
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

function renderList({ data }) {
  const { storiesFeed } = data;
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
    })
    .catch((err) => {
      vorpal.log(err);
    });
}

module.exports = { trending, featured, newStories, community };
