import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

var addBottom = {
  marginBottom: '50px'
}

const style = {
  margin: 12,
};

var backgroundPaint = {
  backgroundColor:'#80DEEA'
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
      <div style={backgroundPaint} >
          <center><h1> Welcome to FriendZone </h1>
          <br />
          <div>
              <TextField
                hintText="Email"
              /><br />   
              <TextField
                hintText="Password"
              /><br />                             
            <RaisedButton label="Login" style={style} />
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
              <TextField
                  hintText="First Name"
              /><br />
              <TextField
                hintText="Last Name"
              /><br />
              <TextField
                hintText="Email"
              /><br />              
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
