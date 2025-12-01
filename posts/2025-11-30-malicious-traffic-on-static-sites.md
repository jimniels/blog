# Malicious Traffic and Static Sites

I wrote about [the 404s I serve for robots.txt](https://blog.jim-nielsen.com/2025/top-resource-not-found/). Now it’s time to look at some of the other common 404s I serve across my static sites (as reported by Netlify’s analytics):

- `/wp-login.php`
- `/wp-admin`
- `/news/wp-includes/wlwmanifest.xml`
- `/login/`
- `/wp-includes/wlwmanifest.xml`
- `/news/wp-includes/wlwmanifest.xml`
- `/website/wp-includes/wlwmanifest.xml`
- `/info.php`

I don’t run WordPress, but as you can see I still get a lot of requests for `wp-*` resources.

All of my websites are basically just static files on disk, meaning only GET requests are handled (no POST, PUT, PATCH, etc.). And there’s no authentication anywhere.

So when I see these requests, I think: “Sure is nice to have a static site where I don’t have to worry about server maintenance and security patches for all those resources.”

Of course, that doesn’t mean running a static site protects me from being exploited by malicious, vulnerability-seeking traffic.

Here are a few more common requests I’m serving a 404 to:

- `/.env`
- `/.env.production`
- `/.env.local`
- `/.env.dev`
- `/.git/config`
- `/data.sql`
- `/database.sql.gz`
- `/mysql.sql`
- `/db.sql.gz`
- `/backup.sql.gz`
- `/database.sql`

With all the magic building and bundling we do as an industry, I can see how easy it would be to have some sensitive data in your source repo (like the ones above) end up in your build output. No wonder there are bots scanning the web for these common files!

So be careful out there. Just because you’ve got a static site doesn’t mean you’ve got no security concerns. Fewer, perhaps, but not none.