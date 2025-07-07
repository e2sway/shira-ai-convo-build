// 3D Press Effect Button Component

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
  View,
} from 'react-native';

interface IButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6], // Move down 6px when pressed to cover the base button
  });

  const buttonContainerStyle = [
    styles.buttonContainer,
    fullWidth && styles.fullWidth,
    style,
  ];

  const topButtonStyle = [
    styles.topButton,
    styles[variant],
    styles[size],
    (disabled || loading) && styles.disabled,
  ];

  const baseButtonStyle = [
    styles.baseButton,
    styles[size],
    fullWidth && styles.fullWidth,
  ];

  const buttonTextStyle = [
    styles.baseText,
    styles[`${size}Text`],
    (disabled || loading) && styles.disabledText,
    textStyle,
  ];

  return (
    <View style={buttonContainerStyle}>
      {/* Base button (darker purple, positioned underneath) */}
      <View style={baseButtonStyle} />
      
      {/* Top button (lighter purple, slides down when pressed) */}
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={styles.touchableArea}
      >
        <Animated.View
          style={[
            topButtonStyle,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <Text style={buttonTextStyle}>{title.toUpperCase()}</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    marginBottom: 6, // Add space for the base button
  },

  touchableArea: {
    position: 'relative',
    top: -6, // Position the touchable area above the base button
  },

  topButton: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  baseButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#5a3499', // Darker purple for base button
    borderRadius: 12,
  },

  // Variants (for top button)
  primary: {
    backgroundColor: '#7e4bde', // Main lighter purple
  },
  secondary: {
    backgroundColor: '#7e4bde',
  },
  outline: {
    backgroundColor: '#7e4bde',
  },
  text: {
    backgroundColor: '#7e4bde',
  },

  // Button sizes (applied to both top and base)
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
    minWidth: 80,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 48,
    minWidth: 120,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    height: 56,
    minWidth: 160,
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  // Text styles
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },

  disabledText: {
    opacity: 0.7,
  },
});

export default Button;
