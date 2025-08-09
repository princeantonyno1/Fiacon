import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Logo from "../../assets/logo.png";

import privacyMarkdown from './terms_conditions.md?raw';

export default function PrivacyPolicy() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    setMarkdown(privacyMarkdown); 
  }, []);

  return (
<div className="max-w-5xl mx-auto p-6 prose text-left">
  <center>
    <img className="logoImage" src={Logo} alt="Logo" />
  </center>
  <ReactMarkdown>{markdown}</ReactMarkdown>
</div>
  );
}
