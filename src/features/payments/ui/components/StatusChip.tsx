import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { PaymentStatus } from '../../types';

type Props = { status: PaymentStatus };

export default function StatusChip({ status }: Props) {
  const scheme =
    status === 'paid'
      ? { bg: '#DCFCE7', fg: '#166534' }      
      : status === 'pending'
      ? { bg: '#FFEDD5', fg: '#9A3412' }
      : { bg: '#FFE4E6', fg: '#991B1B' };    

  return (
    <View
      style={{
        backgroundColor: scheme.bg,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Text variant="bodySmall" style={{ color: scheme.fg }}>
        {status === 'paid' ? 'Paid' : status === 'pending' ? 'Pending' : 'Refunded'}
      </Text>
    </View>
  );
}
