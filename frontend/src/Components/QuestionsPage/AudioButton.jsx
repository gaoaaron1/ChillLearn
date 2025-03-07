import React, { useState, useEffect } from 'react';
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
  const [voices, setVoices] = useState([]);

  // Function to detect language
  const detectLanguage = (text) => {
    // Check if the text contains Chinese characters
    if (/[\u4e00-\u9fa5]/.test(text)) {
      return 'zh-CN'; // Force Chinese language detection
    }

    const detectedLang = franc(text); // Use franc to detect language
    if (detectedLang === 'und') {
      return 'en'; // Default to English if undetectable
    }

    return languageMap[detectedLang] || 'en-US'; // Return mapped language or default
  };

  const handleBlanks = (text) => {
    return text.replace(/_+/g, ' blank ');
  };

  const handleFractions = (text) => {
    const fractionRegex = /\\frac\{([0-9]+)\}\{([0-9]+)\}/g;
    return text.replace(fractionRegex, '$1 over $2');
  };

  const removePinyin = (text) => {
    text = text.replace(/[A-Za-z]+\s?[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/g, '');
    return text;
  };

  const handleAudioClick = (e) => {
    e.preventDefault();
    
    if (!isPlaying) {
      setIsPlaying(true);
  
      let textToSpeak = handleBlanks(isReadingAnswer ? answerText : questionText); 
      textToSpeak = removePinyin(textToSpeak); 
      textToSpeak = handleFractions(textToSpeak); 
  
      const textSegments = textToSpeak.split(/([^\x00-\x7F]+)/); // Split by non-ASCII (Chinese characters)
      let lastLang = null;
  
      textSegments.forEach((segment) => {
        const languageToUse = /[\u4e00-\u9fa5]/.test(segment) ? 'zh-CN' : 'en-US';
        const voice = voices.find(voice => voice.lang === languageToUse);
  
        if (segment.trim()) {
          const utterance = new SpeechSynthesisUtterance(segment);
          utterance.voice = voice || voices[0]; // Use the first available voice if not found
          
          utterance.onend = () => {
            if (textSegments.indexOf(segment) === textSegments.length - 1) {
              setIsPlaying(false);
            }
          };
  
          window.speechSynthesis.speak(utterance);
        }
  
        lastLang = languageToUse;
      });
    }
  };

  // Load voices after they are available
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices(); // If onvoiceschanged doesn't exist, load voices immediately
    }
  }, []);

  return (
    <span 
      className={`audio-icon ${isPlaying ? 'playing' : ''}`} 
      onClick={handleAudioClick}
      style={{ cursor: 'pointer', fontSize: '30px' }}
    >
      {isPlaying ? '🔊' : '🔈'}
    </span>
  );
};

export default AudioButton;
