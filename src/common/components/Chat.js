import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import * as actions from '../actions/actions';
import * as authActions from '../actions/authActions';
import { Modal, DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.string.isRequired,
    typers: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
    
      targetedUser: ''
    }
  }
  componentDidMount() {
    const { socket, user, dispatch } = this.props;
    socket.emit('chat mounted', user);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    );
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    );
    socket.on('new channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
    socket.on('receive socket', socketID =>
      dispatch(authActions.receiveSocket(socketID))
    );
    socket.on('receive private channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
  }
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }

  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }
  
  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }
  
  changeActiveChannel(channel) {
    const { socket, activeChannel, dispatch } = this.props;
    socket.emit('leave channel', activeChannel);
    socket.emit('join channel', channel);
    dispatch(actions.changeChannel(channel));
    dispatch(actions.fetchMessages(channel.name));
  }

   render() {
    const { messages, socket, channels, activeChannel, typers, dispatch, user, screenWidth} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    const username = this.props.user.username;
    
    const dropDownMenu = (
      <div style={{'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1'}}>
        <DropdownButton key={1} style={{'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" title={username}>
          <MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={::this.handleSignOut}>Sign out</MenuItem>
        </DropdownButton>
      </div>
    );
     
    const bigNav = (
      <div className="nav">
        {dropDownMenu}
        <section style={{order: '2', marginTop: '1.5em'}}>
          <Channels socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} />
        </section>
      </div>
    );

    return (
      <div style={{margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box'}}>
        { bigNav }
        <div className="main">
          <header style={{background: '#FFFFFF', color: 'black', flexGrow: '0', order: '0', fontSize: '2.3em', paddingLeft: '0.2em'}}>
            <div>
            {activeChannel}
            </div>
          </header>
         
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem message={message}
               key={message.id} userHimself={ message.user.username === username }  />
            )}
          </ul>
          <MessageComposer socket={socket} activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
        </div>
       
      </div>
    );
  }
}
