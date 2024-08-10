"use client";

const ChatContent = ({ channel }) => {
  return (
    <iframe
      src={`https://www.twitch.tv/embed/${channel}/chat?parent=localhost`}
      style={{ width: '100%', height: '100%' }}
      frameBorder="0"
      scrolling="no"
      allowFullScreen={true}
    ></iframe>
  );
};

export default ChatContent;
