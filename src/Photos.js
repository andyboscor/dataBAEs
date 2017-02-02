import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Gallery from 'react-photo-gallery';
import {GridList, GridTile} from 'material-ui/GridList';
import PhotoDesc from './PhotoDesc.js';


var showButtonStyle = {
  marginRight: 10
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'https://s-media-cache-ak0.pinimg.com/736x/b5/9f/87/b59f8728480231a869b262c5df1978d9.jpg',
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    img: 'http://buzzsharer.com/wp-content/uploads/2015/11/pomeranian-and-cat.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
];

class Photos extends Component {
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
        label="Go Back"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
      <RaisedButton style={showButtonStyle} onTouchTap={this.handleOpen}>Show</RaisedButton>
        <Dialog
          title="My Pictures"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={true}
          repositionOnUpdate={true}
          autoScrollBodyContent={true}
        >
        <div style={styles.root}>
          <GridList
            cols={2}
            cellHeight={200}
            padding={1}
            style={styles.gridList}
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
                <img src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </div>


        </Dialog>
      </div>
    );
  }
}

export default Photos;
