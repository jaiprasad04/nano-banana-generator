import React from 'react';
import TabButton from '../sharedOne/TabButton.js';
import SectionTitle from '../sharedOne/SectionTitle.js';

import Image from 'next/image';


const PromptEngine = ({
  // Props passed from ImageGeneratorInterface
 currentTab, setCurrentTab, userPrompt, setUserPrompt, 
  referenceImageUrl, setReferenceImageUrl,
  handleGenerateClick, isGenerating, lastError
}) => {
  
  const isImageMode = currentTab === 'image-to-image';
  // Button disabled logic remains here
  const isButtonDisabled = isGenerating || !userPrompt.trim() || (isImageMode && !referenceImageUrl.trim());

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
      <SectionTitle
        title="Prompt Engine"
        subtitle="Transform your vision into reality"
      />

      {/* Tab Navigation */}
      <div className="flex p-1 bg-gray-100 rounded-xl my-6">
        <TabButton 
          isActive={currentTab === 'text-to-image'} 
          label="Text to Image" 
          onClick={() => setCurrentTab('text-to-image')} 
        />
        <TabButton 
          isActive={isImageMode} 
          label="Image to Image" 
          onClick={() => setCurrentTab('image-to-image')} 
        />
      </div>

      {/* Conditional: Reference Image Upload (Visible only in Image-to-Image mode) */}
      {isImageMode && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Reference Image (File Upload)
          </h4>

            <input
              type="url"
              value={referenceImageUrl}
              onChange={(e) => setReferenceImageUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
              placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
              disabled={isGenerating}
            />
          </div>
        )}
      {/* Creative Prompt Textarea */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
          Your Creative Prompt
        </h4>
        <div className="relative">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
            placeholder="Describe the image you want to generate or modify..."
            disabled={isGenerating}
          />
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            📋
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateClick}
        disabled={isButtonDisabled}
        className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-lg font-bold text-white transition duration-300
                   ${isButtonDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-orange-500/30'
                   }`}
      >
        {isGenerating ? (
          <>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <span className="text-lg">✨</span> 
            <span>Generate Now</span>
          </>
        )}
      </button>
      
      {/* Display error message if present */}
      {lastError && <p className="text-sm text-red-500 mt-4 text-center">{lastError}</p>
      }
    </div>
  )
};

export default PromptEngine;
