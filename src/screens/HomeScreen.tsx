// Home Screen for Shira AI Conversation Builder

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, TypewriterText } from '../components';
import { SPACING } from '../constants';
import { logger } from '../utils';
import { testSupabaseConnection, testAudioService, testConversationService } from '../utils/testSupabase';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleStartConversation = () => {
    logger.logUserAction('home_start_conversation', 'HomeScreen');
    // Navigate to conversation screen
    // navigation.navigate('Conversation');
    Alert.alert('Coming Soon', 'Conversation feature will be implemented next!');
  };

  const handleTestSupabase = async () => {
    logger.logUserAction('home_test_supabase', 'HomeScreen');
    
    Alert.alert('Testing...', 'Running Supabase connection tests. Check console for details.');
    
    try {
      const result = await testSupabaseConnection();
      if (result) {
        Alert.alert('✅ Success', 'All Supabase tests passed! Backend is ready.');
      } else {
        Alert.alert('❌ Failed', 'Some tests failed. Check console for details.');
      }
    } catch (error: any) {
      Alert.alert('❌ Error', `Test failed: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleTestAudio = async () => {
    logger.logUserAction('home_test_audio', 'HomeScreen');
    
    Alert.alert('Testing...', 'Testing audio service initialization. Check console for details.');
    
    try {
      const result = await testAudioService();
      if (result) {
        Alert.alert('✅ Success', 'Audio service is working correctly!');
      } else {
        Alert.alert('❌ Failed', 'Audio service test failed. Check console for details.');
      }
    } catch (error: any) {
      Alert.alert('❌ Error', `Audio test failed: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleTestConversationService = async () => {
    logger.logUserAction('home_test_conversation_service', 'HomeScreen');
    
    Alert.alert('Testing...', 'Testing conversation service. Check console for details.');
    
    try {
      const result = await testConversationService();
      if (result) {
        Alert.alert('✅ Success', 'Conversation service is working correctly!');
      } else {
        Alert.alert('❌ Failed', 'Conversation service test failed. Check console for details.');
      }
    } catch (error: any) {
      Alert.alert('❌ Error', `Conversation service test failed: ${error?.message || 'Unknown error'}`);
    }
  };

  const welcomePhrases = [
    "¡Hola! Ready to practice Spanish?",
    "Let's improve your conversation skills!",
    "Start speaking Spanish with confidence!",
    "Practice makes perfect - ¡Vamos!"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Shira AI</Text>
          <Text style={styles.subtitle}>Conversation Builder</Text>
          
          <TypewriterText 
            phrases={welcomePhrases}
            style={styles.welcomeText}
            typeSpeed={50}
            deleteSpeed={25}
            pauseDuration={2000}
          />
        </View>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          <Button
            title="Start Conversation"
            onPress={handleStartConversation}
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />
          
          {/* Test Buttons for Development */}
          <View style={styles.testButtonsContainer}>
            <Text style={styles.testSectionTitle}>🧪 Development Tests</Text>
            
            <Button
              title="Test Supabase"
              onPress={handleTestSupabase}
              style={styles.testButton}
              textStyle={styles.testButtonText}
            />
            
            <Button
              title="Test Audio Service"
              onPress={handleTestAudio}
              style={styles.testButton}
              textStyle={styles.testButtonText}
            />
            
            <Button
              title="Test Conversation Service"
              onPress={handleTestConversationService}
              style={styles.testButton}
              textStyle={styles.testButtonText}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Practice Spanish conversations with AI-powered feedback
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XL,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: SPACING.LG,
  },
  welcomeText: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3498DB',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    borderRadius: 12,
    marginBottom: SPACING.XL,
    minWidth: 200,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  testButtonsContainer: {
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  testSectionTitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: SPACING.MD,
    fontWeight: '600',
  },
  testButton: {
    backgroundColor: '#95A5A6',
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.LG,
    borderRadius: 8,
    marginBottom: SPACING.SM,
    minWidth: 150,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  footerText: {
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
