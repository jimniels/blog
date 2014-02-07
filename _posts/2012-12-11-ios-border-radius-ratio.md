---
layout: post
title: "Calculate the Border Radius for iOS-Style Icons Using a Simple Ratio"
date: 2012-12-11
tags: tips
---

So you've got to create an icon for the iOS ecosystem, where do you start? You probably realized quickly you'll have to supply a couple different sizes for the various contexts in which the icon will be used. Apple details these requirements in their [iOS Human Interface Guidelines][iconSizes]:

- **1024x1024** Recommended for iTunes Artwork
- **512x512** Required for iTunes Artwork
- **144x144** Retina iPad
- **114x114** Retina iPhone/iPod Touch
- **72x72** iPad
- **57x57** iPhone/iPod Touch

You don't actually have to create rounded corners for your icon artwork. Apple will do that for you automatically in all contexts, from iOS to the App Store. However, for other other uses outside of iOS (such as a marketing site) you're going to have to create an icon with rounded edges yourself.

## Creating the Icon

So how do you actually get started creating an icon? Well, the amazing icon designer [Michael Flarup][Flarup] has created a great [iOS icon starter template][template] with proper iOS-style proportions and radii. 

But what if you have to create an icon size that doesn't quite fall into Apple's predetermined sizes, say 175x175 pixels? How do you determine what size the border radius will be at any given size?

Well, thanks to [David Barnard][Barnard]'s [post over at stackoverflow][stackoverflow], we have insight into how the border radius for iOS icons is determined by Apple. According to Barnard, Apple calculates the border radius for icons starting at the 57px icon size (one can only assume that is because the size of icons on the original iPhone was 57px):

> Apple starts with the 57px icon and a radius of 10 then scales up or down from there. Thus you can calculate the radius for any icon size using 10/57 x new size
         
Therefore, to achieve the correct iOS-style border radius on any square icon you simply multiply the icon's size by what I'll call the **iOS icon ratio**. This ratio is calculated from Barnard's insight: 57 / 10 = .175438596

For simplicity, we can probably round this to about four or five decimal places: **.17544**. This ratio will help you calculate the border-radius for any size iOS style icon you're creating.

## CSS Application

Using this logic, you could easily style any image to have an iOS icon feel by applying a CSS border radius with a value of the iOS icon ratio.

Because the `border-radius` rule will accept a percentage value, we simply tranlate our ratio of .17544 to a percentage: **17.544%**. So our CSS would look something like this:

	img {
		border-radius: 17.544%;
	}

![Border radius ratio example]({{ site.imageurl }}/2012/border-radius-ratio.png)

Unfortunately, this technique only works in modern-browsers that accept the border-radius rule (no IE support). Also, it's worth note that some earlier versions of modern browsers didn't quite apply the border radius correctly when applied directly to an image (as they wouldn't mask out the edges). So proper browser testing is encouraged if you decide to implement this technique.

## Update - July 31, 2013

Icon sizes and border radii in iOS7 have been changed by Apple. As outlined in their [documentation][newIconSizes], icon sizes are now as follows:

- **1024x1024** Required for App Store
- **152x152** Retina iPad
- **120x120** Retina iPhone/iPod Touch
- **76x76** iPad 2 & iPad Mini

You can reference a comparison table of iOS7 icon sizes and iOS 6 icons sizes in Apple’s [developer library][developerLibrary].

As for the border radius, the discussion surrounding the exact mathematical formula for how the border radius is drawn is [still uncertain](http://www.mani.de/backstage/?p=483). Until we know for sure, Michael Flarup’s [overview of iOS7 icons](http://www.pixelresort.com/blog/start-making-ios-7-icons-with-the-app-icon-template-3-0/) is probably your best resource.

[Flarup]: http://www.pixelresort.com/
[template]: http://appicontemplate.com/
[iconSizes]: http://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html
[corners]: http://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html
[Barnard]: https://twitter.com/drbarnard
[stackoverflow]: http://stackoverflow.com/questions/2105289/iphone-app-icons-exact-radius/10239376#10239376
[newIconSizes]: https://developer.apple.com/library/prerelease/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27-SW1
[developerLibrary]: https://developer.apple.com/library/prerelease/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/App-RelatedResources/App-RelatedResources.html#//apple_ref/doc/uid/TP40007072-CH6-SW1