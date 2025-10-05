import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '../../../shared/store/appStore';
import { Announcement } from '../types';
import AnnoucementCard from '../ui/components/AnnoucementCard';
import PinnedCard from '../ui/components/PinnedCard';
import AnnouncementsFilters from '../ui/partials/AnnoucementFilters';

export default function AnnouncementsScreen() {
  const anns = useAppStore((s) => s.anns);
  const loading = useAppStore((s) => s.annsLoading);
  const load = useAppStore((s) => s.load);
  const query = useAppStore((s) => s.query);
  const setQuery = useAppStore((s) => s.setQuery);
  const category = useAppStore((s) => s.category);
  const setCategory = useAppStore((s) => s.setCategory);
  const markRead = useAppStore((s) => s.markRead);

  useEffect(() => {
    void load();
  }, [load]);

  const pinned = useMemo(() => anns.filter((a) => a.pinned), [anns]);

  const feed = useMemo(() => {
    const q = query.trim().toLowerCase();
    return anns
      .filter((a) => !a.pinned)
      .filter((a) => (category === 'all' ? true : a.category === category))
      .filter(
        (a) =>
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.body.toLowerCase().includes(q),
      );
  }, [anns, category, query]);

  const openDetails = useCallback((id: string) => {
    markRead(id);
    router.push({ pathname: '/announce/[id]', params: { id } });
  }, [markRead]);

  const renderItem: ListRenderItem<Announcement> = useCallback(
    ({ item }) => (
      <AnnoucementCard
        item={item}
        onReadMore={openDetails}       // Read More → details
        onShare={() => {
          // TODO: Share API
        }}
      />
    ),
    [openDetails]
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8f9fc' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f8f9fc' }} statusBarHeight={0}>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Announcements" />
        <Appbar.Action icon="bell-outline" onPress={() => {}} />
      </Appbar.Header>

      <FlatList
        data={feed}
        refreshing={loading}
        onRefresh={() => void load()}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 56 }}
        ListHeaderComponent={
          <View style={{ marginBottom: 8 }}>
            <AnnouncementsFilters
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
            />

            {pinned.length ? (
              <View style={{ marginTop: 18 }}>
                <Text
                  variant="titleMedium"
                  style={{ fontWeight: '800', color: '#0d121b', marginBottom: 10 }}
                >
                  Pinned Announcements
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 6, gap: 12 }}
                >
                  {pinned.map((p) => (
                    <PinnedCard
                      key={p.id}
                      item={p}
                      onPress={openDetails} // NEW: tap → details
                    />
                  ))}
                </ScrollView>
              </View>
            ) : null}

            <Text
              variant="titleMedium"
              style={{ fontWeight: '800', color: '#0d121b', marginVertical: 12 }}
            >
              All Announcements
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 8 }} />}
      />
    </SafeAreaView>
  );
}
