import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedTabs from '../ui/components/SegmentedTabs';

// Example type for list items
type FacilityItem = {
  id: string;
  name: string;
  imageUrl: string;
  category?: 'sports' | 'social' | 'workspace' | 'other';
};

// assume you already have your facilities list somewhere
const facilities: FacilityItem[] = [
  { id: 'f1', name: 'Gym', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200' },
  { id: 'f2', name: 'Swimming Pool', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200' },
  // ...
];

export default function FacilityScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'browse' | 'mine'>('browse');

  const data = useMemo(() => facilities, []);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F8F9FC' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#F8F9FC' }} statusBarHeight={0}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Facility Booking" />
        <View style={{ width: 48 }} />
      </Appbar.Header>

      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <SegmentedTabs value={tab} onChange={setTab} />
      </View>

      {/* chips row omitted for brevity */}

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 6, rowGap: 14 }}
        renderItem={({ item }) => (
          <Pressable
            style={{ flex: 1 }}
            onPress={() =>
              router.push({
                pathname: '/facilities/book',
                params: { facilityId: item.id, facilityName: item.name },
              })
            }
          >
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
      />
    </SafeAreaView>
  );
}
