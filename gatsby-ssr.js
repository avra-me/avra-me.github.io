// Move Typography.js styles to the top of the head section so they're loaded first.
const React = require("react");

exports.onPreRenderHTML = ({getHeadComponents, replaceHeadComponents}) => {
  const headComponents = getHeadComponents();
  headComponents.push(<link key={"material-icons"} rel="stylesheet"
                            href="https://fonts.googleapis.com/icon?family=Material+Icons"/>);
  headComponents.push(<link key={"font-roboto"} rel="stylesheet"
                            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>);
  replaceHeadComponents(headComponents);
};
