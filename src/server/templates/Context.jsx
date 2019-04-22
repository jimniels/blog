const React = require("react");
const Context = React.createContext({});

const withContext = (Component) => (props) =>
  <Context.Consumer>
    {(value) => <Component context={value} {...props} />}
  </Context.Consumer>

module.exports = {
  Context,
  withContext
};