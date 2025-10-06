import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Notification } from '../../types';
import CategoryIcon from './CategoryIcon';

type Props = {
  item: Notification;
  onPress?: (id: string) => void;
};

function timeLabel(iso: string): string {
  const now = Date.now();
  const t = new Date(iso).getTime();
  const diff = Math.max(0, now - t);
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d <= 7) return `${d}d ago`;
  return new Date(iso).toLocaleString();
}

export default function NotificationItem({ item, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress?.(item.id)}
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <CategoryIcon category={item.category} />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: '#0d141c',
              fontSize: 16,
              fontWeight: item.read ? '600' : '800',
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={{ color: '#496f9c', fontSize: 13 }} numberOfLines={2}>
            {item.subtitle}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end', gap: 6 }}>
          <Text style={{ color: '#496f9c', fontSize: 11 }}>
            {timeLabel(item.createdAtISO)}
          </Text>
          {!item.read ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#007BFF' }} /> : null}
        </View>
      </View>
    </Pressable>
  );
}
