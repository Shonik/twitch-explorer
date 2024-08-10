"use client";

import Modulable from './Modulable';
import ChatContent from './ChatContent';

const ChatSidebar = ({ channel, onClose, displayName }) => {
  return (
    <Modulable
      id={`chat-${channel}`}
      title={`${displayName} chat`}
      onClose={onClose}
      initialWidth={300}
      initialHeight={500}
    >
      <ChatContent channel={channel} />
    </Modulable>
  );
};

export default ChatSidebar;
