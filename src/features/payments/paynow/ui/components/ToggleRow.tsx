import React from 'react';
import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

type Props = {
  label: string;
  value: boolean;
  onToggle(v: boolean): void;
};

export default function ToggleRow({ label, value, onToggle }: Props) {
  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="bodyLarge" style={{ fontWeight: '600', color: '#0D121B' }}>{label}</Text>
        <Switch value={value} onValueChange={onToggle} color="#0F49BD" />
      </View>
    </View>
  );
}
