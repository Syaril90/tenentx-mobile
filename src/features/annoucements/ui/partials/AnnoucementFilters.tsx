import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { AnnCategory } from '../../types';

type Props = {
  query: string;
  setQuery: (q: string) => void;
  category: AnnCategory | 'all';
  setCategory: (c: AnnCategory | 'all') => void;
};

export default function AnnouncementsFilters({ query, setQuery, category, setCategory }: Props) {
  const cats: (AnnCategory | 'all')[] = ['all', 'maintenance', 'events', 'notices', 'security'];

  return (
    <View style={{ gap: 16, paddingTop: 6 }}>
      {/* Search */}
      <View style={{ paddingHorizontal: 16 }}>
        <Searchbar
          placeholder="Search announcements..."
          value={query}
          onChangeText={setQuery}
          style={{ borderRadius: 14, backgroundColor: '#e7ebf3', height: 52 }}
          inputStyle={{ fontSize: 16 }}
          iconColor="#4c669a"
        />
      </View>

      {/* Chip row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 56 }}                              
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 32,                               
          alignItems: 'center',                            
        }}
      >
        {cats.map((c) => {
          const active = c === category;
          return (
            <Button
              key={c}
              mode={active ? 'contained' : 'elevated'}
              onPress={() => setCategory(c)}
              style={{
                height: 40,                                   
                borderRadius: 20,
                backgroundColor: active ? '#3B82F6' : '#e7ebf3',
                marginRight: 12,
                minWidth: 132,
              }}
              textColor={active ? '#fff' : '#0d121b'}
              contentStyle={{ paddingHorizontal: 16 }}
              labelStyle={{ fontSize: 13, fontWeight: '700', textTransform: 'none' }}
            >
              {labelCat(c)}
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
}

function labelCat(c: AnnCategory | 'all') {
  switch (c) {
    case 'all': return 'All Categories';
    case 'maintenance': return 'Maintenance';
    case 'events': return 'Events';
    case 'notices': return 'Notices';
    case 'security': return 'Security';
  }
}
