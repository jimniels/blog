# Icons in Menus Everywhere — Send Help

[I complained about this on the socials](https://mastodon.social/@jimniels/115556046706814962), but I didn’t get it all out of my system. So now I write a blog post.

I’ve never liked the philosophy of “put an icon in every menu item by default”.

Google Sheets, for example, does this. Go to “File” or “Edit” or “View” and you’ll see a menu with a list of options, every single one having an icon (same thing with the right-click context menu).

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-sheets.png" width="725" height="848" alt="Screenshot of menus with icons in Google Sheets" />

It’s extra noise to me. It’s not that I think menu items should _never_ have icons. I think they can be incredibly useful (more on that below). It’s more that I don’t like the idea of “give each menu item an icon” being the default approach. 

This posture lends itself to a practice where designers have an attitude of “I need an icon to fill up this space” instead of an attitude of “Does the addition of a icon here, and the cognitive load of parsing and understanding it, help or hurt how someone would use this menu system?”

The former doesn’t require thinking. It’s just templating — they all have icons, so we need to put _something_ there. The latter requires care and thoughtfulness for each use case and its context.

To defend my point, one of the examples I always pointed to was macOS. For the longest time, Apple’s OS-level menus seemed to avoid this default approach of sticking icons in every menu item.

That is, until macOS Tahoe shipped.

## Menus in macOS Tahoe

Tahoe now has icons in menus everywhere. For example, here’s the Apple menu:

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-mac.png" width="312" height="351" alt="Screenshot of the Apple menu in macOS tahoe where every menu item is prefixed with an icon." />

Let’s look at others. As I’m writing this I have Safari open. Let’s look at the “Safari” menu:

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-safari-about.png" width="333" height="445" alt="Screenshot of the Safari menu in macOS Tahoe where about half of the menu items are prefixed with an icon." />

Hmm. Interesting. Ok so we’ve got an icon for like half the menu items. I wonder why some get icons and others don’t?

For example, the “Settings” menu item (third from the top) has an icon. But the other item in its grouping “Privacy Report” does not. I wonder why? Especially when Safari has an icon for Privacy report, like if you go to customize the toolbar you’ll see it:

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-macos-safari-privacy-report.png" width="723" height="259" alt="Screenshot of the Customize Toolbar UI in Safari and the Privacy Report button has a red highlight around indicating its icon." />

Hmm. Who knows? Let’s keep going.

Let’s look at the "File" menu in Safari:

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-safari-file.png" width="422" height="567" alt="Screenshot of the File menu Safari in macOS Tahoe where only a few menu items are prefixed with an icon. Some are indented, others not." />

Some groupings have icons and get inset, while other groupings don’t have icons and don’t get inset. Interesting…again I wonder what the rationale is here? How do you choose? It’s not clear to me.

Let’s keep going. Let’s go to the "View" menu:

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-safari-view.png" width="373" height="648" alt="Screenshot of the View menu in Safari on macOS Tahoe where some menu items are prefixed with an icon and two also have a checkmark." />

Oh boy, now we’re really in it. Some of these menu items have the notion of a toggle (indicated by the checkmark) so now you’ve got all kinds of alignment things to deal with. The visual symbols are doubling-up when there’s a toggle _and_ an icon.

The “View” menu in Mail is a similar mix of:

- Text
- Text + toggles
- Text + icons
- Text + icons + toggles

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-mail-view.png" width="343" height="770" alt="Screenshot of the View menu in Mail on macOS Tahoe showing how menu items can be indented and have icons, not have icons, and have toggles with checkmarks." />

You know what would be a fun game? Get a bunch of people in a room, show them menus where the textual labels are gone, and see who can get the most right.

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-app-edit.png" width="188" height="541" alt="Screenshot of a menu in macOS Tahoe where every menu item is prefixed with an icon but the labels are blurred out so you don’t know for sure what each menu item is." />

But I digress.

In so many of these cases, I honestly can’t intuit why some menus have icons and others do not. What are so many of these icons affording me at the cost of extra visual and cognitive parsing? I don’t know.

To be fair, there are _some_ menus where these visual symbols are incredibly useful. Take this menu from Finder:

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-finder-window.png" width="614" height="604" alt="Screenshot of a Finder menu in macOS Tahoe where every menu item is prefixed with a useful icon." />

The visual depiction of how those are going to align is actually incredibly useful because it’s way easier for my brain to parse the symbol and understand where the window is going to go than it is to read the text and imagine in my head what “Top Left” or “Bottom & Top” or “Quarters” will mean. But a visual symbol? I instantly get it!

Those are good icons in menus. I like those.

## Apple Abandons Its Own Guidance

What I find really interesting about this change on Apple’s part is how it seemingly goes against their own previous human interface guidelines (as [pointed out to me by Peter Gassner](https://mastodon.gassner.io/@peter/115559008588925643)).

They have an entire section in their 2005 guidelines ([and 1992](https://mastodon.decentralised.social/@wezm/115686422177826944) [and 2020](https://web.archive.org/web/20201027235952/https://developer.apple.com/design/human-interface-guidelines/macos/menus/menu-anatomy/)) titled “Using Symbols in Menus”:

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-hig.png" width="679" height="359" alt="Screenshot from Apple’s Human Interface Guidelines" />

See what it says?

> There are a few standard symbols you can use to indicate additional information in menus…Don’t use other, arbitrary symbols in menus, because they add visual clutter and may confuse people.

Confused people. That’s me.

They even have an example of what _not_ to do and guess what it looks like? A menu in macOS Tahoe.

<img src="https://cdn.jim-nielsen.com/blog/2025/context-menu-hig-donts.png" width="343" height="224" alt="Screenshot from the HIG denoting how you shouldn’t use arbitrary symbols in menus." data-og-image />

## Conclusion

It’s pretty obvious how I feel. I’m tired of all this visual noise in my menus.

And now that Apple has seemingly thrown in with the “stick an icon in every menu by default” crowd, it’s harder than ever for me to convince people otherwise. To persuade, “Hey, unless you can articulate a really good reason to add this, maybe our default posture should be no icons in menus?”

So I guess this is the world I live in now. Icons in menus. Icons in menus everywhere.

Send help.