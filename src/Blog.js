import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Post from './Post.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import 'whatwg-fetch';

var addBottom = {
  marginTop:'40px',
  marginBottom: '150px'
}

var cardarray1 = [ {username:"This is my long ass post", email_address: "I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {username:"This is my long ass post", email_address: "I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thi"}, {username:"This is my long ass post", email_address:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {username:'This is my long ass post', email_address:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I couldve handled the states and some other shit."}];

class Blog extends Component {

  state = {
    dataSource: [],
    cardarray: [],
    open: false
  }

  componentDidMount() {
    var self = this;
    fetch('http://friendzone.azurewebsites.net/API.php/blog/5', {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      } 
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        // json.map(function(item, i)

        console.log('parsed json', json)

        // self.setState({cardarray: item})

        //   )
        //cardarray = json.results;
        self.setState({cardarray: cardarray1})
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    }

  stateButton = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
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
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
    <div style={addBottom}>
      <div >
      <center>
        <FloatingActionButton onTouchTap={this.handleOpen} backgroundColor='#8088B0'>
          <ContentAdd/>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >

          <TextField
            hintText="Type anything"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Blog Title"
            fullWidth={true}
          />


          <TextField
            hintText="Type anything"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Write Your blog here"
            fullWidth={true}
          />

          </Dialog>
        </FloatingActionButton>
        </center>
      </div>

      {this.state.cardarray.map(function(item, i){
        return <Post key={i} {...item} />},this)}

    </div>
    );
  }
}

export default Blog;
