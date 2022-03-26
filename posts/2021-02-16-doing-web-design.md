# Doing Web Design

> Is there a word to describe the work we do when we're sifting through GitHub issues, pull requests, release notes, [StackOverflow] posts, etc of multiple different projects to find the root cause(s) of bugs or features? I've seen "archaeology", but not sure that fits exactly. – [@tylergaw](https://twitter.com/tylergaw/status/1339632596142026752?s=20)

A couple nominations coming from that thread:

- “synthesis”
- “spelunking”
- “ferreting”
- “archealogy”

I sort-of jokingly called it “web design”:

> when "GitHub issues and SO posts" were "forum posts and individual weblogs" we called this "web design" — [@jimniels](https://twitter.com/jimniels/status/1339646136773206017?s=20)

I had just finished doing work like this for a personal project and decided I’d blog about it for fun.

## The Problem

I use [Metalsmith](https://metalsmith.io) as my static site generator (❤️ you Metalsmith). In my setup, every blog post is a markdown file with YAML front matter. In that markdown, I have a `date` value:

```md
title: This is my blog post
date: 2020-12-20
```

The way Metalsmith works is it parses all the files in a directory on disk and, in essence, gives me back a giant array of objects where each object represents the contents of that file (along with meta info). What’s neat is the YAML front matter gets turned into data I can access in JavaScript, i.e. `file.title` or `file.date`. Given the example markdown file above, I get back something like this:

```js
{
  title: "This is my blog post", // string
  date: 2020-12-20-T00:00:00Z // Date
}
```

Note that the `date` is not a string. It is a Date object in JavaScript. I don’t know how, but somehow, somewhere, that string in my markdown file is getting converted to a Date object and I actually don’t want it to. I want the raw value as a string. So where is that magic happening? Is there something in the bowels of metalsmith that is trying to smartly parse the YAML front matter? Like, it sees the key `date` and says “ah ok, I’ll go ahead and turn that into a Date for you”?

I want to understand what’s happening here.

## Reading the API Docs

First, I go to [Metalsmith’s Github page](https://github.com/segmentio/metalsmith) to see if there’s a configuration option for something like “smart date detection”.

Nope, nothing. This is all there is:

> #frontmatter(boolean)
>
> Set whether to parse YAML frontmatter. Defaults to true.

The docs say there’s a `frontmatter` method you can call on the `Metalsmith` instance and pass it a boolean that will configure whether to parse any YAML front matter at all. In theory I can turn that off, but that won’t solely stop the `date` value from becoming a string, it will keep all YAML front matter from becoming anything. I’ll have no metadata associated with each markdown file. That’s not what I want.

In a way, this is a possible bailout point for me. I can bailout here and tell Metalsmith to stop parsing YAML front matter and instead custom roll my own YAML parsing for each file that keeps `date` as a string. But that seems excessive. I figure I’ll look for other solutions. Since the Metalsmith docs don’t say anything about how or why date values are parsed, I figure I’ll look at the [the project’s source code](https://github.com/segmentio/metalsmith/blob/master/lib/index.js) and find out for myself.

## Reading Source Code

Under the hood in Metalsmith, I find the implementation for parsing front matter surprisingly straightforward. It leverages a library, so the implementation is essentially one line of code:

```js
var parsed = require("gray-matter")(fs.readFile(file).toString())
```

That’s it. That’s all there is, which of course means I have to look at [gray-matter](https://www.npmjs.com/package/gray-matter)  and its documentation for insight into YAML date parsing.

In `gray-matter`, I don’t see anything documented about dates and date parsing. So I figure it must not be a configurable option? Even if it is, that library is being invoked _within_ the Metalsmith library which does not surface any of those implementation details in its API. That means even if `gray-matter` provides an option like `{ smartDateDetection: false }`, I can’t use it unless I fork the Metalsmith repo and adjust its source code myself—which I refuse to do.

Nonetheless, I am still curious. I look through the `gray-matter` project more. A CMD+F search on the README doesn’t yield any matches for “date”. Before diving into reading the source code, I decide to try and save time by searching for “date” in the Github project’s issues.

## Reading Project Issues

After filtering through a few issues, I find [this issue](https://github.com/jonschlinkert/gray-matter/issues/62) titled “Disable date parsing?” I feel that dopamine hit one gets when  a discussion online matches your problem keywords precisely—“oh yeah, this has got to be it!” As I read the thread, I discover this interesting tidbit:

> `gray-matter` doesn't do the actual yaml parsing itself. It passes that off to `js-yaml` by default.

I’ve got a library invoking a library invoking a library. It’s JavaScript for node, so granted, it’s libraries all the way down. “All the way down to what,” you might ask? The bedrock: the library that implements the YAML spec:

> Also, according to [this issue](https://github.com/nodeca/js-yaml/issues/198#issuecomment-120205625), it looks like the date parsing is in the [YAML spec](http://www.yaml.org/spec/1.2/spec.html#id2761292).

This is confirmed by a parallel Google search I have in another tab which has led me to a post titled [“The incomparable JavaScript”](http://stedolan.net/incomparable/) stating:

> to parse the frontmatter, Metalsmith calls `gray-matter` which calls `js-yaml`, which makes a brave effort to parse dates

That brave effort is to use [this regex](https://github.com/nodeca/js-yaml/blob/aee620a20e85e651073ad8e6468d10a032f0eca8/lib/type/timestamp.js):

```
var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute
```

## Reading the Spec

You know you’ve gone deep on a problem when you end up at the spec—and here I am.

A cursory glance at [the YAML spec says](https://yaml.org/spec/1.2/spec.html#id2761292) “untagged nodes are given a type depending on the application.” It then gives examples with integers, floats, and timestamps:

> Example 2.22. Timestamps
> 
> canonical: 2001-12-15T02:59:43.1Z  
> iso8601: 2001-12-14t21:59:43.10-05:00  
> spaced: 2001-12-14 21:59:43.10 -5  
> date: 2002-12-14

## Conclusion

I now have my answer: the `date` value in my YAML front matter, which is a string, is getting converted into a date object in JavaScript because `metalsmith` is invoking `gray-matter` which is invoking `js-yaml` which is following the spec which says to do so. If I used YAML in any capacity on a regular basis, I’d likely know this already, but now I know.

Imagine doing this every single day multiple times a day. You  now know what it’s like to do this incredibly broad thing I call web design.