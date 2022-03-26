#engineering #sagesure

# Supporting CSS Variables in Sass

I can’t say I’ve really been keeping up with the Sass scene. For personal projects, I’ve essentially stopped using it everywhere I can. Writing plain CSS files is much more friendly in the long game, as I can come back to a project in two years and not have to touch any build tools etc. and my CSS still works.

However, for larger projects, I can understand the need and I still use Sass for a couple employment-related projects. That’s how I ended up writing this blog post today.

First, some news (if you haven’t already heard): the default implementation of Sass is no longer going to be in Ruby, but in [Dart](https://github.com/sass/dart-sass) (which compiles to JS):

> Dart Sass has replaced Ruby Sass as the canonical implementation of the Sass language.

So what? Well, it means you don’t have to install `node-sass` anymore with all its extra bindings and gobbledygook stdout just to compile your Sass files (something [even Dan worries about](https://github.com/webpack-contrib/sass-loader/issues/532#issuecomment-357547969)).

For the project I was working on, the implementation was pretty straightforward: remove `node-sass` devDependency, add `sass` devDependency, and change my build command for the CSS. However, I ran into a problem that took me a while to track down.

`sass` compiled my CSS just fine, but I also had `postcss-cli` processing my CSS with a couple plugins and it kept complaining about `CssSyntaxError: ... missed semicolon`. After troubleshooting for a while (running code through a linter, removing code, re-compiling, etc) I discovered the issue was where I was mapping some of my Sass variables to CSS custom properties (a.k.a CSS variables). Because I was on an older version of `node-sass`, I hadn’t noticed yet. `node-sass` continued to compile things just fine, but when I tried compiling the same files with `sass`, things were failing.

Turns out, when compiling with `node-sass`, this:

```scss
$color: #eee;
:root {
  --color: $color;
}
```

Compiles, as you would probably expect, to:

```css
:root {
  --color: #eee;
}
```

However, using `sass`, that same thing would [compile to](https://github.com/sass/libsass/issues/2621):

```css
:root {
  --color: $color;
}
```

Turns out, you have to interpolate your variable in this case [so Sass can support CSS variables](https://github.com/sass/sass/issues/1128). So this:

```scss
$color: #eee;
:root {
  --color: #{$color};
}
```

Would result in your expected:

```css
:root {
  --color: #eee;
}
```

This is by no means a ground-breaking revelation. Normally it’s not even worth a blog post. But I’m writing about it because when I was searching for the `CssSyntaxError` I was getting via the CLI, I wasn’t finding anything on the internet that helped solve my issue. So once I synthesized a couple disparate resources to solve the problem, I figured it’d be worth quickly noting down and posting on my blog, in case anyone out there on the internets has the same issue I did.
