import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import Photos from './Photos.js';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

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
    open2: false,
  };

  handleOpen = () => {
    this.setState({open2: true});
  };

  handleClose = () => {
    this.setState({open2: false});
  };

// end of popup

  stateAnnot = {
    dataSource: [],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
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
          open={this.state.open2}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >

          Photo annotations
       
            <div style={this.styles.wrapper}>
              {this.state.chipData.map(this.renderChip, this)}
            </div>

            <AutoComplete
              hintText="Type anything"
              dataSource={this.stateAnnot.dataSource}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText="Add annotations"
              fullWidth={true}
            />    

            <Divider />

        </Dialog>
        </div>
    );
  }
}

export default Albums;