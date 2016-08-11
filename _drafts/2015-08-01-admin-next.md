---
title: Redesigning the User Experience for Unauthenticated App Users on Groundwork Admin
date: 2015-08-11
tags: design-process
---

At Timshel, we had an application called “Admin” ...

## It All Started With an Idea

One day, after I had been doing a lot of coding, I felt like I wanted a design exercise. The login page for Admin felt like it could use a facelift to better match the UI and aesthetic that we were using “inside” of the app, i.e. once a user authenticated. So I decided to take a stab at redesigning the login page.

![Screenshot of old login page of Admin]({{ site.imageurl }}/2016/admin-old-login.png "The “old” login page for Admin.")

Piggy-backing on the material design aesthetic which we were using inside of our application, I opened Sketch and by the end of my exercise had two mocks: one with a heavy usage of a solid color, the other with a lighter usage of it.

![Screenshot of new login page mock for Admin with heavy color]({{ site.imageurl }}/2016/admin-old-login.png "First mock of login page with heavy usage of solid color.")

![Screenshot of new login page mock for Admin with light color]({{ site.imageurl }}/2016/admin-old-login.png "Second mock of login page with lighter usage of solid.")

After doing this exercise, I kind of liked the direction, so I presented the mocks to the design team to see if there was any interesting in pursuing this direction. Everyone seemed to like the lighter version of the login page and thought it would be worthwhile pursuing these ideas more.

## Then Things Got Real

If I was going to pursue redesigning the login screen, I would need to also look at the associated views for unauthenticated users so that I could do a holistic aesthetic realignment. So I began by documenting all the views that were accessible to users who had not yet logged in to the application:

- `/`, Login
- `/sign-out` Logout
- `/select-an-org`, Logged in, now choose an organization
- `/new-member-setup` Message saying you gotta have an invite
- `/new-member-setup/:token` Setup your account password
- `/forgot-password` Enter your email to reset your account password
- `/forgot-password/:token` Setup a new account password

I reviewed all the current designs for these views, looking for existing patterns I could either use as-is, reinforce, or break out and setup as their own. Through the process, I found various shared components that were used across all the views. I decided to focus my efforts on creating a design for each of these pieces, which would then allow me to setup all the views with a consistent design like putting the pieces of a puzzle together:

- Logo
- Message
- Secondary link
- Reset password form
- Copyright & other text

![Overview of page patterns on old layout]({{ site.imageurl }}/2016/admin-old-page-patterns.png "Discovering patterns across each of the old views helped know where and how to start designing.")
