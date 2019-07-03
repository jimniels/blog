import Layout from "./Layout.js";

const Page = ({ site, page }) => `
  <div class="markdown">
    ${page.content}
  </div>
`;

export default Layout(Page);

/*
module.exports = (props, children) => {}; // called in metalsmith Page(props)

const Page = (props) => `
  <div class="markdown">
    ${page.content}
  </div>
`;
Layout(Page, pageProps);
const Layout = (ComponentFn, pageProps) => (siteProps) => `
<html>
  ${siteProps.baseurl}
  <div>${ComponentFn({ site: props)}</div>
</html>
`

/*
// Layout file - func signature    MyFunc(children, props)
// Component file - func signature MyComponent(props)
Layout(children, props) => `
  <div>anything with ${props}</div>
  <div>Then call your children ${func()}
`


AnyComponent(props = {}, children = () => {})

//
Page({ site, page });
*/
