import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Title from './title';
import Search from './search';
import Category from './category'
import Tags from './tags';
import Widgets from './widget';

class Blog extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div id="header">
          <div id="topbar">
            <Title ref="title"/>
          </div>
          <div id="bar">
            <div id="barLeft">
            </div>
            <div id="barRight">
              <Search />
            </div>
            <div id="clearer"></div>
          </div>
        </div>
        <div id="container">
          <div id="left">
            <Category />
            <Tags />
            <div>&nbsp;</div>
            <Widgets />
          </div>
          <div id="right">
            { this.props.children }
          </div>
        </div>
        <div id="footer">Powered by zyzPress 2016-2017.</div>
      </div>
    )
  }

}

export default Blog;
