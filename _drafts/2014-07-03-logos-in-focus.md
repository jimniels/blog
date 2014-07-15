Title: Famous Logos in Focus
Date: 07-03-2014
Tags: 

I was reading Paul Rand’s *A Designers Art* and stumbled across this quote:

> How far out of focus can an image be and still be recognized? A [logo] which is subject to an infinite number of uses, abuses, and variations whether for competitive purposes or for reasons of “self-expression,” cannot survive unless it is designed with utmost simplicity and restraint—keeping in mind that seldom is a trademark favored with more than a glance. Simplicity implies not only an aesthetic ideal, but a meaningful idea, either of content or form, that can be easily recalled (Paul Rand, *A Designers Art* 31).

I found this a rather intriguing concept. Prior to our current world of 100% pure digital reproducibility, one test of a logo was to see how well it could endure visual entropy in real world use. For example, how well could a logo on letterhead maintain its visual integrity and recognizability after being faxed multiple times? Each time a letter was faxed it slightly lost its visual integrity to the point of becoming unrecognizable or unreadable. Thus, a well-designed logo would maintain it’s readability and recognizability through the stages of visual entropy that result from real-world use.

In contrast, today’s digital technology ensures 100% exact reproducibility. Because digital files are a 1:1 mirrored copy of their original, they do not lose any visual integrity and are dependent solely on the integrity of the original file. Due to this, many designers today might not fret over a logo’s resistance to visual entropy. Sure, things like higher pixel density in 72ppi or 144ppi screens may cause slight blur issues when displaying a logo, but those issues have more to do with sharpening an image than avoiding the its complete demise into  unrecognizability. 

I decided to try a simple experiment: take some of today’s most iconic, ubiquitous logos and see how well they hold to being distorted.

## Experiment Details

I decided I would test each logo’s visual stamina by bringing each one out of focus incrementally with a gaussian blur. At what point would each logo become unrecognizable? Would some of them lose their integrity after a small 5 pixel blur? What about a 10 pixel blur? Which iconic brand logos could go the furthest out of focus while still retaining their visual integrity and recognizability?

Additionally, I wanted to remove color from each logo because it can be a vital ingredient in brand recognition. For example, perhaps all you see is a blur, but if that blur is the color magenta you might more easily guess “T-Mobile” as opposed to some other brand. Boiling all the logos down to their essence — their shapes and forms in single color — helps establish and verify how well the mark can stand on its own.

Here are a few examples of how well some of the logos fared:

So how did they fare?

### The Worst Performers

Logos which shared the same visual form fared the worst. For example, circular logos like ABC, General Electric, and PBS all consist primarily of a circle with a distinctive mark cut out of it. When heavily blurred, these logos begin to all look alike and become indistinguishable from each other.

![ABC logo blurred](http://jim-nielsen.com/logos/assets/images/build/logos/jpgs/abc.jpg "ABC Logo")
![GE logo blurred](http://jim-nielsen.com/logos/assets/images/build/logos/jpgs/general-electric.jpg "General Electric Logo")
![PBS logo blurred](http://jim-nielsen.com/logos/assets/images/build/logos/jpgs/pbs.jpg "PBS Logo")

This is not to say that circular logos are necessarily bad. However, upon being brought out of focus they do lose their visual distinctness and, thus, recognizability.

### The Best Performers

The logos of Nike and Puma seemed to fare the best. As you can see, towards the blurriest end of the spectrum the logos seem *almost* unrecognizable. 

![Nike Logo blurred](http://jim-nielsen.com/logos/assets/images/build/logos/jpgs/nike.jpg "Nike Logo")
![Puma Logo blurred](http://jim-nielsen.com/logos/assets/images/build/logos/jpgs/puma.jpg "Puma Logo")

However, these two marks remain somewhat recognizable due to their distinctive forms which retain at least some degree of visual integrity (as opposed to other more symmetrical logo designs which start all look the same when heavily blurred). 

Nike, for example, holds up rather well when heavily blurred due to it’s horizontal elongation and scaling visual weight from left to right. Similarly, the perpendicularity of the tail on Puma’s mark helps to retain its visual form and discernability.

### Experiment Conclusions: What I Learned

Part of how easily you recognize a logo not only has to do with its design, but also its ubiquity. The more recognizable a mark is and the more you’ve been exposed to it often dictates how easily you’ll recognize it. For example, you might see one mark that is significantly out of focus and guess it is as "McDonalds" rather than "Dodge Ram" because you've been exposed to the McDonalds mark more and thus make that connection. Repetitious exposure to a brand’s mark leads to higher recognition. Thus, it can be inferred that the efficacy of a brand’s mark is often less dependent on its design than on its consistent, repetitious exposure to the public eye.

Some might think this means there is no substance to logo design, that one need only create a logo, any logo, and then just expose it as much as possible to the public view. This assumption, however, is false. Certain shapes and forms lend themselves to be more easily remembered. Additionally, shapes, forms, and colors all have inherent societal meanings which cannot be overlooked when designing a logo. For example, if you were in the funeral business, you wouldn't want to use a logo that looks like the skull and cross bones, no matter how much exposure you give it. 

Lastly, this specific test of a logo’s recognizability when out of focus has shown that a logo’s form can go a long way in strengthening its recognizability. Circular forms are very common and when heavily blurred tend to all look the same with no unique visual identifier. More abstract shapes however, like Nike and Puma, tend to retain their recognizability due to unique and stark contrasts in form which lead to easier recognizability.

## Implementing My Experiment

Disclaimer: The remainder of this post will touch on the technical side and story of how I built this experiment. If you're not interested in that, feel free to stop reading now. Or check out one of my other experiments/blog posts.

For those of you who decided to venture on, I welcome you. Let me start by telling you that this experiment all began with a single thought, spurred by Rand Paul's quote. ... What follows is a quick overview of the iterations I went through in order to arrive at the current design and implementation you see today.

### Iterations Leading the Current Design 

**Phase 1**: At first, I thought I would just experiment by doing a gaussian blur in Photoshop on 2 or 3 different logos, write a blog post about it, and call it a day. So I ended up with some static images like this:

![Logos in Photoshop]({{site.imageurl}}/2014/logos-in-photoshop.png)

**Phase 2:**: Once I got into Photoshop and blurred a few logos at different rates, I realized it would be way cooler to dynamically blur logos in the browser and see the point at which each logo loses its recognizability. So I mocked out an interface like this:

![First mock]({{site.imageurl}}/2014/logos-interface-mock.jpg)

The different blurs would serve as controls to easily switch back and forth between heavy and light blurs. This would allow dynamic comparison between each logo, making it very easy to see which logos stood up to the test best.

At this point, I had the thought cross my mind, "what if it were a game where you could try and guess what the blurred logo was?" After showing the working prototype to a few people, the feedback was the same: this should be a game!

**Phase 3**: My final phase led me to make what you see today: a guessing game. I explored a few more UI changes in Photoshop and then tweaked my working HTML/CSS/Javascript prototype to match the mock I had created. As is my style, my mock wasn’t set in stone. I left myself room for making flexible design choices in the “building in the browser” stage:

![Final mock that matches finished version]({{site.imageurl}}/2014/logos-interface-final.png)

### Implementation Choice: <SVG> or <IMG>

I kind of just naturally started using images in the prototyping stage, especially because I wanted this site to be accessible and what's more accessible than a simple <img> tag? This led me to think, "I'll just create two big sprites (normal and retina) of all the logos and their respective blurred representations." However, in doing so, I ran into an issue I had not previously encountered: on iOS you can only load images that are below a certain dimension 1000x1000 (link to stackoverflow). Because I was planning on having lots of logos, this resulted in a *gigantic* sprite which loaded fine on desktop but broke when I tested it on my phone. Then, of course, it hit me: why not use SVGs!

A great advantage to using SVGs is that you can blur them on the fly in the browser using SVG filters. For older browsers that don't support SVG filters, I would just load an image for each logo and its blurred variations. To do this, I check the browser’s support for SVG filters using Modernizr and then display the logo by loading the supported file type as a background image using CSS. For example:

    .svg-filters .logo {
        background-image: url(nike-logo.svg);
    }
    .no-svg-filters .logo {
        background-image: url(nike-logo.png)
    }

Because I decided to take this approach, that means the logos are not loaded into the page’s HTML by default. They are only visible depending on the HTML class applied by `modernizr.js` which means users with Javascript disabled won’t see any images, and that’s ok. The page’s markup still allows those users to access the images if they want because each logo is linked to the PNG version of the image (which shows the logo and its blurred variants):

    <li class="brand">
        <h2 class="brand-name">
            <a href="assets/images/build/logos/jpgs/nike-logo.jpg">Nike Logo</a>
        </h2>
        <div class="logo"></div> <!-- This is the background image -->
    </li>

As you can see, I tried to progressively enhance this page as I went along. For users who didn't have javascript turned on, they could still access the blurred logo results of the experiment by clicking on each brand. 

![Page appearance without Javascript or CSS loaded](http://jim-nielsen.com/blog/assets/img/2014/logos-no-js-css.png "No Javascript or CSS support")

![Page appearance with CSS loaded but no Javascript](http://jim-nielsen.com/blog/assets/img/2014/logos-no-js.png "No Javascript or CSS support")

Users with javascript, however, received the enhanced ability to directly manipulate the logos' blur values right in the browser, while simultaneously comparing those results across brands.

![Page appearance with both CSS and Javascript loaded](http://jim-nielsen.com/blog/assets/img/2014/logos-js-css.png "No Javascript or CSS support")

### Programatically Creating Each Logo Variation With Imagemagick

At first, in the prototyping stage, I started creating each logo and it's blurred variants in Photoshop. I sliced and diced them for easy exporting, but as the number of brands increased my Photoshop file became unmanagaeabmle.

![Photoshop screenshot of all the brands]()

The biggest downside to this approach was: what happened when I decided I didn't want to do gaussian blurs at 5, 10, and 15 pixels, but rather at 7, 14, and 21 pixels? Or some other measure? All that work would be wasted. Wasn't there an easier way to do this? As a designer, I rarely do  image manipulation programatically. However, I'd vaguely heard of this command line tool called "imagemagick" which I thought might let me do this kind of batch image manipulation / processing. I already needed the SVG versions of each logo. Why couldn't I just automatically create the all image assests I needed from each SVG logo?

After a little research, I discovered imagemagick was just the tool I needed. After quite a bit of trial and error, along with research into imagemagick's documentation(LINK), I figured out just the commands I needed to prgorammtically create a single image for each logo and its blurred variations.

The final process looks something like this:

1. I have a master `.ai` file with appropriately-sized vector version of each logo on matching canvas sizes.
![Illustrator master file]()
2. These get exported as individual .svg files to a single directory `assets/images/src/SVG`
![Export image of some kind]()
3. I process each SVG file using a small bash script of commands. This script uses imagemagick to take each SVG, create individual .JPG file for each blurred variant, then recombine all the variants into a single image which will be used as that brand's sprite (if the browser doesn't support SVG).
![How this works]() 
The script here ....


### One Master List of Logos

.json file with all the logos, their spellings, etc. expoert to .scss file etc.

### End Results

These tactics of progressive enhancement, including a responsive design, make this site quite accessible. On a mobile device? It works. On a tablet? It works. Have javascript disabled? You can still access the individual

- No SVG support? You get served images.
- CSS and/or Javascript don't load? It's just plain ole' HTML. You can still access each brands' blurred logo variations.
- On a mobile device or tablet? Responsive design adapts to the screen type.
