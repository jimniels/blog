# Notes to Self on Mastodon

Disclaimer: I still don’t fully understand the mechanics of Mastodon. But this is my attempt to articulate what I do understand in a way that helps me better understand the differences — and similarities — between Twitter and Mastodon, especially when it comes to owning more of your content and experience.

Ok, with that disclaimer out of the way, these are my notes to self.

One of the oft-repeated benefits of Mastodon is that it’s decentralized. If some billionaire takes over your instance, you can just move to another one whereas with Twitter, you’re stuck.

That’s cool. And different than Twitter. But is it really _that_ different?

It seems like the biggest question in that scenario is: how long will the Mastodon instance, which suffered a hostile takeover, remain alive?

Because if you can’t get your content out. Or if its URLs don’t stay alive for very long, you’re pretty much in the same boat as you are with Twitter — at least as I understand it.

## Changing Instances

Mastodon, unlike Twitter, lets you take your followers with you. But it doesn’t let you take your content with you. And even if you could, you can’t import into a new account. From [the Mastodon docs](https://docs.joinmastodon.org/user/moving/):

> Requesting an archive of your posts and media can be done once every 7 days, and can be downloaded in ActivityPub JSON format. Mastodon currently does not support importing posts or media due to technical limitations, but your archive can be viewed by any software that understands how to parse ActivityPub documents.

Ultimately, the ownership of everything you produce under your handle on Mastodon is under the control of the entity whose name is right there in your handle:

jimniels@**mastodon.social**

In my case, everything I publish has a URL and that URL is under the `mastodon.social` domain. If that server ever goes down, its URLs go down too. And if the URLs go down, any content I’ve ever published at those URLs goes down.

And, from what I read in the docs, it’s not as clear cut as “take your follows and followers with you”. Sure, you can export _your follows_ to a file and set it up somewhere else. But if the server you’re on goes down in a hostile takeover before you export, your follows are gone because you can’t export them. 

In a similar vein, if you decide to move to another instance, your previous profile is at the mercy of those who own the domain of your handle. It sounds like there are ways for your followers to _see_ that you’ve moved, but there’s no way for them to automatically re-follow you:

> Redirecting your account disables posting from that account and displays a “profile moved” notice indicating your new account. Anyone viewing your profile can see this notice and will know to follow you at your new account. Following redirected accounts is not possible. 

It does sound like there’s a “move” activity, but it’s dependent on your followers having software which supports it:

> Moving your account is the same as redirecting your account, but it will also irreversibly force everyone to unfollow your current account and follow your new account, if their software supports the Move activity. Your posts will not be moved, due to technical limitations

Of course, this assumes that the instance from which you’ve moved stays online. If it goes down, your followers won’t know what happened to you. Maybe you moved. Maybe not. Who knows. There will be no pointer for _your followers_ which tells them where your new account lives. 

And as for all the _content_ you published at your old instance, it all stays there. You can’t take that with you.

So my takeaways are:

- **Follows**: export them and take them with you.
- **Followers**: people can tell you’ve moved, but automatically following your new account is questionable.
- **Content**: stays where it is. No way to bring your old content with you (or have it redirect to your new instance).

Of course, this is all assuming your instance stays online. If it doesn’t, you can’t take your follows, your followers, or your content.

## Sailing the Seas of Mastodon

Given the complicated nature of how all this works, I kind of like [this analogy](https://daringfireball.net/linked/2023/02/04/fleishman-mastodon) of Mastodon as a fleet of ships vs. the giant cruise ship that is Twitter:

> You can think of Mastodon as a flotilla of boats of vastly different sizes, whereas Twitter is like being on a cruise ship the size of a continent. Some Mastodon boats might be cruise liners with as many as 50,000 passengers; others are just dinghies with a single occupant! The admin of each instance — the captain of your particular boat — might make arbitrary decisions you disagree with as heartily as with any commercial operator’s tacks and turns. But you’re not stuck on your boat, with drowning as the only alternative. Instead, you can hop from one boat to another without losing your place in the flotilla community.

The catch here, however, is that whatever Mastodon boat your float on, you are still at the whims of your captain (very much like Twitter). If you want to jump between ships, that’s possible but assumes that your ship is still floating. If your ship goes down, you go down with it. And all the people following you will think you went down with the ship too — until, perhaps, they find you amongst the survivors who escaped in rowboats to other Mastodon boats.

On Mastodon, just like on Twitter, you’re at the whims of the people running your server and all your content is stuck there. If the instance you’re on now ever goes down, hopefully you exported your follows and took them with you, but anyone who ever pointed links at that content you created on that instance now has a busted link.

While the network [is designed to be resilient to collapse](https://www.wired.com/story/god-did-us-a-favor-by-destroying-twitter/):

> The true beauty of Mastodon and similar services is that they are designed to collapse. If you want to quit a server, you can take all your followers and follows with you. If a server shuts off, you can find another. It’s not one guy. It accepts that as we centralize and debate we melt down, and so it comes with a giant sticker that reads: Babel built in!

That resiliency is built around the way the nodes in the network find and connect and stay in touch with each other, not the way the content on the network can live and persist beyond collapse.

I’m not saying this is a reason to use Twitter over Mastodon. For me, these are facts to be aware of. Actually, I like how [Manuel Eberl put it](https://graz.social/@pruvisto/109873880562078652):

> That is the nature of proprietary platforms. Most of us will rely on infrastructure and platforms built and maintained by other people, often with their own agenda. This is unavoidable.
> 
> But with proprietary platforms, you truly give away just about all sovereignty and truly submit yourself to the whims of the people running it.
> 
> I don't want to shame people for doing this – I use many proprietary platforms myself. But we have to remind ourselves of the cost every now and again.