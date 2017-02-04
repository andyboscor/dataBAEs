import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
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



    return (

	  <div >
  {this.renderConditionala()}
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
        actionIcon={<RaisedButton style={showButtonStyle} onTouchTap={this.handleOpen}>Show</RaisedButton>}
      >
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
