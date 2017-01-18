---
title: Workarounds to Variable Interpolation in Sass
date: 2013-07-29
tags: thoughts engineering
summary: "Variable interpolation is currently not supported in Sass. If you want to map key value pairs for something such as a brand to its color, you can create a lookup function to do the trick."
redirect_from: /posts/sass-variable-interpolation-workarounds/
---

Currently in Sass, interpolating list values in variable names is not supported (although maps are [supposedly slated for Sass 3.3](https://github.com/nex3/sass/issues/132#issuecomment-17581804)). However, there is a workaround solution until maps come. Allow me to elaborate:

## How I Thought It Could Work

A recent design project required I use a large variety of brand colors. To make things easy I wanted each brand name and it's corresponding brand color to be available for use at any time, both in HTML and CSS. Thus, for each brand color, I needed to create a CSS class (for use in HTML) and a Sass variable (for use in CSS output).

Something like this:

    // Variables for Sass usage
    $nike: #ffaadd;
    $facebook: #ff8811;
    $yahoo: #aaddcc;

    // CSS Classes for HTML usage
    .brand-nike { color: #ffaadd; }
    .brand-facebook { color: #ff8811; }
    .brand-yahoo { color: #aaddcc; }

Initially, I thought I could create a variable for each brand and use the `@each` directive to interpolate the values of a list containing all my brand names for the variables names I created. Something like this:

	// Brand Variables
	$nike: #ffaadd;
	$facebook: #ff8811;
	$yahoo: #aaddcc;

	// List of Brand Names
	$brand-names: nike, facebook, yahoo;

	// Output a class for each
	@each $brand-names in $brand-name {
	    .#{$brand-name}-color {
	        color: $#{brand-name};
	    }
	}

However, I soon discovered that variable interpolation is not currently supported in Sass. You can read more on the [variable interpolation google group](https://groups.google.com/forum/?fromgroups=#!topic/sass-lang/upr78cyrW1I) or [Sass Github issues](https://github.com/nex3/sass/issues/132).

## A Workaround to Variable Interpolation
User jonjaques put forward two [interesting workarounds](https://github.com/nex3/sass/issues/132#issuecomment-4335097) for mapping values which I customized for my project. First I created two lists: `$brand-names` and `$brand-colors`:

    // Brand names and colors
    $brand-names: nike, facebook, yahoo;
	$brand-colors: #ffaadd, #ff8811, #aaddcc;

The one caveat for my workaround is that the list indexes must correspond. For example, if 'facebook' is the second name in the list `$brand-names`, Facebook’s color value must be second in the list  `$brand-colors`.

To output a CSS class for each brand, I used a loop. To have on-demand access to brand colors in my Sass files, I created a lookup function.

### CSS Classes: Loop Through Two Corresponding Lists

To output a CSS class for each brand and it’s corresponding color, I used the `@for` directive to loop through the two lists:

    // Create a CSS class for each brand
    @for $i from 1 through length($brand-names) {
        .color-#{nth($brand-names, $i)} {
            color: nth($brand-colors, $i);
        }
    }

The CSS output of this loop would look something like this:

    .color-nike {
        color: #ffaadd;
    }
    .color-facebook {
        color: #ff8811;
    }
    .color-yahoo {
        color: #aaddcc;
    }

### On-Demand Solution: Create a Lookup Function

To have brand color values available on-demand while writing Sass code I created a lookup function. In my case, the function mapped a brand name in `$brand-names` to a brand color in `$brand-color`:

    // Lookup function for a brand, returns a color
    @function get-brand-color($search) {
        $index: index($brand-names, $search);
        @return nth($brand-colors, $index);
    }

In the example above, `$search` is the brand name I’m looking for in `$brand-names`. The function returns the brand’s corresponding color. A simpler way of writing this would be to nest the list function `index()` like so:

    // Lookup function for a brand, returns a color
    @function get-brand-color($search) {
        @return nth($brand-colors, index($brand-names, $search));
    }

As an example, if I needed `<div class="facebook-box">` to have the background color of Facebook, I could do:

    div.facebook-box {
        background: get-brand-color("facebook");
    }

The `get-brand-color` function takes the value I passed to it (facebook) and searches the list `$brand-names` for that value, returning its index position in the list. Then, the function grabs the corresponding index in `$brand-colors`, which should be the brand name's color (if you’ve mapped your lists correctly). The CSS output would look like this:

    div.facebook-box {
        background: #ff8811;
    }

## Conclusion

There are some good work arounds to variable interpolation available. Hopefully these examples get you on the right track for your own projects until Sass 3.3 is stable for release. Happy coding!