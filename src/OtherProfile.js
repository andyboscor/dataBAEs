import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import OtherBlog from './OtherBlog.js';

const style = {margin: 5};
const profileInfo ={
  width:'400px',
  backgroundColor: '#80CBC4',
  height:'100%'
}
const profileContainer = {
  display: 'flex',
  height: '100%'
}
const contentContainer = {
  width: '100%'
}
const closeButtonStyle = {
  marginLeft: '10px',
  marginRight: '20px',
  color: 'white',
  fontColor: 'white',
  marginTop: '20px'
}

class OtherProfile extends Component {

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



    return (
      <div style={profileContainer}>
      <div style={profileInfo}>
      <RaisedButton style={closeButtonStyle} onTouchTap={this.props.handleClose} label="Close" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          <center><h1> Fat Kitten </h1>
		  <Avatar
          src="http://www.heragtv.com/wp-content/uploads/2015/02/SM-AR-150-8.jpg"
          size={230}
          style={style}/>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Blog" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Photos" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Message" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          </center>
      </div>
      <div style={contentContainer}>
      <OtherBlog />
      </div>
      </div>
    );
  }
}

export default OtherProfile;