import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type AnnItem = { id: string; title: string; excerpt?: string; dateISO?: string; imageUrl?: string };
type Props = {
  items: AnnItem[];
  onViewAll: () => void;
};

export default function AnnouncementsCarousel({ items, onViewAll }: Props) {
  if (!items.length) return null;

  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="titleMedium" style={{ fontWeight: '800', color: '#0D121B' }}>Announcements</Text>
        <Button onPress={onViewAll} textColor="#0E74F1" compact>
          View All
        </Button>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 8, gap: 12 }}
      >
        {items.map((a) => (
          <Card key={a.id} item={a} />
        ))}
      </ScrollView>
    </View>
  );
}

function Card({ item }: { item: AnnItem }) {
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
      <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
        {item.imageUrl ? (
          <ImageBackground
            source={{ uri: item.imageUrl }}
            resizeMode="cover"
            style={{ width: '100%', aspectRatio: 16 / 9 }}
            imageStyle={{ borderRadius: 0 }}
          />
        ) : null}

        <View style={{ padding: 12, gap: 4 }}>
          <Text variant="titleSmall" numberOfLines={2} style={{ fontWeight: '700', color: '#0D121B' }}>
            {item.title}
          </Text>
          {item.excerpt ? (
            <Text variant="bodySmall" numberOfLines={2} style={{ color: '#475569' }}>
              {item.excerpt}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
