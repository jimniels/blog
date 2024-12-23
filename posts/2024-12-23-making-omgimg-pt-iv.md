#omgImg

# Making o(m)g:image, Part IV: URLs

This is part four of my series of posts describing how I made my  quiz game [o(m)g:image](https://omgimg.jim-nielsen.com).

- [Project Announcement](https://blog.jim-nielsen.com/2024/omgimg/)
- [Pt. I: Design Iterations](https://blog.jim-nielsen.com/2024/making-omgimg-pt-i/)
- [Pt. II: As Little JS As Possible](https://blog.jim-nielsen.com/2024/making-omgimg-pt-ii/)
- [Pt. III: The HTML](https://blog.jim-nielsen.com/2024/making-omgimg-pt-iii/)
- **Pt. IV: URLs**

The design of the game is simple:

- Each page has one question with four possible answers
- When an answer is chosen, show users if they were right or wrong
- Provide the ability to go to the next question

My first thought is to make each question a `<form>` with some `<input>` radios, e.g.

```html
<img src="question-1.jpg">
<form action="/questions/1/">
  <label>
    <input type="radio" name="answer" value="1">
    First answer
  </label>
  <label>
    <input type="radio" name="answer" value="2">
    Second answer
  </label>
  <!-- the other 2 questions -->
</form>
```

That makes a lot of sense for a quiz, but I realize that it necessitates a URL structure like this:

- Question: `/questions/1`
- Answer: `/questions/1?answer=1`

Why search params? Because that’s how a native HTML `<form>` submission works by default.

But I don’t want that because it requires either 1) something other than a static file server, or 2) client-side JavaScript. 

With this project, I know what I don’t want:

- I don’t want to manage a server
	- e.g. something to dynamically process a request to `/questions/1?answer=1` and respond with the appropriate HTML
- I don’t want to use some special, host-specific mechanism for routing
	- e.g. a `_redirects` file to re-route `/questions/1?answer=1` to the file `/questions/1/answers/1.html` on the server
- I don’t want to write any JavaScript for form submissions
	- e.g. to take a form submission that would normally route to `/questions/1?answer=1` and re-route it to `/questions/1/answers/1`

So what do I do? I use the same technology used on [the SpaceJam website from 1996](https://www.spacejam.com/1996/cmp/lineup/quizframes.html) to present a quiz: links!

```html
<img src="question-1.jpg">
<a href="questions/1/answers/1">First answer</a>
<a href="questions/1/answers/2">Second answer</a>
<!-- other 2 answers -->
```

This allows me to have a URL structure like this:

- Question: `/questions/1`
- Answer: `/questions/1/answers/1`

Which allows for:

- A static file server
- No special routing logic
- No JavaScript

[Form submissions as well as links can be navigations](https://blog.jim-nielsen.com/2024/navigations-on-the-web/).

It’s boring — almost feels unworthy of a blog post — but it’s solid approach to making a website that will require very little intervention in the coming years/decades. Hopefully this quiz lasts as long as the SpaceJam one from 1996.