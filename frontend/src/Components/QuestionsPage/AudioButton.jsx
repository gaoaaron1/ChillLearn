import React, { useState } from 'react';
import { franc } from 'franc'; // Named import for franc

// Language to voice mapping for speech synthesis
const languageMap = {
  'eng': 'en-US',  // Language code for English
  'fra': 'fr-FR',  // Language code for French
  'spa': 'es-ES',  // Language code for Spanish
  'deu': 'de-DE',  // Language code for German
  'ita': 'it-IT',  // Language code for Italian
  'zho': 'zh-CN',  // Language code for Chinese (Simplified)
  // Add more mappings for other languages as needed
};

const AudioButton = ({ questionText, answerText, isReadingAnswer }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to detect language
  const detectLanguage = (text) => {
    // Check if the text contains Chinese characters
    if (/[\u4e00-\u9fa5]/.test(text)) {
      // If Chinese characters are detected, force language to Chinese (Simplified)
      return 'zh-CN'; 
    }

    const detectedLang = franc(text); // Use franc to detect language
    if (detectedLang === 'und') {
      console.log('Unable to detect language');
      return 'en'; // Default to English if undetectable
    }

    // Check if the detected language exists in your mapping, else default to English
    return languageMap[detectedLang] || 'en-US';
  };

  // Function to handle blanks (underscores) by replacing them with a single "blank"
  const handleBlanks = (text) => {
    // Replace consecutive underscores with a single "blank"
    text = text.replace(/_+/g, ' blank '); // Replace 1 or more underscores with "blank"
    return text;
  };

// Function to handle LaTeX fractions like \frac{7}{8} and convert to "7 over 8"
const handleFractions = (text) => {
    // Regular expression to match LaTeX fraction format \frac{numerator}{denominator}
    const fractionRegex = /\\frac\{([0-9]+)\}\{([0-9]+)\}/g;
    return text.replace(fractionRegex, '$1 over $2');
    }

  // Function to only remove Pinyin from the text
  const removePinyin = (text) => {
    // Remove Pinyin-like words while keeping English words intact
    // Pinyin words are Latin letters with tonal marks, so we target them specifically.
    text = text.replace(/[A-Za-z]+\s?[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/g, ''); // Remove Pinyin with tones
    return text;
  };

  // Function to split the text into segments and read each part with the corresponding language
  const handleAudioClick = (e) => {
    e.preventDefault(); // Prevent form submission or page refresh
    
    if (!isPlaying) {
      setIsPlaying(true); // Start the audio playback

      let textToSpeak = handleBlanks(isReadingAnswer ? answerText : questionText); // Handle blanks in the text
      textToSpeak = removePinyin(textToSpeak); // Remove Pinyin if Chinese is detected
      textToSpeak = handleFractions(textToSpeak); 
      
      // Split text into segments by language (Chinese vs English)
      const textSegments = textToSpeak.split(/([^\x00-\x7F]+)/); // Split by non-ASCII (Chinese characters)
      let lastLang = null;

      textSegments.forEach((segment) => {
        // Determine if the segment is Chinese or English
        const languageToUse = /[\u4e00-\u9fa5]/.test(segment) ? 'zh-CN' : 'en-US';

        // Only speak the segment if it's not empty
        if (segment.trim()) {
          const utterance = new SpeechSynthesisUtterance(segment);
          utterance.lang = languageToUse;
          
          // Reset playing state once speech ends
          utterance.onend = () => {
            if (textSegments.indexOf(segment) === textSegments.length - 1) {
              // If this is the last segment, set isPlaying to false to enable replay
              setIsPlaying(false);
            }
          };

          window.speechSynthesis.speak(utterance);
        }
        
        lastLang = languageToUse; // Update last language to avoid repeated language detection
      });
    }
  };

  return (
    <span 
      className={`audio-icon ${isPlaying ? 'playing' : ''}`} 
      onClick={handleAudioClick}
      style={{ cursor: 'pointer', fontSize: '30px' }} // Optional inline styling for the icon
    >
      {/* Use speaker emoji or icon (FontAwesome or custom) */}
      {isPlaying ? '🔊' : '🔈'} {/* 🔊 for speaker on, 🔈 for speaker off */}
    </span>
  );
};

export default AudioButton;
