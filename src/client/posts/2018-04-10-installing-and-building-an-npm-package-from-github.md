---
title: Installing and Building an NPM Package from Github
tags: engineering sagesure
---

[The original draft for this post was dated August of 2017. Here it is April 2018 and I’m finally getting around to making this an MVP: minimum viable post. This is probably old news now, but I’m posting nonetheless.]

At [Insight](http://icg360.com/) we have customer-facing applications which often share a lot of conceptual functionality. Unfortunately, there hasn’t been a lot of code sharing on the front-end across these applications. This has been one of my goals for improving the efficiency and velocity of our team.

One of the projects I worked on recently was developing a react component that could be shared across three different applications internally. The idea was that any of these apps could drop in the component, pass in some props, and get the same functionality everywhere, i.e.

```js
import MySharedComponent from "my-shared-component";

class PolicyView extends React.Component {
  render() {
    const props = {
      // Here I could put a bunch of configuration props based on the
      // application environment in which my component lives
    }
    return (
      <MySharedComponent {...props} />
    );
  }
}
```

Any react app in our platform could just import `my-shared-component` and use it in their application. What if the consuming app wasn’t a react app you ask? No worries, the library has a UMD version with an API making it useful just about anywhere! This makes for great software maintenance. Find a bug in one of the apps? Fix it in one place, cut a release, then deploy a new version. If you’re thinking “that’s just a component library like you’d install from npm” you’re right. That’s exactly what I wanted you to think. Now on to the whole reason I’m writing this post.

Traditionally, if you want to install a component to use in your app, you grab it from npm by specifying it in your `package.json` file, i.e.:

```json
{
  "dependencies": {
    "my-shared-component": "4.0.2"
  }
}
```

The way most people are doing this these days (note the date of this blog post, since we’re talking the JS ecosystem, this blog post could be out of date within 2 or 3 days of the published date on this piece) is that you write your project’s code in something like ES6/7 and keep it under source control in something like Github. Then when you want your library to become consumable by other people (and applications) you publish the code (transpiled to ES5) to npm. This is fine if you are publishing code intended to be publicly available but what about proprietary code (like we have at Insight)? npm has [private accounts](https://www.npmjs.com/pricing) available, but those can become costly as they are on a per-user basis. In our situation, there are a variety of people (and applications) who need access to `my-insight-component`. There are the developers of the library. There are developers who consume the library in  other apps. There are CI servers who install the library to build apps. There are third-party contractors who...you get the point. Under our organizational model it can get pricey to setup an account for every single person who ends up needing to consume this library in some form.

Enter installing and building the library from Github.

## Installing Packages with npm from Github

npm has the ability to install code from Github. If you look at [the docs](https://docs.npmjs.com/cli/install), you can install a package from a hosted git provider by leveraging npm to clone it with git `npm install <git remote url>`. There’s some shorthand in the docs on doing this, but essentially you point your package name in `package.json` at a Github repo an viola! It can even be a private repository (granted that you have the credentials on the installing machine to access that repo).

```json
{
  "dependencies": {
    "my-shared-component": "github:orgName/my-shared-component-repo#2.0.1"
  }
}
```

Again, there’s more details on this in [the docs](https://docs.npmjs.com/cli/install), but what’s neat for us at Insight is that we can use tags in git to enable npm to leverage semver when installing the code (note the `#` at the end of the above repo name). With the above reference, npm will basically clone the repo and now you your code from Github is in `node_modules`. 

The problem is your code from Github is likely written in something like ES6/7 and your consuming app doesn’t want that. What you need is the ES5 version of that code. So what is one to do?

What we at Insight *used* to do is we had a folder at the root of the repo named `dist/` which housed the built version of our source code (the ES6/7 code transpiled down to ES5 along with some static assets, etc.). Less than ideal, but it worked. Our process for releasing the component as a consumable library looked something like this:

1. Commit some changes until we say “it’s good, let’s make a release”
2. Run a build command (i.e. `npm run build`) producing the transpiled ES5 code for consuming apps (plus any static assets, etc.)
3. Stick the build artifact in `dist/`
4. Commit the file changes
5. Tag a release in git
6. Update consuming apps to point to the newest tag (or use a semver operator so the latest version is always obtained)

This worked fine for a while. The step for releasing a new version of the library was automated so it wasn’t a big hassle, but it felt a little dirty always having our source code AND a the built version of that same code living in the repo at all times.

Then along came npm 5.

## Installing *and* Building Packages with NPM from Github

npm 5 shipped with an neat solution to the way we were hosting and installing code from github. From their [blog post on npm v5.0.0](http://blog.npmjs.org/post/161081169345/v500):

> Git dependencies with `prepare` scripts will have their `devDependencies` installed, and `npm install` run in their directory before being packed.

Did that sentence turn on a lightbulb in your mind? If not, allow me to explain how it did for us. In npm 5, when you run `npm install`, any packages in your `package.json` which are git dependencies, will have *their* dependencies installed (via their respective `package.json` file) and then have the `prepare` script run as well. What does that mean for us? No more storing the transpiled code in `dist/`. We can now move the command which builds the code that ends up in `dist/` directly into our `prepare` script, thus moving the task of compiling our library’s source code onto the apps which consume it.

Under this new paradigm, npm essentially grabs our remote source code from Github, builds it locally, then installs it to `node_modules` for our consuming app (or bundler) to use.

To accomplish this, our library has a `package.json` which looks something like this:

```json
{
  "main": "dist/index.js",
  "scripts": {
    "prepare": "npm run build",
    "build": "webpack src/index.js dist/index.js",
  },
  "dependencies": {...},
  "devDependencies": {...}
}
```

When installing our component as a dependency, npm sees that `package.json`, installs its dependencies, runs the `prepare` script (which builds our source code), [does a few more things](https://docs.npmjs.com/misc/scripts#description), and sticks the resulting code in `node_modules`.

To reiterate, this means we no longer have to build code and commit it to our repo. The component is built by the consuming client at install time.

Under this new process, working on our component is as follows:

1. Commit some changes until we say “it’s good, let’s make a release”
2. ~~Run a build command (i.e. `npm run build`) producing the transpiled ES5 code for consuming apps (plus any static assets, etc.)~~
3. ~~Stick the build artifact in `dist/`~~
4. Commit the file changes
5. Tag a release in git
6. Update consuming apps to point to the newest tag (or use a semver operator so the latest version is always obtained)

As you can see, our process is now essentially just a normal git development process. No extra cruft for distributing our code to other clients.

A side benefit to all of this is that testing changes to the component in consuming apps is very simple. Checkout a new branch, make some commits, push it to github, then change the consuming application’s reference to the component from a semver string representing a tag to the name of the branch (or a commit) in the `package.json`, i.e.

```json
{
  "dependencies": {
    "my-shared-component": "github:orgName/my-shared-component-repo#branch"
  }
}
```

Perhaps this is old news to you, if so: congratulations — why didn’t you already write this blog post? If this isn’t old news to you, try it out. It’s awesome.
