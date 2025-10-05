import React from 'react';
import { Button } from 'react-native-paper';

type Props = {
  onPress: () => void;
};

export default function LogoutButton({ onPress }: Props) {
  return (
    <Button
      mode="contained-tonal"
      icon="logout"
      onPress={onPress}
      style={{ borderRadius: 12, backgroundColor: '#E0F2F7' }}
      textColor="#007BFF"
      contentStyle={{ paddingVertical: 8 }}
      labelStyle={{ fontWeight: '700' }}
    >
      Log Out
    </Button>
  );
}
