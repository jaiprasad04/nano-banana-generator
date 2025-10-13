import React from 'react';

const TabButton = ({ isActive, label, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
      ${isActive ? 'bg-white shadow-md text-gray-900 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
    `}
  >
    <span>{label}</span>
  </button>
);

export default TabButton;
