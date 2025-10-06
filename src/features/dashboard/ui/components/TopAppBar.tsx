import React from 'react';
import { Image, View } from 'react-native';
import { Badge, IconButton, Text } from 'react-native-paper';

type Props = {
  name: string;
  avatarUrl?: string;
  onBellPress?: () => void;        // ← add this
  unreadCount?: number;            // ← and this (optional)
};

export default function TopAppBar({ name, avatarUrl, onBellPress, unreadCount = 0 }: Props) {
  const hasUnread = (unreadCount ?? 0) > 0;

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

      <View style={{ position: 'relative' }}>
        <IconButton icon="bell-outline" onPress={onBellPress} />
        {hasUnread && (
          <Badge
            style={{ position: 'absolute', top: 2, right: 2 }}
            size={12}
          >
            {/* keep small or empty for a red dot; or show count */}
          </Badge>
        )}
      </View>
    </View>
  );
}
