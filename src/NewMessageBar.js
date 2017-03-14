import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
var hintStyle = {
  color: 'white'
}
var barStyle = {
  //flexGrow: '1'
  backgroundColor:'#7e6bbc'
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
    //console.log(this.state.message);
    //console.log("to_circle" + this.props.to_circle);
    if(this.props.to_circle === false)
    this.props.handleSend(this.state.message, false);
    else this.props.handleSend(this.state.message, true);
    this.setState({message:''});
  }
  render() {
    return (
      <div>
        <AppBar
          style={barStyle}
          iconElementLeft={
            <div>
              <form onSubmit={(e) => {e.preventDefault(); this.handleNewMessage();}}>
                <TextField
                  hintStyle={hintStyle}
                  hintText="Type your message here"
                  value={this.state.message}
                  onChange={this.handleMessage}
                  inputStyle={sendStyle}/>
                <FlatButton
                  style={sendStyle}
                  label="Send"
                  onTouchTap={this.handleNewMessage} />
              </form>
            </div>
          }
          />
      </div>
    );
  }
}

export default NewMessageBar;
