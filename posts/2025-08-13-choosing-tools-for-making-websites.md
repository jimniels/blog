# Choosing Tools To Make Websites

Jan Miksovsky lays out his idea for [website creation as content transformation](https://goodinternetmagazine.com/site-creation-as-content-transformation/). He starts by talking about tools that hide what’s happening “under the hood”:

> A framework’s marketing usually pretends it is unnecessary for you to understand how its core transformation works — but without that knowledge, you can’t achieve the beautiful range of results you see in the framework’s sample site gallery.

This is a _great_ callout. Tools will say, “You don’t have to worry about the details.” But the reality is, you end up worrying about the details — at least to some degree.

Why? Because what you want to build is full of personalization. That’s how you differentiate yourself, which means you’re going to need a tool that’s expressive enough to help you.

So the question becomes: how hard is it to understand the details that are being intentionally hidden away?

A lot of the time those details are not exposed directly. Instead they’re exposed through configuration. But configuration doesn’t really help you learn how something works. I mean, how many of you have learned how typescript works under the hood by using `tsconfig.json`? As Jan says:

> Configuration can lead to as many problems as it solves

Nailed it. He continues:

> Configuring software is itself a form of programming, in fact a rather difficult and often baroque form. It can take more data files or code to configure a framework’s transformation than to write a program that directly implements that transformation itself.

I’m not a Devops person, but that sounds like Devops in a nutshell right there. (It also perfectly encapsulates my feelings on trying to setup configuration in GitHub Actions.)

Jan moves beyond site creation to also discuss site hosting. He gives good reasons for keeping your website’s architecture simple and decoupled from your hosting provider (something I’ve been a long time proponent of):

> These site hosting platforms typically charge an ongoing subscription fee. (Some offer a free tier that may meet your needs.) The monthly fee may not be large, but it’s forever. Ten years from now you’ll probably still want your content to be publicly available, but will you still be happy paying that monthly fee? If you stop paying, your site disappears.

In subscription pricing, any price (however small) is recurring. Stated differently: pricing is forever.

Anyhow, it’s a good read from Jan and lays out his vision for why he’s building [Web Origami](https://weborigami.org): a tool for that encourages you to understand (and customize) how you transform content to a website. He just launched [version `0.4.0` ](https://github.com/WebOrigami/origami/releases/tag/0.4.0) which has some exciting stuff I’m excited to try out further (I’ll have to write about all that later).