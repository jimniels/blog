# Getting an Unread Badge Count For the Docked Gmail Web App in macOS

If you didn’t know already, you can now [turn webpages into “apps” on your Mac](https://support.apple.com/en-us/104996).

I’ve done this for a few apps already and it works great. I get system-level notifications, unread badge counts, and more!

Except for Gmail.

With Gmail I get notifications but I don’t get application badges for indicating when I have unread emails — which, for an email application, is kind of vital.

When I look at my dock[^1]:

<img src="https://cdn.jim-nielsen.com/blog/2023/macos-webapp-tab-switcher-dock-no-badge.png" width="350" height="150" alt="Screenshot of macOS dock with Gmail app and no app badge." />

Or when I’m tabbing between windows:

<img src="https://cdn.jim-nielsen.com/blog/2023/macos-webapp-tab-switcher-no-badge.jpg" width="400" height="400" alt="Screenshot of macOS tab switcher with the Gmail app and no app badge." />

I can’t tell if there’s something I need to see in my inbox!

My first thought was, “This is _Gmail_. If the other web apps I’ve installed support app badges, surely Gmail must too. It’s probably a problem on my end.”

So I searched the internet for a solution, but I found nothing[^2].

So [I asked about it on Mastodon](https://mastodon.social/@jimniels/111599588022461185) and [Thomas Steiner responded](https://toot.cafe/@tomayac/111603087162013604) by informing me it wasn’t my problem but Gmail’s because they didn’t support the badge API. And apparently there’s a workaround to this for Chrome Shortcuts via [a Chrome extension](https://chrome.google.com/webstore/detail/gmail-app-badge-notificat/fbaolhbfbmniffcokakochjjeccpcpkh).

Curious, I started looking at [the code behind the extension](https://github.com/aberonni/gmail-app-badge-notification) and realized the workaround was really straightforward.

If you look at [the script that runs](https://github.com/aberonni/gmail-app-badge-notification/blob/master/src/content.js), it’s basically just polling a Gmail endpoint every few seconds which returns XML that contains the unread count of your inbox. Then it uses [`navigator.setAppBadge`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/setAppBadge) to trigger the system-level notification badge.

This made me realize the Chrome extension’s “workaround” wasn’t a Chrome-specific trick but a Gmail-specific trick — which meant that same code _should_ work in Safari too.

So I tried it. I opened my desktop web app, opened the Safari devtools[^3], and copy/pasted the script into the console — and it worked!

Hooray for [what Dave called](https://daverupert.com/2022/09/patchability-of-the-open-web/) [the patchability of the open web](https://blog.jim-nielsen.com/2022/patching-open-web/).

It’s kind of fascinating that all it’s doing is running `navigator.setAppBadge`. For whatever reason, there’s something  extremely satisfying about toggling a web API and seeing a (traditionally) system-level feature come to life.

<img src="https://cdn.jim-nielsen.com/blog/2023/macos-webapp-tab-switcher-change-badge.gif" width="552" height="226" alt="Screenshot of macOS dock with the Gmail web app and an app badge indicating the unread count in the inbox." />

Now when I’m looking at my dock:

<img src="https://cdn.jim-nielsen.com/blog/2023/macos-webapp-tab-switcher-dock-badge.png" width="349" height="138" alt="Screenshot of macOS tab switcher with the Gmail web app and an app badge indicating the unread count in the inbox." />

Or tabbing between windows:

<img src="https://cdn.jim-nielsen.com/blog/2023/macos-webapp-tab-switcher-badge.jpg" width="400" height="400" alt="Animated gif of the Safari devtools console using `navigator.setAppBadge` to turn on/off notification counts for a web app in the dock." />

I can see if there’s something to look at in my inbox.

Granted, this breaks when the web app reloads, so you’d have to manually re-run this script again yourself (especially since [Safari isn’t allowing web extensions in web apps](https://toot.cafe/@tomayac/111605779007030470)).

If only browsers allowed users to run their own custom scripts on a per-domain basis (R.I.P. Greasemonkey).

Hopefully Gmail adds support for this feature soon.

[^1]: If you’re looking for a nice collection of icons for your web apps on macOS, try [macosicons.com](https://macosicons.com). You’ll have to select “iOS” icons because you need the full-bleed artwork, but there’s some decent alternatives in there to make your dock prettier.
[^2]: [Mark Otto has a great write-up](https://markdotto.com/2023/10/01/macos-web-apps/) on some of the technical details a web developer like me would want to know about web apps in macOS.
[^3]: To open the devtools for a web app you can’t just hit `CMD` + `Option` + `I`. Instead, you have top open, go to the “Develop” menu, find your computer, and then choose the web app from the list in the flyout menu.