import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { useAudioState, useAppStore } from '../stores/appStore';
import { logUserAction } from '../utils/logger';

interface IConversationScreenProps {
  navigation?: {
    navigate: (screen: string, params?: unknown) => void;
    goBack: () => void;
  };
}

const ConversationScreen: React.FC<IConversationScreenProps> = React.memo(({ navigation }) => {
  const audioState = useAudioState();
  const { startRecording, stopRecording, connect, disconnect } = useAppStore();

  const handleStartConversation = useCallback(() => {
    logUserAction('start_conversation', 'ConversationScreen');
    if (!audioState.isConnected) {
      connect();
    }
    startRecording();
  }, [audioState.isConnected, connect, startRecording]);

  const handleEndConversation = useCallback(() => {
    logUserAction('end_conversation', 'ConversationScreen');
    stopRecording();
    disconnect();
    navigation?.goBack();
  }, [stopRecording, disconnect, navigation]);

  const statusText = useMemo(() => 
    audioState.isRecording ? 'Recording...' : 'Ready to start',
    [audioState.isRecording]
  );

  const connectionStatus = useMemo(() => 
    audioState.isConnected ? '🟢 Connected' : '⚫ Disconnected',
    [audioState.isConnected]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversation with Shira AI</Text>
        <Text style={styles.status}>
          {connectionStatus}
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.conversationArea}>
          <Text style={styles.placeholder}>
            Audio conversation interface will be implemented here
          </Text>
          
          <View style={styles.statusIndicator}>
            <View style={[
              styles.recordingDot,
              audioState.isRecording && styles.recordingActive,
            ]} />
            <Text style={styles.statusText}>
              {statusText}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.controls}>
        <Button
          title={audioState.isRecording ? 'Stop Recording' : 'Start Conversation'}
          onPress={audioState.isRecording ? stopRecording : handleStartConversation}
          variant={audioState.isRecording ? 'secondary' : 'primary'}
          size="large"
          fullWidth
        />
        
        <Button
          title="End Conversation"
          onPress={handleEndConversation}
          variant="outline"
          size="medium"
          fullWidth
          style={styles.endButton}
        />
      </View>
    </SafeAreaView>
  );
});

ConversationScreen.displayName = 'ConversationScreen';

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
    marginBottom: SPACING.SM,
  },
  status: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  conversationArea: {
    alignItems: 'center',
    padding: SPACING.XXL,
  },
  placeholder: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
    lineHeight: 24,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.LG,
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: BORDER_RADIUS.LG,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: BORDER_RADIUS.ROUND,
    backgroundColor: COLORS.GRAY_MEDIUM,
    marginRight: SPACING.SM,
  },
  recordingActive: {
    backgroundColor: COLORS.ERROR,
  },
  statusText: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  controls: {
    padding: SPACING.LG,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_LIGHT,
    gap: SPACING.MD,
  },
  endButton: {
    marginTop: SPACING.SM,
  },
});

export default ConversationScreen; 