#domainHandle

# A Well Known URL For Your Personal Avatar

[Well-known URLs](https://en.wikipedia.org/wiki/Well-known_URI) are pretty neat. I’ve even dared [propose one](https://blog.jim-nielsen.com/2022/well-known-links-resource/) before here on my blog.

And now I’m here to propose another: 

`.well-known/avatar`

The idea is: anybody that owns a domain can put their avatar in a well-known location.

I’ve already implemented this for my own site[^1]. You can see it here:

[jim-nielsen.com/.well-known/avatar](https://jim-nielsen.com/.well-known/avatar)

In some ways, this is really just for me. I often find myself needing an avatar of me for one reason or another. At first, I put a file in my Dropbox folder so that I could access it on any device whenever and wherever I needed it. But then I thought, “What’s even easier than accessing a file through a service like Dropbox? Accessing a URL.”

And, remembering that `.well-known` URLs are a thing, I figured why not put it at a URL I can remember and easily share with others?

Think [Gravatar](https://en.gravatar.com/) but on a web where [your domain is your social handle](https://blog.jim-nielsen.com/2023/best-time-to-own-a-domain/)[^2].

I don’t know how you’d actually go about making `.well-known` a standard — it [looks complicated](https://github.com/protocol-registries/well-known-uris). And there’s probably a lot more considerations you’d want to spec out, like:

- What’s the recommended size for the avatar?
- What format should it be in? Can you request that?
- What aspect ratio should it have?
- How do you specify (optional) alternatives?
- Should you be able to provide avatars for more than one person under a given domain?

Those are all great questions. I don’t know the answers — but KISS is probably your friend here.

That said, if you’ve ever found yourself needing quick access to your commonly-used avatar (and you own your domain) do yourself a favor and put it at a URL you and others will remember: `.well-known/avatar`.

[^1]: I’m using Netlify which is a static file host but the URL is extension-less, so I use Netlify’s redirects functionality to [point the extension-less URL at the file on disk](https://github.com/jimniels/www/blob/bdb74d9ff348e67a5868f257673b319fd2cd59fb/static/_redirects#L14).
[^2]: Just think of the possibilities this could open. [Bluesky is letting you set your domain as your social handle](https://blog.jim-nielsen.com/2023/domain-handle-blueksy/), imagine if other services followed. And updating your profile photo across them all was as easy as putting a new file at `.well-known/avatar`. There’s a whole world of possibilities!