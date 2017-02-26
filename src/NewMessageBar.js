import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
var hintStyle = {
  color: 'white'
}
var barStyle = {
  //flexGrow: '1'
  backgroundColor:'#8088B0'
}
var sendStyle = {
  color:'white',

}
class NewMessageBar extends Component {
  state = {
    message: ''
  }
  handleMessage = (event) => {
  this.setState({message: event.target.value});
  }
  handleNewMessage = () =>{
    console.log(this.state.message);
    this.props.handleSend(this.state.message);
    this.setState({message:''});
    this.props.scroll();
  }
  render() {
    return (
      <div>
      <AppBar style={barStyle}
    iconElementLeft={<div>
      <TextField hintStyle={hintStyle}
      hintText="Type your message here"
      value={this.state.message}
      onChange={this.handleMessage}
    /><FlatButton style={sendStyle} label="Send" onTouchTap={this.handleNewMessage} /> </div>}
  />
      </div>
    );
  }
}

export default NewMessageBar;
