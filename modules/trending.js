const { getPostContent, getStories } = require("../services/data");
const inquirer = require("inquirer");
const vorpal = require("../utils/vorpal");
const { marked } = require("../config");
const { BEST } = require("../values/stories");

function trending() {
  getStories(BEST).then(renderTrendingList).catch(vorpal.error);
}

function renderTrendingList({ data }) {
  const { storiesFeed } = data;
  const titles = [];
  storiesFeed.forEach(({ title }) => {
    titles.push(title);
  });

  inquirer
    .prompt({
      type: "list",
      name: "article",
      message: "Here are some trending articles from hashnode!",
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

module.exports = trending;
