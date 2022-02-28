# Inspecting Web Views in macOS

I recently received a tantalizing email from a reader I’ve never met: [Sam Henri-Gold](https://samhenri.gold).

Sam showed me how you can key in a couple write commands in the macOS terminal:

```
defaults write NSGlobalDomain WebKitDeveloperExtras -bool true
defaults write -g WebKitDeveloperExtras -bool YES
```

Which will enable a context menu in a system web view: 

<img src="https://cdn.jim-nielsen.com/blog/2022/macos-web-inspector-family-sharing-music-context-menu.png" width="780" height="724" alt="Screenshot of the Apple Music settings in the Family Sharing pane of system preferences on macOS with a “Inspect Element” context menu element visible." /> 

Which lets you trigger the Safari Web Inspector and inspect elements of the view — like you would any website:

<img src="https://cdn.jim-nielsen.com/blog/2022/macos-web-inspector-family-sharing-music.png" width="1112" height="1150" alt="Screenshot of the Apple Music settings in the Family Sharing pane of system preferences on macOS with the Safari Web Inspector tools also open and actively inspecting an element." /> 

I find this fascinating! I’m intrigued by the ability to use [system colors in CSS](https://blog.jim-nielsen.com/2021/css-system-colors/) and these web views in macOS show how engineers at Apple are leveraging [non-standard CSS keywords in Webkit](https://blog.jim-nielsen.com/2021/things-i-learned-reading-webkits-ua-stylesheet/) to mimic UIs in macOS which are otherwise built with native system APIs.

It’s kind of like opening the developer tools in an Electron app, except these are native macOS apps with web views parading as system UI. 

I’ve poked around in the “Apple ID” and “Family Sharing” panes in the macOS System Preferences where I’ve spotted a few intriguing details.

For example, in the Apple Music tab of Family Sharing preferences I find a `javascript-packed.js` file being loaded which appears to be leveraging React to power that particular web view.

<img src="https://cdn.jim-nielsen.com/blog/2022/macos-web-inspector-react.png" width="1112" height="762" alt="Screenshot of the Web Inspector for the Apple Music Family Sharing pane in System Preferences showing a JavaScript file powering the view which is using React." /> 

In another view, I see what looks like web components: custom DOM elements like `<settings-app>` and `<graphite-panel>`.

<img src="https://cdn.jim-nielsen.com/blog/2022/macos-web-inspector-web-component.png" width="1112" height="1062" alt="Screenshot of the web inspector for a tab in the Apple ID pane of System Preferences which shows custom elements in the DOM." /> 

Nothing earth-shattering here, but enough to satisfy my curiosity poking around for a while.

I can imagine that views and functionality like this explain why you see particular browser features ship in Webkit/Safari. For example, the [CSS4 fonts module](https://www.w3.org/TR/css-fonts-4/#generic-font-families) standardizes support for [leveraging system fonts in the browser](https://blog.jim-nielsen.com/2020/system-fonts-on-the-web/). I can imagine this scenario played out something like:

- Apple wanted to ship web views that could be embedded into “native” apps and would inherit system styles and blend into the rest of the operating system.
- They created proprietary keywords in Webkit to trigger rendering the system font, i.e. `font-family: -apple-system` which would trigger Apple’s San Francisco font to display.
- Eventually they standardize with other browser makers to make `font-family: ui-sans-serif` to render the system font.

Here’s an idea: guess at new features in macOS by using the work of Safari team members as a leading indicator. If they’re pushing for one particular feature to be standardized and implemented (or if non-standard keywords are making their way into Safari), it’s not far-fetched to conclude that means a new feature is coming to the OS which relies on that particular Safari feature in order for web views embedded into native apps to blend seamlessly into the experience of macOS.

Anyway, something to play around with if you feel so inclined.