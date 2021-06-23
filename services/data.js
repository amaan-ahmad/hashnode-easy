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
      const storiesFeed = [];
      res.posts.forEach(({ slug, title, cuid }) => {
        storiesFeed.push({
          slug,
          title,
          cuid,
        });
      });
      return {
        data: {
          storiesFeed,
        },
      };
    });
}

async function getArticlesByUsername(username) {
  const query = `query{
    user(username: "${username}"){
  	publication{
      posts{
        slug
        cuid
        title
      }
    }
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
    .then((res) => {
      return {
        data: {
          storiesFeed: res.data.user.publication
            ? res.data.user.publication.posts
            : [],
        },
      };
    })
    .catch(console.error);
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

async function search(query) {
  return fetch(
    "https://amerdmzm12-dsn.algolia.net/1/indexes/posts/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.9.0)%3B%20Browser",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-algolia-api-key": "295b17c8b7be099e43e2b2b2b63a7589",
        "x-algolia-application-id": "AMERDMZM12",
      },
      referrer: "https://hashnode.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{"query":"${query}","filters":"type:question OR type:story AND totalReactions >= 25","hitsPerPage":5,"page":0}`,
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }
  )
    .then((res) => res.text())
    .then(JSON.parse)
    .then((res) => {
      const storiesFeed = [];
      res.hits.forEach(({ slug, title, cuid }) => {
        storiesFeed.push({
          slug,
          title,
          cuid,
        });
      });
      const result = {
        data: {
          storiesFeed,
        },
      };
      return result;
    })
    .catch(console.error);
}

module.exports = {
  getStories,
  getPostContent,
  getTownHallStories,
  search,
  getArticlesByUsername,
};
