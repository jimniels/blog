# Quick and Dirty Text Diffing

[Chris posted](https://chriscoyier.net/2022/05/17/need-a-quick-diff/) about something I often find myself needing: how do I do a quick diff on two sets of text?

He shows how to do it with GitHub Gists. He also links to the online tool [Diffchecker](https://www.diffchecker.com/), which is what I usually use for a quick and easy diff.

But a part of me has always wanted a native tool doing something like this. So [I asked on Twitter](https://twitter.com/jimniels/status/1526752234079281152) what folks do.

A lot of the replies came in the form of CLI commands to diff two existing files.

[@johncjago suggested](https://twitter.com/johncjago/status/1526784370450776064) the built-in `diff`:

```sh
diff file1.txt file2.txt
```

[@pawelgrzybek suggested](https://twitter.com/pawelgrzybek/status/1526819953210445826) vscode’s CLI tool (hats off to him for having [a blog post on the matter](https://pawelgrzybek.com/my-favourite-visual-studio-code-tips-for-how-did-you-do-it-kind-of-people/#use-visual-studio-code-as-a-diff-tool)).

```sh
code --diff file1.txt file2.txt
```

And [@geoff_l suggested](https://twitter.com/geoff_l/status/1526753861570002947) the nuclear option (or the enlightened option, however you look at it): `vim`.

```
vim -d file1.txt file2.txt
```

All great suggestions. 

What I really want, though, is a solution that lets me diff two pieces of text _that aren’t yet files_. Copy/paste some text into pane 1, copy/paste some text into pane 2, and hit the big red “DIFF” button.

[@hybrid_alex suggested](https://twitter.com/hybrid_alex/status/1526758138568921090) [Kaledeiscope](https://kaleidoscope.app) (which I’ve always thought to be just a beautiful Mac app) and, turns out, you can diff text from the clipboard!

<img src="https://cdn.jim-nielsen.com/blog/2022/diff-tools-kaleidoscope-splash-screen.png" width="532" height="644" alt="" />

Copy/paste two different sets of text and you’ve got the Kaleidoscope diff tool at your disposal.

<img src="https://cdn.jim-nielsen.com/blog/2022/diff-tools-kaleidoscope-diff.png" width="932" height="624" alt="" />

Granted Kaleidoscope costs money, but it’s a great looking app, has lots of other features (including image diffing), and has been around forever, so I thought that would be my solution.

Then along came [@MRWweb who suggested](https://twitter.com/mrwweb/status/1526942428682285056) looking into an extension in vscode. Turns out, there’s a great extension called [Partial Diff](https://marketplace.visualstudio.com/items?itemName=ryu1kn.partial-diff) which allows you to diff snippets of text — from the clipboard, from saved files, from unsaved files, it’s quite versatile — and compare them right inside vscode.

What I love about this tool is it lets me do exactly what was in my head:

1. Open a pane and paste some text.
2. Open another pane and paste some text.
3. Hit “Diff”

You can see here I have my two _unsaved_ tabs of text in vscode.

<img src="https://cdn.jim-nielsen.com/blog/2022/diff-tool-vscode-text.png" width="1319" height="1124" alt="" />

I then right click and get a menu with Partial Diff’s options (my favorite is the “Compare Text in Visible Editors”).

<img src="https://cdn.jim-nielsen.com/blog/2022/diff-tool-vscode-context-menu.png" width="437" height="672" alt="" />

Then a new tab opens showing my diff (similar to what you’d see if you can `code --diff` from the CLI).

<img src="https://cdn.jim-nielsen.com/blog/2022/diff-tool-vscode-diff.png" width="1319" height="1124" alt="" />

It’s a great solution that gains an upperhand by being integrated right into my code editor.

## Update 2022-05-19

Turns out, you don’t even need an extension to do this!

[@chrisofspades came late to the party](https://twitter.com/chrisofspades/status/1527322594285740037) noting that you can do ephemeral text diffing in vscode without any extensions at all.

1. Copy/paste to untitled doc1
2. Copy/paste to untitled doc2
3. `CMD + Shift + P` “Compare active file with…” and select doc 1.

<img src="https://cdn.jim-nielsen.com/blog/2022/diff-tools-vscode-native.gif" width="976" height="720" alt="Animated gif showing the command palette in vscode running the “compare active file...” diff command." />