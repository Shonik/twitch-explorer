"use client";

import Modulable from './Modulable';
import StreamContent from './StreamContent';

const StreamPlayer = ({ channel, onClose, displayName }) => {
  return (
    <Modulable
      id={`stream-${channel}`}
      title={displayName}
      onClose={onClose}
      initialWidth={640}
      initialHeight={360}
    >
      <StreamContent channel={channel} />
    </Modulable>
  );
};

export default StreamPlayer;
