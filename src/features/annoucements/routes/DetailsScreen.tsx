import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../../shared/store/appStore';
import type { AnnCategory, Announcement } from '../types';

export default function DetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id ?? '';

  // from your announcements slice
  const anns = useAppStore((s) => s.anns);
  const loading = useAppStore((s) => s.annsLoading);
  const load = useAppStore((s) => s.load);

  // ensure data exists if user came directly here (e.g., deep link)
  useEffect(() => {
    if (!anns.length && !loading) void load();
  }, [anns.length, loading, load]);

  const ann: Announcement | undefined = useMemo(
    () => anns.find((a) => a.id === id),
    [anns, id]
  );

  const published =
    ann &&
    new Date(ann.createdAtISO).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f5f5f5' }} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="Announcement Details" />
        <Appbar.Action icon="email-plus-outline" onPress={() => { /* mark unread / toggle */ }} />
        <Appbar.Action icon="share-variant" onPress={() => { /* share */ }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Title */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
          <Text variant="headlineSmall" style={{ fontWeight: '700', color: '#333' }}>
            {ann?.title ?? (loading ? 'Loading…' : 'Announcement not found')}
          </Text>
        </View>

        {/* Category + Published */}
        {ann ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 12 }}>
            <CategoryChip category={ann.category} />
            <Text variant="bodySmall" style={{ color: '#666' }}>
              {published ? `Published: ${published}` : ''}
            </Text>
          </View>
        ) : null}

        {/* Image gallery (single imageUrl, styled as 16:9) */}
        {ann?.imageUrl ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingTop: 8, paddingBottom: 4 }}
          >
            <View
              style={{
                width: 320,
                aspectRatio: 16 / 9,
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: '#eee',
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 3,
              }}
            >
              <Image source={{ uri: ann.imageUrl }} style={{ width: '100%', height: '100%' }} />
            </View>
          </ScrollView>
        ) : null}

        {/* Divider */}
        <View style={{ paddingHorizontal: 16 }}>
          <Divider style={{ marginTop: 8, borderColor: '#e5e7eb' }} />
        </View>

        {/* Body */}
        {ann ? (
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text variant="bodyMedium" style={{ color: '#333', lineHeight: 22 }}>
              {ann.body.split('\n').map((line, idx) => (
                <Text key={idx}>
                  {line}
                  {'\n'}
                </Text>
              ))}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryChip({ category }: { category: AnnCategory }) {
  const palette: Record<AnnCategory, { bg: string; fg: string; label: string }> = {
    maintenance: { bg: '#e0efff', fg: '#007BFF', label: 'Maintenance' },
    events:      { bg: '#E7F8ED', fg: '#169C53', label: 'Events' },
    notices:     { bg: '#FFF4E5', fg: '#A05A00', label: 'Notices' },
    security:    { bg: '#FFE4E6', fg: '#991B1B', label: 'Security' },
  };
  const c = palette[category];
  return (
    <View
      style={{
        backgroundColor: c.bg,
        borderRadius: 999,
        paddingHorizontal: 12,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text variant="labelSmall" style={{ color: c.fg, fontWeight: '600' }}>
        {c.label}
      </Text>
    </View>
  );
}
