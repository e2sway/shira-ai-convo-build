// Typewriter Effect Component for Language Learning Phrases

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ITypewriterTextProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  style?: TextStyle;
  enableHaptics?: boolean;
}

const TypewriterText: React.FC<ITypewriterTextProps> = ({
  phrases,
  typeSpeed = 60,
  deleteSpeed = 25,
  pauseDuration = 2000,
  style,
  enableHaptics = true,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    if (!currentPhrase) return;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          // Light haptic feedback for typing
          if (enableHaptics) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        } else {
          // Finished typing, start pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          // Medium haptic feedback for backspacing (slightly stronger)
          if (enableHaptics) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typeSpeed, deleteSpeed, pauseDuration, enableHaptics]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Text style={[styles.text, style]}>
      {currentText}
      <Text style={[styles.cursor, { opacity: showCursor ? 1 : 0 }]}>|</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#333',
    fontWeight: '400',
  },
  cursor: {
    fontSize: 28,
    color: '#7e4bde',
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

export default TypewriterText; 