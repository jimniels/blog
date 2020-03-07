import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const token = process.env.NETLIFY_OAUTH
  ? process.env.NETLIFY_OAUTH
  : fs
      .readFileSync(path.join(__dirname, "../.NETLIFY_OAUTH"))
      .toString()
      .trim();

// @TODO
// one month time frame
// from Wed Jan 29 2020 00:00:00 GMT-0700
// to Fri Feb 28 2020 23:59:59 GMT-0700

// const today = new Date();
// today.setHours(0,0,0,0);
// today.getTime();

// const future = new Date();
// future.setDate(future.getDate() + 30);
// future.setHours(23,59,59,999);
// future.getTime();
export default function getTrendingPosts() {
  const cachedFile = path.join(__dirname, "./.trending-posts.json");
  if (fs.existsSync(cachedFile)) {
    return JSON.parse(fs.readFileSync(cachedFile));
  }

  return fetch(
    "https://analytics.services.netlify.com/v1/2edb6cab-f1d8-4556-85ee-426ae71f5980/ranking/pages?from=1580281200000&to=1582959599999&timezone=-0700&limit=15",
    {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      }
    }
  )
    .then(res => res.json())
    .then(json => {
      /*
      {
        data: [
          {
            count: 123
            resource: "/path/"
          }
        ]
      }
    */
      const regex = /\/\d{4}\/.*/;
      const postsByViews = json.data
        .filter(({ resource }) => regex.test(resource))
        .reduce(
          (acc, { resource, count }) => ({ ...acc, [resource]: count }),
          {}
        );

      const data = Object.keys(postsByViews);
      fs.writeFileSync(cachedFile, JSON.stringify(data));

      return data;
    })
    .catch(e => {
      console.error(e);
      return [];
    });
}
