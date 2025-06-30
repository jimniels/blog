#quadratic

# An Analysis of Links From The White House’s “Wire” Website

A little while back I heard about the White House launching their version of a _Drudge Report_ style website called [White House Wire](https://www.axios.com/2025/04/30/trump-white-house-drudge-style-website-launch). According to [Axios](https://www.axios.com/2025/04/30/trump-white-house-drudge-style-website-launch), a White House official said the site’s purpose was to serve as “a place for supporters of the president’s agenda to get the real news all in one place”.

So a link blog, if you will.

As a self-professed connoisseur of websites and link blogs, this got me thinking: “I wonder what kind of links they’re considering as ‘real news’ and what they’re linking to?”

So I decided to do quick analysis using [Quadratic](https://www.quadratichq.com), a programmable spreadsheet where you can write code and return values to a 2d interface of rows and columns.

I wrote some JavaScript to:

- Fetch the HTML page at `whitehouse.gov/wire`
- Parse it with cheerio
- Select all the external links on the page
- Return a list of links and their headline text 

In a few minutes I had a quick analysis of what kind of links were on the page:

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-quadratic-js-scraped-links.png" width="973" height="546" alt="Screenshot of the Quadratic spreadsheet, with rows and columns of data on the left, and on the right a code editor containing the code which retrieved and parsed the data on the left." />

This immediately sparked [my curiosity to know more about the meta information around the links](https://blog.jim-nielsen.com/2020/indexing-my-blogs-links/), like:

- If you grouped all the links together, which sites get linked to the most?
- What kind of interesting data could you pull from the headlines they’re writing, like the most frequently used words?
- What if you did this analysis, but with snapshots of the website over time (rather than just the current moment)?

So I got to building.

Quadratic today doesn’t yet have the ability for your spreadsheet to run in the background on a schedule and append data. So I had to look elsewhere for a little extra functionality.

My mind went to [val.town](https://www.val.town) which lets you write little scripts that can 1) run on a schedule (cron), 2) store information (blobs), and 3) retrieve stored information via their API.

After a quick read of their docs, I figured out how to write a little script that’ll run once a day, scrape the site, and save the resulting HTML page in their key/value storage.

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-valtown-script.png" width="557" height="238" alt="Screenshot of 9 lines of code from val.town that fetches whitehouse.gov/wire, extracts the text, and stores it in blob storage." />

From there, I was back to Quadratic writing code to talk to val.town’s API and retrieve my HTML, parse it, and turn it into good, structured data. There were some things I had to do, like:

- Fine-tune how I select all the editorial links on the page from the source HTML (I didn’t want, for example, to include external links to the White House’s social pages which appear on every page). This required a little finessing, but I eventually got a collection of links that corresponded to what I was seeing on the page.
- Parse the links and pull out the [top-level domains](https://blog.jim-nielsen.com/2023/domain-nuance/) so I could group links by domain occurrence.
- Create charts and graphs to visualize the structured data I had created.

Selfish plug: Quadratic made this all super easy, as I could program in JavaScript and use third-party tools like [tldts](https://www.npmjs.com/package/tldts) to do the analysis, all while visualizing my output on a 2d grid in real-time which made for a super fast feedback loop!

Once I got all that done, I just had to sit back and wait for the HTML snapshots to begin accumulating!

It’s been about a month and a half since I started this and I have about fifty days worth of data.

The results?

Here’s the top 10 domains that the _White House Wire_ links to (by occurrence), from May 8 to June 24, 2025:

1. `youtube.com` (133)
2. `foxnews.com` (72)
3. `thepostmillennial.com` (67)
4. `foxbusiness.com` (66)
5. `breitbart.com` (64)
6. `x.com` (63)
7. `reuters.com` (51)
8. `truthsocial.com` (48)
9. `nypost.com` (47)
10. `dailywire.com` (36)

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-quadratic-top-10-links.png" width="601" height="385" alt="A pie chart visualizing the top ten links (by domain) from the White House Wire" />

From the links, here’s a word cloud of the most commonly recurring words in the link headlines:

1. “trump” (343)
2. “president” (145)
3. “us” (134)
4. “big” (131)
5. “bill” (127)
6. “beautiful” (113)
7. “trumps” (92)
8. “one” (72)
9. “million” (57)
10. “house” (56)

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-quadratic-word-cloud.png" width="693" height="456" alt="Screenshot of a word cloud with “trump” being the largest word, followed by words like “bill”, “beautiful” and “president”." />

The data and these graphs are all in my spreadsheet, so I can open it up whenever I want to see the latest data and re-run my script to pull the latest from val.town. In response to the new data that comes in, the spreadsheet automatically parses it, turn it into links, and updates the graphs. Cool!

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-quadratic-spreadsheet-screenshot.png" width="1319" height="628" alt="Screenshot of a spreadsheet with three different charts and tables of data." />

If you want to check out the spreadsheet — sorry! My API key for val.town is in it (“secrets management” is on the roadmap). But I created a duplicate where I inlined the data from the API (rather than the code which dynamically pulls it) which you can [check out here at your convenience](https://app.quadratichq.com/file/b5c08206-67b6-459c-8b92-b2df5bf3616d).