import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '../../../shared/store/appStore';
import { NotifFilter } from '../types';
import FilterChips from '../ui/components/FilterChips';
import NotificationItem from '../ui/components/NotificationItem';

export default function NotificationsScreen() {
  const router = useRouter();

  const items = useAppStore((s) => s.items);
  const loading = useAppStore((s) => s.loading);
  const filter = useAppStore((s) => s.filter as NotifFilter);
  const load = useAppStore((s) => s.load);
  const setFilter = useAppStore((s) => s.setFilter);
  const markAllRead = useAppStore((s) => s.markAllRead);
  const markRead = useAppStore((s) => s.markRead);

  useEffect(() => {
    void load();
  }, [load]);

  const feed = useMemo(() => {
    if (filter === 'all') return items;
    if (filter === 'unread') return items.filter((n) => !n.read);
    return items.filter((n) => n.category === filter);
  }, [items, filter]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8f9fc' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f8f9fc' }} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="Notifications Center" />
        <View style={{ width: 48 }} />
      </Appbar.Header>

      {/* Chips row + “Mark all as read” */}
      <View style={{ backgroundColor: '#f8f9fc' }}>
        <FilterChips value={filter} onChange={setFilter} />
        <View style={{ paddingHorizontal: 16, paddingTop: 6, paddingBottom: 8, alignItems: 'flex-end' }}>
          <Button
            onPress={() => void markAllRead()}
            compact
            mode="text"
            labelStyle={{ fontWeight: '800', color: '#007BFF' }}
          >
            Mark All as Read
          </Button>
        </View>
      </View>

      <FlatList
        data={feed}
        keyExtractor={(it) => it.id}
        refreshing={loading}
        onRefresh={() => void load()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, paddingTop: 2 }}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={(id) => {
              void markRead(id);
              // Add deep links here based on category if needed
            }}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <View style={{ padding: 32, alignItems: 'center' }}>
              <Text variant="titleMedium" style={{ fontWeight: '800' }}>No New Notifications</Text>
              <Text style={{ color: '#4c669a', marginTop: 4 }}>You’re all caught up!</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
