---
layout: post
title: Successful Transaction Receipt
date: 2014-11-04
tags: design-process
summary: "summary..."
---

We were working on getting people to sign up for Kindling through the website. The question came up, “what happens when someone *actually* signs up? Where do they go?” We decided to send people to a “success” page which would reiterate that they had successfully signed up and provide them with additional content to explore. When the page was pushed to our test server, it looked something like this:


![Screenshot of intial receipt](http://jim-nielsen.com/blog/assets/img/2014/receipt-initial.png "Note the barebones receipt?")

As I was busy with other things, the “receipt” aspect of the page had been thought out and developed by other members of the team. I took the initiative to say, “hey, let’s enhance this just a bit.” 

So, I first gathered the information we were presenting in the receipt:

- A note indicating an email transaction had been sent
- The current date
- The purchaser’s name
- A description of what was purchased
- The total amount billed
- Information about canceling

Then I jumped into Photoshop to develop a more visual method of communicating the information being presented (keeping in mind the responsive nature our website). I decided to borrow the metaphor of a real-world receipt and ended up with a visual draft I shared with the team.

![Screenshot of receipt design draft](http://jim-nielsen.com/blog/assets/img/2014/receipt-first-draft.png)

Everyone was on board with my design, so I transitioned into making it a reality with HTML/CSS, pushed my changes, and everything went live. It felt good to have taken the initiative to enhance that tiny part of the purchasing experience.

![Screenshot of before and after designs side-by-side](http://jim-nielsen.com/blog/assets/img/2014/receipt-side-by-side.png "Before and after comparison")

However, we soon decided that we would make Kindling free for the first month. This begged the question: should we even have a receipt on the post-submission success page because nobody is actually buying anything? We were, however, collecting credit card information. Whether the person signing up for team was initially paying anything or not, the signing up process felt like a transaction. This led me to the decision to keep the visual receipt metaphor, but it would need an update.

I changed the way we were presenting the information in the receipt so that it would communicate, “hey, thanks for signing up! We successfully received your billing info. Because your first month is free, you won’t be charged anything until {{date one month from now}}. To cancel at anytime, email us.” Using the receipt metaphor helped maintain the feeling of a successful transaction while simultaneously communicating that the person signing up was not actually charged anything (but eventually would be if they didn’t cancel).

![Screenshot of final receipt design](http://jim-nielsen.com/blog/assets/img/2014/receipt-final.png)