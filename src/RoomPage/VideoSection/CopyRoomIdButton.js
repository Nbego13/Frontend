import React, { useState } from 'react';

const CopyRoomIdButton = ({ roomId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      alert('Failed to copy: ' + err);
    }
  };

  return (
    <button onClick={handleCopy} className="copy_room_id_button">
      {copied ? 'Copied!' : 'Copy Room ID'}
    </button>
  );
};

export default CopyRoomIdButton;
