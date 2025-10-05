import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper';
import type { FacilityCategory } from '../../../facilities/types';

type Props = {
  tab: 'browse' | 'my';
  onChangeTab: (t: 'browse' | 'my') => void;

  category: FacilityCategory | 'all';
  onChangeCategory: (c: FacilityCategory | 'all') => void;
};

export default function FacilityFilters({
  tab,
  onChangeTab,
  category,
  onChangeCategory,
}: Props) {
  return (
    <View style={{ gap: 12 }}>
      <SegmentedButtons
        value={tab}
        onValueChange={(v) => onChangeTab(v as 'browse' | 'my')}
        buttons={[
          { value: 'browse', label: 'Browse Facilities' },
          { value: 'my', label: 'My Bookings' },
        ]}
        density="medium"
        style={{ marginHorizontal: 16 }}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      >
        {([
          { key: 'sports', label: 'Sports' },
          { key: 'social', label: 'Social' },
          { key: 'workspace', label: 'Workspace' },
          { key: 'all', label: 'All' },
        ] as const).map((c) => {
          const selected = category === c.key;
          return (
            <Button
              key={c.key}
              mode={selected ? 'contained' : 'elevated'}
              compact
              onPress={() => onChangeCategory(c.key)}
              style={{ borderRadius: 12 }}
            >
              {c.label}
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
}
