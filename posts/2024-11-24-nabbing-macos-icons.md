#iconGalleries

# Nabbing macOS Icon Artwork

I keep a personal collection of [beautiful macOS app icons](https://macosicongallery.com), which might make you ask: “How does he get those icons?”

## Apps in the App Store

For apps in the Mac App Store, I have my ways. I don’t necessarily want to write about them because I’m semi-afraid Apple would frown on my doings and close off my ways.

Don’t get me wrong, I’m not being nefarious. If you spent 30 minutes browsing through the publicly-accessible contents of a link from the App Store, you could probably figure out what I’m doing.

I’ll just leave it at that.

## DMG Apps 

For apps that aren’t in the Mac App Store, I’ll show you a few of the ways I grab icon artwork.

First off, you need the app itself. If that means you have to pay for it to download the DMG file, well sorry, I have no magic trick there. You just have to pay for it — or email the developer and ask for it.

But once you get your hands on the DMG, you can open that and do some sleuthing.

Opening a DMG will often get you a standard macOS app install screen, like this:

<img src="https://cdn.jim-nielsen.com/blog/2024/macos-get-icons-tabletool-install.png" width="772" height="534" alt="Screenshot of an application installion screen on macOS for TableTool, which shows the application icon on the left and an icon for the macOS Applications folder on the right and an arrow between them, denoting you should drag and drop the app." />

From there you can right click and “Get Info”:

<img src="https://cdn.jim-nielsen.com/blog/2024/macos-get-icons-tabletool-right-click.png" width="566" height="318" alt="" />

Then click-to-focus the application icon in the upper-right of the “Get Info” panel and CMD+C:

<img src="https://cdn.jim-nielsen.com/blog/2024/macos-get-icons-tabletool-get-info.png" width="181" height="49" alt="" />

Beautifully, this will copy the application’s `.icns` file to your clipboard. From there, you can open Preview and go “File -> New From Clipboard” and it will open the `.icns` file in Preview with all the different icon sizes!

<img src="https://cdn.jim-nielsen.com/blog/2024/macos-get-icons-tabletool-preview.png" width="966" height="865" alt="" />

For me, I want the biggest one (1024×1024 pixels), so I find that and then go “File -> Export” to save it as a transparent PNG to disk.

And violá, the app icon in a format I want!

<img src="https://cdn.jim-nielsen.com/blog/2024/macos-get-icons-tabletool-finder.png" width="655" height="765" alt="" />

However! Sometimes this won’t get you exactly what you want.

For example, I downloaded the wonderful [TablePlus app](https://tableplus.com), opened the DMG, did “Get Info”, and found an app icon that was _different_ from the install app (and the one that shows in your dock).

<img src="https://cdn.jim-nielsen.com/blog/2024/macos-get-icons-tableplus-install.png" width="602" height="362" alt="" />

Sometimes this can happen. Sometimes you won’t be able to find the icon you want using this method.

When I hit this roadblock, I turn to finding the `Assets.car` file and plugging it into a tool like [Asset Catalog Tinkerer](https://github.com/insidegui/AssetCatalogTinkerer) by Guilherme Rambo.

With this method, you can right click the app and instead of “Get Info” do “Show Package Contents” and find `.car` files (I’m not a Mac developer, but it seems like the convention is to stick it at “Contents -> Resources -> Assets.car”). Then you can drag them into Asset Catalog Tinkerer and hopefully find what you’re looking for. In my case, with TablePlus, I was able to find the 1024 pixel icon I was looking for.

<img src="https://cdn.jim-nielsen.com/blog/2024/macos-get-icons-tableplus-car-file.png" width="925" height="742" alt="" />

## The End

If you ever find yourself needing to nab the icon for a macOS app, hopefully this little guide is helpful.

And if you’re just reading this because you love poking around at the internals of things, good on you. I love that stuff too!