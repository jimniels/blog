#deno

# Limitations vs. Capabilities

Andy Jiang over on the Deno blog writes [“If you're not using npm specifiers, you're doing it wrong”](https://deno.com/blog/not-using-npm-specifiers-doing-it-wrong):

> During the early days of Deno, we recommended importing npm packages via HTTP with transpile services such as esm.sh and unpkg.com. However, there are limitations to importing npm packages this way, such as lack of install hooks, duplicate dependency resolution issues, loading data files, etc.

I know, I know, here I go harping on [http imports again](https://blog.jim-nielsen.com/2024/deno-de-emphasizes-http-imports/), but this article reinforces to me that one man’s “limitations” are another man’s “features”.

For me, the limitations (i.e. constraints) of HTTP imports in Deno were a feature. I loved it precisely because it encouraged me to do something different than what node/npm encouraged.

It encouraged me to 1) do less, and 2) be more [web-like](https://blog.jim-nielsen.com/2021/deno-is-webby/). Trying to do more with less is a great way to foster creativity. Plus, doing less means you have less to worry about.

Take, for example, install hooks (since they’re mentioned in the article). Install hooks are a security vector. Use them and you’re trading ease for additional security concerns. Don’t use them and you have zero additional security concerns. (In the vein of being webby: browsers don’t offer install hooks on `<script>` tags.)

I get it, though. It’s hard to advocate for restraint and simplicity in the face of gaining adoption within the web-industrial-complex. Giving people what they want — what they’re used to — is easier than teaching them to change their ways.

Note to self: when you choose to use tools with practices, patterns, and recommendations designed for industrial-level use, you’re gonna get industrial-level side effects, industrial-level problems, and industrial-level complexity as a byproduct.

As much as its grown, the web still has grassroots in being [a programming platform accessible by regular people because making a website was meant to be for everyone](https://blog.jim-nielsen.com/2023/websites-are-for-normies/). I would love a JavaScript runtime aligned with that ethos. Maybe with initiatives like [project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) that runtime will actually be the browser.