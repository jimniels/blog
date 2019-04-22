const React = require("react");

MarkdownPage.propTypes = {

};

function MarkdownPage({ site, children }) {
  return (
    <Page>
      <div class="markdown">
        {children}
      </div>
    </Page>
  );
}
