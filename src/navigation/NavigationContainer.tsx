import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

interface INavigationContainerProps {
  children: React.ReactNode;
}

/**
 * Custom Navigation Container that wraps the app navigation
 * Integrates with Expo Router while maintaining React Navigation compatibility
 */
export const AppNavigationContainer: React.FC<INavigationContainerProps> = ({
  children,
}) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default AppNavigationContainer;
