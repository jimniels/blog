---
title: Redesigning the UI/UX for Unauthenticated Users
date: 2016-11-25
tags: designProcess
---

At Timshel, we had an application called “Admin” which was used by clients to view and adminster data associated with their account. For example, a client would use our platform’s API to do a variety of things: create and manage events, process payments, and more. In “Admin” they could view all that activity, giving them insight into how customers were using their products.

## It All Started With an Idea

One day, after I had been doing a lot of coding, I felt like I wanted a design exercise. The login page for Admin felt like it could use a facelift to better match the UI and aesthetic that we were using “inside” of the app, i.e. once a user had authenticated. So I decided to take a stab at redesigning the login page.

![Screenshot of old login page of Admin]({{ site.imageurl }}/2016/admin-old-login.png "The “old” login page for Admin.")

Piggy-backing on the material design aesthetic we were using inside our application, I opened Sketch and worked through some ideas. By the end of my exercise I had two mocks: one with a heavy usage of a solid color, the other with a lighter usage of it.

![Screenshot of new login page mock for Admin with heavy color]({{ site.imageurl }}/2016/admin-login-mock-heavy-color.png "First mock of login page with heavy usage of solid color.")

![Screenshot of new login page mock for Admin with light color]({{ site.imageurl }}/2016/admin-login-mock-light-color.png "Second mock of login page with lighter usage of solid color.")

After doing this exercise, I kind of liked the direction, so I presented the mocks to the design team to see if there was any interesting in pursuing the direction. Everyone seemed to like the lighter version of the login page and thought it would be worthwhile investing more in these ideas.

## Then Things Got Real

If I was going to pursue redesigning the login screen, I would need to also look at the associated views for unauthenticated users. This helped me  approach my design exercises as part of a larger, holistic aesthetic realignment. I began by documenting all the views that were accessible to unauthenticated users of the application:

- `/` Login to your account
- `/sign-out` Logout of your account
- `/select-an-org` Logged in, now choose an organization
- `/new-member-setup` Message saying you must have an invite
- `/new-member-setup/:token` Setup your account password
- `/forgot-password` Enter your email to reset your account password
- `/forgot-password/:token` Setup a new account password

I reviewed all the current designs for these views, looking for existing patterns I could use as-is, reinforce, or break out and setup independently. Through the process, I found various shared components that were used across all the views. I decided to focus my efforts on creating a design for each of those pieces, which would then allow me to setup all the views with a consistent design (kind of like building a house with already-assembled bricks). These “pieces” included the following:

- Logo
- Message
- Secondary link
- Reset password form
- Copyright & other text

[![Overview of page patterns on old layout]({{ site.imageurl }}/2016/admin-old-page-patterns.png "Discovering patterns across each of the old views helped know where and how to start designing.")]({{ site.imageurl }}/2016/admin-old-page-patterns.png)

## Designing Individual Views

### Login
