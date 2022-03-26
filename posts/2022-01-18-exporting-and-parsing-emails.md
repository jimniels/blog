#iconGalleriesBook

# Exporting and Parsing Emails for “The iOS App Icon Book”

As you may know by now, I’m working on a side project with Michael Flarup called [_The iOS App Icon Book_](https://www.appiconbook.com).

In what can only be described as an incredible lack of foresight on my behalf (or perhaps laziness) over the last few years, I was not disciplined in documenting my communications with folks  contributing to _The iOS App Icon Book_. 

So when we were about to launch [our Kickstarter campaign](https://www.kickstarter.com/projects/flarup/the-ios-app-icon-book) and needed to reach out to everyone who had contributed to the book, I had no master mailing list.

I then asked myself: how do I create a mailing list out of thousands of disparate, archived email communications?

Fortunately, I created a template when I was cold-emailing folks asking if they’d be willing to have their work featured in the book. It looked like this:

> Hello, my name is Jim Nielsen. I run iOS Icon Gallery (http://www.iosicongallery.com) a website devoted to showcasing beautiful icon designs from the iOS ecosystem. I am working with the amazing icon designer Michael Flarup (https://twitter.com/flarup) to create a book showcasing the art of iOS icon design. You can read more about the project at https://www.appiconbook.com/
> 
> The reason I am reaching out to you is we would be flattered to include ____ icon in our book, as well as any other icons you’ve designed that you’d like to suggest for inclusion in the book.
> 
> I was hoping to get in contact with someone about the details of doing so? Thanks so much for any help you could provide!

Looking at the email, I realized that the URL for the app icon book – `https://www.appiconbook.com/` – would be a unique string in the history of my email archives to identify email threads with people who could be part of our mailing list.

A quick search for that URL resulted in thousands of emails, many of which had multiple recipients.

That led me to ask: how do I get all of these emails into a format I can parse programmatically? Can I export a set of search results in Gmail? Unfortunately, Gmail’s web app doesn’t provide a GUI for doing that. You can, however, apply a label to a set of search results.

Knowing my search query would give me a proper result set, I was able to apply a unique label to my search results which represented all correspondences about _The iOS App Icon Book_. From there, I used Apple’s Mail client to download and export those emails to an mbox archive (I later found you can use Google’s [Takeout](https://takeout.google.com) tool to get an export of a subset of emails as well).

<img src="https://cdn.jim-nielsen.com/blog/2022/export-email-imap.png" width="231" height="126" alt="Screenshot of the context menu in Apple Mail with the “Export Mailbox” menu item selected." /> 

Sidenote: I have to admit, I love email on top of protocols. An open protocol like IMAP lets you control your own data. Otherwise your data could be locked away in some silo and, unless the makers give you explicit tools for working with your personal data, you’re out of luck. Many [modern email platforms](https://twitter.com/jasonfried/status/1276566882196377601?lang=en) can promise you more tailored workflows, but they aren’t based on open standards. So you’re stuck with whatever tools they choose to build into their UIs for controlling your data (in my case, at least Google had a separate tool for exporting personal data). Contrast that with a service on top of an open protocol which allows you to help yourself to _your data_ via any third party clients that interface with the open protocol. But I digress.

With an mbox archive, now tools on NPM could help me. After vetting a couple different tools, I found these two:

1. [node-mbox](https://www.npmjs.com/package/node-mbox) which let me pull data out of the mbox archive and go through each message one by one, and then
2. [mailparser](https://www.npmjs.com/package/mailparser) which parsed each message and turned it into a standard JSON structure I could work with.

With these two tools in place, my task was to create a giant key/value object of every email address and recipient. This entailed looping through every email, checking the `to`, `from`, and `cc` fields, and adding their email address (and name, where available), resulting in data like this:

```json
{
  "john_doe@gmail.com": "John Doe",
  "press@company.com": "",
  "jane_doe@company.com": "Company Name"
}
```

That object could then get turned into a CSV and put into Mailchimp. The code to do all this, though hastily written, ended up being pretty straightforward:

```js
import Mbox from "node-mbox";
import mailparser from "mailparser";

const mbox = new Mbox("./mail.mbox/mbox", {});
let peopleByEmail = {};

mbox.on("message", (msg) => {
  mailparser
    .simpleParser(msg, {})
    .then((parsed) => {
      const fn = ({ address, name }) => {
        peopleByEmail[address] = name;
      };
      parsed.from.value.forEach(fn);
      parsed.to.value.forEach(fn);
      parsed.cc.value.forEach(fn);
    })
    .catch((err) => {});
});

mbox.on("end", () => {
  // Log it or write this to disk as CSV
  console.log(
    "Email,Name\n" +
      Object.entries(emails)
        .map(([email, name]) => `${email},${name}`)
        .join("\n")
  );
});
```

It would’ve been incredibly tedious to go through all those old emails, one-by-one, and pull out the names and email addresses of all the people we corresponded with in making the book. It was fun writing a little script to do it all for me.

I love the pairing of open protocols and open software.
