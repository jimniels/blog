---
title: Redesigning the UI/UX for Unauthenticated Users
date: 2016-11-25
tags: designProcess
---

At Timshel, we had an application called “Admin” which was used by clients to view and adminster data associated with their account. For example, a client would use our platform’s API to do a variety of things: create and manage events, process payments, and more. In “Admin” they could view all that activity, giving them insight into how customers were using their products.

## It All Started With an Idea

One day, after I had been doing a lot of coding, I felt like I wanted a design exercise. The login page for Admin felt like it could use a facelift to better match the UI and aesthetic that we were using “inside” of the app, i.e. once a user had authenticated. So I decided to take a stab at redesigning the login page.

![Screenshot of old login page of Admin]({{ site.imageurl }}/2016/admin-login-old.png "The “old” login page for Admin.")

Piggy-backing on the material design aesthetic we were using inside our application, I opened Sketch and worked through some ideas. By the end of my exercise I had two mocks: one with a heavy usage of a solid color, the other with a lighter usage of it.

![Screenshot of new login page mock for Admin with heavy color]({{ site.imageurl }}/2016/admin-login-mock-heavy-color.png "First mock of login page with heavy usage of solid color.")

![Screenshot of new login page mock for Admin with light color]({{ site.imageurl }}/2016/admin-login-mock-light-color.png "Second mock of login page with lighter usage of solid color.")

After doing this exercise, I kind of liked the direction, so I presented the mocks to the design team to see if there was any interesting in pursuing the direction. Everyone seemed to like the lighter version of the login page and thought it would be worthwhile investing more in these ideas.

## Discovering and Designing Patterns

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

I was able to design these component pieces individually and put them together to build each unique view. This not only made for a consistent UX, but from an engineering perspective I could easily write customizeable components in React and leverage them across various views. Write once, change everywhere.

![Patterns across login views]({{ site.imageurl }}/2016/admin-patterns.png "Various unauthenticated application views; notice the shared design elements and patterns.")

## Individual View Designs

Based on the new aesthetic I had developed along with the component pieces of the login screens I had planned for, I put together the following designs which I present here in contrast to the old page designs.

### Design: `/`

Designs for the root view of the application when a user is not authenticated:

![Screenshot of old login page]({{ site.imageurl }}/2016/admin-login-old.png "The old login screen")

![Screenshot of new login page]({{ site.imageurl }}/2016/admin-login-new.png "The new login screen")

### Design: `/forgot-password`

Designs for when a user clicked “forgot password” on the login page:

![Screenshot of old forgot password page]({{ site.imageurl }}/2016/admin-forgot-password-old.png "The old design")

![Screenshot of new forgot password page]({{ site.imageurl }}/2016/admin-forgot-password-new.png "The new design")

Designs for the screen a user would be directed to upon receiving an invitation to setup an account for the application:

![Screenshot of old tokenized forgot password page]({{ site.imageurl }}/2016/admin-forgot-password-token-old.png "The old design")

![Screenshot of new tokenized forgot password page]({{ site.imageurl }}/2016/admin-forgot-password-token-new.png "The new design")

The nuances of this screen can’t be communicated via a static mock. The design called for various interactions and graphical changes to communicate state. I designed and implemented these interactions on the front-end, resulting in a UX like this:

![Gif of reset password interaction]({{ site.imageurl }}/2016/admin-reset-password.gif)

It’s worth noting that I designed and engineered this component for saving a password to work across various views, including the following:

1. When an unauthenticated user clicks “forgot password” on the login screen and receives a link via their email to reset their password, they are taken to `/forgot-password:token` to create and save a new password.
2. When an unauthenticated user clicks “setup account” from an invitation email, they are taken to `/new-member-setup:token` where they they would complete the setup process by creating a password.
3. When an authenticated user clicks “manage account” from inside the application, they are taken to a view where they can manage various aspects of their account including creating and saving a new password.

I designed and coded this component so it could be leveraged in all three of these different areas. This was not only beneficial from an engineering perspective, but it helped setup a consistent UX for creating and saving a password in the application.

### Design: `/new-member-setup`

Designs for the screen a user lands on when following an invitation link via their email:

![Screenshot of old tokenized new member setup page]({{ site.imageurl }}/2016/admin-new-member-setup-token-old.png "The old design")

![Screenshot of new tokenized new member setup page]({{ site.imageurl }}/2016/admin-new-member-setup-token-new.png "The new design")

Designs for the new member setup page if a user somehow landed there without a token (i.e. they didn’t follow an official invitation link via their email):

![Screenshot of old forgot password page]({{ site.imageurl }}/2016/admin-new-member-setup-old.png "The old design")

![Screenshot of new forgot password page]({{ site.imageurl }}/2016/admin-new-member-setup-new.png "The new design")

## Final

Because this is a dynamic application, there was more going on in these screens than just the static UI elements. I had to take into account error states, contextual messaging, animations, and more, both from a design perspective and an implementation perspective.

Take a look at this gif depicting the following flow:

- Login screen ->
- Validation and error states on required fields ->
- Error message and animation on failed login ->
- Successful login ->
- Choose an org ->
- Sign out ->
- Forgot password ->
- Validation and error states on required fields ->
- Successful submission of forgot password ->
- Return to login

![Gif of new login page UX]({{ site.imageurl }}/2016/admin-new-ux.gif)



