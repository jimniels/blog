---
title: Installing npm packages from Github Source Code
date: 2017-08-19
tags: designProcess insight
---

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

Any react app in our platform could just import `my-shared-component` and use it in their application. But what if the consuming app wasn’t a react app? No worries, the library has a UMD version with an API making it useful just about anywhere! This makes for great software maintenance. Find a bug in one of the apps? Fix it in one place, cut a release, then deploy a new version. If you’re thinking “that’s just a component library like you’d install from npm” you’re right. That’s where I want us to be conceptually. Now on to the whole reason I’m writing this post.


Traditionally, if you want to install a component you can use in your app, you grab it from npm by specifying it in your `package.json` file, i.e.:

```json
{
  "dependencies": {
    "my-shared-component": "4.0.2"
  }
}
```

The way most people are doing this these days (note the date of this blog post, since we’re talking the JS ecosystem, this blog post could be out of date within 2 or 3 days of the published date on this piece) is that you write your project’s code in something like ES6/7 and keep it under source control in something like Github. Then when you want your library to become consumable by other people (and applications) you publish the (transpiled to ES2015) code to npm. This is fine if you are publishing code intended to be publicly available. But what about proprietary code (like we have at Insight)? npm has [private accounts](https://www.npmjs.com/pricing) available, but those can become costly as they are on a per-user basis. In our situation, there are a variety of people (and applications) who need access to `my-insight-compoennt`. There are the developers of the library. There are developer who consume the library in their other apps. There are CI servers who install the library to build other applications. There are third-party contractors who...you get the point. Under our model, it can get pricey to setup an account for every single person who ends up needing to consume this library in some form.

Enter installing your library from Github (since we’re already paying for that).

## Installing Packages with npm from Github

npm has the ability to install code from Github. If you look at [the docs](https://docs.npmjs.com/cli/install), you can install a package from a hosted git provider by cloning allowing npm to clone it with git `npm install <git remote url>`. There’s some shorthand in the docs on doing this, but essentially you point your package in `package.json` at a github repo, it can even be private!

```json
{
  "devDependencies": {
    "my-shared-component": "github:orgName/my-shared-component-repo#2.0.1"
  }
}
```

Again, there’s more details on this in [the docs](https://docs.npmjs.com/cli/install), but what’s neat for us is we can use semver and point to a specific semver tag in git. npm will then clone the repo at that specified git tag and now you have your code from github in `node_modules`. But your code from github is written in ES6/7 and your consuming app doesn’t want that. What you need is the ES2015 version of that code. So what is one to do?

What we *used* to do, is have a folder at the root of the repo named `dist/` which housed all of the transpiled/compiled code. So our process for releasing our component as a library looked something like this:

1. Commit some changes to the point I say “I like where I am, I want to make it a release”
2. Run a build command (i.e. `npm run build`) producing the transpiled ES2015 code for consuming apps (plus any static assets, etc.)
3. Stick the build artifact in `dist/`
4. Commit file changes
5. Tag a release in git
6. Update consuming apps to point to the newest commit (or use a semver operator so the latest version is always grabbed)

This worked fine for a while. The step for releasing a new version of the library was automated so it wasn’t a big hassle, but it felt a little dirty always having our source code AND a compiled/transpiled version of that code living in the repo at all times.

Then along came npm 5.

## Installing *and* Building Packages with NPM from Github

npm 5 shipped with an neat solution to the way we were hosting and installing code from github. From their [blog post on npm v5.0.0](http://blog.npmjs.org/post/161081169345/v500):

> Git dependencies with `prepare` scripts will have their `devDependencies` installed, and `npm install` run in their directory before being packed.

Did that sentence turn on a lightbulb in your mind? If not, allow me to explain this change. In npm 5, when you run `npm install`, any packages in your `package.json` which are git dependencies, will have *their* dependencies installed (via their respective `package.json` file) and then have the `prepare` script run as well. What does that mean for us? No more storing the transpiled code in `dist/`. We could move the command which builds the code that ends up in `dist/` into our `prepare` script. 

So now our library has a `package.json` which looks something like this:

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

Then when an app installs our library from github, this is what npm does in a nutshell:

1. Clone the repo to `node_modules`
2. Install any dependencies listed in the repo’s `package.json`
3. Run the `prepare` script in the repo’s `package.json` (which runs `npm run build` which transpiles the repo’s source code and copies static assets into `dist/`)

To reiterate, this means we no longer have to build code and commit it to our repo. The library is built (transpiled) by the client consuming it at install time. That means our new process for working on our component is as follows:

1. Commit some changes to the point I say “I like where I am, I want to make it a release”
~~2. Run a build command (i.e. `npm run build`) producing the transpiled ES2015 code for consuming apps (plus any static assets, etc.)~~
~~3. Stick the build artifact in `dist/`~~
4. Commit file changes
5. Tag a release in git
6. Update consuming apps to point to the newest commit (or use a semver operator so the latest version is always grabbed)

This allowed us to cut out two steps in our process of distributing our library (and cut out *A LOT* of unnecessary code in the repository).

A side benefit of this is that testing changes to the component in consuming apps was really simple. All we had to do is checkout a new branch, make some commits, push it to github, then point the consuming application’s reference to that package to our new branch, i.e.

```json
{
  "devDependencies": {
    "my-shared-component": "github:orgName/my-shared-component-repo#my-feature-branch"
  }
}
```

