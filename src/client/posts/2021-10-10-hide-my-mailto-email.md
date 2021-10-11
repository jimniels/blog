---
tags: html
---

# Hide My mailto: Email

The ability to use the `mailto` URI scheme in HTML to seamlessly open and (pre)compose an email in a user agent is pretty damn cool.

And, unlike many things on the modern web, it’s fantastically simple and straightforward in its essence.

```html
<a href="mailto:my_email@domain.com">
  Send me an email
</a>
```

The wonderful thing about this pattern is that your email is accessible to everyone—humans, browsers, screen readers, you name it. 

The downside is that your email is accessible to everyone, you name it. That includes bots and other bad actors who will harvest your email for spam—at least that’s the fear that’s been instilled in many of us through the years<sup id="a1">[1](#f1)</sup>.

There have been [many-a-way to get around this problem](https://www.heartinternet.uk/blog/15-ways-to-hide-your-email-address/), the most famous likely being the “put your email in an image” technique which hides your email from being in the HTML while remaining visible on screen—though it’s not without its accessibility concerns, and you can’t use `mailto` to hyperlink the user’s email client.

```html
<img src="image-of-my-email-address.png">
```

So how do you retain all the benefits of putting your email in HTML without the drawbacks of feeling like your exposing your email publicly to bad actors?

If you’re an iCloud user, Apple’s new “Hide My Email” feature offers a compelling solution. [From Apple](https://support.apple.com/en-us/HT210425):

> Hide My Email generates unique, random email addresses that automatically forward to your personal inbox. Each address is unique to you. You can read and respond directly to emails sent to these addresses and your personal email address is kept private.

If you use iCloud for email, you can leverage Hide My Email to generate a random email address:

<img src="https://cdn.jim-nielsen.com/blog/2021/hide-my-email-ios.jpg" width="285" height="618" alt="Screenshot of the “Hide My Email” UI in iOS 15." /> 

Then, you can expose that address publicly on the web using the `mailto` scheme.

```html
<a href="mailto:random_email_address@icloud.com">
  Send me an email
</a>
```

If at any point you start receiving too much spam at that email address, delete it.

I’ve implemented this on my blog. When I receive an email from someone on my website (which is the only place I’ve published this email), my randomly-generated email address is what appears in the “To” field of my email client:

<img src="https://cdn.jim-nielsen.com/blog/2021/hide-my-email-mail-view.png" width="582" height="299" alt="Screenshot of Apple Mail showing the email address context menu for the 'To' field." /> 

If I hit “Reply”, the radomly-generated email will continues to be the email with which I correspond. In other words, my real email continues to be obfuscated from the person emailing me. 

To the person emailing me, they see:

`random_email_address@icloud.com`

And to me, their email address appears as:

`their_email_at_gmail_RANDOM_HASH@icloud.com`

As an example, note this screenshot from Apple Mail where I hit the “Reply” button on an email sent to my randomly-generated email:

<img src="https://cdn.jim-nielsen.com/blog/2021/hide-my-email-mail-respond.jpg" width="632" height="638" alt="Screenshot of the “Reply” window UI in Apple Mail." /> 

That’s pretty neat as a simple filtering mechanism.

Personally, once I parse the incoming email and determine it’s from a human I want to correspond with, I hit “Forward” and respond to their real email address via my real email address. (Why “Forward”? Because “Reply” would keep my real email obfuscated. I consider this a “burner” email address. I can delete it at any point, like if I start getting too much spam. But that would also mean anyone I’ve replied to at that address would never be able to reach me again.)

I don’t know why, but I love small things like this.

---

1. <span id="f1"></span>Is that still actually a problem? I’m not sure. I had a hard time finding any real modern commentary on it. I’ve had my email publicly accessible on my website in a `mailto` link for a few years and I’ve never had too big of a problem. Maybe that’s because spam filtering has gotten really good? Maybe it’s because that’s not really a vector for exploitation anymore? With modern OCR, I wonder if hiding your email in an image is still even plausible? Anyhow, I still like this solution.