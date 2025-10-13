import React from 'react';

const SectionTitle = ({ title, subtitle }) => (
  <div className="flex flex-col items-start space-y-1">
    <h2 className="text-2xl font-bold text-gray-800 pt-2">{title}</h2>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

export default SectionTitle;
