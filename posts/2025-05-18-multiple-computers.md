# Multiple Computers

I’ve spent so much time, had so many headaches, and encountered so much complexity from what, in my estimation, boils down to this: trying to get something to work on multiple computers.

It might be time to just go back to having one computer — a personal laptop — do everything. 

No more commit, push, and let the cloud build and deploy.

No more making it possible to do a task on my phone and tablet too.

No more striving to make it possible to do _anything_ from _anywhere_.

Instead, I should accept the constraint of doing specific kinds of tasks when I’m at my laptop. No laptop? Don’t do it. Save it for later. Is it really that important?

I think I’d save myself a lot of time and headache with that constraint. No more continuous over-investment of my time in making it possible to do some particular task across multiple computers.

It’s a subtle, but fundamental, shift in thinking about my approach to computing tasks.

Today, my default posture is to defer control of tasks to cloud computing platforms. Let them do the work, and I can access and monitor that work from any device. Like, for example, publishing a version of my website: git commit, push, and let the cloud build and deploy it.

But beware, there be possible dragons! The build fails. It’s not clear why, but it “works on my machine”. Something is different between my computer and the computer in the cloud. Now I’m troubleshooting an issue unrelated to my website itself. I’m troubleshooting an issue with _the build and deployment of my website across multiple computers_.

It’s easy to say: build works on my machine, deploy it! It’s deceivingly time-consuming to take that one more step and say: let another computer build it and deploy it.

So rather than taking the default posture of “cloud-first”, i.e. push to the cloud and let it handle everything, I’d rather take a “local-first” approach where I choose one primary device to do tasks on, and ensure I can do them from there. Everything else beyond that, i.e. getting it to work on multiple computers, is a “progressive enhancement” in my workflow. I can invest the time, if I want to, but I don’t have to. This stands in contrast to where I am today which is if a build fails in the cloud, I _have to_ invest the time because that’s how I’ve setup my workflow. I can only deploy via the cloud. So I have to figure out how to get _the cloud’s computer_ to build my site, even when my laptop is doing it just fine.

It’s hard to make things work identically across multiple computers.

I get it, that’s [a program not software](https://notes.jim-nielsen.com/#2025-04-16T1318). And that’s the work. But sometimes a program is just fine. Wisdom is knowing the difference. 