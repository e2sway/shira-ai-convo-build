import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '../components';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { useAppStore } from '../stores/appStore';

interface IOnboardingScreenProps {
  navigation?: {
    navigate: (screen: string, params?: unknown) => void;
    replace: (screen: string) => void;
  };
}

const OnboardingScreen: React.FC<IOnboardingScreenProps> = ({ navigation }) => {
  const { setPreferences } = useAppStore();

  const handleCompleteOnboarding = () => {
    // Mark onboarding as completed
    setPreferences({
      hasCompletedOnboarding: true,
      onboardingVersion: '1.0.0',
    });

    // Navigate to main app
    navigation?.replace('Home');
  };

  const handleSkipOnboarding = () => {
    // Skip onboarding but still mark as completed
    setPreferences({
      hasCompletedOnboarding: true,
      onboardingVersion: '1.0.0',
    });

    navigation?.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeSection}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>🗣️</Text>
          </View>

          <Text style={styles.welcomeTitle}>Welcome to Shira AI</Text>
          <Text style={styles.welcomeDescription}>
            Your AI-powered conversation partner for learning languages
            naturally through voice interaction.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎤</Text>
            <Text style={styles.featureTitle}>Voice Conversations</Text>
            <Text style={styles.featureDescription}>
              Practice speaking naturally with AI
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureTitle}>Multiple Languages</Text>
            <Text style={styles.featureDescription}>
              Learn Spanish, English, French, and more
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureTitle}>Track Progress</Text>
            <Text style={styles.featureDescription}>
              Monitor your conversation history and improvement
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={handleCompleteOnboarding}
          variant="primary"
          size="large"
          fullWidth
        />

        <Button
          title="Skip for now"
          onPress={handleSkipOnboarding}
          variant="text"
          size="medium"
          fullWidth
          style={styles.skipButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.LG,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: SPACING.XXL,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.XXL,
    backgroundColor: COLORS.CARD_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  logoText: {
    fontSize: 60,
  },
  welcomeTitle: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  welcomeDescription: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.MD,
  },
  featuresSection: {
    gap: SPACING.XL,
  },
  feature: {
    alignItems: 'center',
    padding: SPACING.LG,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: SPACING.MD,
  },
  featureTitle: {
    fontSize: FONT_SIZES.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    padding: SPACING.LG,
    gap: SPACING.MD,
  },
  skipButton: {
    marginTop: SPACING.SM,
  },
});

export default OnboardingScreen;
