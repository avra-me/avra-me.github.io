import React, {memo} from "react";
import PropTypes from "prop-types";
import {Router} from '@reach/router'
import Blog from "./blog/Blog";
import Home from "./home/Home";

function Routing(props) {
  const {blogPosts, selectBlog, selectHome} = props;
  console.log('hello world, we init')

  return (
    <Router>
      <Blog
        path="blog"
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      />
      <Home path="/" selectHome={selectHome}/>
    </Router>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired
};

export default memo(Routing);
