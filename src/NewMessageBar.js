import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
var hintStyle = {
  color: 'white'
}
var barStyle = {
  //flexGrow: '1'
}
var sendStyle = {
  color:'white'
}
class NewMessageBar extends Component {
  render() {
    return (
      <div>
      <AppBar
    iconElementLeft={<div><TextField hintStyle={hintStyle} style={barStyle}
      hintText="Type your message here"
    /><FlatButton style={sendStyle} label="Send" /> </div>}
  />
      </div>
    );
  }
}

export default NewMessageBar;
