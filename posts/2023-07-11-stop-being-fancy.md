# Stop Being Fancy

This is a note to self:

Except where absolutely necessary, stop being fancy.

When confronted with, “Can this be done?”

If the answer is an immediate "Yes", go ahead, do that.

But if the answer is, “Well, you _could_, but you’d have to…" 

Just stop right there. Don’t go do that.

Where possible, don’t create solutions to work around problems when you can eliminate the need for a solution altogether.

Quick example:

For a static file host, I can have URLs like:

`/things?category=200`

And then use the `_redirects` file to point query parameters at static files I put on disk, e.g.

`/things category=:value /things/category/:value/index.html` .

My advice to self here is: unless you really, really, _really_ need to do that, just don’t.

Instead, accept and embrace the fact that you’re working with static files and make your URLs work without any special redirects trickery.

Let the grain of your project show through and eliminate the need for any special solution on your part.

`/things?category=200` with some redirect rules? No. 👎

`/things/category/200` Yes! 👍 (the static file server takes over and serves `/icons/category/games/index.html`)

In this way, you’re being true to the grain of your project and eliminated an extra layer where things can break.

Because if things can break, they will — ’tis only a matter of time. Especially if you, Jim, coded it.