import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import Photos from './Photos.js';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

var showButtonStyle = {
  marginLeft: 10,
  marginRight: 10
}



class Albums extends Component {

  constructor(props) {
    super(props);
    this.state = {chipData: [
      {key: 0, label: 'Angular'},
      {key: 1, label: 'JQuery'},
      {key: 2, label: 'Polymer'},
      {key: 3, label: 'ReactJS'},
    ]};
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }


  handleRequestDelete = (key) => {
    if (key === 3) {
      alert('Why would you want to delete React?! :)');
      return;
    }

    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  };

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  /*end of annotations*/

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
          autoScrollBodyContent={true}
        >
      
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>

        </Dialog>
        </div>
    );
  }
}

export default Albums;
