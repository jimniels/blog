---
title: Modularize Your PSDs by Embedding Them Inside Each Other
date: 2013-01-31
tags: tips
redirect_from: /posts/modularize-your-psds/
---

If you've ever used InDesign you've no doubt used the "Links" panel. It allows you to link and embedd files in your document layout. InDesign keeps track of all the files you've embedded and where they live on your hard drive. This gives you the power to relink files, updated modified files, edit the original files, and so forth. For example, say you embedd a logo in InDesign but then you want to modify it. You can go to the Links panel and click "edit original". Illustrator (or whatever logo editing software you've used) will open the file. You make your changes, save it, and go back to InDesign and the logo's changes will automatically update in your layout.

![Links Panel in InDesign]({{ site.imageurl }}/2013/links-panel-indesign.png)

I found myself wanting this feature in Photoshop. It would be extremely useful for building websites because you could modularize your PSDs. For example, I could create one PSD called `header.psd` and another called `footer.psd`. When I want to create a PSD for a new page mockup, I can easily "embedd" the header and footer PSDs into my new document. This allows me to easily spin-off new page mockups based on single PSD files.

So, for example, if I want to change a design element in the header of my website, I only have to change it in one file and it would be replicated in all the PSDs where I've embedded `header.psd`. This is essentially the same thing as creating a file called `header.php` that has all my main navigation and is called into every page template.

Although InDesign supports this feature, Photoshop does not. However, a Google search led me to these two extensions which have become quite useful.

1. [Smart Object Links Panel](http://www.ps-scripts.com/bb/viewtopic.php?f=27&t=3045&sid=90f57aa35b85d5d38fe52ea551ac4a4c)
2. [CanLinkIt](http://www.canlinkit.com/)

I'm not sure what the development status of these are anymore, but they worked for me. Try them out! I think they will save you a lot of time.

Now with PSDs you can edit once and change everywhere!