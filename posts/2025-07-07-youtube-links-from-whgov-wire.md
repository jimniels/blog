# Follow Up: An Analysis of YouTube Links From The White House’s “Wire” Website

After publishing my [Analysis of Links From The White House’s “Wire” Website](https://blog.jim-nielsen.com/2025/links-from-whgov-wire/), Tina Nguyen, political correspondent at _The Verge_, reached out with some questions.

Her questions made me realize that the numbers in my analysis weren’t quite correct (I wasn’t de-depulicating links across days, so [I fixed that problem](https://blog.jim-nielsen.com/2025/links-from-whgov-wire/#update-2025-07-03)).

More pointedly, she asked about the most popular domain the White House was linking to: YouTube. Specifically, were the links to YouTube 1) independent content creators, 2) the White House itself, or 3) a mix. 

A great question. I didn’t know the answer but wanted to find out. A little JavaScript code in my spreadsheet and boom, I had all the YouTube links in one place.

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-followup-youtube-links.png" width="851" height="1024" alt="Screenshot of a table of data in a spreadsheet showing all the links to YouTube from wh[dot]gov/wire" />

I couldn’t really discern from the links themselves what I was looking at. A number of them were to the `/live/` subpath, meaning I was looking at links to live streaming events. But most of the others were YouTube’s standard `/watch?v=:id` which leaves the content and channel behind the URL opaque. The only real way to know was to click through to each one.

I did a random sampling and found most of the ones I clicked on all went to The White House’s own YouTube channel. I told Tina as much, sent here the data I had, and [she reported on it in an article at _The Verge_](https://www.theverge.com/politics/698148/white-house-wire-youtube).

Tina’s question did get me wondering: _precisely_ how many of those links are to the White House’s own YouTube channel vs. other content creators?

Once again, writing scripts that process data, talk to APIs, and put it all into 2-dimensional tables in a spreadsheet was super handy. 

I looked at all the YouTube links, extracted the video ID, then queried the YouTube API for information about the video (like what channel it belongs to). Once I had the script working as expected for a single cell, it was easy to do the spreadsheet thing where you just “drag down” to autocomplete all the other cells with video IDs.

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-followup-dragdown.gif" width="480" height="200" alt="Animated gif of a mouse cursor dragging down the cell cursor in a spreadsheet and data being fetched (from an API) and populated in spreadsheet cells" />

The result?

From May 8th to July 6th there were 78 links to YouTube from `wh.gov/wire`, which breaks down as follows:

- 73 links to videos on the White House’s own YouTube channel
- 2 links to videos on the channel “Department of Defense”
- 1 link to a video on the channel “Pod Force One with Miranda Devine”
- 1 link to a video on the channel “Breitbart News”
- 1 link to [a video](https://www.youtube.com/watch?v=2g8HctzQCIo) that has since been taken down “due to a copyright claim by Sony Music Publishing” (so I’m not sure whose channel that was)

<img src="https://cdn.jim-nielsen.com/blog/2025/whwire-followup-piechart.png" width="559" height="336" alt="Pie chart showing the percentage distribution of data points among four sources: The White House (94.7%, shown in blue), Department of Defense (2.63%, red), Pod Force One with Miranda Devine (1.32%, green), and Breitbart News (1.32%, purple)." />

