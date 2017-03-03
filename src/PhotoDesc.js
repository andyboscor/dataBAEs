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
    this.state = {
      chipData: [],
      open: false,
      photoID: null
    };
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

  componentWillMount() {
    var self = this;
    this.setState({
      photoID: self.props.photoID
    });
    fetch('https://friendzone.azurewebsites.net/API.php/annotations/' + self.props.photoID, {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let annotations = [];
        for(let row of json) {
          annotations.push({
            annotationID: row.annotationID,
            annotation: row.annotation
          });
        }
        self.setState({
          chipData : annotations
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }

  submitNewAnnotaion(value) {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/annotations/' + self.state.photoID, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          annotation: value
        })
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let annotations = self.state.chipData;
        annotations.push({
          annotationID: json,
          annotation: value
        });
        self.setState({
          chipData : annotations
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }


  handleRequestDelete = (key) => {
    let chipToDelete;
    for(let chip of this.state.chipData) {
      if(chip.annotationID === key) {
        chipToDelete= chip;
        break;
      }
    }
    if(!chipToDelete) {
      return;
    }
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/annotations/' + self.state.photoID, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          annotationID: chipToDelete.annotationID
        })
      })
      .then(function(response) {
        let index = self.state.chipData.indexOf(chipToDelete);
        self.state.chipData.splice(index, 1);
        self.setState({chipData: self.state.chipData});
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  };

  renderChip(data) {
    return (
      <Chip
        key={data.annotationID}
        onRequestDelete={() => this.handleRequestDelete(data.annotationID)}
        style={this.styles.chip}
      >
        {data.annotation}
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
              hintText="Annotate"
              dataSource={this.stateAnnot.dataSource}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.submitNewAnnotaion.bind(this)}
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
