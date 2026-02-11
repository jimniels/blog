# Unresponsive Buttons on My Fastest Hardware Ever

This is one of those small things that drives me nuts.

Why? I don’t know. I think it has something to do with the fact that I have a computer that is faster than any computer I’ve ever used in my entire life — and yet, clicking on buttons results in slight but perceptible delays.

Let me explain.

Imagine a button that looks like this:

```jsx
<Button
  onClick={async () => {
    const data = await getSessionUrlFromStripe(id);
    window.location = data.url;
  }
>Upgrade to Pro</Button>
```

For SPA apps, when the user clicks that button it takes a split second (even on a fast connection) for anything to happen because:

- The browser makes a request to the server
- The server talks to Stripe to get a session
- The server responds with the session data to the client
- The client redirects

When clicking on that button, even on a fast connection, my brain glitches for a second, my thought process going something like:

- I click
- [nothing happens]
- I think “Did that work?”
- Just as I’m about to click again, I see the URL bar change
- I think, “Oh, ok, it’s doing _something_.”
- I stop myself from clicking again while I wait for the UI to redraw

Granted those thoughts occur in my brain in under a second, but I hate that pause of indetermination.

I clicked, I want (perceptibly) _instant_ feedback. If something is happening, tell me!

For SPA apps, you could put some state in there, like:

```jsx
const [isLoading, setIsLoading] = useState(false);

return (
  <Button
  onClick={async () => {
    setIsLoading(true);
    const data = await getSessionUrlFromStripe(id);
    window.location = data.url;
  }
  >{isLoading ? 'Upgrading...' : 'Upgrade to Pro'}</Button>
)
```

This would provide more immediate feedback. But it also raises a whole set of other questions:

- Is that actually the interaction you want, where the text changes? That’s probably gonna shift layout. Maybe you want something different, like a spinner in place of the text. How do you handle that?
- What if you have multiple places to upgrade? Do you have to implement `isLoading` state in all those places too? What if the trigger in each place is slightly different? A button here, some text there, and icon over yonder? How do you handle all of those different interactions in a standard, immediate way?
- Errors. What if it fails? Well, we already weren’t handling that in the first code example were we? But maybe we should…

Oh boy, this is getting complicated isn’t it?

This is why, I assume, lots of apps just don’t deal with it. 

They accept there will be a slight delay in the responsiveness of the UI (and that it might error, but the user can just click again) and justify that it’s really not that big of a deal if there’s a slight, almost imperceptible delay between clicking a button and seeing the UI respond.

“We’ve got bigger fish to fry.”

And it makes sense. I mean, a slight delay in UI responsiveness, is that why people will or won’t buy your thing? Seems like a small detail. Who’s got the time to spend on details like this?Who cares? 

I care. That’s why I’m writing this post.

To my original point, every piece of hardware I currently own is the fastest version of that device I’ve ever had in my life. And yet, everywhere I go I encounter lag. [Lag everywhere.](https://world.hey.com/jason/the-big-regression-da7fc60d)

And I’m grumpy about it, hence this post.