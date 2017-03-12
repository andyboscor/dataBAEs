import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';

const style = {
  margin: 5
};

const securityBoard ={
  width:'400px',
  backgroundColor: '#393F4B',
  height:'100%'
}

const dropdownLength ={
  width:'50%'
}

const securityContainer = {
  display: 'flex',
  height: '100%'
}

const securityContent = {
  width: '100%',
  marginLeft: '50px',
  marginRight: '20px',
  overflowY: 'scroll',
  marginBottom: '100px'
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

var goWhite = {
  color: 'white'
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
    albumList: [],
    openSnackbar: false
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

  snackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };  

  handleSubmit = () => {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/privacy/blog' , {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_right: parseInt(self.state.blogValue, 10)
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
          self.setState({
            access_right: self.state.blogValue,
            openSnackbar: true
          })
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
    let i = 0;
    for(let album of this.state.albumList){
      this.saveAlbum(album.albumID, this.state.albumValues[i]);
      i++;
    }
    this.handleClose();
  }

  saveAlbum(albumID, access){
    fetch('https://friendzone.azurewebsites.net/API.php/privacy/albums/'+ albumID , {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           access_right: access
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
  }

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
    fetch('https://friendzone.azurewebsites.net/API.php/privacy/albums' , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(getAlbumList) {
      var arr=[];
      for(let album of getAlbumList) {

        arr.unshift({
          albumID: album.albumID,
          albumAccess: album.access_right,
          albumTitle: album.albumTitle
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
    <div style={securityContainer}>
      <div style={securityBoard}>
        <RaisedButton style={closeButtonStyle} onTouchTap={this.props.handleClose} label="Close" labelColor="white" backgroundColor="#FC4D1E"></RaisedButton>
        <center>
          <h1 style={goWhite}> Privacy Settings</h1>
    		  <Avatar
              src="http://icons.iconarchive.com/icons/graphicloads/100-flat/256/unlock-icon.png"
              size={230}
              style={style}/>
          <RaisedButton style={closeButtonStyle}
            onTouchTap={this.handleSubmit.bind(this)}
            label="Save Changes"
            labelColor="white"
            backgroundColor="#A4D336">
              <Snackbar
                open={this.state.openSnackbar}
                message="Privacy saved!"
                autoHideDuration={2000}
                onRequestClose={this.snackbarClose}
              />                        
          </RaisedButton>
        </center>
      </div>
      <div style={securityContent}>
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
