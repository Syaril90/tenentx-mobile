import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = { children: string };

export default function SectionTitle({ children }: Props) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6 }}>
      <Text style={{ color: '#0d121b', fontSize: 18, fontWeight: '800' }}>
        {children}
      </Text>
    </View>
  );
}
