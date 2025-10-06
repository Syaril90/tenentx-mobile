import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { NotifFilter } from '../../types';

type Props = {
  value: NotifFilter;
  onChange: (f: NotifFilter) => void;
};

const CHIPS: { key: NotifFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'announcements', label: 'Announcements' },
  { key: 'payments', label: 'Payments' },
  { key: 'complaints', label: 'Complaints' },
  { key: 'visitors', label: 'Visitors' },
];

export default function FilterChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 12 }}
      style={{ paddingVertical: 8 }}
    >
      {CHIPS.map((c) => {
        const active = c.key === value || (value === 'all' && c.key === 'all');
        return (
          <Pressable
            key={c.key}
            onPress={() => onChange(c.key)}
            style={{
              height: 32,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: active ? '#007BFF' : '#e7edf4',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: active ? '#fff' : '#0d141c', fontSize: 13, fontWeight: '600' }}>
              {c.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
