const fetch = require("node-fetch");

async function getBestStories() {
  const query = `query{
    storiesFeed(type: BEST){
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
module.exports = { getBestStories };
