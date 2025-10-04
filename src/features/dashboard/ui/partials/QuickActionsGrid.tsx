import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ds } from '../../lib/tokens';
import QuickActionItem from '../components/QuickActionItem';

type Item = {
  key: string;
  label: string;
  icon: Parameters<typeof QuickActionItem>[0]['icon'];
  onPress?: () => void;
};

type Props = { items: Item[] };

export default function QuickActionsGrid({ items }: Props) {
  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <View style={{ flex: 1 }}>
      <QuickActionItem label={item.label} icon={item.icon} onPress={item.onPress} />
    </View>
  );

  return (
    <View style={{ paddingHorizontal: ds.space.lg }}>
      <Text
        variant="titleMedium"
        style={{ color: ds.color.text, fontWeight: '700', marginBottom: ds.space.sm }}
      >
        Quick Access
      </Text>

      <FlatList
        data={items}
        keyExtractor={(it) => it.key}
        numColumns={2}
        renderItem={renderItem}
        // horizontal spacing between columns
        columnWrapperStyle={{ gap: ds.space.lg }}
        // vertical spacing between rows
        ItemSeparatorComponent={() => <View style={{ height: ds.space.lg }} />}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: ds.space.sm }}
      />
    </View>
  );
}
