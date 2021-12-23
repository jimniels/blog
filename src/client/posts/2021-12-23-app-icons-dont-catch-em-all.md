# App Icons: Don’t Gotta Catch ‘Em All

More and more, app developers are providing the ability for users to customize their app icons on iOS.

Plantry is one example where, with a premium subscription, you can choose between [70 different app icons](https://twitter.com/getplantry/status/1473355290120794112?s=21)!

<img src="https://cdn.jim-nielsen.com/blog/2021/app-icon-variations-plantry.png" width="627" height="644" alt="Screenshot of all the custom app icon variations in Plantry." /> 

As a collector of app icons, I would love to get my hands on all those variations and include them in [my gallery](https://www.iosicongallery.com).

But how?

Any app’s primary icon is available publicly via the App Store API. I don’t have to download or buy the app to gain access to the artwork. With some API sleuthing, I can get the 1024×1024 pixel artwork and add it to my gallery.

But custom app icons are different. They are not available via the App Store API. And in many cases (like Plantry or Twitter Blue) a paid subscription is required to access them in the app itself.

I [reached out on Twitter](https://twitter.com/jimniels/status/1459261135807463442?s=20) to Christian Selig, maker of the [Apollo Reddit client](https://apolloapp.io), to see if he could shed light on the subject for me (Christian commissions folks to create variations of the Apollo icon and makes many of them available for free in his app).

<img src="https://cdn.jim-nielsen.com/blog/2021/app-icon-variations-apollo.png" width="944" height="659" alt="Screenshot of custom icons in the Apollo app." /> 

He noted that, if you could get your hands on the app’s IPA file, you could pull the artwork from the folder of assets.

I started down [that path](https://apple.stackexchange.com/questions/298391/how-do-i-download-an-ios-app-ipa-file-to-my-mac-after-itunes-12-7-update): downloading the app, connecting it to my Mac, using Configurator to transfer the IPA from my iPhone to my Mac, extracting its contents, [exploring the .car file](https://github.com/insidegui/AssetCatalogTinkerer), etc.

I discovered the app’s icon variants in the unpacked IPA. But, and this is a big but, they didn’t come in high resolution—128 pixels at most. This makes sense given that A) the App Store requires a 1024 pixel icon and these aren’t in the App Store, B) custom icons only show in small contexts like springboard and search results, and C) developers want to keep app bundles small.

But to get an app icon into my gallery, I want at least 1024 pixels of icon.

So that got my brain scheming on other possible ways to get access to these icons, including hope around some rumored new APIs that might allow A/B testing of app icons in the App Store.

But then the Jim thought of something he hadn’t before: 

What if it’s good to only get one icon from the app store? 

What if a good collection means not having more?

Ok, but seriously.

What if not being able to get my hands on 70 different app icon variations is good thing? Momma always said not getting everything I want was a good thing…

I’m so caught up in trying to see if it’s possible to get app icon variants to hoard in my collection, that I never stopped to consider the ramifications over time.

Maybe the constraint that only one app icon is available via the App Store at a time, and therefore only one makes it into my gallery at a time, is a good constraint. If I start having twenty variations per icon, sure that’d be interesting, but it’d be interesting like a firework is interesting: for a moment. As time goes on, all those variants would accrete and my gallery and turn my collection of icons into something like my iPhoto library: full of so many damn images that the sheer quantity overwhelms any usefulness and relevancy. It’d be fireworks 24/7. Drowning in content, unable to meaningfully notice or differentiate between any of it.

Maybe considered curation and scarcity can be a good thing. It plays in my favor. The more I think about it, the more I think it’s a limiting constraint I didn’t even know I wanted—until now.

Or at least that’s what I’m thinking as I type this.

Tech can be so much fun, but in the moment you get so caught up in the question of whether you can do something that you forget to ask whether you should do something given its implications over time.