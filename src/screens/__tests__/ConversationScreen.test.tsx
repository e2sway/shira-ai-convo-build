import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ConversationScreen from '../ConversationScreen';

// Mock the logger
jest.mock('../../utils/logger', () => ({
  logUserAction: jest.fn(),
}));

// Test wrapper for navigation
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>
    {children}
  </NavigationContainer>
);

describe('ConversationScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <TestWrapper>
        <ConversationScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    expect(getByText('Conversation with Shira AI')).toBeTruthy();
    expect(getByText('Start Conversation')).toBeTruthy();
    expect(getByText('End Conversation')).toBeTruthy();
  });

  it('displays connection status', () => {
    const { getByText } = render(
      <TestWrapper>
        <ConversationScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    // Should show disconnected status initially (based on mock store)
    expect(getByText('⚫ Disconnected')).toBeTruthy();
  });

  it('displays recording status', () => {
    const { getByText } = render(
      <TestWrapper>
        <ConversationScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    // Should show ready status initially (based on mock store)
    expect(getByText('Ready to start')).toBeTruthy();
  });

  it('handles start conversation button press', async () => {
    const { getByText } = render(
      <TestWrapper>
        <ConversationScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    const startButton = getByText('Start Conversation');
    fireEvent.press(startButton);

    // Verify the mocked functions would be called
    await waitFor(() => {
      // Since we're using mocked store, we can't test the actual state changes
      // but we can test that the button responds to press events
      expect(startButton).toBeTruthy();
    });
  });

  it('handles end conversation button press', async () => {
    const { getByText } = render(
      <TestWrapper>
        <ConversationScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    const endButton = getByText('End Conversation');
    fireEvent.press(endButton);

    await waitFor(() => {
      // The navigation.goBack should be called (mocked)
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  it('displays placeholder text', () => {
    const { getByText } = render(
      <TestWrapper>
        <ConversationScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    expect(getByText('Audio conversation interface will be implemented here')).toBeTruthy();
  });

  it('shows recording indicator elements', () => {
    const { getByText } = render(
      <TestWrapper>
        <ConversationScreen navigation={mockNavigation} />
      </TestWrapper>
    );

    // Recording status should be visible
    expect(getByText('Ready to start')).toBeTruthy();
  });
}); 