import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let token = "";
try {
  if (process.env.NETLIFY_OAUTH) {
    token = process.env.NETLIFY_OAUTH;
  } else {
    fs.readFileSync(path.join(__dirname, "../.NETLIFY_OAUTH"))
      .toString()
      .trim();
  }
} catch (e) {
  console.error(
    "Failed to get Netlify OAuth token. Returning empty data for Netlify analytics"
  );
}

// one month time frame
// from Wed Jan 29 2020 00:00:00 GMT-0700
// to Fri Feb 28 2020 23:59:59 GMT-0700

let today = new Date();
today.setHours(23, 59, 59, 999);

let oneMonthAgo = new Date();
oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
oneMonthAgo.setHours(0, 0, 0, 0);

/**
 * Get trending posts from Netlify and return a list of the permalinks sorted by their popularity
 * @returns {Array.<{ resource: string, count: number }>
 */
export default function getTrendingPosts() {
  if (!token) return [];

  return fetch(
    `https://analytics.services.netlify.com/v2/2edb6cab-f1d8-4556-85ee-426ae71f5980/ranking/pages?from=${oneMonthAgo.getTime()}&to=${today.getTime()}&timezone=-0700&limit=15`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      /*
        Example data:
        {
          data: [
            {
              count: 100
              resource: "/2019/my-post/"
            },
            {
              count: 50
              resource: "/tags/"
            },
            {
              count: 210
              resource: "/2020/another-post"
            }
          ]
        }
      */

      // Only get the resources that are blog posts, i.e. /:year/:id, then
      // get the permalink
      const regex = /\/\d{4}\/.*/;
      const data = json.data.filter(({ resource }) => regex.test(resource));
      // .map(({ resource }) => resource)
      // .slice(0, 10);

      // fs.writeFileSync(cachedFile, JSON.stringify(data));

      return data;
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
}
