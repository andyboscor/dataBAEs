import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import OtherBlog from './OtherBlog.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';

const style = {
  margin: 5
};

const profileInfo ={
  width:'400px',
  backgroundColor: '#393F4B',
  height:'100%'
}

const dropdownLength ={
  width:'50%'
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

var privacyList ={
  '0': 'Only Me',
  '1': 'Friends Only',
  '2': 'Friends of Friends',
  '3': 'Circles'
}


var blogPrivacyList = [];
for (let i=0; i<Object.keys(privacyList).length ;i++) {
  blogPrivacyList.push(<MenuItem value={i} key={i} primaryText={privacyList[i]} />);
}

class PrivacySettings extends Component {
  state = {
    open: false,
    name: '',
    friendID: '',
    blogValue:'',
    albumValues:[],
    albumList: []
  };

  handleChangeBlog = (event, index, blogValue) => {
    this.setState({blogValue});
  };

  handleChangeAlbum = (index, value) => {
    let albArr=this.state.albumValues;
    albArr[index]= value;
    this.setState({albumValues: albArr});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/privacy/blog' , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
      self.setState({
        blogValue: json.access_right
      });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/privacy/albums' , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(getAlbumList) {
      var arr=[];
      for(let album in getAlbumList) {
        var postAttributes = getAlbumList[album];
        arr.unshift({
          albumAccess: postAttributes.access_right,
          albumTitle: postAttributes.albumTitle
        });
      }
      self.setState({
        albumList: arr,
        albumValues: arr.map((album) => {
          return album.albumAccess;
        })
      });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
  var albumListDisplay = [];
    for (let i = 0; i < this.state.albumList.length; i++) {
    albumListDisplay.push(
     <ListItem key={`albumTitle${i}`} primaryText={this.state.albumList[i].albumTitle}
        rightToggle={
         <SelectField
           style={dropdownLength}
           value={parseInt(this.state.albumValues[i],10)}
           onChange={(event, index, value)=>{
             this.handleChangeAlbum(i, value);}}
        >
         {blogPrivacyList}
        </SelectField>
       }
      />
    )
  }

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
          <List>
            <Subheader>Blog Privacy
              <br />
              <SelectField
                value={parseInt(this.state.blogValue,10)}
                onChange={this.handleChangeBlog}>
                {blogPrivacyList}
              </SelectField>
            </Subheader>
            <Divider />
            <Subheader>Photo Albums Privacy </Subheader>
            <div>
              {albumListDisplay}
            </div>
          </List>
      </div>
    </div>
  );
  }
}

export default PrivacySettings;
