#grateful

# Grateful: Colors in console.log()

So there I am, having an issue where my UI state isn’t updating correctly. What do I do? What every developer does: turn to `console.log()` and troubleshoot by logging values.

I have a named color (e.g. `blue`) and a corresponding HSL color string for that named color (e.g. `100 50% 0%`). I log those in the click handler function where I expect the color to change.

```js
onClick={() => {
  // Some stuff...
  
  console.log(
    `theme change: ${colorName} ${colorHslString}`
  )
}
```

Then I go click around in the UI and observe the bug. The problem is, when I look at the console to see if what the UI is doing matches what the code is doing, it’s impossible to tell. The values are indiscernible because I can’t read HSL.

<img src="https://cdn.jim-nielsen.com/blog/2024/console-log-colors-1.gif" width="344" height="480" alt="Animated gif of a mouse clicking an orange button, then a purple button, then back to the orange button and the console logging HSL color string values each time it gets clicked." />

Do you know if `262.1 83.3% 57.8%` is “violet” off the top of your head? Well I don't.

Then this vague memory hits me: can’t you log something to the console with a bit of color? Sure enough, I find [a reference in my notes](https://notes.jim-nielsen.com/#2018-08-24T1227)!

So I update my `console.log()` statement to style the log statement the same color value it’s logging, making it super easy to visually diff!

```js
console.log(
  `%c theme change: ${colorName} ${colorHslString}`,
  `color: white; background-color: hsl(${colorHslString})`
);
```

Now when it says “violet” it should actually paint a color that looks like violet. Here’s what debugging looks like under this scenario:

<img src="https://cdn.jim-nielsen.com/blog/2024/console-log-colors-2.gif" width="344" height="480" alt="Animated gif of a mouse clicking an orange button, then a purple button, then back to the orange button and the console logging HSL color string values each time it gets clicked that are styled with a color." />

Yes! That’s super helpful. I can see the color name being logged doesn’t match the color value. That gives me a really good sense for where the bug is.

I look at the code, fix the bug, then go back to the UI and test again:

<img src="https://cdn.jim-nielsen.com/blog/2024/console-log-colors-3.gif" width="344" height="480" alt="Animated gif of a mouse clicking an orange button, then a purple button, then back to the orange button and the console logging HSL color string values each time it gets clicked that are styled with a color." />

Boom! It works.

So I’m expressing my gratitude for being able to style `console.log` statements!
