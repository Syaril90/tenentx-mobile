import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Text, TouchableRipple } from 'react-native-paper';
import type { Announcement } from '../../types';

type Props = {
  item: Announcement;
  onPress?: (id: string) => void;       // NEW: open details
};

export default function PinnedCard({ item, onPress }: Props) {
  const date = new Date(item.createdAtISO).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <View
      style={{
        width: 280,
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <TouchableRipple onPress={() => onPress?.(item.id)} style={{ borderRadius: 16 }}>
        <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
          {item.imageUrl ? (
            <ImageBackground
              source={{ uri: item.imageUrl }}
              resizeMode="cover"
              style={{ width: '100%', aspectRatio: 16 / 9 }}
            />
          ) : null}

          <View style={{ padding: 12, gap: 6 }}>
            <Text variant="labelSmall" style={{ color: '#2563EB', fontWeight: '700' }}>
              PINNED • {date}
            </Text>

            <Text variant="titleSmall" numberOfLines={2} style={{ fontWeight: '800', color: '#0D121B' }}>
              {item.title}
            </Text>

            {/* brief excerpt only */}
            {item.body ? (
              <Text variant="bodySmall" numberOfLines={2} style={{ color: '#475569' }}>
                {excerpt(item.body)}
              </Text>
            ) : null}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4 }}>
              <Button compact textColor="#0E74F1" onPress={() => onPress?.(item.id)}>
                View Details
              </Button>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}

function excerpt(body: string, max = 140) {
  const clean = body.replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}
