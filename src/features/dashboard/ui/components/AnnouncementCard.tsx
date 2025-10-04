import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { ds, shadowSoft } from '../../lib/tokens';
import { Announcement } from '../../types';

type Props = { item: Announcement };

export default function AnnouncementCard({ item }: Props) {
  const d = new Date(item.publishedAtISO);
  const display = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

  // Shadow on wrapper, rounded+overflow hidden on inner to avoid visual clipping
  return (
    <View style={{ width: 280, marginRight: ds.space.md, ...shadowSoft, borderRadius: ds.radius.lg }}>
      <View style={{ borderRadius: ds.radius.lg, overflow: 'hidden', backgroundColor: ds.color.surface }}>
        <Card mode="contained" style={{ borderRadius: 0, backgroundColor: ds.color.surface, elevation: 0 }}>
          <Card.Content>
            <Text variant="titleSmall" style={{ fontWeight: '700', color: ds.color.text }}>
              {item.title}
            </Text>
            <Text variant="bodySmall" style={{ color: ds.color.textSubtle, marginTop: ds.space.xs }}>
              {item.body}
            </Text>
            <Text variant="labelSmall" style={{ opacity: 0.6, marginTop: ds.space.md }}>
              {display}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
