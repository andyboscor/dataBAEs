import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Photos from './Photos.js';

class Albums extends Component {

  render() {

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
    return (
	  <div style={styles.root}>
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
	          actionIcon={<Photos />}
	        >
	          <img src={tile.img} />
	        </GridTile>
	      ))}
	    </GridList>
	  </div>
    );
  }
}

export default Albums;
