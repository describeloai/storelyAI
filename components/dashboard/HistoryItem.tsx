import React from 'react';

interface HistoryItemProps {
  summary: string;
  onClick: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ summary, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '0.5rem 0.75rem',
        marginBottom: '0.5rem',
        border: 'none',
        background: '#fff7ed',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.85rem',
        color: '#333',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'background 0.2s',
      }}
      onMouseOver={e => e.currentTarget.style.background = '#ffe8d0'}
      onMouseOut={e => e.currentTarget.style.background = '#fff7ed'}
    >
      {summary}
    </button>
  );
};

export default HistoryItem;
