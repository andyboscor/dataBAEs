import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const style = {margin: 5};
class Profile extends Component {

  state = {
      open: false,
      first_name: '',
      last_name: '',
      email_address: ''
    };

  componentDidMount() {
    let value = localStorage.getItem('userID');
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/profile/' + value , {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        self.setState({
          first_name: json.first_name,
          last_name: json.last_name,
          email_address: json.email_address
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      })
  }

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
          <center><h1> {this.state.first_name + " " + this.state.last_name} </h1>
		  <Avatar
          src="https://lumiere-a.akamaihd.net/v1/images/07ff8e314e2798d32bfc8c39f82a9601677de34c.jpeg"
          size={230}
          style={style}/>
          <br />
		  <TextField value={this.state.first_name} hintText="First Name" /><br />
		  <TextField value={this.state.last_name} hintText="Last Name" /><br />
      <TextField value={this.state.email_address} hintText="Email" /><br />
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
