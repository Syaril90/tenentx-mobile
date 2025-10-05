import React from 'react';
import { View } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';

type Props = {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
  icon?: string;
  iconColor?: string;
};

export default function RowSwitch({ label, value, onChange, icon, iconColor }: Props) {
  return (
    <List.Item
      title={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon ? <List.Icon color={iconColor} icon={icon} /> : null}
          <Text style={{ color: '#333', fontSize: 16, fontWeight: '600' }}>{label}</Text>
        </View>
      )}
      right={() => <Switch value={value} onValueChange={onChange} />}
      style={{ minHeight: 72, paddingRight: 12 }}
    />
  );
}
