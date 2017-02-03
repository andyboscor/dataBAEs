import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Photos from './Photos.js';
import PhotoGallery from './PhotoGallery.js';
import RaisedButton from 'material-ui/RaisedButton';
import Gallery from 'react-photo-gallery';
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
    width: 1000,
    height: 950,
    overflowY: 'auto',
  },
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
class Albums extends Component {

  constructor(props) {
    super(props);
    this.renderConditionala = this.renderConditionala.bind(this);
  }
  state = {
   open: false,
  };

  handleOpen = () => {
   this.setState({open: true});
  };

  handleClose = () => {
   this.setState({open: false});
  };
  renderConditionala(){
    if(this.state.open===true&&this.props.open===true)
    {
      return(
        <div style={onTop}>
        <RaisedButton style={showButtonStyle} onTouchTap={this.handleClose}>Close</RaisedButton>
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
                  <img src={tile.img} />
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



    return (

	  <div style={styles.root}>
  {this.renderConditionala()}
  <div>
  <GridList
    cellHeight={180}
    style={styles.gridList}
  >
    <Subheader>December</Subheader>
    {tilesData.map((tile) => (
      <GridTile
        key={tile.img}
        title={tile.title}
        subtitle={<span>by <b>{tile.author}</b></span>}
        actionIcon={<RaisedButton style={showButtonStyle} onTouchTap={this.handleOpen}>Show</RaisedButton>}
      >
        <img src={tile.img} />
      </GridTile>
    ))}
  </GridList>
  </div>
	  </div>
    );
  }
}

export default Albums;
