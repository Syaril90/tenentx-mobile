import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip, Searchbar } from 'react-native-paper';
import type { ComplaintStatus } from '../../types';

type Props = {
  q: string;
  onChangeQ: (v: string) => void;
  status: 'all' | ComplaintStatus;
  onChangeStatus: (s: 'all' | ComplaintStatus) => void;
  sortByDate: 'asc' | 'desc';
  onToggleSort: () => void;
};

export default function ComplaintsFilters({
  q, onChangeQ, status, onChangeStatus, sortByDate, onToggleSort,
}: Props) {
  return (
    <View style={{ gap: 12 }}>
      <Searchbar
        value={q}
        onChangeText={onChangeQ}
        placeholder="Search complaints..."
        style={{ borderRadius: 12, backgroundColor: '#fff' }}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        <Chip mode={status === 'all' ? 'flat' : 'outlined'} selected={status === 'all'} onPress={() => onChangeStatus('all')}>
          All
        </Chip>
        <Chip mode={status === 'new' ? 'flat' : 'outlined'} selected={status === 'new'} onPress={() => onChangeStatus('new')}>
          New
        </Chip>
        <Chip mode={status === 'in_progress' ? 'flat' : 'outlined'} selected={status === 'in_progress'} onPress={() => onChangeStatus('in_progress')}>
          In-Progress
        </Chip>
        <Chip mode={status === 'on_hold' ? 'flat' : 'outlined'} selected={status === 'on_hold'} onPress={() => onChangeStatus('on_hold')}>
          On Hold
        </Chip>
        <Chip mode={status === 'resolved' ? 'flat' : 'outlined'} selected={status === 'resolved'} onPress={() => onChangeStatus('resolved')}>
          Resolved
        </Chip>
        <Chip icon={sortByDate === 'desc' ? 'sort-descending' : 'sort-ascending'} onPress={onToggleSort}>
          By Date
        </Chip>
      </ScrollView>
    </View>
  );
}
