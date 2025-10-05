import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function SectionCard({ title, children }: Props) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      {title ? (
        <Text
          style={{
            color: '#333',
            fontSize: 18,
            fontWeight: '700',
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View>{children}</View>
    </View>
  );
}
