import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '../../../shared/store/appStore';
import { Complaint } from '../types';
import ComplaintCard from '../ui/components/ComplaintCard';
import ComplaintsFilters from '../ui/partials/ComplaintsFilters';

export default function ComplaintsScreen() {
  const router = useRouter();

  // store
  const complaints = useAppStore((s) => s.complaints);
  const loading = useAppStore((s) => s.complaintsLoading);
  const loadComplaints = useAppStore((s) => s.loadComplaints);

  const query = useAppStore((s) => s.query);
  const setQuery = useAppStore((s) => s.setQuery);

  const statusFilter = useAppStore((s) => s.statusFilter);
  const setStatusFilter = useAppStore((s) => s.setStatusFilter);

  const sortBy = useAppStore((s) => s.sortBy); // 'date_desc' | 'date_asc'
  const setSort = useAppStore((s) => s.setSort);

  useEffect(() => {
    void loadComplaints();
  }, [loadComplaints]);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return complaints
      .filter((c: Complaint) => (statusFilter === 'all' ? true : c.status === statusFilter))
      .filter(
        (c : Complaint) =>
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
      .sort((a: Complaint, b: Complaint) =>
        sortBy === 'date_desc'
          ? b.createdAtISO.localeCompare(a.createdAtISO)
          : a.createdAtISO.localeCompare(b.createdAtISO)
      );
  }, [complaints, query, statusFilter, sortBy]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8f9fc' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f8f9fc' }} statusBarHeight={0}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="My Complaints" />
      </Appbar.Header>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        refreshing={loading}
        onRefresh={() => void loadComplaints()}
        contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}
        renderItem={({ item }) => (
          <ComplaintCard
            item={item}
            onPress={() => router.push(`/complaints/${item.id}`)}
          />
        )}
        ListHeaderComponent={
          <ComplaintsFilters
            q={query}
            onChangeQ={setQuery}
            status={statusFilter}
            onChangeStatus={setStatusFilter}
            sortByDate={sortBy === 'date_desc' ? 'desc' : 'asc'}
            onToggleSort={() => setSort(sortBy === 'date_desc' ? 'date_asc' : 'date_desc')}
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

      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 24 }}
        onPress={() => router.push('/complaints/new')}
      />
    </SafeAreaView>
  );
}
