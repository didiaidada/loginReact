/**
 * Created by xiaodan on 16/4/5.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('!style!css!./components/productCSS.css');
var AppComponent = require('./components/productBox.js');
ReactDOM.render(<AppComponent />, document.getElementById('content'));