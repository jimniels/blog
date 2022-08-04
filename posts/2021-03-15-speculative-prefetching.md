# Speculative Prefetching
 
> You have to admit it's clever  
> Maybe the pinnacle of human endeavor  
> When things are made to throw away but never made to disappear  
> — [Jackson Browne, “If I Could Be Anywhere”](https://www.youtube.com/watch?v=qnNHVB9jLc0)

I don’t love prefetching. There are valid uses of it, but what I tend to see are abuses of it—namely prefetching by speculatively loading resources based on some heuristic. 

What is prefetching? It’s a broad term that can mean a lot of things to a lot of people. Robin breaks down the semantics in his article [“Prefetching, preloading, prebrowsing”](https://css-tricks.com/prefetching-preloading-prebrowsing/).

The definition that merits my particular dislike be found in the article [“What Is Prefetching and Why Use It”](https://www.keycdn.com/support/prefetching):

> Prefetching allows a browser to silently fetch the necessary resources needed to display content that a user might access in the near future. The browser is able to store these resources in its cache enabling it to deliver the requested data faster...Once a user clicks on a particular link that has already been prefetched, they will see the content instantly.

“Fetch resources a user _might_ need” is the part that strikes my dislike. This type of prefetching is speculative: retrieving something before it’s asked for in case it’s needed. 

It’s a guess at user intention in order to deliver something faster, i.e. “how about, when a user _hovers_ over a menu item in the navigation, we fire off the request so that, by the time they mousedown and trigger a click, we’ve already got a few hundred millisecond head start on retrieving that resource!”

And what are the downsides to this kind of speculative prefetching? From the aforementioned article:

> One downside to link prefetching is that given the event that a user doesn't navigate to the page with the prefetched asset, their browser will have already unnecessarily fetched the asset in the background, thus increasing the size of its cache without any realized benefit.

To be clear, the downside is more than ”increasing the size of the cache without any realized benefit.” It’s a waste of bandwidth, computation, and ultimately energy.

And the waste is not limited solely to retrieving and processing a superfluous resource. There are rippling consequences of waste:

> websites such as Google who use prefetch, are using the website owner's bandwidth to load the page that a user may not actually visit. The same goes for tracking page views in Google Analytics, the user may not actually visit the prefetched site, however, a page view will still be recorded.

Wasted energy in retrieving and processing the speculative resource, as well as wasted energy in recording and preserving the analytics around that event. Then, downstream of that, there’s the wasted energy (human and otherwise) from the analytics misdirection that drives decision making. You can see how this might snowball...

There’s more downsides. This time [from Wikiepdia](https://en.wikipedia.org/wiki/Link_prefetching):

> - Users and website operators who pay for the amount of bandwidth they use find themselves paying for traffic for pages the user might not actually visit, and advertisers might pay for viewed ads on sites that are never visited.
> - Web statistics such as browser usage, search engine referers, and page hits may become less reliable due to registering page hits that were never seen by the user.
> - Users may be exposed to more security risks by downloading more pages, or from un-requested sites (additionally compounded as drive-by downloads become more advanced and diverse).
> - Users may violate acceptable-use policies of their network or organisation if prefetching accesses unauthorised content.
> 
> In the case of mobile devices or for users with a limited bandwidth allowance, prefetching may result in an unnecessary costly drain on limited bandwidth.
> 
> It is possible for implementations to prefetch links even when they are not specified as prefetch links.

Now imagine these downsides at scale.

I think it’s interesting how currently popular tactics like tree shaking are all about not shipping something to the client until it’s needed—and yet prefetching does the opposite.

I like the constraining function of having a binary choice on how to instruct the browser to fetch resources: either you include the resource or you don’t. This forces you to decide: is this assets absolutely necessary or is it not?

Speculating prefetching too easily becomes an escape hatch from this forced decision making, with the rationale of “it’ll make things faster for the end user” without any consideration of the costs or drawbacks.

Given the drawbacks, is it worth it? _Possibly_ get people a few (milli)seconds of performance for something they may never use irregardless of the costs in terms of wasted bandwidth, computation, and energy? There are [arguments for it](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ#what_about_folks_who_pay-per-byte_for_network_bandwidth.3f), but I’m not sure I find them convincing. It seems excessive to me—all seemingly in the name of micro optimizations of speed.

While I’ve tried to articulate my dislike for prefetching, a lot of it is, like [simevidas](https://twitter.com/simevidas/status/1371633821079248897?s=21) says, still just a feeling:

> It’s just a feeling, but I don’t like the idea of trying to guess/predict the user’s next navigation and then pre-fetching those resources.
>
> Is it not enough to optimize resources to make them smaller and use fast edge caching? That alone should give the site great performance.
