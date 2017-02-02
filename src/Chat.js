import React, {Component} from 'react';
import ChatBubble from './ChatBubble.js';
import NewMessageBar from './NewMessageBar.js';

var bubbles = {
  flexGrow: '1'
}
var fixedSend = {
  flexGrow: '1'
}
var container = {
  height:'100%',
  flex: 'auto',
   overflowY: 'auto',
}
var stickyContainer={
  display:'flex',
  flexDirection: 'column',
  //height:'80vh',
  boxSizing: 'border-box',
  flexGrow: '1'
  //flex: '1 0 auto'
}

class Chat extends Component {


  render() {
    const message = { firstName: 'Nemo',
    message: 'Nemo sends a message here.',
    photo: 'this'
    }
    console.log(this.props.list[0]);
    var arr = this.props.list[0];
    //var arr = [];
    return (

      <div style={stickyContainer}>
          <div style={container}>
            <div style={bubbles}>
            {
              arr.map(function(item, i){
                  return <ChatBubble key={i} {...item} />
                },this)}
                <ChatBubble {...message}/>

            </div>
        </div>



        <div style={fixedSend}>
              <NewMessageBar style={fixedSend}/>
        </div>

        </div>

    );
  }
}

export default Chat;
