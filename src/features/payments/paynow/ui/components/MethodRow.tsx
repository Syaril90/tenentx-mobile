import React from 'react';
import { View } from 'react-native';
import { List, RadioButton, Text } from 'react-native-paper';
import { PaymentMethodId } from '../../../paynow/types';

type Props = {
  id: PaymentMethodId;
  label: string;
  leftIcon: string;
  selected: boolean;
  onSelect(): void;
};

export default function MethodRow({ id, label, leftIcon, selected, onSelect }: Props) {
  return (
    <List.Item
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 10,
      }}
      title={() => <Text variant="titleSmall" style={{ fontWeight: '600', color: '#0D121B' }}>{label}</Text>}
      left={() => <List.Icon icon={leftIcon} color="#0F49BD" />}
      right={() => (
        <View style={{ justifyContent: 'center' }}>
          <RadioButton.Android
            status={selected ? 'checked' : 'unchecked'}
            onPress={onSelect}
            color="#0F49BD"
            value={id}
          />
        </View>
      )}
      onPress={onSelect}
    />
  );
}
