---
tags: engineering iconGalleries
---

# Using PropTypes Outside of React in Template Literal Components

I recently moved away from using JSX as my templating system and switched to using [“components” of template literals in JavaScript](/2020/switching-from-react-to-js-for-templating/). One of the things I didn’t want to lose when switching was the functionality of the [prop-types package](https://www.npmjs.com/package/prop-types).

My templates were part of my overall system to generate a static site. And `prop-types` were extremely useful when templating to make sure that:

1. The raw data from my content matched the expectations in my templates
2. Any transformations on the raw content of my data was transformed correctly and met my expectations.

For example, here’s what a piece of raw data might look like for a given “post”:

```js
{
  title: "Angry Birds",
  developer: "Rovio",
  developerUrl: "https://www.rovio.com"
}
```

My build system would take my raw data and derive certain new pieces of information that would be available in all my templates. For example, take a URL and derive just the hostname from the URL and append it to my data. By the time the raw data made it to my templates, I’d have something like this:

```js
{
  title: "Angry Birds",
  developer: "Rovio",
  developerUrl: "https://www.rovio.com",
  developerUrlPretty: "rovio.com"
}
```

I really liked using `prop-types` to ensure that not only was this top-down data correct, but that any additional data I created at templating time and passed between templates would be correct.

What’s really cool about the `prop-types` package is that you can use it outside of React/JSX. Let me give you an example. Let’s say I had a React/JSX component and I wanted to check some props:

```jsx
import React from "react";
import { string } from "prop-types";

MyComponent.propTypes = {
  developer: string.isRequired,
  developerUrl: string.isRequired,
  developerUrlPretty: string.isRequired
};

export default function MyComponent(props) {
  const { developer, developerUrl, developerUrlPretty } = props;
  return (
    <dl>
      <dt>Developer</dt>
      <dd>{developer}</dd>
      <dd>
        <a href={developerUrl}>
          {developerUrlPretty}
        </a>
      </dd>
    </div>
  );
}
```

How do I  continue to use `prop-types` when I’m not using React/JSX, since React is the one that does the prop checking for you?

My template literal “components” looked very similar to my JSX components: they are both functions that take data and return something. JSX returns a JavaScript object meant for consumption by React. My template components return a tagged template literal that evaluates to a string. Combine this with the fact that the `prop-types` package provides a `checkPropTypes` [function](https://github.com/facebook/prop-types#proptypescheckproptypes) so that you can use the library outside of React, and you’ve got a simple recipe for calling prop-types: call it in the template function itself. Example:

```js
import { checkPropTypes, string } from "prop-types";

const propTypes = {
  developer: string.isRequired,
  developerUrl: string.isRequired,
  developerUrlPretty: string.isRequired
};

export default function MyComponent(props) {
  const { developer, developerUrl, developerUrlPretty } = props;
  // Check propTypes ourselves
  Object.keys(props).forEach(key => {
    checkPropTypes(propTypes, props, key, 'MyComponent');
  });
  return `
    <dl>
      <dt>Developer</dt>
      <dd>${developer}</dd>
      <dd>
        <a href="${developerUrl}">
          ${developerUrlPretty}
        </a>
      </dd>
    </div>
  `;
}
```

When that template file gets executed in node, it checks the prop types and logs any relevant warnings. Beautiful!

The only downside to this—you might have noticed—is that it seems like a pain to have to manually write out that code that checks prop types in every component where you want to check your props.

What I ended up doing was creating a utility function that would do the checking for my automatically: 

```js
/**
 * Anytime you want to check prop types, wrap in this
 * @param {function} Component
 * @param {Object} propTypes
 * @return {string} result of calling the component
 */
function withPropTypeChecks(Component) {
  return props => {
    if (Component.propTypes) {
      Object.keys(props).forEach(key => {
        PropTypes.checkPropTypes(
          Component.propTypes,
          props,
          key,
          Component.name
        );
      });
    }
    return Component(props);
  };
}
```

Then, if I had a component where I wanted to check prop types, I’d wrap that component’s export in this utility function and  it would do all the checking for me. Example:

```js
import { string } from "prop-types";
import { withPropTypeChecks } from "./utils.js";

MyComponent.propTypes = {
  developer: string.isRequired,
  developerUrl: string.isRequired,
  developerUrlPretty: string.isRequired
};

function MyComponent(props) {
  const { developer, developerUrl, developerUrlPretty } = props;
  return `
    <dl>
      <dt>Developer</dt>
      <dd>${developer}</dd>
      <dd>
        <a href="${developerUrl}">
          ${developerUrlPretty}
        </a>
      </dd>
    </div>
  `;
}

export default withPropTypeChecks(MyComponent);
```

And voilà! I get prop type checking in my template literal components.

