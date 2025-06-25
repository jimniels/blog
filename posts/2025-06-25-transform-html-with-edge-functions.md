#netlify #iconGalleries

# Transforming HTML With Netlify Edge Functions

I’ve long wanted the ability to create custom collections of icons from my icon gallery.

Today I can browse collections of icons that share pre-defined metadata (e.g. “Show me all icons tagged as blue”) but I can’t create your own arbitrary collections of icons.

That is, until now!

I created a page at `/lookup` that allows you to specify however many `id` search params you want and it will pull all the matching icons into a single page.

[Here’s an example of macOS icons that follow the squircle shape but break out of it ever-so-slightly](http://www.macosicongallery.com/lookup/?id=hex-fiend-2025-05-29&id=countdown-pro-flip-clock-app-2025-05-29&id=mdb-accdb-viewer-2025-05-29&id=posterino-pro-photo-collage-2025-05-29&id=american-pool-billiard-3d-2025-04-26&id=precircuiter-2025-04-26&id=gapplin-2025-04-04&id=iphone-backup-extractor-2024-12-06&id=couverture-2024-11-21&id=tes-2024-12-06&id=retcon-2024-12-06&id=polycapture-2024-11-21&id=budget-seer-financial-vision-2024-10-08&id=pricetag-app-pricing-manager-2024-05-20&id=pdf-squeezer-4-2024-04-24&id=mass-rename-file-batch-rename-2024-04-23&id=metaburner-2024-04-23&id=taska-for-github-gitlab-issues-2024-04-24&id=ok-json-viewer-formatter-2024-04-23&id=remote-desktop-scanner-2024-04-19&id=system-toolkit-pro-2024-04-19&id=astro-2024-04-09&id=folder-colorizer-pro-2023-11-02&id=illustrated-2023-09-27&id=pockity-2023-08-09&id=dvd-player-2023-05-23&id=directory-utility-2023-05-23&id=rapidweaver-2022-11-09&id=mining-tycoon-dig-empire-2022-10-04&id=letter-opener-winmail-viewer-2022-08-02&id=core-data-lab-2022-07-28&id=my-bowling-3d-2022-07-28&id=neptunes-2022-07-14&id=topdrop-2022-07-14&id=rocketsim-for-xcode-simulator-2022-06-17&id=couverture-2022-05-11&id=cleanmaster-remove-junk-files-2022-02-03&id=macleaner-12-top-disk-cleaner-2022-02-03&id=linea-link-2022-02-03&id=hep-html-editor-pro-2022-01-25&id=coherence-x-2022-01-24&id=downie-2022-01-24&id=screenshot-path-2022-01-10&id=sequence-diagram-2021-10-21&id=soulver-3-2021-09-17&id=chronicle-bill-organizer-2021-09-01&id=mirror-magnet-2021-09-01&id=cyberduck-2021-09-17&id=bbedit-2021-07-23&id=patterned-2021-07-01&id=transloader-2021-06-29&id=photo-booth-2021-05-28&id=script-editor-2021-06-02&id=textedit-2021-06-03&id=preview-2021-05-28&id=moneymoney-2021-05-21&id=quick-note-one-click-notes-2021-05-21&id=whisk-2021-05-19&id=prizmo-4-pro-scanning-ocr-2021-05-12&id=commandpost-2021-05-04&id=image-capture-2021-05-03&id=digital-color-meter-2021-04-30&id=disk-utility-2021-04-30&id=boot-camp-assistant-2021-04-29&id=buildwatch-for-xcode-2021-04-19&id=taskheat-visual-to-do-list-2021-04-19&id=quill-chat-2021-03-18&id=highlights-export-pdf-notes-2021-03-10&id=disksight-2021-03-11&id=pixelmator-pro-2021-03-10&id=claquette-gif-video-tool-2021-02-25&id=advertising-agency-2021-01-22&id=coteditor-2021-01-20) (something we’ll lose with macOS Tahoe).

It requires a little know how to construct the URL, something I’ll address later, but it works for my own personal purposes at the moment.

So how did I build it?

## Implementation

So the sites are built with a static site generator, but this feature requires an ability to dynamically construct a page based on the icons specified in the URL, e.g.

`/lookup?id=foo&id=bar&id=baz`

How do I get that to work? I can’t statically pre-generate every possible combination[^1] so what are my options?

1. Create a “shell” page that uses JavaScript to read the search params, query a JSON API, and render whichever icons are specified in the URL.
2. Send an HTML page with _all icons_ over the wire, then use JavaScript to reach into the DOM and remove all icons whose IDs aren’t specified in the page URL.
3. Render the page on the server with just the icons specified in the request URL.

**No. 1**: this is fine, but I don’t have a JSON API for clients to query and I don’t want to create one. Plus I have to duplicate template logic, etc. I’m already rendering lists of icons in my static site generator, so can’t I just do that? Which leads me to:

**No. 2**: this works, but I do have 2000+ icons so the resulting HTML page (I tried it) is almost 2MB if I render everything (whereas that same request for ~4 icons but filtered by the server would be like 11kb). There’s gotta be a way to make that smaller, which leads me to:

**No. 3**: this is great, but it does require I have a “server” to construct pages at request time.

Enter [Netlify’s Edge Functions](https://docs.netlify.com/edge-functions/overview/) which allow you to easily transform an existing HTML page before it gets to the client.

To get this working in my case, I:

1. Create `/lookup/index.html` that has all 2000+ icons on it (trivial with my current static site generator).
2. Create a `lookup.ts` edge function that intercepts the request to `/lookup/index.html` 
3. Read the search params for the request and get all specified icon IDs, e.g. `/lookup?id=a&id=b&id=c` turns into `['a','b','c']`
4. [Following Netlify’s example of transforming an HTML response](https://edge-functions-examples.netlify.app/example/htmlrewriter), use HTMLRewriter to parse my HTML with all 2000+ icons in it then remove all icons that aren’t in my list of IDs, e.g. `<a id='a'>…</a><a id='z'>…</a>` might get pruned down to `<a id='a'>…</a>`
5. Transform the parsed HTML back into a Response and return it to the client from the function.

It took me a second to get all the Netlify-specific configurations right (put the function in `./netlify/edge-functions` not `./netlify/functions`, duh) but once I strictly followed all of Netlify’s rules it was working! (You gotta use [their CLI tool](https://docs.netlify.com/cli/get-started/) to get things working on localhost and test it yourself.)

## Con-clusions

I don’t particularly love that this ties me to a bespoke feature of Netlify’s platform — even though it works really well!

But that said, if I ever switched hosts this wouldn’t be too difficult to change. If my new host provided control over the server, nothing changes about the URL for this page (`/lookup?id=…`). And if I had to move it all to the client, I could do that too.

In that sense, I’m tying myself to Netlify from a developer point of view but not from an end-user point of view (everything still works at the URL-level) and I’m good with that trade-off.

[^1]: Just out of curiosity, I asked ChatGPT: if you have approximately 2,000 unique items, how many possible combinations of those IDs can be passed in a URL like `/lookup?id=1&id=2`? It said the number is 2^2000 which is “astronomically large” and  “far more than atoms in the universe”. So statically pre-generating them is out of the question.