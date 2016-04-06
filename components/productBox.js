/**
 * Created by xiaodan on 16/4/5.
 * -ProductBox
 * --loginForm
 * --registerForm
 */
var React = require('react');
var $ = require('jquery');

var ProductBox = React.createClass({
  
  getInitialState: function () {
    return {text: '',data :1};
  },
  handleLoginSubmit: function (data) {

    $.post('http://z005.kmtongji.com/api/login',data,function(data){
      this.setState({text:"Login success!" });
    }.bind(this)).error(function (data) {
      console.log(data);
      this.setState({text:"Password or username are incorrect!" });
    }.bind(this));
  },
  handleRegisterSubmit:function (data) {
    $.post('http://z005.kmtongji.com/api/register',data,function(data){
      if(data.name == "UserExistsError"){
        console.log(data);
        this.setState({text:"A user with the given username is already registered!" });
        this.setState({data: 1});
      }else{
        this.setState({text:"Register success!" });
        this.setState({data: 0});
      }
      
    }.bind(this));
  },
  render: function () {
    return(
      <div className="container">
        <LoginForm data={this.state.data} onLoginSubmit={this.handleLoginSubmit} onRegisterSubmit={this.handleRegisterSubmit} />
        <p className="tips">{this.state.text}</p>
      </div>
    );
  }
  
});
var LoginForm = React.createClass({
  getInitialState: function () {
    return {data:0,tittle: 'Login Test',text:''};
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();
    if (!username || !password) {
      this.setState({text:"please input both username and password!"});
      return;
    }
    this.props.onLoginSubmit({username:username,password:password});
    this.setState({text:""});
    this.refs.username.value = '';
    this.refs.password.value = '';
  },
  handleRegister: function (e) {
    e.preventDefault();
    this.setState({data: 1,tittle:'Register Test',text:''});
    $(".tips").text("");
  },
  handleLogin: function (e) {
    e.preventDefault();
    this.setState({data: 0,tittle:'Login Test'});
    $(".tips").text("");
  },
  handleRegisterSubmit: function (e) {
    e.preventDefault();
    var email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();
    var nick = this.refs.nick.value.trim();
    if(username && !email.test(username)){
      this.setState({text:"Your email address is illegal!"});
      this.refs.username.value = '';
      return;
    }
    if (!username || !password || !nick ) {
      this.setState({text:"please input username,nick and password!"});
      return;
    }
    this.props.onRegisterSubmit({username: username,nick: nick,password: password});
    setTimeout(function () {
      this.setState({data: this.props.data,tittle:'Login Test'});
    }.bind(this),5000);
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.nick.value = '';
    return;
  },

  render: function () {
    if (this.state.data == 0 ) {
      return (
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <p>{this.state.tittle}</p>
          <input type="text" placeholder="Your username" ref="username"/>
          <input type="password" placeholder="Your password" ref="password"/>
          <input type="button" value="Register"  onClick={this.handleRegister}/>
          <input type="submit" value="Login"/>
          <p className="tips">{this.state.text}</p>
        </form>
      )
    } else if (this.state.data == 1) {
      return (
        <form className="registerForm" onSubmit={this.handleRegisterSubmit}>
          <span>{this.state.tittle}</span>
          <span className="changeLogin" onClick={this.handleLogin}>Login</span>
          <input type="text" placeholder="Your email username " ref="username"/>
          <input type="text" placeholder="Your nick name" ref="nick"/>
          <input type="password" placeholder="Your password" ref="password"/>
          <input type="submit" value="Register"/>
          <p className="tips">{this.state.text}</p>
        </form>
      )
    }
  }
});

module.exports = ProductBox;