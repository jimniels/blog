#iconGalleries

# Data Storage As Files on Disk Pairs Well With LLMs

I recently added a bunch of app icons from macOS Tahoe to [my collection](https://www.macosicongallery.com).

<img src="https://cdn.jim-nielsen.com/blog/2025/macos-icon-gallery.png" width="1840" height="1195" alt="Screenshot of macosicongallery where the entire page is filled with app icons from macOS Tahoe." />

Afterwards, I realized some of them were missing relational metadata.

For example, I have a collection of [iMove icons through the years](https://www.macosicongallery.com/apps/408981434/compare/) which are related in my collection by their App Store ID. However, the latest iMovie icon I added didn’t have this ID.

This got me thinking, "Crap, I really want this metadata so I can see [apps over time](https://www.macosicongallery.com/apps/). Am I gonna have to go back through each icon I just posted and find their associated App Store ID?”

Then I thought: “Hey, I bet AI could figure this out — right? It should be able to read through my collection of icons (which are stored as JSON files on disk), look for icons with the same name and developer, and see where I'm missing `appStoreId` and `cateogryId`.”

So I formulated a prompt (in hindsight, a really poor one lol):

```
look through all the files in `sites/macos/icons/` and find any that start with `2025-11-13-*` and then find me any icons like iMovie that have a correlation to other icons in `sites/macos/icons/` where it's missing `appStoreId` and `categoryId`
```

But AI did pretty good with that. I’ll save you the entire output, but Cursor thought for a bit, then asked to run this command:

```
for file in sites/macos/icons/2025-11-13-*.json; do if ! grep -q "appStoreId" "$file" || ! grep -q "categoryId" "$file"; then echo "$file"; fi; done
```

I was like, “Ok. I couldn’t write that myself, but that _looks_ about right. Go ahead.” It ran the command, thought some more, then asked to run another command. Then another.

It seemed unsatisfied with the results, so it changed course and  wrote a node script and asked permission to run that.

I looked at it and said, “Hey that’s probably how I would’ve approached this.” So I gave permission.

It ran the script, thought a little, then rewrote it and asked  permission to run again. Here’s the final version it ran:

```
node -e "
const fs = require('fs');
const path = require('path');

// Get all Apple icons with appStoreId and categoryId
const iconsWithIds = {};
const files = fs.readdirSync('sites/macos/icons');
files.forEach(file => {
  if (file.endsWith('.json')) {
    try {
      const content = JSON.parse(fs.readFileSync(\`sites/macos/icons/\${file}\`, 'utf8'));
      if (content.developer === 'Apple' && content.appStoreId && content.categoryId) {
        const name = content.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!iconsWithIds[name]) {
          iconsWithIds[name] = {
            appStoreId: content.appStoreId,
            categoryId: content.categoryId,
            file: file
          };
        }
      }
    } catch (e) {
      // skip invalid JSON
    }
  }
});

// Get all Apple icons missing appStoreId/categoryId
const missing = [];
files.forEach(file => {
  if (file.endsWith('.json')) {
    try {
      const content = JSON.parse(fs.readFileSync(\`sites/macos/icons/\${file}\`, 'utf8'));
      if (content.developer === 'Apple' && (!content.appStoreId || !content.categoryId)) {
        const name = content.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (iconsWithIds[name]) {
          missing.push({
            file: file,
            name: content.name,
            match: iconsWithIds[name]
          });
        }
      }
    } catch (e) {
      // skip invalid JSON
    }
  }
});

// Sort by file name
missing.sort((a, b) => a.file.localeCompare(b.file));

console.log(JSON.stringify(missing, null, 2));
"
```

And with that, boom! It found a few newly-added icons with corollaries in my archive, pointed them out, then asked if I wanted to add the missing metadata.

The beautiful part was I said “go ahead” and when it finished, I could see and review the staged changes in git. This let me double check the LLM’s findings with my existing collection to verify everything looked right — just to make sure there were no hallucinations.

Turns out, storing all my icon data as JSON files on disk (rather than a database) wasn’t such a bad idea. Part of the reason I’ve never switched from static JSON files on disk to a database is because I always figured it would be easier for future me to find and work with files on disk (as opposed to learning how to setup, maintain, and query a database). Turns out that wasn’t such a bad bet. I’m sure AI could’ve helped me write some SQL queries to do all the stuff I did here. But what I did instead already fit within a workflow I understand: files on disk, modified with scripting, reviewed with git, checked in, and pushed to prod.

So hey, storing data as JSON files in git doesn’t look like such a bad idea now, does it future Jim?