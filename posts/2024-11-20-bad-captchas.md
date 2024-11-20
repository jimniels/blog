#grateful

# Captchas Turned Notification Exploits

When [my site analytics reported a large number of inbound traffic from Hacker News clones](https://blog.jim-nielsen.com/2024/hacker-news-clones/), I got curious and started clicking links.[^1]

[I like to visit links](https://blog.jim-nielsen.com/2024/treating-the-symptoms/). I am connoisseur of it. I love the feeling of landing on something you didn’t expect — which is precisely what happened.

I landed on a site that had one of those Cloudflare-esque  “prove you're human” captchas. That didn’t seem particularly abnormal. Lots of website owners these days  use them for protection against malicious activities like DDoS attacks.

Anyhow, the page had a little graphic that said: “Press ‘Allow' to prove you are not a robot.” 

<img src="https://cdn.jim-nielsen.com/blog/2024/captcha-allow.png" width="528" height="356" alt="Illustration of a fanciful, friendly robot head with the text “Press ‘Allow' to prove you are not a robot.” underneath." />

I sat there for a moment looking for a button, but couldn’t find one. “Where’s the “Allow” button?” I thought.

A few seconds later, Safari’s native permission dialog popped up asking for permission to send me notifications!

<img src="https://cdn.jim-nielsen.com/blog/2024/captcha-notification.png" width="407" height="374" alt="" />

I immediately thought, “Ah, hell no!” and ran away from that website. That’s sneaky, leveraging tools site owners use to protect themselves — and therefore _normalize_ for their users — as a weapon.

I hate this crap.

But one of the beautiful things about browser security is that a lot of people work really hard to make visiting any website in the world safe. Granted there are caveats to this statement, but it’s cool you can mostly sleep at night doing a GET to any domain. (Whereas, for example, it is very much not safe to install any package in the world from npm.) That’s great news for link hoppers like me.

THANK YOU browser makers!

[^1]: I initially [posted this train of thoughts on Mastodon](https://mastodon.social/@jimniels/113303276314304941), but still haven’t been able to stop thinking about it so I wanted to post it on my blog for more permanence.