const fetch = require("node-fetch");

async function getStories(type) {
  const query = `query{
    storiesFeed(type: ${type}){
      title
      slug
      cuid
    }
  }`;

  return fetch("https://api.hashnode.com/", {
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => res.text())
    .then(JSON.parse)
    .catch(console.error);
}
// https://hashnode.com/ajax/post/lets-talk-with-mays-top-5-hashnode-authors-ckq0jiixv05nc5ws1frwk181x
// https://hashnode.com/ajax/user/publication-entries?publication=5d381a3bd453ac336e478173&skip=5&limit=6

async function getTownHallStories() {
  const url = `https://hashnode.com/ajax/user/publication-entries?publication=5d381a3bd453ac336e478173&limit=6`;
  return fetch(url)
    .then((res) => res.text())
    .then(JSON.parse)
    .then((res) => {
      const result = [];
      res.posts.forEach(({ slug, title, cuid }) => {
        result.push({
          slug,
          title,
          cuid,
        });
      });
      return result;
    });
}

async function getPostContent(slug, cuid) {
  const url = `https://hashnode.com/ajax/post/${slug}-${cuid}`;
  return fetch(url)
    .then((res) => res.text())
    .then(JSON.parse)
    .then((res) => {
      return res.post.contentMarkdown;
    })
    .catch(console.error);
}

module.exports = { getStories, getPostContent, getTownHallStories };
