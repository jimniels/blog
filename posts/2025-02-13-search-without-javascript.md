#progressiveEnhancement

# Search Results Without JavaScript

I’m currently looking to add a search feature to my blog.

It’s a client-side approach, which means I was planning on using [my favorite progressive-enhancement technique for client-side only search](https://blog.jim-nielsen.com/2021/progressively-enhanced-search/): you point a search form at Google, scope the results to your site, then use JavaScript to intercept the form submission and customize the experience on your site to your heart’s content.

```html
<form action="https://www.google.com/search">
  <input type="text" name="q" placeholder="Search" />
  <input type="hidden" name="as_sitesearch" value="blog.jim-nielsen.com" />
  <button type="submit">Search</button>
</form>
<script>
	document.querySelector("form").addEventListener("submit", (e) => {
		e.preventDefault();
		// Do my client-side search stuff here
		// and stay on the current page
  });
</script>
```

However, then I remembered that [Google Search no longer works without JavaScript](https://blog.jim-nielsen.com/2025/javascript-required/) which means this trick is no longer a trick. [^1]

But have no fear, other search engines to the rescue!

DuckDuckGo, for example, supports this trick. Tweak some of the HTML from the Google example and it’ll work:

```html
<form action="https://duckduckgo.com">
  <input type="text" name="q" placeholder="Search" />
  <input type="hidden" name="sites" value="blog.jim-nielsen.com" />
  <button type="submit">Search</button>
</form>
<script>
	document.querySelector("form").addEventListener("submit", (e) => {
		e.preventDefault();
		// Do my client-side search stuff here
		// and stay on the current page
  });
</script>
```

Yahoo also supports this trick, but not Bing. You can point people at Bing, but you can’t scope a query to your site only with an HTML form submission alone. Why? Because you need two search params: 1) a “query” param representing what the user typed into the search box, and 2) a “site search” param to denote which site you want to limit your results to (otherwise it’ll search the whole web).

From a UI perspective, if a search box is on your site, user intent is to search the content _on your site_. You don’t want to require people to type “my keywords site:blog.jim-nielsen.com” when they’re using a search box on your site — that’s just silly!

That’s why you need a second search parameter you can set yourself (a hidden input). You can’t concatenate something onto the end of a user’s HTML form submission. (What they type in the `input` box is what gets sent to the search engine as the `?q=...` param.) To add to the `q` param, you would need JavaScript — but then that defeats the whole purpose of this exercise in the first place!

Anyhow, here are the search parameters I found useful for search engines that will support this trick:

- DuckDuckGo: 
	- Query: `q`
	- Site search param: `sites`
- Yahoo
	- Query: `p`
	- Site search param: `vs`

I made myself [a little test page](https://cdn.jim-nielsen.com/blog/2025/no-js-search.html) for trying all these things. Check it out (and disable JS) if you want to try yourself!

[^1]: Not only that, but the `as_sitesearch` search param doesn’t seem to work anymore either. I can’t find any good documentation on what happened to `as_sitesearch`, but it seems like you’re supposed to use the [“programmable search”](https://developers.google.com/custom-search/docs/element) now instead? Honestly I don’t know. And I don’t care enough to find out.
