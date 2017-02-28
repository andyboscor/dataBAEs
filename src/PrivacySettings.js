import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import OtherBlog from './OtherBlog.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
  margin: 5
};

const profileInfo ={
  width:'400px',
  backgroundColor: '#393F4B',
  height:'100%'
}

const profileContainer = {
  display: 'flex',
  height: '100%'
}

const contentContainer = {
  width: '100%',
  marginLeft: '100px'
}

const closeButtonStyle = {
  marginLeft: '10px',
  marginRight: '20px',
  color: 'white',
  fontColor: 'white',
  marginTop: '20px'
}

const items = [];
for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

class PrivacySettings extends Component {
  state = {
    open: false,
    name: '',
    friendID: '',
    value:10
  };

  handleChange = (event, index, value) => {
    this.setState({value});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    //console.log(this.props.friendID);
    return (
      <div style={profileContainer}>
        <div style={profileInfo}>
          <RaisedButton style={closeButtonStyle} onTouchTap={this.props.handleClose} label="Close" labelColor="white" backgroundColor="#FC4D1E"></RaisedButton>
          <center>
            <h1> Privacy Settings</h1>
      		  <Avatar
                src="http://icons.iconarchive.com/icons/graphicloads/100-flat/256/unlock-icon.png"
                size={230}
                style={style}/>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Save Changes" labelColor="white" backgroundColor="#A4D336"></RaisedButton>
          </center>
        </div>
        <div style={contentContainer}>
            <br/>
            <SelectField
              floatingLabelText="Photo Albums"
              value={this.state.value}
              onChange={this.handleChange}
              maxHeight={200}
              >
              {items}
            </SelectField>
        </div>
      </div>
    );
  }
}

export default PrivacySettings;
