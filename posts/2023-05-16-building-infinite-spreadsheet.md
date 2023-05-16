# Building an Infinite Spreadsheet

As of late, I’ve been working on [Quadratic](https://www.quadratichq.com/): an infinite canvas spreadsheet that runs code.  Think Figma (infinite canvas) meets Excel (spreadsheet) meets VSCode (IDE). In addition to formulas (e.g. `SUM(A1:A5)`) every cell in Quadratic can be the result of code (right now it’s Python only, which means I’m learning more Python, but JavaScript is on the roadmap too).

Quadratic lives at a sweet spot for me personally. I love to code, but I’m also a very visual thinker. When I’m writing code, I constantly find myself visualizing the shape data in my head. For example, a giant list of objects from an API that I need to filter down given some criteria and then transform to another shape? I find myself writing comments in code like this:

```js
fetch("/api")
  .then(res => res.json())
  .then(data => {
    /*
      Take data from API
      [
        { id: "foo", stuff: [{…}, {…}] }
        { id: "bar", stuff: [{…}, {…}] }
        ...
      ]
      Filter by `value` and transform to a name:count mapping
      {
        "foo": 12
        "bar": 15
      }
    */
    return data.map(item => ({
	    ...item,
	    stuff: item.stuff.filter(thing => thing.attr === 'value')
    })).reduce((acc, item) => ({
      ...acc,
      [item.id]: item.stuff.length
    }), {})
  })
```

Quadratic is an awesome tool for visualizing the output of your code — retrieving data and returning it to a structured grid, then shaping it, manipulating it, and transforming it until you get exactly what you want. And because it’s [an infinite canvas tool](https://infinitecanvas.tools/), you can easily zoom in and out to perceive the shape of your data then make transformations to that data with code given the patterns and relationships you recognize in the data.

Building a tool like Quadratic has its own unique challenges as it combines many of the interaction paradigms you’re familiar with across traditionally disparate tools like a spreadsheet, a code editor, and a drawing tool.

One of those challenges is designing the UI/X around the coordinate system of the spreadsheet’s grid. Given how I love to blog, I wrote about precisely this topic on the Quadratic blog. If you want to read more of my writing, go give this one a read:

[Building the coordinate system for an infinite spreadsheet](https://www.quadratichq.com/blog/2023-05-15-coordinate-system-for-infinite-spreadsheet)