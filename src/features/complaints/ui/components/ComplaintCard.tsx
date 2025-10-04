import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import type { Complaint } from '../../types';
import StatusChip from './StatusChip';

export default function ComplaintCard({ item, onPress }: { item: Complaint; onPress?: (id: string) => void }) {
  const date = new Date(item.createdAtISO).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <StatusChip status={item.status} />
          <Text style={{ color: '#4c669a', fontSize: 12 }}>{date}</Text>
        </View>
        <Text variant="titleMedium" style={{ color: '#0d121b', fontWeight: '700' }}>{item.title}</Text>
        <Text style={{ color: '#4c669a', marginTop: 2 }} numberOfLines={2}>{item.description}</Text>
      </View>
      <IconButton icon="chevron-right" onPress={() => onPress?.(item.id)} />
    </View>
  );
}
