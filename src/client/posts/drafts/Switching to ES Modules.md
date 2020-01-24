## Switching to ES Modules

This was relatively straightforward. I had to change my metalsmith dev setup (@TODO link to old post)

In some places, it was pretty straightforward. All I had to do was change `require` statements to `import` statements and `module.export` statements to `export` statements:

<img src="https://cdn.jim-nielsen.com/blog/2019/react-to-js-cjs-to-es-modules.png" alt="Screenshot of git diff when changing import and export statements from CJS to ESM" width="1037" height="343" />