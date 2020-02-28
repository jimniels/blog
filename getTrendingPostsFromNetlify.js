import fs from "fs";
import fetch from "node-fetch";

const token = fs
  .readFileSync("./.netlify-oauth.token")
  .toString()
  .trim();

// @TODO
// one month time frame
// from Wed Jan 29 2020 00:00:00 GMT-0700
// to Fri Feb 28 2020 23:59:59 GMT-0700
fetch(
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
    console.log(postsByViews);
  });
