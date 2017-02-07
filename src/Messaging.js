import React, {Component} from 'react';
import Chat from './Chat.js';
import ChatList from './ChatList.js';

var chatStyle = {
  display:'flex',
  flexDirection: 'row',
  overflowY:'scroll',
  height: window.innerHeight - 112,
  width:'100%'
};

class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], exista: false};

    // This binding is necessary to make `this` work in the callback
    this.handleResponse = this.handleResponse.bind(this);
  }
  handleResponse(data) {
  var messagearray = [ {firstname:'Nemo', message:'this', photo:'this'},{firstname:'Hello', message:'this sss', photo:'this'}, {firstname:'jeee', message:'this sss', photo:'this'}];
  var newList=this.state.list;
  newList.push(messagearray);
  this.setState({
    list:newList,
    exista: true
  });
  }
  renderConditionala(){
    if(this.state.exista===true)
      return(
        <Chat {...this.state}/>
      );
  }

  render() {

    return (

        <div style={chatStyle}>
          <ChatList handleResponse={this.handleResponse} />
          {this.renderConditionala()}

        </div>


    );
  }
}

export default Messaging;
