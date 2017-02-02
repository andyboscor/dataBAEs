import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
var hintStyle = {
  color: 'white'
}
var barStyle = {
  flexGrow: '1'
}
class NewMessageBar extends Component {
  render() {
    return (
      <div>
      <AppBar
    iconElementLeft={<TextField hintStyle={hintStyle} style={barStyle}
      hintText="Type your message here"
    />}
    iconElementRight={<FlatButton label="Send" />}
  />
      </div>
    );
  }
}

export default NewMessageBar;
