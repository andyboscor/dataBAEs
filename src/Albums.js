import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import PhotoDesc from './PhotoDesc.js';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui/svg-icons/content/create';
import FloatingActionButton from 'material-ui/FloatingActionButton';

var showButtonStyle = {
  marginRight: 10
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: '35px'
    //margin: '0 auto'
  },
  gridList: {
    width: '100%',
    maxWidth: '1000px',
    height: '100%',
    overflowY: 'auto',
    paddingBottom: '120px'
  },
  root2: {
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
  }
};
var onTop ={
  position: 'fixed',
  overflowY: 'scroll',
  height:'100%',
  zIndex: '999',
  width: '100%',
  backgroundColor: 'white'
}
var onTop2 = {
  position: 'fixed',
  overflowY: 'scroll',
  height:'100%',
  zIndex: '999',
  width: '80%',
  backgroundColor: 'white'
}
var grid = {
  width: '100%',
  maxWidth: '900px',
  height: '100%',
  overflowY: 'scroll',
  paddingBottom: '120px'
}

var closeButtonStyle = {
  marginTop: '20px',
  marginLeft: '20px',
  color: 'white',
  fontColor: 'white'
}
var createNewAlbum = {
  margin:'30px'
}
class Albums extends Component {
  constructor(props) {
    super(props);
    this.renderConditionala = this.renderConditionala.bind(this);
    this.handleNewAlbum = this.handleNewAlbum.bind(this);
    this.getAlbum = this.getAlbum.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.upload_image = this.upload_image.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }
  state = {
   open: false,
   createNewAlbum: false,
   createNewPhoto: false,
   albumTitle: '',
   description: '',
   albums: [],
   openAlbumID: '',
   photos: [],
   photoTitle: '',
   userID: '',
   otherProfile: false,
   editPhotos: false
  };

  handleOpen = () => {
   this.setState({open: true});
  };

  handleClose = () => {
   this.setState({open: false, photos: []});
  };
  handleNewAlbumOpen = () => {
   this.setState({createNewAlbum: true});
  };
  handleNewAlbumClose = () => {
   this.setState({createNewAlbum: false});
  };
  handleNewPhotoOpen = () => {
   this.setState({createNewPhoto: true});
  };
  handleNewPhotoClose = () => {
   this.setState({createNewPhoto: false});
  };
  handleNewAlbum(){
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/albums' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      },
      body: JSON.stringify({
        albumTitle: self.state.albumTitle,
        description: self.state.description,
      })
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      self.handleNewAlbumClose();
      self.getAlbum(self.state.userID);
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  getAlbum(id) {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/albums/' + id , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('parsed json', json)
      var results = [];
      json.map(function(item,i)
      {
        let url = (item.first_image) ? "https://friendzone.azurewebsites.net/" + item.first_image : "http://www.designbolts.com/wp-content/uploads/2012/12/White-Gradient-Squares-Seamless-Patterns-For-Website-Backgrounds.jpg";
        results.push({albumID: item.albumID, albumTitle:item.albumTitle, description:item.description, img: url});
      });
      self.setState({
        albums:results
      });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  getPhotos(id){
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/photos/' + id , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json get photos', json)
      var results = [];
      json.map(function(item,i)
      {
      results.push({photoID: item.photoID, annotation:item.annotation, img: "https://friendzone.azurewebsites.net/" + item.url});
    });
    self.setState({
    photos:results
  });
}).catch(function(ex) {
  console.log('parsing failed', ex)
})
}
upload_image(){
  var input = document.querySelector('input[type="file"]')

  var data = new FormData()
  data.append('upfile', input.files[0])
  var self = this;
  console.log(self.state.openAlbumID);
  fetch('https://friendzone.azurewebsites.net/API.php/photos/' + self.state.openAlbumID, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + localStorage.getItem('usercred')
    },
    body: data
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log(json);
    self.getPhotos(self.state.openAlbumID);
    self.setState({createNewPhoto:false});
  });
}
  handleClick(id){
    this.setState({openAlbumID: id, open: true});
    this.getPhotos(id);
  }
  componentDidMount(){
    if(typeof this.props.friendID != "undefined")
    {
      this.getAlbum(this.props.friendID);
      this.setState({
        otherProfile:true,
        userID: this.props.friendID
      });
      onTop = {
        position: 'fixed',
        overflowY: 'scroll',
        height:'100%',
        zIndex: '999',
        width: '80%',
        backgroundColor: 'white'
      }
    }
    else {
      let userID = localStorage.getItem('userID');
      this.getAlbum(userID);
      this.setState({
        userID: userID
      });
      onTop = {
        position: 'fixed',
        overflowY: 'scroll',
        height:'100%',
        zIndex: '999',
        width: '100%',
        backgroundColor: 'white'
      }
    }
  }
  newAlbumButton(){
    if(this.state.otherProfile===false)
    return (  <center>
      <RaisedButton style={createNewAlbum} label="Create new album" onTouchTap={this.handleNewAlbumOpen}/>
      </center>);
  }

  deletePhoto(photoID) {
    let photoToDelete;
    for(let photo of this.state.photos) {
      if(photo.photoID === photoID) {
        photoToDelete = photo;
        break;
      }
    }
    if(!photoToDelete) return;
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/photos/' + self.state.openAlbumID, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          photoID: photoID
        })
      })
      .then(function(response) {
        let index = self.state.photos.indexOf(photoToDelete);
        self.state.photos.splice(index, 1);
        self.setState({photos: self.state.photos});
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }

  renderConditionala(){
    let editButton;
    if (this.state.userID === localStorage.getItem('userID')) {
      editButton = (
        <FloatingActionButton style={{ margin: '20px 20px 0 0', float: 'right' }} onTouchTap={() => this.setState({ editPhotos: !this.state.editPhotos })} mini={true}>
          <Create />
        </FloatingActionButton>);
    }
    if(this.state.open===true&&this.props.open===true){
      const actions = [
       <FlatButton
         label="Cancel"
         primary={true}
         onTouchTap={this.handleNewPhotoClose}
       />,
       <FlatButton
         label="Upload"
         primary={true}
         keyboardFocused={true}
         onTouchTap={this.upload_image}
       />,
     ];
     let uploadButton;
     if(this.state.otherProfile===false) uploadButton = <RaisedButton style={closeButtonStyle} onTouchTap={this.handleNewPhotoOpen} label="Upload Photo" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
      return(
        <div style={onTop}>
          <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Close" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          {uploadButton}
          {editButton}
          <Dialog
           title="Upload a new photo"
           actions={actions}
           modal={false}
           open={this.state.createNewPhoto}
           onRequestClose={this.handleNewPhotoClose}
         >
          <form>
          <input type="file" />
          </form>
          </Dialog>
          <div>
            <div style={styles.root}>
              <GridList style={grid}
                cols={2}
                cellHeight={300}
              >
              {this.state.photos.map((tile) => {
                let action;
                if (this.state.editPhotos) {
                  action = (
                    <IconButton
                        iconStyle={{ color: 'white' }}
                        tooltip="Delete Photo"
                        tooltipPosition="bottom-right"
                        onTouchTap={() => this.deletePhoto(tile.photoID) }>
                        <Clear />
                    </IconButton>);
                } else {
                  action= (<PhotoDesc userID={this.state.userID} photoID={tile.photoID}/>);
                }
                return (<GridTile
                  key={tile.photoID}
                  title=" "
                  actionIcon={action}
                  actionPosition="left"
                  titlePosition="top"
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                  cols={tile.featured ? 2 : 1}
                  rows={tile.featured ? 2 : 1}
                >
                  <img src={tile.img} role="presentation" />
                </GridTile>);
              })}
              </GridList>
            </div>
          </div>
        </div>
      );
     }
  }


  render() {
    const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onTouchTap={this.handleNewAlbumClose}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.handleNewAlbum}
     />,
   ];
    return (
  	  <div>
        {this.renderConditionala()}
        {this.newAlbumButton()}
          <div style={styles.root}>


            <Dialog
             title="Create new album"
             actions={actions}
             modal={false}
             open={this.state.createNewAlbum}
             onRequestClose={this.handleNewAlbumClose}
           >
           <TextField
             hintText="Type anything"
             type="text"
             value={this.state.albumTitle}
             onChange={ (event) => { this.setState({ albumTitle: event.target.value });} }
             floatingLabelText="Album Title"
             fullWidth={true}
           />
           <TextField
             hintText="Type anything"
             type="text"
             value={this.state.description}
             onChange={ (event) => { this.setState({ description: event.target.value });} }
             floatingLabelText="Description"
             fullWidth={true}
           />
           </Dialog>
            <GridList
              cellHeight={180}
              style={styles.gridList}>
              {this.state.albums.map((tile) => (
                <GridTile
                  key={tile.albumID}
                  title={tile.albumTitle}
                  subtitle={<span>{tile.description}</span>}
                  actionIcon={<RaisedButton style={showButtonStyle}  onTouchTap={this.handleClick.bind(this, tile.albumID)}>Show</RaisedButton>}>
                  <img src={tile.img} role="presentation"/>
                </GridTile>
              ))}
            </GridList>
          </div>
  	  </div>
    );
  }

}

export default Albums;
