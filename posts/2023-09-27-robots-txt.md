# Robots.txt 

A few weeks ago, I saw a flurry of conversation  about how you can now disallow OpenAI from indexing your personal website using `robots.txt`:

```
User-agent: GPTBot
Disallow: /
```

That felt a bit “ex post facto“ as they say. Or, [as Jeremy put it](https://adactio.com/links/20380), “Now that the horse has bolted—and ransacked the web—you can shut the barn door.”

But folks seemed to be going ahead and doing it anyway and I thought to myself, “Yeah, I should probably do that too…” (especially given how [“fucking rude”](https://chriscoyier.net/2023/04/21/the-secret-list-of-websites/) AI is in [not citing its sources](https://blog.jim-nielsen.com/2023/cite-your-sources-ai/)).

But I never got around to it.

Tangentially, Manuel asked: what if you updated your `robots.txt` and blocked all bots? What would happen? Well, he did it and after a week he followed up. [His conclusion](https://manuelmoreale.com/@/page/uwGISnOGX0zwjr7P)?

> the vast majority of automated tools out there just don't give a fuck about what you put in your robots.txt

That’s when I realized why I hadn’t yet added any rules to my `robots.txt`: I have zero faith in it.

Perhaps that faith is not totally based in reality, but this is what I imagine a `robots.txt` file doing for my website:

<img src="https://cdn.jim-nielsen.com/blog/2023/robots-txt-signs-rock.jpg" width="320" height="427" alt="Photograph of a “DO NOT ENTER” sign on a rock cliff and people have passed it and are standing out on the edge of the cliff." />

<img src="https://cdn.jim-nielsen.com/blog/2023/robots-txt-signs-beach.jpg" width="400" height="267" alt="Photograph at a beach with a sign that says “POISONOUS SPECIES DO NOT STEP INTO WATER” and people are all standing in the surf." />

<img src="https://cdn.jim-nielsen.com/blog/2023/robots-txt-signs-dog.jpg" width="500" height="346" alt="Photograph of a sign painted on the ground that says “NO DOGS ALLOWED” and there’s an adorable puppy sitting on the “NO” looking at the camera." />
