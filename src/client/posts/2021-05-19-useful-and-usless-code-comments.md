# Useful and Useless Code Comments

I’ve been reading John Ousterhout’s [_A Philosophy of Software Design_](https://www.abebooks.com/9781732102200/Philosophy-Software-Design-Ousterhout-John-1732102201/plp).

At one point in the book, he gives this advice about code comments:

> Unfortunately, many comments are not particularly helpful. The most common reason is that comments repeat the code: all of the information in the comment can easily be deduced from the code next to the comment.

Then he gives an example to illustrate what he’s talking about:

```
// Add a horizontal scroll bar
hScrollBar = new JScrollBar(scrollBar, HORIZONTAL);
add(hScrollBar, BorderLayout.SOUTH);

// Add a vertical scroll bar
vScrollBar = new JScrollBar(JScrollBar.VERTICAL);
add(vScrollBar, BorderLayout.EAST);

// Initialize the caret-position related values
caretX = 0;
caretY = 0;
caretMemX = null;
```

The argument against comments like these is that they are “at the same level of detail” as the code itself. The code is clear in its intention, therefore the comments are redundant.

John goes on to state that, to be useful, comments should provide a level detail not deducible from the code:

> Comments augment the code by providing information at a different level of detail. Some comments provide information at a lower, more detailed, level than the code; these comments add _precision_ by clarifying the exact meaning of the code. Other comments provide information at a higher, more abstract, level than the code; these comments offer _intuition_, such as the reasoning behind the code, or a simpler and more abstract way of thinking about the code.

I think this is a very fair and rationale explanation around what makes comments in code useful or not.

And yet, I have some opinions.

If somebody says a comment isn’t adding any value, I would ask: to whom?

Personally, I’ve never liked the advice that writing obvious comments is bad practice—probably because I write obvious comments all the time. 

Comments which are at the same level of detail as the code may not be useful to you as a fluent reader and writer of code, but they are to someone like me who is still figuring out how to read and write code. I find them useful as I _write_ code because they allow me to state my intention (in plain English), translate it to code, then compare statements and see how well I’ve achieved my goal.

Granted, if you’re collaborating with a team of people then you have to figure out how to write code together. And that might mean compromising and cutting out comments that are helpful to you but distracting to others (you can always do that at the end of your process of authoring the code).

Maybe this is an obvious statement, but if writing “useless” code comments helps you, then they are not _useless_. They’re the opposite: _useful_.

It reminds me of when I learned Spanish. People always said, “don’t do translation word for word in your head. Let the words mean what they mean in their natural language.” Yet this is precisely what I would do when I first learned the language:

- Hear phrase in Spanish
    - “¿Como te llamas?”
- Translate the phrase to English in my head
    - “What is your name?”
- Formulate the response in English in my head
    - “My name is Jim”
- Translate the phrase word for word into Spanish in my head
    - “Me llamo Jim”
- Repeat the phrase out loud

Eventually I became fluent enough where I didn’t need to do this manual, step-by-step, line-by-line translation in my head. Words had their own meaning in their own language. At that point, I realized it was useless (for me) to translate into English in my head. 

Taking this example a bit further, imagine this as code:

```
// What is your name?
¿Como te llamas?

// My name is Jim
Mi nombre es Jim.

// Where is the library?
¿Donde esta la biblioteca?
```

Given what people say about code comments, you might think comments like these are useless. From John’s book:

> Could someone who has never seen the code write the comment just by looking at the code next to the comment? If the answer is yes...then the comment doesn't make the code any easier to understand. 

Do those comments help the code become easier to understand? Well, that depends on who you ask.

Saying code comments are useless is a judgement from us as fluent readers of the code. It disregards the value comments have for someone less fluent than yourself who is either reading or writing code.

If you don’t consider yourself fluent, you might derive a lot of value from comments others label useless, obvious, or redundant because they help you translate something you're not that familiar with—another language—into something you are—English, for example.

And comments can serve a very different purpose when they’re being read vs. when they’re being written. Those are almost two different kinds of of activities.

So when someone calls a particular style of code commenting useless, ask yourself: to whom? Granted, you must be mindful of code you contribute to teams of people but especially on individual projects: if a particular kind of code comment is useful, keep doing it.