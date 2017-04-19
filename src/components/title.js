'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import request from '../utils/http';

class Title extends Component {
  constructor() {
    super();
    this.state = {
      blogTitle: '',
      blogSubtitle: '',
    }
    request.get('/api/common').then((xhr) => {
      let res = JSON.parse(xhr.responseText);
      this.setState(res.common);
      window.titleBase = ` - ${res.common.blogTitle}`;
    })
  }

  render() {
    return (
      <div id="title" className="alwaysShow">
        <h1 id="mainTitle"><Link to="/"> { this.state.blogTitle } </Link></h1>
        <h1 id="subTitle"> { this.state.blogSubtitle } </h1>
      </div>
    )
  }
}

module.exports = Title;
