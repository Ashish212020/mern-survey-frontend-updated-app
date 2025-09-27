// FILE: client/src/components/SocialShareButtons.jsx

import { useState } from 'react';
// Import the specific icons we need from the library
import { FaTwitter, FaFacebook, FaLink } from 'react-icons/fa';

const SocialShareButtons = ({ surveyTitle }) => {
  // Get the current page's URL
  const shareUrl = window.location.href;
  const [copySuccess, setCopySuccess] = useState('');

  // Function to build the Twitter share URL
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(surveyTitle)}`;

  // Function to build the Facebook share URL
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  // Function to copy the link to the clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      // Show a success message for a couple of seconds
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, (err) => {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Share this survey:</h3>
      <div className="flex items-center space-x-4">
        {/* Twitter Share Button */}
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
          <FaTwitter size={24} />
        </a>

        {/* Facebook Share Button */}
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
          <FaFacebook size={24} />
        </a>

        {/* Copy Link Button */}
        <button onClick={handleCopyLink} className="text-gray-500 hover:text-indigo-600 transition-colors">
          <FaLink size={24} />
        </button>
        
        {/* Success Message for Copying */}
        {copySuccess && <span className="text-sm text-green-600">{copySuccess}</span>}
      </div>
    </div>
  );
};

export default SocialShareButtons;
