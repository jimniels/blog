# JavaScript Is Enabled by Default in Web Browsers

It’s easy to talk bad about JavaScript (or at least its _abuse_) like it’s some kind of malware.

But it’s worth remembering that JavaScript is enabled _by default_ in web browsers.

JavaScript is not so terrible, so harmful, so taboo, so _something you shouldn’t use_ that it’s turned off by default in web browsers.

Want access to a user’s camera? You have to ask permission. 

Want access to their location? Ask permission.

Their microphone? Permission.

But want them to run some JavaScript? This capability is enabled by default, no permission necessary.

Browsers are pro-JavaScript.

And progressive enhancement? It’s also pro-javascript. It advocates for experiences enabled exclusively by JavaScript: build the core functionality, then enhance! And leverage JavaScript for what JavaScript alone can do.

Browsers don’t turn off Javascript by default. And you don’t have to either. What’s important to note is that web experiences can work without it (or _before_ it).

Building in layers of technology (HTML, CSS, JS — [in that order](https://blog.jim-nielsen.com/2023/meaning-in-web-tech-stack-ordering/)) is how the web is designed to work. It breeds resiliency.

URLs lead to HTML which leads to CSS and JS. Start at the bottom layer and build up, ensuring new layers enhance on the layers beneath them and core functionality remains working if the technology breaks at any layer.