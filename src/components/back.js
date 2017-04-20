'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Back extends Component {
  constructor() {
    super();
  }

  back() {
    console.log('[Black-face]')
	window.history.back()
  }

  render() {
    return (
      <div className="search" onClick={ this.back }>返回</div>
    )
  }
}

export default Back;
