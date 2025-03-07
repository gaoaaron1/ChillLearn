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

  // Function to handle blanks (underscores) by replacing them with "blank"
  const handleBlanks = (text) => {
    return text.replace(/_/g, ' blank '); // Replace underscores with "blank"
  };

  // Function to remove Pinyin (with tonal marks) from the text
  const removePinyin = (text) => {
    // Remove Pinyin in parentheses (e.g., (Wǒ bǎ shū fàng zài zhuōzi shàng))
    text = text.replace(/\([A-Za-z0-9\u4e00-\u9fa5\s]+\)/g, '');

    // Remove inline Pinyin with tonal marks (e.g., Wǒ, bǎ, shū, etc.)
    // Matches Pinyin-like words and tonal marks
    text = text.replace(/[A-Za-z]+\s?[ǖǘǚǜāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/g, '');

    return text;
  };

  // Handle button click to trigger speech synthesis
  const handleAudioClick = (e) => {
    e.preventDefault(); // Prevent form submission or page refresh
    if (!isPlaying) {
      setIsPlaying(true);
      let textToSpeak = handleBlanks(isReadingAnswer ? answerText : questionText); // Handle blanks in the text
      textToSpeak = removePinyin(textToSpeak); // Remove Pinyin if Chinese is detected

      const languageToUse = detectLanguage(textToSpeak);

      // Create a SpeechSynthesisUtterance and set its language
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = languageToUse;

      // Start speaking
      window.speechSynthesis.speak(utterance);

      // Reset play state once the speech ends
      utterance.onend = () => setIsPlaying(false);
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
