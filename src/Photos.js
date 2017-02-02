import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Gallery from 'react-photo-gallery';


var showButtonStyle = {
  marginRight: 10
}

var photoWrapper ={
  position: 'relative',
  height: '350px'

}

const PHOTO_SET = [
  {
    src: 'http://example.com/example/img1_small.jpg',
    width: 681,
    height: 1024,
    aspectRatio: 1.5,
    lightboxImage:{
    src: 'http://example.com/example/img1_large.jpg',
    srcset: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ]
    }
  },
  {
    src: 'http://example.com/example/img2_small.jpg',
    width: 600,
    height: 600,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://example.com/example/img2_large.jpg',
    srcset: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ]
    }
  },
    {
    src: 'http://example.com/example/img2_small.jpg',
    width: 600,
    height: 600,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://example.com/example/img2_large.jpg',
    srcset: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ]
    }
  }
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
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
      <RaisedButton style={showButtonStyle} onTouchTap={this.handleOpen}>Show</RaisedButton>
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={true}
          repositionOnUpdate={true}
          autoScrollBodyContent={true}
        >
        <div style={photoWrapper} >
        <Gallery photos={PHOTO_SET} />
        </div>

        </Dialog>
      </div>
    );
  }
}

export default Photos;
