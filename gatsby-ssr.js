// Move Typography.js styles to the top of the head section so they're loaded first.
const React = require("react");

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
    const headComponents = getHeadComponents();
    headComponents.push(<link key={"material-icons"} rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />);
    replaceHeadComponents(headComponents);
};