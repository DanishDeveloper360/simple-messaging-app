import React, { Component, PropTypes } from 'react';
import ChannelListItem from './ChannelListItem';
import { Modal, Glyphicon, Input, Button } from 'react-bootstrap';
import * as actions from '../actions/actions';
import uuid from 'node-uuid';

export default class Channels extends Component {

  static propTypes = {
    channels: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {     
      channelName: '',     
    };
  }
  handleChangeChannel(channel) {   
    this.props.onClick(channel);
  }

  render() {
    const { channels, messages } = this.props;
    const filteredChannels = channels; // possible to slice if channels increase in number, future implementation.
   
    return (
      <section>
        <div>
          <span style={{paddingLeft: '0.8em', fontSize: '1.5em'}}>
            Group Channel           
          </span>
        </div>
         
        <div>
          <ul style={{display: 'flex', flexDirection: 'column', listStyle: 'none', margin: '0', overflowY: 'auto', padding: '0'}}>
            {filteredChannels.map(channel =>
              <ChannelListItem  style={{paddingLeft: '0.8em', background: '#2E6DA4', height: '0.7em'}} messageCount={messages.filter(msg => {
                return msg.channelID === channel.name;
              }).length} channel={channel} key={channel.id} onClick={::this.handleChangeChannel} />
              )}
          </ul>
         
        </div>
      </section>
    );
  }
}
