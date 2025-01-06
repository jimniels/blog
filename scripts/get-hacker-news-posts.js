// Get data from hacker news search API
// https://hn.algolia.com/api
export default function getHackerNewsPosts() {
  return fetch(
    "http://hn.algolia.com/api/v1/search?query=blog.jim-nielsen.com&restrictSearchableAttributes=url"
  )
    .then((res) => res.json())
    .then((json) => json.hits);
}

// try {
//   console.log(await getHackerNewsPosts());
// } catch (e) {
//   console.log(e);
// }
