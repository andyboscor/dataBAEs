import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CommentCard from './CommentCard.js';
import Tooltip from 'material-ui/internal/Tooltip';

var showButtonStyle = {
  marginLeft: 10,
  marginRight: 10
}

class Albums extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chipData: [],
      open: false,
      photoID: null,
      commentarr: [],
      annotation: '',
      comment: '',
      userID: this.props.userID,
      isAdmin: this.props.isAdmin,
      showTooltip: []
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
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
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
            userID: row.userID,
            name: row.first_name + " " + row.last_name,
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

    fetch('https://friendzone.azurewebsites.net/API.php/comments/' + self.props.photoID, {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let comments = [], tooltip = [];
        for(let row of json) {
          tooltip.push(false);
          comments.push({
            commentID: row.commentID,
            userID: row.userID,
            firstname: (row.first_name + " " + row.last_name),
            message: row.description,
            picture: ("https://friendzone.azurewebsites.net/" + row.picture)
          });
        }
        self.setState({
          commentarr: comments,
          showTooltip: tooltip
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }

  submitNewAnnotation(e) {
    e.preventDefault();
    let value = this.state.annotation;
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
        let annotation = json[0];
        annotations.push({
          annotationID: annotation.annotationID,
          userID: annotation.userID,
          name: annotation.first_name + " " + annotation.last_name,
          annotation: annotation.annotation
        });
        self.setState({
          chipData : annotations,
          annotation: ''
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }


  handleRequestDeleteAnnotation = (key) => {
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

  submitNewComment(e) {
    e.preventDefault();
    let value = this.state.comment;
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/comments/' + self.state.photoID, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: value
        })
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let row = json[0];
        let comments = self.state.commentarr;
        comments.push({
          commentID: row.commentID,
          userID: localStorage.getItem('userID'),
          firstname: row.first_name + " " + row.last_name,
          message: value,
          picture: ("https://friendzone.azurewebsites.net/" + row.picture)
        });
        self.setState({
          commentarr : comments,
          comment: ''
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }

  handleRequestDeleteComment = (commentID) => {
    let commentToDelete;
    for(let comment of this.state.commentarr) {
      if(comment.commentID === commentID) {
        commentToDelete= comment;
        break;
      }
    }
    if(!commentToDelete) {
      return;
    }
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/comments/' + self.state.photoID, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          commentID: commentID
        })
      })
      .then(function(response) {
        let index = self.state.commentarr.indexOf(commentToDelete);
        self.state.commentarr.splice(index, 1);
        self.setState({commentarr: self.state.commentarr});
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  };

  onMouseOver(index) {
    this.state.showTooltip[index] = true;
    this.setState({
      showTooltip: this.state.showTooltip
    });
  }

  onMouseOut(index) {
    this.state.showTooltip[index] = false;
    this.setState({
      showTooltip: this.state.showTooltip
    });
  }

  renderChip(data, index) {
    if(data.userID !== localStorage.getItem('userID') && this.state.isAdmin !== true) {
      return (<Chip
        key={data.annotationID}
        style={this.styles.chip}
        onMouseOver={() => this.onMouseOver(index)}
        onMouseOut={() => this.onMouseOut(index)}
      >
        <Tooltip show={this.state.showTooltip[index]} label={data.name} horizontalPosition="center" verticalPosition="top" touch={false} />
        {data.annotation}
      </Chip>

      )
    }
    return (
      <Chip
        key={data.annotationID}
        onRequestDelete={() => this.handleRequestDeleteAnnotation(data.annotationID)}
        style={this.styles.chip}
        onMouseOver={() => this.onMouseOver(index)}
        onMouseOut={() => this.onMouseOut(index)}
      >
        <Tooltip show={this.state.showTooltip[index]} label={data.name} horizontalPosition="center" verticalPosition="top" touch={false} />
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

    let comments = [];
    for(let comment of this.state.commentarr) {
      comments.push(<CommentCard key={comment.commentID} isAdmin={this.state.isAdmin} deleteFunction={ this.handleRequestDeleteComment.bind(this) } {...comment} />);
    }

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

            <form onSubmit={(e) => this.submitNewAnnotation(e)}>
              <TextField
                hintText="Annotate"
                onChange={(e) => { this.setState({ annotation: e.target.value }) }}
                value={this.state.annotation}
                floatingLabelText="Add annotations"
                fullWidth={true}
              />
            </form>

            <br />
            <Divider />
            <h2> Comments </h2>
            {comments}
            <form onSubmit={(e) => this.submitNewComment(e)}>
              <TextField
                hintText="Type anything"
                value={this.state.comment}
                onChange={(e) => { this.setState({ comment: e.target.value }) }}
                floatingLabelText="Add new comment"
                fullWidth={true}
              />
            </form>
        </Dialog>
        </div>
    );
  }
}

export default Albums;
