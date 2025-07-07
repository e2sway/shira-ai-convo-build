import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Button from './Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<IErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to crash reporting service (e.g., Sentry, Crashlytics)
    this.logErrorToService(error, errorInfo);

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  private logErrorToService = (
    error: Error,
    errorInfo: React.ErrorInfo
  ): void => {
    // In a real app, you would send this to your error reporting service
    console.error('ErrorBoundary caught an error:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  };

  private resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private renderDefaultFallback = (): ReactNode => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>⚠️</Text>
        </View>

        <Text style={styles.title}>Oops! Something went wrong</Text>
        <Text style={styles.message}>
          We're sorry, but something unexpected happened. Please try again.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Try Again"
            onPress={this.resetError}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>

        {__DEV__ && this.state.error && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugTitle}>Debug Information:</Text>
            <ScrollView style={styles.debugScroll}>
              <Text style={styles.debugText}>{this.state.error.message}</Text>
              {this.state.error.stack && (
                <Text style={styles.debugStack}>{this.state.error.stack}</Text>
              )}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return this.renderDefaultFallback();
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.XL,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },
  message: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.XXL,
  },
  buttonContainer: {
    marginBottom: SPACING.XL,
  },
  debugContainer: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.LG,
    marginTop: SPACING.XL,
  },
  debugTitle: {
    fontSize: FONT_SIZES.MD,
    fontWeight: 'bold',
    color: COLORS.ERROR,
    marginBottom: SPACING.MD,
  },
  debugScroll: {
    maxHeight: 200,
  },
  debugText: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: 'monospace',
    marginBottom: SPACING.SM,
  },
  debugStack: {
    fontSize: FONT_SIZES.XS,
    color: COLORS.TEXT_SECONDARY,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
});

export default ErrorBoundary;
