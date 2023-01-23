# A Short History of Port Numbers in Web Development

As I go through my daily work in web dev, I constantly have questions bouncing around in my head that are too low of a priority to really research. But, when they bounce around in my head long enough, my curiosity won’t let me sit idly by.

One such bouncing question deals with port numbers. It seems like every time I run  `npm start` on a web project, it’s a roll of the dice as to which port of `localhost` I’ll get a local dev server on.

I understand perfect uniformity across all projects is unlikely (not everyone will be on port `8000`), but it’s also not completely random across the entire spectrum of thousands of ports (I never get a local dev server on `4971` or `9571` or `6373`).

Why does the local dev server port always seem to be a random selection between about four to five ports?

[I asked on Twitter](https://twitter.com/jimniels/status/1598436595421663237):

> Does somebody have an article like "A short history of port numbers" that describes why I never get a consistent default port experience across tools? Some commons ones I consistently see:
>
> localhost  
> localhost:3000  
> localhost:8000  
> localhost:8080  
> localhost:8888

And further:

> why/where did those numbers pop into our collective culture? why not 2000 or 4000? or why not 6666? or any other random number for that matter?

To be clear, this post is not meant to be the definitive answer to that question. But I read enough random links on the internet to arrive at what feels like a satisfactory answer (though I can’t vouch for the accuracy of it).

So I will try re-stating what I found across various resources on the web and see if I can weave them all into a coherent narrative.

## Ports 80**

Ports 0-1023 are considered “system ports” (a.k.a “well-known ports” or “privileged ports”). They are reserved by the system for specific applications.

For example, the following ports are reserved by the system for well-known services:

- `21` FTP
- `25` SMTP
- `80` HTTP
- `443` HTTPS

But why `80` and `443` for HTTP and HTTPS? Why not `51` and `666`?

[It appears](https://www.howtogeek.com/233383/why-was-80-chosen-as-the-default-http-port-and-443-as-the-default-https-port/) that IANA (a department of ICANN) published RFC1060 in 1990 listing all well-known ports at that point in time and port 80 was unclaimed. When Tim Burners-Lee issued the first version of HTTP in 1991, he used port 80 for HTTP. Later, in 1992, RFC1060 was reissued and port 80 was claimed by HTTP. As for `443`, its history is less clear but it officially showed up as claimed by HTTPS in an RFC in 1994.

Ok so, an HTTP server runs on port `80`. But what if you’re doing local development? The standard HTTP port `80` is privileged and requires `root` access (which would be a hassle to provide every time you start the server). Plus, you don’t want your development server interfering with other running processes on your machine. So what you need is an alternative port number for your local dev server that is above 1024.

What number do you choose? Well, I’m going to guess that people just wanted a number that was easy to remember so they went with variants of the reserved HTTP port (`80`) which is how we got conventions for local HTTP servers to run on ports like `8000`, `8080`, `8888` and `8008`[^1]. 

It appears that lots of services (and malware) were built on top of these well-known HTTP alternative ports. For example:

- [Port `8000`](https://www.speedguide.net/port.php?port=8000): was used by VmWare, VMotion, AWS Local DynamoDB, Canon Management Console, Django Dev Server, and Winamp Audio Streaming — but also by malware and spybots.
- [Port `8080`](https://www.speedguide.net/port.php?port=8080) was used by Unreal Tournament and Microsoft Lync — but also by trojans and backdoor worm exploits.
- [Port `8888`](https://www.speedguide.net/port.php?port=8888) was used by MAMP — but also, you get it, more malware.

## Ports 30**

So what about port `3000`? That doesn’t even have an eight in it anywhere. Where did that number come from?

I’m personally aware of the prevelance of port `3000` because of its ubiquity in the Node ecosystem. But from what I gather, Ruby (which predates Node) also uses `3000` prevalently (and, as you probably guessed, [malware uses it too](https://www.speedguide.net/port.php?port=3000)). Ultimately, I cannot find a story behind that port.[^2]

That said, once a project like Node does something you can imagine how it spreads: for whatever reason, somebody starts using port `3000` in code or docs or examples, and that spreads to become the standard port for starting an HTTP server in Node. From there the number spread like wildfire into the community and tooling (which would explain why the first place I remember seeing port `3000` used in a dev server was when I first used `create-react-app`).

## Conclusion

Phew. I think I have sufficiently answered my own question to a degree of satisfaction where my curiosity will let me rest.

Some additional links from my research:

- [“What's the story behind port 8080?” on Quora](https://www.quora.com/Whats-the-story-behind-port-8080)
- [“Why is port 3000 used when running a Node.js application?” on Quora](https://www.quora.com/Why-is-port-3000-used-when-running-a-Node-js-application)
- [“List of TCP and UDP port numbers” on Wikipedia](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)
- [“Registered port” on Wikipedia](https://en.wikipedia.org/wiki/Registered_port)
- [“Priviliged ports” on w3.org](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html)
- [“Service Name and Transport Protocol Port Number Registry” on iana.org](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?page=109)
- [“Port 8080” in the Port Authority Database (from the Gibson Research Corporation)](https://www.grc.com/port_8080.htm)

[^1]: IANA is responsible for resources related to internet protocols and it appears you can register (i.e. reserve) commonly used port numbers for well-known services. For example, `8008`, `8080`, and `591` are all considered HTTP alternatives, a.k.a. [`http-alt`](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=http-alt). `591` seems like a random outlier, but it appears to be because [FileMaker chose to use it](https://www.speedguide.net/port.php?port=591) as an alternative port (and [registered it](https://community.claris.com/en/s/article/Specifying-a-port-number-for-Instant-Web-Publishing-1503692906237) as one).
[^2]: [Port 3000 is registered with IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=3000) for “RemoteWare Client” and “HBCI”. If you Google those names with the people who registered them, the furthest convo back I can find is an obscure mailing list text that sheds no light on the subject. So who knows where `3000` came from.