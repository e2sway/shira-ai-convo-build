import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button } from '../components';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';

interface IHistoryScreenProps {
  navigation?: {
    navigate: (screen: string, params?: unknown) => void;
    goBack: () => void;
  };
}

const HistoryScreen: React.FC<IHistoryScreenProps> = ({ navigation }) => {
  const handleStartNewConversation = () => {
    navigation?.navigate('Conversation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversation History</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.emptyState}>
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>📝</Text>
          </View>
          
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptyDescription}>
            Your conversation history with Shira AI will appear here once you start chatting.
          </Text>
          
          <Button
            title="Start First Conversation"
            onPress={handleStartNewConversation}
            variant="primary"
            size="large"
            style={styles.startButton}
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
  header: {
    padding: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontSize: FONT_SIZES.XL,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING.XXL,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.XL,
    backgroundColor: COLORS.CARD_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  iconText: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.XL,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XXL,
    paddingHorizontal: SPACING.LG,
  },
  startButton: {
    minWidth: 200,
  },
});

export default HistoryScreen; 