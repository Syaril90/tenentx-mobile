import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { ds, shadowSoft } from '../../lib/tokens';

type Props = {
  caption: string;
  value: string;
  actionLabel: string;
  onAction?: () => void;
};

export default function StatusSnippet({ caption, value, actionLabel, onAction }: Props) {
  return (
    <Card style={{ borderRadius: ds.radius.lg, backgroundColor: ds.color.surface, ...shadowSoft }}>
      <Card.Content
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: ds.space.lg,
        }}
      >
        <View>
          <Text variant="bodySmall" style={{ color: ds.color.textSubtle }}>
            {caption}
          </Text>
          <Text variant="titleLarge" style={{ color: ds.color.text, fontWeight: '800' }}>
            {value}
          </Text>
        </View>

        <Text
          variant="bodyMedium"
          onPress={onAction}
          style={{ color: ds.color.link, fontWeight: '600' }}
        >
          {actionLabel}
        </Text>
      </Card.Content>
    </Card>
  );
}
