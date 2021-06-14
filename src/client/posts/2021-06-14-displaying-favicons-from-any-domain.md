# Displaying Favicons From Any Domain

A little while back, I wrote about [indexing the links on my blog](https://blog.jim-nielsen.com/2020/indexing-my-blogs-links/). 

After sitting with it, I decided I wanted to make the design a tad bit more visual by displaying the favicons for each site.

<img src="https://cdn.jim-nielsen.com/blog/2021/favicons-before-after.png" width="1455" height="628" alt="A before and after screenshot of the links module on blog.jim-nielsen.com where the after screenshot displays the favicons of each domain." /> 

Herein I detail what I discovered attempting to display favicons for any site on the web.

## Guess at the Favicon URL

Since I had the domains of each site, i.e. `css-tricks.com`, my first thought was: assume the presence of a favicon at the root of the domain<sup id="a1">[1](#f1)</sup> and see where that gets you.

Looping over each domain, my code looked like this for the favicon:

```html
<img src="//${domain}/favicon.ico" />
```

Honestly, I was surprised how many hits I got by assuming the presence of `favicon.ico` at the root of every domain.

As you can see from this example, the sites where no favicon was found at the root of the domain resulted in a missing image.

<img src="https://cdn.jim-nielsen.com/blog/2021/favicons-url-hardcoded.png" width="718" height="353" alt="Screenshot of a list of domains where 4 of 10 favicons are missing." />

From here, I knew many sites had a `<link>` tag that would specify the location of the favicon. I could write a script that looks first for a favicon at the root (i.e. `favicon.ico`, `favicon.png`, etc.) then if nothing is found grabs the page’s HTML, parses it, looks for the `<link>` pointing to a favicon, and grabs that instead. “Oooh, this could be fun,” my brain thought.

But then the sane part of my brain suggested this must be a problem someone has solved and that I don’t need waste my time reimplementing it.

## Use a Third Party to Retrieve Favicons

I started searching and stumbled on [a Hacker News thread](https://news.ycombinator.com/item?id=17188973) which detailed a number of services/tools that can fetch you a favicon for a given site, for example:

- [Favicon Grabber](https://github.com/antongunov/favicongrabber.com)
- [Favicon Kit](https://faviconkit.com/)
- [The Favicon Finder](https://besticon-demo.herokuapp.com/)

These are great for programmatically retrieving favicons for a site, but that left the other implementation details up to me (image hosting, updating the favicons on a regular basis, etc.).

## Hotlink to Favicons

The most interesting discovery in the aforementioned HackerNews thread was the existence of services that would allow me to hotlink directly to a site’s favicon. All I had to do was formulate the right URL for an `<img>` tag. For example:

```html
<img src="https://service.com/favicons/${domain}" />
```

As I dove deeper, there were two things that interested me most about these favicon service URLs:

1. They are not publicly documented anywhere by the service providers. How to use them might be obvious and require no documentation, but what are the usage guidelines (i.e. you get rate limited in X way at Y rate)? None of that info is officially documented anywhere that I could find.
2. How many (duplicate?) implementations exist by the same service providers, i.e. Google and DuckDuckGo both have two or three different favicon URLs which all work. I don’t know what the difference is or when one might be deprecated over the other.

While [a number of favicon service URLs exist](https://gist.github.com/dodying/bf3063d4e1f5b206018bfa19127669e9), prominent search engines like Google and DuckDuckGo seemed to be the de facto [recommendations mentioned across](https://stackoverflow.com/a/10796141) [a bunch of](https://stackoverflow.com/a/10796141) [StackOverflow insights](https://stackoverflow.com/a/15750809) [on the matter](https://stackoverflow.com/a/61659068).

### Google

I found two different service URLs for Google, both of which appear to work:

[google.com/s2/favicons?domain=blog.jim-nielsen.com](https://www.google.com/s2/favicons?domain=blog.jim-nielsen.com)

[s2.googleusercontent.com/s2/favicons?domain=blog.jim-nielsen.com](https://s2.googleusercontent.com/s2/favicons?domain=blog.jim-nielsen.com)

And apparently you can pass a size parameter to try and get favicons back in a bigger size if you want:

[google.com/s2/favicons?domain=blog.jim-nielsen.com&sz=128](https://www.google.com/s2/favicons?domain=blog.jim-nielsen.com&sz=128)

What’s neat about Google’s service is they provide that ubiquitous “globe” favicon as a placeholder when a given domain’s favicon can’t be found (a hearken back to the old Google Chrome favicon functionality if I’m not mistaken).

<img src="https://cdn.jim-nielsen.com/blog/2021/favicons-url-google.png" width="712" height="354" alt="Screenshot of 10 domains whose favicons were pulled from Google’s favicon service and missing favicons get a default globe icon." />

### DuckDuckGo

I found a number of DuckDuckGo favicon service URLs<sup id="a2">[2](#f2)</sup>, all of which seem to work: 

[icons.duckduckgo.com/ip3/blog.jim-nielsen.com.ico](https://icons.duckduckgo.com/ip3/blog.jim-nielsen.com.ico)

[icons.duckduckgo.com/ip2/blog.jim-nielsen.com.ico](http://icons.duckduckgo.com/ip2/blog.jim-nielsen.com.ico)

[external-content.duckduckgo.com/ip3/blog.jim-nielsen.com.ico](https://external-content.duckduckgo.com/ip3/blog.jim-nielsen.com.ico)

DuckDuckGo’s API is a bit different from Google and has different placeholders for when a favicon can’t be found:

<img src="https://cdn.jim-nielsen.com/blog/2021/favicons-url-duck-duck-go.png" width="713" height="355" alt="" />

### Yandex

The Russian search engine Yandex is in on the game too. Uniquely, they can get you [a sprite of favicons](https://stackoverflow.com/a/35328921), helping minimize the number of network requests if you’re displaying lots of favicons.

[favicon.yandex.net/favicon/google.com/stackoverflow.com/facebook.com/](http://favicon.yandex.net/favicon/google.com/stackoverflow.com/facebook.com/)

## Conclusion

It’s pretty neat that this functionality of displaying a favicon for any site on the web _seems to be_ provided as complimentary  utility to web developers.

However, as mentioned, I can’t find any official API documentation or terms of service for usage of these URLs. It’s definitely a “use at your own risk” kind of deal. 

I’ve implemented displaying favicons for all the links I index on my blog. You can see that [here](https://blog.jim-nielsen.com/about/).

---

1. <span id="f1"></span>One of the things I consistently see in my analytics (via Netlify) is how many requests come in for `/favicon.ico`, regardless of whether I specify its location using the `<link>` tag. Lesson? Unless you have a really good reason not to, just stick the favicon at the root of your domain. [↩](#a1)
2. <span id="f2"></span>DuckDuckGo’s usage of their favicon service in their mobile browser apparently caused [some](https://news.ycombinator.com/item?id=23708166) [controversy](https://github.com/duckduckgo/Android/issues/527). Rather than get a site’s favicon from wherever the website said to get it, their browser [asked DuckDuckGo’s servers for it](https://latesthackingnews.com/2020/07/07/duckduckgo-collected-users-browsing-data-addressed-the-glitch/). This _looked like_ a form of user tracking, a serious violation of the privacy-minded DuckDuckGo. While it all seemed ultimately harmless and done in the name of performance, it nonetheless ended up being a bad look for DuckDuckGo. [↩](#a2)