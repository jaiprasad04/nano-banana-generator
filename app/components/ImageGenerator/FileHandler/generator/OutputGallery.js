import React from 'react';
import SectionTitle from '../sharedOne/SectionTitle';
import Image from 'next/image';

const LoadingSpinner = (props) => (<svg {...props} className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);


const OutputGallery = ({ finalImage, isGenerating, lastError }) => {
  
  const renderContent = () => {
    // 1. Show Loading State
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center p-8 h-full space-y-4">
          <LoadingSpinner className="w-12 h-12 text-orange-500" />
          <h3 className="text-xl font-bold text-gray-700">Generating Image...</h3>
          <p className="text-center text-gray-500 max-w-xs">The AI is crafting your masterpiece.</p>
        </div>
      );
    }

    // 2. Show Error State
    if (lastError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 h-full text-center">
          <p className="text-red-500 font-semibold mb-4">Generation Error</p>
          <p className="text-center text-gray-600 max-w-xs text-sm">{lastError}</p>
        </div>
      );
    }

    // 3. Show Final Image
    if (finalImage) {
      return (
        <Image
          height={500}
          width={500}
          src={finalImage}
          alt="AI Generated Output"
          className="w-full h-full object-contain rounded-xl shadow-lg"
        />
      );
    }

    // 4. Show Default Placeholder
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="bg-yellow-500/10 p-6 rounded-3xl mb-6">
          <span className="text-4xl text-yellow-500 block">🖼️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Ready to Create</h3>
        <p className="text-center text-gray-500 max-w-xs">
          Your AI-generated masterpiece will appear here.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
      <SectionTitle
        title="Output Gallery"
        subtitle="Your AI creations appear here instantly"
      />
      <div className="mt-6 flex-grow border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default OutputGallery;
