#node

# Using Locally-Installed CLI Tools In Node Projects

You have a dependency that provides a CLI tool, how do you use it?

Even though you did `npm i` from your project root, if you run `<tool> <command>` it won’t work because that tool is not in your global path.

You could install `<tool>` globally, but then if you have `<tool>` in multiple projects and you run `<tool> <command>` in another project it might not be the same version of the tool.

For example, you might have `tool@0.1.0` in one project and `tool@0.2.0` in another, and they might have different CLI commands. So you want to run/test whatever version of `tool` is installed in your local project (e.g. the one in `package.json`), you need something other than the globally installed version.

Over time, there are three ways I’ve learned to deal with this problem. I’m listing them here for myself.

For the examples, I am going to be using [the `ori` command line tool from Web Origami](https://weborigami.org/cli/), but they can be generalized to any CLI tool.

## Use npx

You can run a package you have installed locally — or one you don’t have installed at all! — using [npx](https://docs.npmjs.com/cli/v8/commands/npx). 

**Note:** npx is part of npm. If you have npm installed, you also have npx.

```
npx ori version
```

Pros:

- Short 3-character command to do what you want.

Cons:

- ??? just that you have to know it exists, I guess.

## Invoke Directly From node_modules

You can reference the locally-installed CLI tool directly in `node_modules` and run it.

When npm installs stuff, it sticks executables in a special `.bin` folder, which is where you’ll find any CLI tools you installed.

```
# From your project root
./node_modules/.bin/ori version
```

Pros:

- Let’s you run the CLI tool dependency that’s installed locally to the project.

Cons:

- Lots of extra typing each time you want to run an executable.

## Add a Script to package.json

If the CLI tool is a dependency in the project, you can formulate the command as a script in `package.json`

```json
"scripts": {
  "ori-version": "ori version"
},
"dependencies": {
  "@weborigami/ori": "^0.2.5"
}
```

Then run it with:

```
npm run ori-version
```

This will use the locally-installed version of the `ori` command line tool.

Pros:

- Useful for things like build commands on remote servers (e.g. tell Netlify to run `npm run build`).

Cons:

- When you’re iterating with a CLI tool locally, the feedback cycle for this method is incredibly cumbersome: type the command in `package.json`, save the file, run `npm run <command>`, see if it worked, repeat.