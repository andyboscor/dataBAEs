import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import PhotoDesc from './PhotoDesc.js';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
var showButtonStyle = {
  marginRight: 10
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: '35px'
  },
  gridList: {
    width: 1000,
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
   photoTitle: ''
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
      self.getAlbum();
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  getAlbum() {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/albums/' + localStorage.getItem('userID') , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
      return response.json()
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
    this.getAlbum();
  }
  renderConditionala(){
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
      return(
        <div style={onTop}>
          <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Close" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          <RaisedButton style={closeButtonStyle} onTouchTap={this.handleNewPhotoOpen} label="Upload Photo" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
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
              {this.state.photos.map((tile) => (
                <GridTile
                  key={tile.photoID}
                  title=" "
                  actionIcon={<PhotoDesc />}
                  actionPosition="left"
                  titlePosition="top"
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                  cols={tile.featured ? 2 : 1}
                  rows={tile.featured ? 2 : 1}
                >
                <img src={tile.img} role="presentation" />
                </GridTile>
              ))}
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
          <center>
          <RaisedButton style={createNewAlbum} label="Create new album" onTouchTap={this.handleNewAlbumOpen}/>
          </center>
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
