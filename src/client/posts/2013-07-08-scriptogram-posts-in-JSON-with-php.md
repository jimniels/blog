---
title: Retrieving Recent Posts from Scriptogram in JSON Format Using PHP
date: 2013-07-08
tags: engineering
redirect_from: /posts/scriptogram-posts-in-JSON-with-php/
---

Do you use [Scriptogr.am](http://scriptogr.am/)? Do you want to programmatically retrieve your most recent posts from the service using PHP? It's not as simple as an API call, but it can be done.

## Before We Begin: The Javascript Method
In case you're interested, [Alex at sicanstudios](http://sicanstudios.com/post/recent-posts-scriptogram/) has a great tutorial on how to retrieve and display your most recent Scriptogr.am posts using javascript.

## The PHP Method
Scriptogr.am does not have a publicly accessible API. It does, however, provide an XML feed for each user. You can access your feed URL using this format:

```
http://scriptogr.am/USERNAME/feed/
```

If you use PHP's `file_get_contents()` and pass it your Scriptogr.am feed URL, you'll be returned your most recent posts and accompanying metadata in XML form.

### Converting XML to JSON in PHP
Now that we have the data we want, we've got to put it in the format we want (JSON). We can do that using the technique described in [this article from lostechies](http://lostechies.com/seanbiefeld/2011/10/21/simple-xml-to-json-with-php/).

## Cut to the Chase: The Code
Here's the final PHP snippet that does everything we've described above. Just change the `$username` value to your own Scriptogr.am username and you're good to go!

```js
function get_scriptogram_JSON() {
	$username = 'jimniels';
	$url = 'http://scriptogr.am/'. $username .'/feed/';
	$fileContents = file_get_contents($url);
	$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
	$fileContents = trim(str_replace('"', "'", $fileContents));
	$simpleXml = simplexml_load_string($fileContents);
	$json = json_encode($simpleXml);
	return $json;
}
```