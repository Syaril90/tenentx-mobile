import React from 'react';
import { List } from 'react-native-paper';

type Props = {
  label: string;
  value?: string;
  onPress: () => void;
  icon?: string;
  iconColor?: string;
};

export default function RowChevron({ label, value, onPress, icon, iconColor }: Props) {
  return (
    <List.Item
      title={label}
      description={value}
      onPress={onPress}
      left={
        icon ? (props) => <List.Icon {...props} color={iconColor ?? props.color} icon={icon} /> : undefined
      }
      right={(props) => <List.Icon {...props} icon="chevron-right" color="#9CA3AF" />}
      style={{ minHeight: 72 }}
      titleStyle={{ color: '#666', fontSize: 14 }}
      descriptionStyle={{ color: '#333', fontSize: 16, fontWeight: '600' }}
    />
  );
}
