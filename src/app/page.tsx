"use client";

import { useState } from 'react';
import StreamPlayer from './components/StreamPlayer';
import SearchBar from './components/SearchBar';
import ChatSidebar from './components/ChatSidebar';
import { ZIndexProvider } from './components/ZIndexContext';
import './styles/globals.css';

const Home = () => {
  const [channels, setChannels] = useState<string[]>([]);
  const [displayNames, setDisplayNames] = useState<{ [key: string]: string }>({});

  const handleSearch = (channel: string) => {
    if (!channels.includes(channel)) {
      const displayName = channel.charAt(0).toUpperCase() + channel.slice(1);
      setChannels([...channels, channel]);
      setDisplayNames((prevDisplayNames) => ({
        ...prevDisplayNames,
        [channel]: displayName,
      }));
    }
  };

  const handleClose = (channel: string) => {
    setChannels(channels.filter((ch) => ch !== channel));
    setDisplayNames((prevDisplayNames) => {
      const { [channel]: _, ...rest } = prevDisplayNames;
      return rest;
    });
  };

  return (
    <ZIndexProvider>
      <div className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-wrap gap-4 mt-4">
          {channels.map((channel) => (
            <StreamPlayer
              key={channel}
              channel={channel}
              displayName={displayNames[channel]}
              onClose={() => handleClose(channel)}
            />
          ))}
          {channels.map((channel) => (
            <ChatSidebar
              key={`chat-${channel}`}
              channel={channel}
              displayName={displayNames[channel]}
              onClose={() => handleClose(channel)}
            />
          ))}
        </div>
      </div>
    </ZIndexProvider>
  );
};

export default Home;
