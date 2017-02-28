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
    paddingTop: '70px'
  },
  gridList: {
    width: 1000,
    height: 950,
    overflowY: 'auto',
  },
  root2: {
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
  }
};

const tilesData = [
  {
    img: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/pembroke-welsh-corgi-dog-breed-pictures/side-6.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'http://www.petsionary.com/wp-content/uploads/pe/pembroke-welsh-corgi-black-color-at-green-lawn.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'https://aos.iacpublishinglabs.com/question/1144fc9f1f837c9774b5351d1b66f231/aq/700px-394px/corgi-puppies-local-rescues_8336131e130fcb88.jpg?domain=cx.aos.ask.com',
    title: 'Camera',
    author: 'Danson67',
    featured: true
  },
  {
    img: 'https://i.ytimg.com/vi/To8oesttqc4/hqdefault.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'http://www.dogster.com/wp-content/uploads/2015/05/shiba-inu-puppies-10.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'http://cdn.skim.gs/images/kqdbg8dxw1r6nd8uaszd/shiba-inu-puppies-shiba-inu-times-two',
    title: 'Honey',
    author: 'fancycravel',
  },
];

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
}

var closeButtonStyle = {
  marginTop: '20px',
  marginLeft: '20px',
  color: 'white',
  fontColor: 'white'
}

class Albums extends Component {
  constructor(props) {
    super(props);
    this.renderConditionala = this.renderConditionala.bind(this);
    this.handleNewAlbum = this.handleNewAlbum.bind(this);
  }
  state = {
   open: false,
   createNewAlbum: false,
   albumTitle: '',
   description: ''
  };

  handleOpen = () => {
   this.setState({open: true});
  };

  handleClose = () => {
   this.setState({open: false});
  };
  handleNewAlbumOpen = () => {
   this.setState({createNewAlbum: true});
  };
  handleNewAlbumClose = () => {
   this.setState({createNewAlbum: false});
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
        self.handNewAlbumClose();
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }
  renderConditionala(){
    if(this.state.open===true&&this.props.open===true){
      return(
        <div style={onTop}>
          <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Close" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          <div>
            <div style={styles.root}>
              <GridList style={grid}
                cols={2}
                cellHeight={300}
                padding={1}
              >
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
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

  upload_image(){
  var input = document.querySelector('input[type="file"]')

  var data = new FormData()
  data.append('upfile', input.files[0])
  data.append('user', 'hubot')

  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: data
  }).then(function(response) {
      return response.json()
  }).then(function(json) {
    console.log(json);
  });
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
          <div style={styles.root}>
            <form>
            <input type="file" />
            <RaisedButton label="Upload" onTouchTap={this.upload_image} />
            </form>
            <RaisedButton label="Create new album" onTouchTap={this.handleNewAlbumOpen}/>
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
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.author}</b></span>}
                  actionIcon={<RaisedButton style={showButtonStyle} onTouchTap={this.handleOpen}>Show</RaisedButton>}>
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
