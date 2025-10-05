import React from 'react';
import { Divider } from 'react-native-paper';
import RowChevron from '../components/RowChevron';
import RowSwitch from '../components/RowSwitch';
import SectionCard from '../components/SectionCard';

type Props = {
  push: boolean;
  email: boolean;
  language: string;
  onTogglePush: () => void;
  onToggleEmail: () => void;
  onLanguage: () => void;
};

export default function PreferencesSection({
  push,
  email,
  language,
  onTogglePush,
  onToggleEmail,
  onLanguage,
}: Props) {
  return (
    <SectionCard title="Preferences">
      <RowSwitch
        icon="bell-outline"
        iconColor="#007BFF"
        label="Push Notifications"
        value={push}
        onChange={() => onTogglePush()}
      />
      <Divider />
      <RowSwitch
        icon="email-outline"
        iconColor="#007BFF"
        label="Email Notifications"
        value={email}
        onChange={() => onToggleEmail()}
      />
      <Divider />
      <RowChevron
        icon="translate"
        iconColor="#007BFF"
        label="Language"
        value={language}
        onPress={onLanguage}
      />
    </SectionCard>
  );
}
