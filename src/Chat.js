import React, {Component} from 'react';
import ChatBubble from './ChatBubble.js';
import NewMessageBar from './NewMessageBar.js';

var fixedSend = {
  position: 'absolute',
  bottom: '0',
  height: '64px',
  width: '100%',
}
var stickyContainer={
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
}
var maincontainer={
  width: '100%',
  height:'100%',
  position: 'relative'
}
var extra = {
  height:' 64px'
}
class Chat extends Component {
  scrollToBottom = () => {
      var myElement = document.getElementById('element_within_div');
      var topPos = myElement.offsetTop;
      document.getElementById('scrolling_div').scrollTop = topPos;
  }
  componentDidMount() {
      this.scrollToBottom();
  }
  componentDidUpdate() {
      this.scrollToBottom();
  }
  render() {
    var arr = this.props.list;
    return (
      <div style={maincontainer}>
        <div style={stickyContainer} id="scrolling_div">
            {
              arr.map(function(item, i){
                  return <ChatBubble key={i} {...item} />
                },this)}
                <div id="element_within_div" style={{height:'1px', width:'1px'}} ref={(el) => { this.messagesEnd = el; }}> </div>
                <div style={extra} > </div>
        </div>
        <div style={fixedSend}>
              <NewMessageBar handleSend={this.props.handleSend} {...this.props}/>
        </div>
      </div>
    );
  }
}

export default Chat;
