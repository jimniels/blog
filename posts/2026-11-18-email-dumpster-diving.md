# Email Dumpster Diving

Sometimes, for fun, I like to go rummage around in my email’s Spam folder.

<img src="https://cdn.jim-nielsen.com/blog/2026/phishing-emails-spam.png" width="700" height="525" alt="Menu showing Important, Scheduled, Spam with 96, Trash, and Manage subscriptions." data-og-image />

Why? Who knows (probably a question for a licensed medical professional).

I think there’s some part of me that chases the dopamine hit of  finding a “needle in the haystack”: an email flagged as spam that shouldn’t be (which _almost never_ happens, so I guess this behavior falls under the label of addictive/impulsive seeking).

I think there’s also a part of me that enjoys keeping a finger on the pulse of scam tactics, like “Let’s see how [people are trying to trick me](https://notes.jim-nielsen.com/n/2026-11-17-1253/) today…” Almost like a form of inoculation: deliberate exposure to scam tactics in a controlled environment. It helps me develop an immunity, which comes in handy when family members come to me with their emails and ask, “Is this legit?”

Here’s a little exposure to what I’ve seen recently.

First: I see a lot of emails that exploit the way cloud services bill us. For example: “You’ve hit your limits! Better log in or you’ll lose access!” Or, “Your credit card has expired. Better log in and enter your new credit card so you can keep doing what you’re doing.” ⁣

<img src="https://cdn.jim-nielsen.com/blog/2026/phishing-emails-cloud.png" width="1200" height="900" alt="Cloud storage renewal payment failed notification with expired payment method alert and update button." />

(Note the little green banner at the top — “This message was sent from a trusted sender.” A kind of [“Why would I deceive you?”](https://knowyourmeme.com/memes/elizabeth-holmes-and-nathan-fielder-why-would-i-deceive-you))

These emails are interesting not only as an exercise in analyzing scam tactics, but also as a meta-commentary on legitimate software use cases.

For example, isn’t it interesting how difficult it can be to distinguish scammer tactics from legitimate software company  practices? “Hey, you better give us your credit card or you’ll lose access to your thing!” That’s what ransomware is;  it’s also what SaaS is, lol.

It’s kinda funny, yeah? No, just me? Ok, I digress. Next email.

This is an interesting one. Usually phishing emails are pretty overt in their intentions: click this big button and get taken to a page where you do what we want, e.g. enter sensitive info like a password or credit card. (Again, interesting that legitimate marketing teams follow the same strategy lol. It’s called a “CTA”: click here and do what we want.)

In this case, however, the email claims to be from a “Gina Rinehart” and tries to establish credibility by saying, “Look I’m a real person! Here’s a link to my Wikipedia page.” No CTA to a sus web page here at all.

<img src="https://cdn.jim-nielsen.com/blog/2026/phishing-emails-gina.png" width="1200" height="675" alt="Email from Gina Rinehart offering a $2 million donation, with contact details and Wikipedia link." />

I do wonder what would happen if I emailed back. I’m sure somewhere down that road is a solicitation for my bank info or the like. I’d love to mess with them, but I got better things to do with my time (like write this blog post).

Ok, last email. I came across this one in my Spam folder:

<img src="https://cdn.jim-nielsen.com/blog/2026/phishing-emails-irs.png" width="1200" height="900" alt="IRS banner with US flag, text ‘Claim your child's Trump Account today!’, gold Trump Accounts logo, text about accounts for children, and ‘Download the App’ button." />

“Oh interesting,” I thought. “Somebody is trying to ride the [Trump Accounts](https://www.irs.gov/trumpaccounts) initiative from the current administration and trick folks into divulging sensitive information.” Makes sense. Totally plausible vector for attack.

But then as I do my email forensics (examine where the links point to, inspect the sender, etc.) I find something surprising:

<img src="https://cdn.jim-nielsen.com/blog/2026/phishing-emails-irs-address.png" width="700" height="525" alt="Email from IRS with subject 'Claim your child's Trump Account' to Jim Nielsen, showing a context menu with options including 'Block Sender'." />

Turns out, `service.govdelivery.com` is a legitimate domain and `irs@ service.govdelivery.com` is [listed on the IRS’ website](https://www.irs.gov/help/how-to-know-its-the-irs#:~:text=irs@service.govdelivery.com) as the official sender for their bulletins. (The email headers check out too.)

On top of that, the CTAs in the email all point to officially sanctioned websites, App Store apps, etc. In other words: this is actually a legitimate email from the United States Government that was flagged as Spam in Gmail, lol.

And there it is: my needle in the haystack. The dopamine hit I need to continue with this ridiculous, fun, and informative habit.