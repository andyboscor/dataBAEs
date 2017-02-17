import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import PasswordField from 'material-ui-password-field'

var addBottom = {
  marginBottom: '50px'
}

const style = {
  margin: 12,
};

const maxPass = {
  width: '255px'
};

var backgroundPaint = {
  height: '100%'
};
var responsiveImg = {
  maxHeight:'300px',
  height:'20vw'
}
class LoginPage extends Component {
  state = {
    open: false,
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleUsername = (event) => {
  this.setState({username: event.target.value});
}
  handlePassword = (event) => {
  this.setState({password: event.target.value});
  }
  handleFirstName = (event) => {
    this.setState({firstName: event.target.value});
  }
  handleLastName = (event) => {
    this.setState({lastName: event.target.value});
  }
  handleLogin = (event) => {
    event.preventDefault();
    var credentials = this.state.username + ":" + this.state.password;

    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/login', {
      headers: {
    'Authorization': 'Basic ' + window.btoa(unescape(encodeURIComponent(credentials)))
  }
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
        self.props.handleLogin();
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }
  handleRegister = (event) => {
    event.preventDefault();
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/register', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: self.state.firstName,
        last_name: self.state.lastName,
        email_address: self.state.username,
        password: self.state.password
      })
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }
  render() {

    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleRegister}
      />
    ];
    return (
      <div style={backgroundPaint} className="backgroundLogin">
          <center>
          <br />
          <img style={responsiveImg} src={require('../images/logo2-small.png')} />

          <div>
          <form onSubmit={this.handleLogin}>
            <TextField
              hintText="Email"
              onChange={this.handleUsername}
            /><br />
            <PasswordField
              style={maxPass}
              disableButton={false}
              onChange={this.handlePassword}
              floatingLabelText="Enter your password"
            />
            <RaisedButton type="submit" label="Login" style={style} />
          </form>
            <h3>Not registered yet?</h3>
            <RaisedButton label="Register" onTouchTap={this.handleOpen} />
            <form onSubmit={this.handleRegister}>
            <Dialog
              title="Register"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            <div>
              <center>

              <TextField
                  hintText="First Name"
                  onChange={this.handleFirstName}
              /><br />
              <TextField
                hintText="Last Name"
                  onChange={this.handleLastName}
              /><br />
              <TextField
                hintText="Email"
                 onChange={this.handleUsername}
              /><br />
              <PasswordField
                style={maxPass}
                disableButton={false}
                onChange={this.handlePassword}
                floatingLabelText="Enter your password"
              />
              </center>
            </div>
            </Dialog>
            </form>
          </div>
          <br />

          <br />
          </center>
      </div>
    );
  }
}

export default LoginPage;
