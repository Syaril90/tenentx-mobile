import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Announcement } from '../../types';

type Props = { item: Announcement };

export default function PinnedCard({ item }: Props) {
  return (
    <View
      style={{
        width: 280,
        borderRadius: 16,
        backgroundColor: '#fff',
        padding: 12,
        marginRight: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {item.imageUrl ? (
        <ImageBackground
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 12, overflow: 'hidden' }}
          imageStyle={{ borderRadius: 12 }}
        />
      ) : null}

      <View style={{ marginTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, justifyContent: 'space-between' }}>
          <Text style={{ color: '#f59e0b', fontWeight: '700', fontSize: 12 }}>PINNED</Text>
          <Text style={{ color: '#2563eb', fontSize: 12 }}>●</Text>
        </View>
        <Text variant="titleSmall" style={{ color: '#0d121b', fontWeight: '700' }} numberOfLines={2}>
          {item.title}
        </Text>
        <Text variant="bodySmall" style={{ color: '#4c669a', marginTop: 2 }}>
          {labelCategory(item.category)}
        </Text>
      </View>
    </View>
  );
}

function labelCategory(c: Announcement['category']) {
  switch (c) {
    case 'maintenance': return 'Maintenance';
    case 'events': return 'Events';
    case 'notices': return 'Notices';
    case 'security': return 'Security';
  }
}
