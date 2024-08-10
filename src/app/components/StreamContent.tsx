"use client";

const StreamContent = ({ channel }) => {
  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${channel}&parent=localhost`}
      style={{ width: '100%', height: '100%' }}
      frameBorder="0"
      scrolling="no"
      allowFullScreen={true}
    ></iframe>
  );
};

export default StreamContent;
