import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CommentCard from './CommentCard.js';
var showButtonStyle = {
  marginLeft: 10,
  marginRight: 10
}

  var commentarr = [ {firstname:'Nemo', message:'this', photo:'this'},{firstname:'Hello', message:'this sss', photo:'this'}, {firstname:'jeee', message:'this sss', photo:'this'}];

class Albums extends Component {

  constructor(props) {
    super(props);
    this.state = {chipData: [
      {key: 0, label: 'Angular'},
      {key: 1, label: 'JQuery'},
      {key: 2, label: 'Polymer'},
      {key: 3, label: 'ReactJS'},
    ],
  open: false};
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

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
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
    <RaisedButton style={showButtonStyle} onTouchTap={this.handleOpen}>Comment</RaisedButton>
        <Dialog
          title="Comments"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >

          <h2>Photo annotations</h2>

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


            <h2> Comments </h2>
            {commentarr.map(function(item, i){
                return <CommentCard key={i} {...item} />
              },this)}
              <AutoComplete
                hintText="Type anything"
                dataSource={this.stateAnnot.dataSource}
                onUpdateInput={this.handleUpdateInput}
                floatingLabelText="Add new comment"
                fullWidth={true}
              />

        </Dialog>
        </div>
    );
  }
}

export default Albums;
