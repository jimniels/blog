#designProcess

# Team Color Codes

**Update:** Team Colors 2.0 is out! You can see it live at it’s original url [teamcolors.ar90.com](http://teamcolors.arc90.com/) or read the blog post about it “[Team Colors 2.0](/2015/team-colors-2-0/)”.

I recently participated in the [Arc90 Hackathon](http://lab.arc90.com/hackathon/2012/). I originally volunteered for a different project as part of a team, but due to scheduling conflicts my team disbanded. I was left with the option to work on a solo project, which resulted in [Team Colors](http://teamcolors.arc90.com/): a single-page website that serves as a reference for HEX values for professional sport teams:

![Screenshot of Team Colors, an Arc90 Hackathon Project](https://cdn.jim-nielsen.com/blog/2013/team-colors.png)

Unfortunately, the Hackathon took place while I was absent from the office (traveling to Utah for the Christmas break). So a lot of my work was done on a plane and working from home. I started Team Colors by sketching out some ideas for the page hierarchy and navigation:

![Sketch of Team Colors](https://cdn.jim-nielsen.com/blog/2013/team-colors-sketch.jpg)

After thinking through and sketching out how to present each team and its corresponding brand colors in a responsive manner, I turned to writing some pseudocode that would power the interaction of the site:

![Pseudocode for Team Colors](https://cdn.jim-nielsen.com/blog/2013/team-colors-code.jpg)

Once I got everything down on paper, the fun part of building began. The hardest part was  finding the actual HEX values for each team. There were some obscure, outdated forum posts scattered across the web. In the end Wikipedia was my best reference, although it did not provide the brand colors in the user interface. I found them in the underlying HTML/CSS using Chrome developer tools.

## Technical Overview
Here's a quick overview of the technology used:

- The page is responsive, built using HTML5, CSS, and the CSS preprocessor Compass
- All the data (team names, hex values) is stored in a single JSON file. This makes updating the page quite simple. You just add a new league with teams, or a new team in the appropriate league with its corresponding HEX values. Then add the team's logo into the images directory and you're done!
- Most team logos are SVGs, making them crisp on HiDPI devices. If a team logo isn't available in SVG, a PNG fallback is used.
- Progressive enhancement is used thoroughly:
	- Images are served by javascript after page load to reduce HTTP requests on the initial page load
	- All league/team data is loaded in a single page. Javascript is used to create a the drop-down control for sifting through teams by league and showing/hiding content.

## Don't Forget
You can view [Team Colors here](http://teamcolors.arc90.com/). Don't forget to checkout some of the other amazing [Arc90 Hackathon projects](http://lab.arc90.com/hackathon/2012/), or [read about the hackathon](http://blog.arc90.com/2013/01/24/the-first-arc90-hackathon/).
