import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownMessage = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        fontSize: '1rem',
        lineHeight: 1.6,
      }}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;
