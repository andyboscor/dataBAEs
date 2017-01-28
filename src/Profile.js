import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const style = {margin: 5};
class Profile extends Component {

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
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
          <center><h1> VIKA Christy </h1>
		  <Avatar
          src="https://lumiere-a.akamaihd.net/v1/images/07ff8e314e2798d32bfc8c39f82a9601677de34c.jpeg"
          size={230}
          style={style}/>
          <br />
		  <TextField
		      hintText="First Name"
		  /><br />          
		    <TextField
		      hintText="Last Name"
		    /><br />	

		    <TextField
		      hintText="Email"
		    /><br />	

		    <br />

		      <div>
		        <RaisedButton label="Save Changes" onTouchTap={this.handleOpen} />
		        <Dialog
		          title="Dialog With Actions"
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
		          The actions in this window were passed in as an array of React objects.
		        </Dialog>
		      </div>		    	    	  

			<br />
          </center>        
      </div>
    );
  }
}

export default Profile;
