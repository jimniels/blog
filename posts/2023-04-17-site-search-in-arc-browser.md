# Site Search in Arc Browser — For Your Own Site

[Arc just released site search](https://twitter.com/browsercompany/status/1646580021858037760?s=20) built right into the browser.

Want to search for something specifically on Twitter? Pull up the search bar and start typing `Twitter`:

<img src="https://cdn.jim-nielsen.com/blog/2023/site-search-twitter-tab.png" width="905" height="478" alt="Screenshot of CMD+T in Arc browser with “arc site search” for Twitter in the suggested results and available for Tabbing." />

Select the site search option and hit `Tab`. This puts you into what I’ll call “site search mode”:

<img src="https://cdn.jim-nielsen.com/blog/2023/site-search-twitter.png" width="921" height="294" alt="Twitter site search active in the Arc browser." />

Once you enter a query, you’ll be taken to that site’s search page with your query entered into the GUI — pretty neat!

As someone who uses site-specific search quite often on a search engine (e.g. in Google type “progressive enhancement site:adactio.com”) I thought this was cool.

If you’re wondering how it works under the hood, there’s [some good documentation around it](https://resources.arc.net/en/articles/7183263-site-search-directly-search-any-website). What’s neat is: the feature is built on URLs. **You can create a site-specific search that’s always one keystroke away in your browser by simply setting up a URL.**

Back to my site-specific search example, I can now have `adactio.com` on speed dial for search — a valid use case indeed.

<img src="https://cdn.jim-nielsen.com/blog/2023/site-search-adactio.png" width="882" height="292" alt="adactio.com active in the Arc site search." />

Set up the site search in Arc, pass the `%s` query param to Jeremy’s search page URL, and voilà!

`https://adactio.com/search/?query=%s`

<img src="https://cdn.jim-nielsen.com/blog/2023/site-search-adactio-results.png" width="1056" height="793" alt="Screenshot of the search results page for the phrase “progressive enhancements” for adactio.com" />

Call me a narcissist, but I am constantly in need of searching my own blog for things I’ve written previously.

My blog, however, does not have a `/search` endpoint that takes keywords and delivers results. In such cases, I often find myself formulating queries like this in a search engine:

`deno webby site:blog.jim-nielsen.com`

But wait a minute, I don’t have to go build a search page on my blog to use the site-specific search feature in Arc. I can leverage the URLs of a search engine like Google!

Setup in the `%s` query, append the domain of the site you want to search, and voilà!

`https://www.google.com/search?q=%s&as_sitesearch=blog.jim-nielsen.com`

<img src="https://cdn.jim-nielsen.com/blog/2023/site-search-prefs.png" width="610" height="436" alt="Screenshot of the settings page in the Arc browser where you can edit the settings for a site specific search. In this example, a google.com search is shown for searching blog.jim-nielsen.com" />

That gets you a site-specific search feature in Arc:

<img src="https://cdn.jim-nielsen.com/blog/2023/site-search-blog.png" width="940" height="298" alt="Site specific search feature in Arc for blog.jim-nielsen.com (labeled as “Jim’s Blog”)." />

Which takes you to the search engine results:

<img src="https://cdn.jim-nielsen.com/blog/2023/site-search-blog-results.png" width="987" height="443" alt="Google.com screenshot for a site specific search of blog.jim-nielsen.com for the phrase “deno webby”." />

I’m definitely going to use this a lot for searching my own stuff.

URLs FTW!

