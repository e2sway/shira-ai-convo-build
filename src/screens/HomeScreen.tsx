// Home Screen for Shira AI Conversation Builder

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, TypewriterText } from '../components';
import { SPACING } from '../constants';
import { logger } from '../utils';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleStartConversation = () => {
    logger.logUserAction('home_start_conversation', 'HomeScreen');
    navigation.navigate('Conversation', {});
  };

  const handleViewHistory = () => {
    logger.logUserAction('home_view_history', 'HomeScreen');
    navigation.navigate('History');
  };

  const practicePhrases = [
    "ordering coffee",
    "introducing yourself",
    "asking for directions", 
    "small talk",
    "pronunciation"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topSection}>
          <Text style={styles.mainTitle}>Hey, Shira</Text>
          <Text style={styles.subTitle}>lets practice</Text>
          <TypewriterText 
            phrases={practicePhrases}
            style={styles.typewriterText}
            typeSpeed={50}
            deleteSpeed={20}
            pauseDuration={2000}
          />
        </View>

        <View style={styles.actionsSection}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5ED', // Much more creamy background
  },
  content: {
    flex: 1,
    padding: SPACING.LG,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.XXL,
  },
  mainTitle: {
    fontSize: 48, // H1 equivalent
    fontWeight: 'bold',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  subTitle: {
    fontSize: 28, // H2 equivalent
    fontWeight: '500',
    color: '#4a4a4a',
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  typewriterText: {
    fontSize: 24, // H3 equivalent
    color: '#4a4a4a',
    textAlign: 'center',
    minHeight: 60, // Prevents layout shift during typing
    fontWeight: '500',
  },
  actionsSection: {
    paddingBottom: SPACING.LG,
  },
  spacer: {
    height: SPACING.MD,
  },
});

export default HomeScreen;
