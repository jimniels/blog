---
tags: engineering myBlog
---

# Leveraging Regexes and Git to Find/Replace Dates in Markdown Files

Recently I’ve been moving my blog off Jekyll as a static site generator. Nothing against Jekyll, I love it. I just don’t want to deal with Ruby anymore. JavaScript all the way. In moving things over, I found a duplication of data I wanted to fix. In fixing it, I thought, “I better write this down...I might need to do this again some day...” so here it is.

Jekyll requires that you structure the names of your markdown post as a combination of post date and post slug (`YYYY-MM-DD-slug-of-post.md`) which results in file names like this:

- `2010-02-12-why-jquery-is-great.md`
- `2012-07-05-why-i-will-be-dumping-jquery-for-backbone.md`
- `2015-12-22-why-backbone-is-problematic-and-react-is-the-answer.md`
- `2019-04-10-why-svelte-is-the-answer-to-all-your-problems.md`

Inside of each post file, I had a duplication of data in that the date of the post was repeated in the YAML front-matter:

```yaml
---
title: Why jQuery is Great
---
Let me tell you the answer to all your problems—jQuery...
```

When switching over to my new, homemade blogging-engine (more on that in a future post), I realized I didn’t need the date in two places. I only needed it in one. This actually got me wondering: are there places where the date in the file’s name and the date in the file’s front-matter don’t actually match? A quick node script helped me find out:

```js
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "/src/client/posts");

fs.readdirSync(dir).forEach(file => {
  const contents = fs.readFileSync(path.join(dir, file)).toString();
  const date = /date: (.*)/g.exec(contents);
  if (date) {
    const dateinfile = date[1];
    const dateinfilename = file.slice(0, 10);
    if (dateinfile !== dateinfilename) {
      console.log(file, dateinfile, dateinfilename);
    }
  } else {
    console.log("No `date:` found for file: ", file);
  }
});
```

Through this little node script, I discovered four of my posts had mismatched date values. So I checked the live version of my blog (which at the time was still rendered by Jekyll) and discovered that Jekyll appeared to be using the `date:` in the front-matter and not the file name. So I decided to do a couple things:

1. Rename all files with mismatching date values so the date in the file’s name matched the date in the file’s front-matter
2. Remove all occurences of `date:` from post front-matter

Number one was relatively easy. My node script only surfaced four files where values mismatched. So that was an easy one to do by hand.

![Screenshot of the result of my node script](https://cdn.jim-nielsen.com/blog/2019/post-dates-node-script-result.png)

Number two was a little bit tricker. After dusting off the part of my brain that deals with regexes, I used the find/replace in VSCode to essentially look through all my `posts/*.md` files and remove any lines that started with `date:`.

My first attempt found me using this regex pattern: `^date:.*$`. That seems right, right? Start at the beginning of the line (`^`) look for `date:` and then anything following that (`.*`) until the end of the line (`$`). VSCode made seeing the results of my search quite easy.

![Screenshot of the result of my first regex search in VSCode](https://cdn.jim-nielsen.com/blog/2019/post-dates-first-regex-vscode.png)

After doing the find/replace, I looked at my file changes and realized I wasn’t capturing the entire line. The computer had found all my `date:` strings and removed them, leaving me with an empty line in each post file:

![Screenshot of my first regex changes in git](https://cdn.jim-nielsen.com/blog/2019/post-dates-first-regex-git.png)

As you can see, I now had an empty line in each file. There was still dust on the regex part of my brain, so I read some more about the `$` character on [regex101](https://regex101.com/) and found the following (emphasis mine):

> `$` Matches the end of a string without consuming any characters. If multiline mode is used, _this will also match immediately before a newline character_.

Ah, so the new line character wasn’t being captured. Reverting my changes was easy with git, (seeing as I had no other changes in my working directory) all I had to type was `git checkout -- .` and I was back to having `date:` in all my post files.

I then changed my regex to capture the new line character (`\n`) and performed another search/replace (`^date:.*$\n`):

![Screenshot of the result of my second regex search in VSCode](https://cdn.jim-nielsen.com/blog/2019/post-dates-second-regex-vscode.png)

Ahh, sweet, sweet success!

![Screenshot of my second regex changes in git](https://cdn.jim-nielsen.com/blog/2019/post-dates-second-regex-git.png)

As you can see, that gave me precisely what I wanted: remove every line that started with `date:`. Working with git made this really easy. I could do search/replaces all day, ensure I got what I wanted by previewing the changes in git, then either committing or reverting my changes.

You might be reading this post and thinking “pff, this isn’t really anything. I do stuff like this all day every day!” And I get it. This is “just a simple regex find/replace”. But this, to me, is what makes computering so much fun. For me, there’s a big sense of satisfaction when you leverage what tools you know to do a task that you know would’ve otherwise taken you an incredible amount of time to do by hand.

That’s all. The end.
