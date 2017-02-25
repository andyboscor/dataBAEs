import React, {Component} from 'react';
import ChatBubble from './ChatBubble.js';
import NewMessageBar from './NewMessageBar.js';

var fixedSend = {
  //flexGrow: '1',
  position: 'absolute',
  bottom: '0',
  height: '64px',
  //width: window.innerWidth - 400
  width: '100%',

}
var stickyContainer={
  //display:'flex',
  //flexDirection: 'column',
  width: '100%',
  height: '100%',
  //height: window.innerHeight - 64,
   overflowY: 'scroll',

  //marginBottom: '-64px'
  //flex: '1 0 auto'
}
var maincontainer={
  width: '100%',
  height:'100%',
  position: 'relative'
  //display:'flex'
  //minHeight: '100%',
  //position:'absolute'
}
var extra = {
  height:' 64px'
}
class Chat extends Component {


  render() {
    const message = { firstName: 'Nemo',
    message: 'Nemo sends a message here.',
    photo: 'this'
    }
  //console.log(this.props.list);
    var arr = this.props.list;
    //var arr = [];
    return (
      <div style={maincontainer}>
      <div style={stickyContainer}>
            {
              arr.map(function(item, i){
                  return <ChatBubble key={i} {...item} />
                },this)}
                <div style={extra}> </div>

</div>
        <div style={fixedSend}>
              <NewMessageBar handleSend={this.props.handleSend} />
        </div>

        </div>


    );
  }
}

export default Chat;
