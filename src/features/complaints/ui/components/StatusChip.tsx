import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import type { ComplaintStatus } from '../../types';

const colors: Record<ComplaintStatus, { bg: string; fg: string }> = {
  new:         { bg: '#E0F2FE', fg: '#0EA5E9' },
  in_progress: { bg: '#FFFBEB', fg: '#F59E0B' },
  on_hold:     { bg: '#F3F4F6', fg: '#4B5563' },
  resolved:    { bg: '#DCFCE7', fg: '#16A34A' },
};

export default function StatusChip({ status }: { status: ComplaintStatus }) {
  const c = colors[status];
  const label = status === 'in_progress' ? 'In-Progress' :
                status === 'on_hold' ? 'On Hold' :
                status === 'new' ? 'New' : 'Resolved';
  return (
    <View style={{ backgroundColor: c.bg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
      <Text style={{ fontSize: 12, color: c.fg, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}
