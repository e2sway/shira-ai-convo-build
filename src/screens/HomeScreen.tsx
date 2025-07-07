// Home Screen for Shira AI Conversation Builder

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button } from '../components';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

interface IHomeScreenProps {
  // Navigation props will be added when setting up navigation
}

const HomeScreen: React.FC<IHomeScreenProps> = () => {
  const handleStartConversation = () => {
    console.log('Starting new conversation...');
    // TODO: Navigate to chat screen
  };

  const handleViewHistory = () => {
    console.log('Viewing conversation history...');
    // TODO: Navigate to history screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Shira AI</Text>
          <Text style={styles.subtitle}>
            Your intelligent conversation builder
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>AI-Powered Conversations</Text>
            <Text style={styles.featureDescription}>
              Build intelligent conversations with advanced AI capabilities
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Task Management</Text>
            <Text style={styles.featureDescription}>
              Integrated with Task Master AI for organized development
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Cross-Platform</Text>
            <Text style={styles.featureDescription}>
              Works seamlessly on iOS, Android, and web platforms
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Start New Conversation"
            onPress={handleStartConversation}
            variant="primary"
            size="large"
            fullWidth
          />
          
          <View style={styles.spacer} />
          
          <Button
            title="View History"
            onPress={handleViewHistory}
            variant="outline"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    padding: SPACING.LG,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.XXL,
  },
  title: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: SPACING.XXL,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.XL,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LG,
  },
  featureItem: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    padding: SPACING.LG,
    borderRadius: 12,
    marginBottom: SPACING.MD,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: FONT_SIZES.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  featureDescription: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
  },
  actions: {
    marginTop: SPACING.LG,
  },
  spacer: {
    height: SPACING.MD,
  },
});

export default HomeScreen; 