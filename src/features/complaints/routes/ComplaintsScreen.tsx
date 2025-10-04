import React, { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '../../../shared/store/appStore';
import ComplaintCard from '../ui/components/ComplaintCard';
import ComplaintsFilters from '../ui/partials/ComplaintsFilters';

export default function ComplaintsScreen() {
  const complaints = useAppStore((s) => s.complaints);
  const loading = useAppStore((s) => s.complaintsLoading);
  const loadComplaints = useAppStore((s) => s.loadComplaints);

  const filters = useAppStore((s) => s.filters);
  const setQuery = useAppStore((s) => s.setQuery);
  const setStatus = useAppStore((s) => s.setStatus);
  const toggleSort = useAppStore((s) => s.toggleSort);

  useEffect(() => { void loadComplaints(); }, [loadComplaints]);

  const data = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const filtered = complaints
      .filter((c) => (filters.status === 'all' ? true : c.status === filters.status))
      .filter((c) => !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
      .sort((a, b) =>
        filters.sortByDate === 'desc'
          ? b.createdAtISO.localeCompare(a.createdAtISO)
          : a.createdAtISO.localeCompare(b.createdAtISO)
      );
    return filtered;
  }, [complaints, filters]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8f9fc' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f8f9fc' }} statusBarHeight={0}>
        <Appbar.BackAction onPress={() => { /* router.back() if needed */ }} />
        <Appbar.Content title="My Complaints" />
        <Appbar.Action icon="plus-circle-outline" onPress={() => { /* go to create screen */ }} />
      </Appbar.Header>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        refreshing={loading}
        onRefresh={() => void loadComplaints()}
        contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}
        renderItem={({ item }) => <ComplaintCard item={item} onPress={() => { /* go to details */ }} />}
        ListHeaderComponent={
          <ComplaintsFilters
            q={filters.q}
            onChangeQ={setQuery}
            status={filters.status}
            onChangeStatus={setStatus}
            sortByDate={filters.sortByDate}
            onToggleSort={toggleSort}
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={{ padding: 32, alignItems: 'center' }}>
              <Text variant="titleMedium">No complaints yet</Text>
              <Text style={{ color: '#4c669a', marginTop: 4 }}>
                Submit a new complaint using the “+” button.
              </Text>
            </View>
          ) : null
        }
      />

      <FAB icon="plus" style={{ position: 'absolute', right: 16, bottom: 24 }} onPress={() => { /* create */ }} />
    </SafeAreaView>
  );
}
