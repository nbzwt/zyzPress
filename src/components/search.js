'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Search extends Component {
  constructor() {
    super();
  }

  search() {
    console.log(`Now searching ${document.querySelector('input.search').value}`);
  }

  render() {
    return (
      <div className="searchWrapper alwaysShow">
        <div className="inputWrapper">
          <input className="search" type="text" placeholder="Search here" />
        </div>
        <div className="search" onClick={ this.search }>搜索</div>
      </div>
    )
  }
}

export default Search;
