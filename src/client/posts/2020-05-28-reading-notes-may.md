#readingNotes

# Reading Notes, May 2020

## Article: [“How HTTP Requests Work”](https://christine.website/blog/how-http-requests-work-2020-05-19)

> If the browser notices the server supports HTTP/2 it sets up a HTTP/2 session (with a handshake that involves a few roundtrips like what I described for DNS) and creates a new stream for this request. The browser then formats the request as HTTP/2 wire format bytes (binary format) and writes it to the HTTP/2 stream, which writes it to the HTTP/2 framing layer, which writes it to the encryption layer, which writes it to the network socket and sends it over the internet.

Fascinating look at all that’s happening to merely visit something like `website.com`. To be quite honest, it’s incredible any of it even works at all.

## Article: [“Realign 2020: Color”](https://tylergaw.com/articles/realign-2020-color/)

Tyler reflecting on the rationale and process in his color choices. In a world where we’re constantly creating static digital mockups as the artifacts for gathering consensus to build something, this is a good reminder to constantly question: is this design meant to be looked at, or actually used?

> Letting contrast ratios influence aesthetic decisions can be a little uncomfortable. As an experienced designer, I have a trained eye that I trust to choose colors that work well and look good. But, that’s not the whole story. My instincts towards subtlety often lead to colors that look fantastic, but are low in contrast. Low contrast text can be difficult for people to see. Color needs more than my instincts alone. So I let go of a bit of control.
> 
> Letting go can produce great results. Results that make a design accessible and enjoyable to more people.

## Article: [“Attitude of Ingratitude”](https://revdancatt.com/weeknotes/2020/04/27/24-attitude-of-ingratitude)

Evergreen excerpt to reference:

> Before I stopped using twitter, and since starting it up again, I decided always to be positive while using it. Or rather, not to be negative. It was very easy to, for example, watch a slightly substandard film, pop online and go “Oh lol, just watched a terrible film, something, something.” While forgetting that people worked hard on it, and everything that goes along with how much effort goes into producing anything from start to end.

## Video: [“Rosie Pattern Language: Improving on 50-Year Old Regular Expression Technology”](https://www.youtube.com/watch?v=MkTiYDrb0zg)

Based on [some recommendations on Twitter](https://twitter.com/jimniels/status/1258464896418807812?s=20), I started watching some Strangeloop talks. To be honest, I don’t fully grasp a lot of what’s being discussed in these talks, but there are little bits and pieces I find and note down. 

In this particular talk, Jamie points out an interesting historical fact around regexes. My familiarity with regexes is: those big cryptic pattern matching strings I hopefully never have to deal with much. I found it interesting that what makes them scary (a regex that’s more than like seven characters long) is basically due to the over-extension of a constraint that shaped their original design.

> This is an interesting point of origin: [regex's] usefulness on the command line and while editing led directly to how concise regular expressions are—which is great if you need to be concise. If you don't need to be concise it means that the syntax is rather cryptic.
