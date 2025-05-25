import React, { useState } from 'react';

const CopyUrlButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      alert('Failed to copy: ' + err);
    }
  };

  return (
    <button onClick={handleCopy} className="copy_url_button">
      {copied ? 'Copied!' : 'Copy URL'}
    </button>
  );
};

export default CopyUrlButton;
