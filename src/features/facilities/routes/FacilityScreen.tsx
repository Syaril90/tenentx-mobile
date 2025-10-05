// features/routes/FacilityScreen.tsx
import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedTabs from '../ui/components/SegmentedTabs';

type Category = 'all' | 'sports' | 'social' | 'workspace';
type Facility = { id: string; name: string; category: Category | 'other'; imageUrl: string };

const MOCK_FACILITIES: Facility[] = [
  { id: 'f1', name: 'Gym',            category: 'sports',    imageUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1200&h=900&fit=crop' },
  { id: 'f2', name: 'Swimming Pool',  category: 'sports',    imageUrl: 'https://images.unsplash.com/photo-1505843755177-0df89eb01050?w=1200&h=900&fit=crop' },
  { id: 'f3', name: 'Function Room A',category: 'social',    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=900&fit=crop' },
  { id: 'f4', name: 'BBQ Area',       category: 'social',    imageUrl: 'https://images.unsplash.com/photo-1604908177073-12f9bd25624c?w=1200&h=900&fit=crop' },
];

export default function FacilityScreen() {
  const [tab, setTab] = useState<'browse' | 'mine'>('browse');
  const [category, setCategory] = useState<Category>('all');

  const filtered = useMemo(
    () => MOCK_FACILITIES.filter(f => (category === 'all' ? true : f.category === category)),
    [category]
  );
  const data = tab === 'browse' ? filtered : [];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F8F9FC' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#F8F9FC' }} statusBarHeight={0}>
        <Appbar.BackAction onPress={() => { /* router.back() */ }} />
        <Appbar.Content title="Facility Booking" />
        <View style={{ width: 40 }} />
      </Appbar.Header>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={2}
        // snug columns + list paddings
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListHeaderComponent={
          <View>
            {/* Tabs */}
            <View style={{ paddingHorizontal: 12, paddingTop: 6 }}>
              <SegmentedTabs value={tab} onChange={setTab} />
            </View>

            {/* Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}
            >
              <Chip label="Sports"    selected={category === 'sports'}    onPress={() => setCategory('sports')} />
              <Chip label="Social"    selected={category === 'social'}    onPress={() => setCategory('social')} />
              <Chip label="Workspace" selected={category === 'workspace'} onPress={() => setCategory('workspace')} />
              <Chip label="All"       selected={category === 'all'}       onPress={() => setCategory('all')} />
            </ScrollView>
          </View>
        }
        ListHeaderComponentStyle={{}} // no extra spacing
        renderItem={({ item }) => (
          <Pressable style={{ flex: 1 }} onPress={() => { /* open details/bottom sheet */ }}>
            <View style={{ gap: 6, paddingBottom: 2 }}>
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 16 }}
              />
              <Text style={{ color: '#0D121B', fontSize: 16, fontWeight: '600' }}>
                {item.name}
              </Text>
              <Text style={{ color: '#0E74F1', fontSize: 12.5, fontWeight: '700' }}>
                Book Now
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          tab === 'mine' ? (
            <View style={{ padding: 16, alignItems: 'center' }}>
              <Text style={{ color: '#4C669A' }}>No bookings yet.</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

function Chip({
  label, selected, onPress,
}: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: selected ? '#E7EBF3' : '#E7EBF3',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#0D121B', fontSize: 14, fontWeight: '600' }}>{label}</Text>
      <Text style={{ color: '#0D121B', marginLeft: 6, marginTop: -1 }}>▾</Text>
    </Pressable>
  );
}
