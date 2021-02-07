---
tags: thoughts
---

# IKEA, JavaScript, and Assembling Things Yourself

There’s [a tweet](https://twitter.com/kocienda/status/1355344814166876163) going around that’s been causing a stir:

> Web browsers are not operating systems or application development environments. They’re document viewers. The effort to make them into something more than that has been one of the biggest wrong turns in the history of computing.

And there are some good [responses](https://daverupert.com/2021/02/the-web-is-something-different/) to that tweet, including an [observation from Chris Coyier](https://css-tricks.com/the-web-is-for-more-than-document-viewing/) pointing out its irony: the author is leveraging a platform that whole-heartedly leverages the application nature of the web to criticize the application nature of the web.

All this got me thinking on a tangential subject which I wrote about in a previous article titled: [“The Economics of the Front-end”](https://blog.jim-nielsen.com/2020/economics-of-the-front-end/). I think there’s an interesting perspective in which we can look at how value is delivered over the web that doesn’t solely focus the technical merits of one approach vs. another but rather considers parallel trends elsewhere in the world. 

Honestly, I’m not saying much more in this article than “this is kind of interesting to think about.” So with that preface, let me begin.

## Self-Service

Self-service is the idea of allowing and enabling people to serve themselves when accessing a product. Here are a few basic examples:

- Banks: no need to come to the bank and see a human behind the desk to get cash, use an ATM.
- Grocery stores: no need to checkout with a human, use one of the self-checkout kiosks.
- Airlines: no need to call us and receive plane tickets by mail, buy online and print your tickets at home—or better yet, put them on your phone.

While these forms of self-service are pitched as advantageous to customers, they’re also a cost savings mechanism for businesses. In fact, there are a number of companies whose entire business/operating models hinge on the financial advantages that come from providing a form of self-service within their particular industry. An example I want to look at is IKEA.

## Self-Service and IKEA

I am not an expert in the furniture business and this is totally reductive look into this world, but let’s imagine a traditional furniture company. They take upon themselves the burden of doing business. They source the furniture, they assemble it, they put it in their store, and they sell it (they might even deliver it too). As a business, they have to employ human beings all along that spectrum, both to do the work and to manage the people doing the work. That costs money.

The customers who buy the furniture are getting a certain experience: they go to the store, look around, pick what they like, buy it, get it home, and place it in their house where they want it. That’s one way the customer/business relationship can function in the furniture business.

Another way to operate in the furniture business is to be like IKEA. To be overly-simplistic about it, unlike a traditional furniture store, IKEA doesn’t assemble the furniture for you. They design their furniture at a more economical size for delivery and the onus of assembling that furniture is on you, the customer. IKEA gives you materials and instructions, you put the product together.

This saves IKEA money because they don’t employ humans to do the assembling. At scale, this becomes incredibly cost effective because, amongst other factors, you don’t need to employ all those people to do that work. You make the customer the assembler. This saves the company money, and they can pass that savings on to you in the form of lower prices. You get a cheaper dresser, but you have to do some work.

The point is: there is an aspect of self-service here. IKEA designs delivers you furniture materials and instructions, you are required to put it all together.

## Self-Service and the Web

To recast the dichotomy of web site vs. web app in a different light, I think we’re seeing a form of self-service similar to IKEA show up in how business’ deliver value over the web.

Traditionally, a customer (user) would ask a server (business) for something. Based on what the server knew about you, it would gather a bunch of data, stitch it all together, and deliver it to you in a nice HTML document. This worked fine, until the idea of scale crept into how we develop for the web, starting with the big internet companies.

Let’s take Facebook for example. Here is a company with billions of users and every user’s newsfeed is unique. When you have billions of users, that's billions of different versions of Facebook which means billions of HTML documents. What does that mean? Billions of data requests to process, templating instructions to run, unique HTML documents to store, etc., all being done by Facebook’s servers. That means Facebook has to employ all that compute power. 

“What if,” you might ask in this same situation, “rather than us assembling all those HTML documents on our servers, our customers could do it for us?”

This is, in a way, the IKEA model: the business (server) gives the customer (client) the materials along with instructions and they serve themselves. Facebook gives each client some instructions—in the form of JavaScript code defining endpoints, templating instructions, etc.—and they assemble the ~~dresser~~ HTML document themselves. 

Facebook is providing a form of self-service to their customer by enabling each client to do the required computing themselves. The customer assembles the product and cuts out a whole swath of computing costs for the business. And the only way you can do that is through dynamic software on the client—meaning JavaScript. 

Achieving this kind of scale through self-service feels very similar to trends we see elsewhere in the marketplace. Provide customers raw materials and instructions and let them figure it out on their own. SPAs follow this model: give a client computer some instructions and hope they can serve themselves. But you also have to hope they the JavaScript works, otherwise that’s like getting your IKEA dresser but the instructions weren’t in the box.