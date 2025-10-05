import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import type { Facility } from '../../../facilities/types';
import FacilityCard from '../components/FacilityCard';

type Props = {
  data: Facility[];
  onOpen: (facility: Facility) => void;
  refreshing: boolean;
  onRefresh: () => void;
};

export default function FacilityGrid({
  data,
  onOpen,
  refreshing,
  onRefresh,
}: Props) {
  const renderItem: ListRenderItem<Facility> = ({ item }) => (
    <FacilityCard item={item} onPress={onOpen} />
  );

  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(it) => it.id}
      renderItem={renderItem}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 120 }}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        !refreshing ? (
          <View style={{ alignItems: 'center', padding: 32 }}>
            {/* Keep minimal; screen can own the bigger empty state if needed */}
          </View>
        ) : null
      }
    />
  );
}
