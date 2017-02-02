import React, {Component} from 'react';
import ChatBubble from './ChatBubble.js';
import ChatList from './ChatList.js';
import NewMessageBar from './NewMessageBar.js';

var chatStyle = {
  display:'flex',
  flexDirection: 'row',
  height:'85vh',
  position: 'relative',
  //boxSizing: 'border-box',
     overflowY: 'scroll',
     width:'100%'
};
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
var sendContainer = {
  bottom: '0'
}
var whiteSpace = {
  width:'300px'
}
class Messaging extends Component {


  render() {
    const message = { firstName: 'Nemo',
    message: 'Nemo sends a message here.',
    photo: 'this'
    }
    return (
      <div>
        <div style={chatStyle}>
          <ChatList />
          <div style={stickyContainer}>
          <div style={container}>
            <div style={bubbles}>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
            </div>
        </div>



        <div style={fixedSend}>
              <NewMessageBar style={fixedSend}/>
        </div>
        </div>



      </div>

      </div>
    );
  }
}

export default Messaging;
