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
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div style={backgroundPaint} className="backgroundLogin">
          <center>
          <br />
          <img style={responsiveImg} src={require('../images/logo2-small.png')} />

          <div>
            <TextField
              hintText="Email"
            /><br />
            <PasswordField
              style={maxPass}
              disableButton={false}
              floatingLabelText="Enter your password"
            />
            <RaisedButton label="Login" style={style} onTouchTap={this.props.handleLogin} />
            <h3>Not registered yet?</h3>
            <RaisedButton label="Register" onTouchTap={this.handleOpen} />
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
              /><br />
              <TextField
                hintText="Last Name"
              /><br />
              <TextField
                hintText="Email"
              /><br />
              <PasswordField
                style={maxPass}
                disableButton={false}
                floatingLabelText="Enter your password"
              /></center>
            </div>
            </Dialog>
          </div>
          <br />

          <br />
          </center>
      </div>
    );
  }
}

export default LoginPage;
