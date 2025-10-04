import React from 'react';
import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

type Props = {
  name: string;
  avatarUrl?: string;
};

export default function TopAppBar({ name, avatarUrl }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#F2F4F7',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={{ width: 32, height: 32 }} />
          ) : (
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#E2E8F0' }} />
          )}
        </View>
        <Text variant="titleMedium" style={{ fontWeight: '800', color: '#0D121B' }}>
          Hi, {name}!
        </Text>
      </View>

      <IconButton icon="bell-outline" onPress={() => {}} />
    </View>
  );
}
