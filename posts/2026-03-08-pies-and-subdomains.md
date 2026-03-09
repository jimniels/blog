# Two of My Favorite Things Together at Last: Pies and Subdomains

I like pie.

And [I’ve learned](https://blog.jim-nielsen.com/2022/flying-j-pies/) that if I want a pie done right, I gotta do it myself.

Somewhere along my pilgrimage to pie perfection, I began taking a photo of each bake — pic or it didn’t happen.

Despite all my rhetoric for “owning your own content”, I’ve hypocritically used Instagram to do the deed.

Which has inexorably lead me to this moment: I want an archive of all the pie pics I’ve snapped.

So I took the time to build and publish my best subdomain yet:

[pies.jim-nielsen.com](https://pies.jim-nielsen.com)

## How It Works

Programmatically, pulling pictures from Instagram used to be easy because they had APIs (access tokens expiring like every 60 days was annoying though). However, those APIs have been [deprecated](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/). Now if I want to pull data out of Instagram, I have to use [their GUI export tools](https://help.instagram.com/181231772500920).

<img src="https://cdn.jim-nielsen.com/blog/2026/pies-instagram-export.png" width="642" height="864" alt="Screenshot of the export data tool in Instagram" />

Once the archive is ready, they send me a link. I download the archive and open the .zip file which results in a collection of disparate JSON files representing data like comments, likes, messages, pictures, etc.

<img src="https://cdn.jim-nielsen.com/blog/2026/pies-instagram-zip.png" width="1097" height="489" alt="Screenshot of Finder with various nested files and folders of JSON files." />

I don’t care about most of those files. I just want pictures and captions. So I crafted [an Origami script](https://github.com/jimniels/pies/blob/afa96292ff1c1e620771280196a58ee520e51967/archive.ori) that pulls all that data out of the archive and puts it into a single directory: pictures, named by date, with a `feed.json` file to enumerate all the photos and their captions. 

<img src="https://cdn.jim-nielsen.com/blog/2026/pies-instagram-cdn.png" width="704" height="416" alt="Screenshot of a folder in Finder with a bunch of images named by ISO8601 date and a feed.json file at the bottom." />

At this point, I have an “archive” of all my data. This is what I stick on [my CDN](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-i-what/). (I'm hoping Instagram keeps the structure of this .zip consistent over time, that way I can update my archive every few months by just logging in, asking for a new export, and running my script.)

From here, I have a separate collection of files that uses this archive as the basis for making a webpage. I use [Web Origami](https://weborigami.org) as my static site generator, which pulls the `feed.json` file from my CDN and turns all the data in that file into an HTML web page (and all the `<img>` tags reference the archive I put on my CDN).

<img src="https://cdn.jim-nielsen.com/blog/2026/pies-instagram-website.jpg" width="1073" height="671" alt="Screenshot of pies.jim-nielsen.com" data-og-image />

That’s it! [The code’s on GitHub](https://github.com/jimniels/pies) if you want to take a peak, or check out the final product at [pies.jim-nielsen.com](https://pies.jim-nielsen.com)