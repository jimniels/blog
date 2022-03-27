#engineering #sagesure

# Migrating Away from Compass and Susy to Sass Exclusively

One of the problems I encountered at my new job was that nobody knew how styles were compiled for one of our applications. Looking at the code base, I could glean the following Ruby dependencies were required in order to compile all `.scss` files:

1. [Sass](http://sass-lang.com/)
2. [Compass](http://compass-style.org/)
2. A tool I’d never heard of named [Susy](http://susy.oddbird.net/).

Doing a `bundle install` and trying to run Sass didn’t work. After an exercise in futility of trying to get the styles to compile (and seeing how nobody in the org knew how it worked) I decided to refactor the styles compilation process.

## Getting Started

After some initial research, it was clear that two of the style dependencies were completely unnecessary (and part of the problem). The day the project was initially setup, Compass was likely needed. However, since that day nobody seems to have questioned its inclusion. Since that initial setup, browser support for CSS3 rules has improved drastically and our own business requirements for browser support no longer dictated we needed to support legacy browsers via a helper like Compass. Additionally, I discovered that Susy was a dependency included in the project but rarely used. It would be easiest to simply remove it.

These insights made me formulate the following goals:

1. Provide better documentation so developers after me would know how to compile styles.
2. Refactor the code to remove Compass and Susy as dependencies; thus relying solely on Sass for the styles preprocessor.
3. Move off Ruby Sass for styles and switch to node-sass via NPM

It seemed even more logical to remove Compass and Susy because the dependeices themselves were quite old:

- Compass
  - [No longer officially maintained](https://github.com/Compass/compass).
  - Latest release was 2015
  - Application `Gemfile` version was from 2012
- Susy
  - [Lastest release was 2015](https://github.com/oddbird/susy/releases).
  - Application `Gemfile` version was from 2013

## Removing Compass

From analyzing the code, I gathered that the primary usage of Compass in the application had been for prefixing CSS3 properties. As those were no longer needed, I made a list of all the Compass mixins that would need to be replaced and their corresponding CSS counterparts:

- `@include box-shadow(VALUE);` -> `box-shadow: VALUE;`
- `@include border-radius(VALUE);` -> `border-radius: VALUE;`
- `@include background-image(VALUE);` -> `background-image: VALUE;`
- `@include transform(VALUE);` -> `transform: VALUE;`
- `@include transition(VALUE);` -> `transition: VALUE;`

The find/replace pattern for these rules was pretty straightforward since Compass mixins mapped straightforwardly to CSS properties and their parameters were simply valid CSS values. So all I needed to do was extract the CSS value from the mixin call and drop it into the corresponding CSS property, i.e.

```scss
// Compass mixin
@include border-radius(5px);
// Would become regular CSS without prefixes
border-radius: 5px;
```

Using [regex101](https://regex101.com/), I devised a regex that would allow me to search all `.scss` files for occurences of the Compass mixins I wanted to replace. I came up with the following regex:

`/@include border-radius\((.+?(?=\);))\);/`

This regex searches for the specified Compass mixin, creates a grouping around the parameter value(s), and then selects up until the end of the line (`\);`). In doing a find and replace, this would give me the entire line to work with and provide me with the mixin’s CSS value in a grouping.

![Screen shot of my regex on regex101](https://cdn.jim-nielsen.com/blog/2017/sass-refactor-regex.png)

Having a regex for each property, I could then run a find and replace for all `*.scss` files using my text editor Sublime. For each Compass mixin, I would swap out the beginning part of the regex with the mixin name I was trying to find (i.e. `@include border-radius\(` for finding and replacing Compass’ `border-radius()` mixin, `@include box-shadow\(` for finding and replacing Compass’ `box-shadow()` mixin, etc). Everything else about the regex could stay the same.

![Screen shot of my regexes on regex101](https://cdn.jim-nielsen.com/blog/2017/sass-refactor-regexes.png)

For each of these mixin regexes, I used Sublime to do all the legwork, i.e.

```
Find: @include border-radius\((.+?(?=\);))\);
Where: *.scss
Replace: border-radius: $1;
```

Generally I would test out the regex on one file first, just to make sure it was finding/replacing the correct values. Once confirmed, I’d run it for all `*.scss` files. (Side note: Atom is pretty great at this because it will provide you an inline preview of what you're finding and replacing, taking a lot of the unsurety out of it, though I’ve found its ability to actually write changes to the found files hit or miss).

After running the regex, I would pull up the file diffs in the Github client and just make sure everything looked ok. If anything needed to be fixed or corrected, I’d do that part manually.

![Screen shot of my regexes on regex101](https://cdn.jim-nielsen.com/blog/2017/sass-refactor-find-replace-diffs.png)

An example of where I had to fix things manually dealt with the `background-image()` mixin. There were a few occurences of an older syntax of `linear-gradient()` that had to have the direction `top` removed because that was the default browser value (this old syntax would fail in modern browsers).

```scss
// Compass version
@include background-image: linear-gradient(top, $blue, darken($blue, 10));
// After find/replace
background-image: linear-gradient(top, $blue, darken($blue, 10));
// After manual fix
background-image: linear-gradient($blue, darken($blue, 10));
```

## Conclusion

Because Susy was only rarely used, I was able to find and replace most occurences manually. Compiling with Sass helped me discover which mixins were part of Susy because Sass would throw an error on them. I would then find and fix them until Sass eventually compiled without errors. Eureka!

After removing the Ruby dependencies of Compass and Susy, I took our application one more step and removed Ruby from the entire Sass compilation process by switching over to using node-sass via NPM. This was really easy: I ran `npm install node-sass --save-dev`, added a script to run the compilation in `package.json`, then ran `npm run css:build`.

![Screen shot of my diffs when switching from Ruby Sass to node-sass](https://cdn.jim-nielsen.com/blog/2017/sass-refactor-swap-ruby-for-node.png "My Git diff for switching from Ruby Sass to node-sass")

Gotta admit, this was kind of a fun little refactoring project. Feels really good to take another step towards a more modern, JS/Node front-end. The end goal is that every front-end dev can run `npm run start` and have their environment up and running. This work got us one step closer.
