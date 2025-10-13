import React, { useState } from 'react';
import axios from 'axios';
import PromptEngine from './FileHandler/generator/PromptEngiene';
import OutputGallery from './FileHandler/generator/OutputGallery';

// --- Global Utility: Loading Spinner (Defined and EXPORTED here) ---
export const LoadingSpinner = (props) => (
  <svg {...props} className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ImageGeneratorInterface = () => {
  const [currentTab, setCurrentTab] = useState('text-to-image');
  const [userPrompt, setUserPrompt] = useState('A majestic orange tiger with glowing blue eyes, walking in a futuristic cybernetic jungle, highly detailed, 4k');
  const [finalImage, setFinalImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [referenceImageUrl, setReferenceImageUrl] = useState('');

  const handleGenerateClick = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim() || isGenerating) return;

    setFinalImage(null);
    setLastError(null);
    setIsGenerating(true);

    // Get API key from environment variable
    const API_KEY = process.env.NEXT_PUBLIC_MUI_API_KEY;
    if (!API_KEY) {
      setLastError('API key is missing. Please set NEXT_PUBLIC_MUI_API_KEY in your environment.');
      setIsGenerating(false);
      return;
    }

    if (currentTab === 'text-to-image') {
      const url = 'https://api.muapi.ai/api/v1/nano-banana';
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      };
      const payload = {
        prompt: userPrompt,
        aspect_ratio: "1:1"
      };

      try {
        const begin = Date.now();
        const submitResponse = await axios.post(url, payload, { headers });

        if (submitResponse.status === 200) {
          const requestId = submitResponse.data.request_id;
          const resultUrl = `https://api.muapi.ai/api/v1/predictions/${requestId}/result`;
          const pollHeaders = { 'x-api-key': API_KEY };

          // Poll for the result
          while (true) {
            const pollResponse = await axios.get(resultUrl, { headers: pollHeaders });

            if (pollResponse.status === 200) {
              const status = pollResponse.data.status;

              if (status === 'completed') {
                const end = Date.now();
                const imageUrl = pollResponse.data.outputs[0];
                if (imageUrl) {
                  setFinalImage(imageUrl);
                } else {
                  setLastError("Generation completed but no image URL was returned.");
                }
                break;
              } else if (status === 'failed') {
                setLastError(`Generation failed: ${pollResponse.data.error || 'Unknown error.'}`);
                break;
              } else {
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            } else {
              setLastError(`Polling failed: ${pollResponse.data.error || pollResponse.statusText}`);
              break;
            }
          }
        } else {
          setLastError(`Submission failed: ${submitResponse.data?.error || submitResponse.statusText}`);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setLastError('Request failed: 403 Forbidden. Check your API key and permissions.');
        } else {
          setLastError(`Request failed: ${error.message}. Check console for details.`);
        }
      } finally {
        setIsGenerating(false);
      }
    } 
    else
       {
      // IMAGE-TO-IMAGE LOGIC
      if (!referenceImageUrl.trim()) {
        setLastError("Please provide a valid image URL for Image-to-Image.");
        setIsGenerating(false);
        return;
      }
      console.log("Hello from MuApi")

      const url = 'https://api.muapi.ai/api/v1/midjourney-v7-image-to-image';
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      };
      const payload = {
        prompt: userPrompt,
        image_url: referenceImageUrl,
        aspect_ratio: '1:1',
        speed: 'relaxed',
        variety: 5,
        stylization: 1,
        weirdness: 1
      };

      try {
        const begin = Date.now();
        const response = await axios.post(url, payload, { headers });

        if (response.status === 200) {
          const requestId = response.data.request_id;
          console.log(`Task submitted successfully. Request ID: ${requestId}`);

          const resultUrl = `https://api.muapi.ai/api/v1/predictions/${requestId}/result`;
          const pollHeaders = { 'x-api-key': API_KEY };

          while (true) {
            const pollResponse = await axios.get(resultUrl, { headers: pollHeaders });

            if (pollResponse.status === 200) {
              const status = pollResponse.data.status;

              if (status === 'completed') {
                
                const end = Date.now();
                console.log(`Task completed in ${(end - begin) / 1000} seconds.`);
                const imageUrl = pollResponse.data.outputs[0];
                console.log(`Task completed successfully. Image URL: ${imageUrl}`);
            
                if (imageUrl) {
                  setFinalImage(imageUrl);
                } else {
                  console.error("No image URL returned.");
                  setLastError("Generation completed but no image URL was returned.");
                }
                break;
              } else if (status === 'failed') {
                setLastError(`Generation failed: ${pollResponse.data.error || 'Unknown error.'}`);
                console.error(`Task failed: ${pollResponse.data.error || 'Unknown error.'}`);
                break;
              } else {
                console.log(`Task still processing... Status: ${status}`);
              }
            } else {
              setLastError(`Polling failed: ${pollResponse.data.error || pollResponse.statusText}`);
              console.error(`Polling error: ${pollResponse.data.error || pollResponse.statusText}`);
              break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Poll every second
          }
        } else {
          setLastError(`Submission failed: ${response.data?.error || response.statusText}`);
          console.error(`Submission error: ${response.data?.error || response.statusText}`);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setLastError('Request failed: 403 Forbidden. Check your API key and permissions.');
        } else {
          setLastError(error.message);
        }
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 sm:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <PromptEngine
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          referenceImageUrl={referenceImageUrl}
          setReferenceImageUrl={setReferenceImageUrl}
          handleGenerateClick={handleGenerateClick}
          isGenerating={isGenerating}
          lastError={lastError}
        />
        <OutputGallery
          finalImage={finalImage}
          isGenerating={isGenerating}
          lastError={lastError}
        />
      </div>
    </div>
  );
};

export default ImageGeneratorInterface;