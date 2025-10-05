import React from 'react';
import { List } from 'react-native-paper';

type Props = {
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export default function UnitRow({ title, subtitle, onPress }: Props) {
  return (
    <List.Item
      title={title}
      description={subtitle}
      left={(props) => <List.Icon {...props} color="#007BFF" icon="office-building" />}
      right={(props) => <List.Icon {...props} icon="chevron-right" color="#9CA3AF" />}
      onPress={onPress}
      style={{ minHeight: 72 }}
      titleStyle={{ color: '#333', fontWeight: '600' }}
    />
  );
}
