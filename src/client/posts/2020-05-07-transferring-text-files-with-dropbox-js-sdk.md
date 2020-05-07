---
tags: engineering
---

# Downloading and Uploading Text Files Using the Dropbox JavaScript SDK

I’ve been toying around with an idea for a new project. Because I don’t want to—and don’t really know how to—deal with setting up a database as a storage layer, I’ve decided to try using Dropbox. Benefits?

- Free. As in, I already pay for a Dropbox account.
- Quality. Lots of smart folks at Dropbox, so their API and services are fast and dependable. 
- Familiar. No need to use a database and learn SQL. Just store my app data as textual JSON files in a Dropbox folder based on some naming schema. If I screw something up, I just open the folder on my Mac and delete files, rename them, open and edit them, etc.

I have to admit, using the [Dropbox JavaScript SDK documentation](http://dropbox.github.io/dropbox-sdk-js/index.html) hasn’t been the easiest thing. Don’t get me wrong, they definitely have thorough, extensive documentation—the docs just aren’t exactly beginner friendly. That’s ok though, it’s making me learn a lot. A lot which I want to write down because when I was searching for solutions to my problems I didn’t find a lot of helpful articles on the internet from people who had similar questions.

So let’s talk about [Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and [Files](https://developer.mozilla.org/en-US/docs/Web/API/File) in JavaScript, something I knew nothing about before this article and now know slightly more than nothing about. 

Note: it’s worth mentioning that, in this post, I’m specifically talking about downloading and uploading textual JSON files to Dropbox. If you’re working with non-textual files in Dropbox, this post might not be what you’re looking for.

## Downloading a File

When you try to download a file from Dropbox using the JS SDK, you’ll use [`filesDownload`](http://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesDownload__anchor) which will give you back a representation of the file that looks something like this:

<img src="https://cdn.jim-nielsen.com/blog/2020/blobs-dropbox-file-response.png" alt="" width="563" height="179" />

There’s some general information there about the file itself. But I wanted to get the contents of the file, how would I do that? “Oh hey, look at that little key named `fileBlob` of type `Blob`...I bet that’s what I’m looking for,” I thought to myself. But what the hell is a blob and how do I use it?

After doing some research, I realized blobs have a method named `.text()` that returns a promise that resolves to a string. Perfect! Just what I wanted, the textual contents of the file. Seems like I had the makings of what I wanted.

```js
dropbox
  .filesDownload(...)
  .then(file => file.fileBlob.text())
  .then(contents => {
    // do my thing here...
  });
```

I followed that pattern and boom! It worked. I still don’t fully understand what blobs are, but it worked, so it’s all good.

But actually it’s not all good because `.text()` doesn't work in some browsers, including Safari. [According to MDN](https://developer.mozilla.org/en-US/docs/Web/API/Blob/text), I should be using the `FileReader` method `readAsText()` as it has better browser support. The ergonomics of that API aren’t as clean, since `readAsText()` is not a promise-based API but rather an event-based one. Whatever, I can make it work. I’ll wrap it all up in a promise.

```js
return new Promise((resolve, reject) => {
  dropbox
    .filesDownload(...)
    .then((file) => {
      var reader = new FileReader();
      reader.onload = () => {
        resolve(JSON.parse(reader.result));
      };
      reader.readAsText(file.fileBlob);
    }).catch(err => reject(err));
})
```

Cool, so that’s how you download a textual file from Dropbox and access it’s contents.

## Uploading a File

Then I got to uploading a file. Similar to the above, I wanted to upload a file to Dropbox. Should be easy, right? Dropbox SDK has a [`filesUpload`](http://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesUpload__anchor) method which asks for a [`FilesCommitInfo`](http://dropbox.github.io/dropbox-sdk-js/global.html#FilesCommitInfo) argument which, amongst other things, asks for the `contents` of the file upload. But `contents` is not a string. It’s an `Object`.

<img src="https://cdn.jim-nielsen.com/blog/2020/blobs-dropbox-filescommitinfo.png" width="779" height="376" />

But what kind of object? I honestly had no idea. And the docs didn’t say. After some digging, I found that Dropbox provided [an example of a file upload with the SDK](https://github.com/dropbox/dropbox-sdk-js/blob/master/examples/javascript/upload/index.html). What did it upload as `contents`? A `File` object retrieved from an `<input type="file">` in the DOM. So that got me reading about the [File interface](https://developer.mozilla.org/en-US/docs/Web/API/File). While the Dropbox example was helpful in allowing me to see what `contents` should be (a `File` object), their particular example of a `File` object supplied by the browser via an `<input>` wasn’t relevant to my use case. I needed to dynamically create a `File` object myself in memory. But how? [According to MDN](https://developer.mozilla.org/en-US/docs/Web/API/File/File), the first argument of the `File` constructor takes:

> An `Array` of `ArrayBuffer`, `ArrayBufferView`, `Blob`, `USVString` objects, or a mix of any of such objects, that will be put inside the `File`. `USVString` objects are encoded as UTF-8.

That didn’t make much sense, but I thought “Hey, there’s that `Blob` keyword again. Exactly what I used to download a file from Dropbox.” So it seems these `Blob`s and `File`s must be related _somehow_. As described above, I figured out how to consume a `Blob` of a file using `FileReader`, but what about creating a file? After some searching, I found this very useful answer on StackOverflow showing me [how to instantiate a new File object in JavaScript](https://stackoverflow.com/questions/8390855/how-to-instantiate-a-file-object-in-javascript). I could pass a string representing the file’s contents into an array in the `File` constructor:

```js
const myJsonData = {
    id: Date.now()
    title: "Untitled Thing",
    description: "Some description here..."
};
return new Promise((resolve, reject) => {
  dbx
    .filesUpload({
      path: `/path/to/file-name.json`,
      contents: new File(
        [JSON.stringify(myJsonData, null, 2)],
        "file-name.json",
        { type: "application/json" }
      ),
      // ...other dropbox args
    })
    .then(() => resolve())
    .catch((err) => reject(err))
});
```

I’m going to guess this isn’t the only way to do this, but the above does work. Cool!

Hopefully this helps you, fellow beginner, understand how to download and upload textual files using the Dropbox JavaScript SDK.