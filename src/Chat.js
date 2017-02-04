import React, {Component} from 'react';
import ChatBubble from './ChatBubble.js';
import NewMessageBar from './NewMessageBar.js';

var fixedSend = {
  //flexGrow: '1',
  position: 'absolute',
  bottom: '0',
  height: '64px',
  width:'inherit'
}
var stickyContainer={
  display:'flex',
  flexDirection: 'column',
  width: '100%',
  height: '90%',
   overflowY: 'scroll',
  //marginBottom: '128px'
  //flex: '1 0 auto'
}
var maincontainer={
  width: '100%',
  height:'100%',
  //minHeight: '100%',
  position:'relative'
}

class Chat extends Component {


  render() {
    const message = { firstName: 'Nemo',
    message: 'Nemo sends a message here.',
    photo: 'this'
    }
    //console.log(this.props.list[0]);
    var arr = this.props.list[0];
    //var arr = [];
    return (
      <div style={maincontainer}>
      <div style={stickyContainer}>
            {
              arr.map(function(item, i){
                  return <ChatBubble key={i} {...item} />
                },this)}
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>
                <ChatBubble {...message}/>

</div>
        <div style={fixedSend}>
              <NewMessageBar />
        </div>

        </div>


    );
  }
}

export default Chat;
