import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Announcement } from '../../types';

type Props = {
  item: Announcement;
  onReadMore?: (id: string) => void;
  onShare?: (id: string) => void;
};

export default function AnnouncementCard({ item, onReadMore, onShare }: Props) {
  const date = new Date(item.createdAtISO).toLocaleString(undefined, {
    month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const isUnread = !item.read;

  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#fff',
          padding: 16,
          opacity: item.read ? 0.75 : 1,
          borderLeftWidth: isUnread ? 4 : 0,
          borderLeftColor: isUnread ? '#3b82f6' : 'transparent',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 999,
                fontSize: 12,
                fontWeight: '700',
                color: categoryColor(item.category).fg,
                backgroundColor: categoryColor(item.category).bg,
              }}
            >
              {labelCategory(item.category)}
            </Text>
            <Text variant="bodySmall" style={{ color: '#4c669a', marginTop: 6 }}>{date}</Text>
          </View>
          {isUnread ? <Text style={{ color: '#2563eb' }}>●</Text> : null}
        </View>

        <Text variant="titleMedium" style={{ color: '#0d121b', fontWeight: '800', marginTop: 8 }}>
          {item.title}
        </Text>

        {item.imageUrl ? (
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 12, overflow: 'hidden', marginTop: 8 }}
            imageStyle={{ borderRadius: 12 }}
          />
        ) : null}

        <Text variant="bodyMedium" style={{ color: '#4c669a', marginTop: 8 }}>
          {item.body}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderTopColor: '#F1F5F9',
            paddingTop: 10,
            marginTop: 8,
          }}
        >
          <Button onPress={() => onReadMore?.(item.id)} textColor="#2563eb" labelStyle={{ fontWeight: '700' }}>
            Read More
          </Button>
          <Button onPress={() => onShare?.(item.id)} textColor="#4c669a" icon="share-variant" >
            Share
          </Button>
        </View>
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

function categoryColor(c: Announcement['category']) {
  switch (c) {
    case 'maintenance': return { bg: '#DBEAFE', fg: '#2563EB' }; 
    case 'events':      return { bg: '#DCFCE7', fg: '#166534' };
    case 'notices':     return { bg: '#FFE4E6', fg: '#991B1B' };
    case 'security':    return { bg: '#FDE68A', fg: '#92400E' };
  }
}
