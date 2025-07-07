import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { Button } from '../components';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { usePreferences, useAppStore } from '../stores/appStore';

interface ISettingsScreenProps {
  navigation?: {
    navigate: (screen: string, params?: unknown) => void;
    goBack: () => void;
  };
}

const SettingsScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  const preferences = usePreferences();
  const { setPreferences } = useAppStore();

  const handleToggleChange = (key: keyof typeof preferences, value: boolean) => {
    setPreferences({ [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Button
          title="Done"
          onPress={() => navigation?.goBack()}
          variant="text"
          size="medium"
        />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Audio Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Auto-play responses</Text>
                <Text style={styles.settingDescription}>
                  Automatically play AI responses when they arrive
                </Text>
              </View>
              <Switch
                value={preferences.autoPlay}
                onValueChange={(value) => handleToggleChange('autoPlay', value)}
                trackColor={{ false: COLORS.GRAY_LIGHT, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Audio Quality</Text>
                <Text style={styles.settingDescription}>
                  Current: {preferences.audioQuality}
                </Text>
              </View>
              <Text style={styles.settingValue}>›</Text>
            </View>
          </View>
        </View>

        {/* Language Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>App Language</Text>
                <Text style={styles.settingDescription}>
                  Current: {preferences.language.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.settingValue}>›</Text>
            </View>
          </View>
        </View>

        {/* Appearance Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Theme</Text>
                <Text style={styles.settingDescription}>
                  Current: {preferences.theme}
                </Text>
              </View>
              <Text style={styles.settingValue}>›</Text>
            </View>
          </View>
        </View>

        {/* Notifications Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive notifications for updates and features
                </Text>
              </View>
              <Switch
                value={preferences.pushNotifications}
                onValueChange={(value) => handleToggleChange('pushNotifications', value)}
                trackColor={{ false: COLORS.GRAY_LIGHT, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionContent}>
            <View style={styles.aboutInfo}>
              <Text style={styles.appName}>Shira AI</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
              <Text style={styles.appDescription}>
                AI-powered conversation partner for language learning
              </Text>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: SPACING.LG,
  },
  section: {
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  sectionContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FONT_SIZES.MD,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  settingDescription: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
  settingValue: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.GRAY_MEDIUM,
    marginLeft: SPACING.MD,
  },
  aboutInfo: {
    alignItems: 'center',
    padding: SPACING.XL,
  },
  appName: {
    fontSize: FONT_SIZES.XL,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  appVersion: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.MD,
  },
  appDescription: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SettingsScreen; 