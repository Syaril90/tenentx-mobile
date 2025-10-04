import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Menu, Searchbar } from 'react-native-paper';
import { PaymentStatus, PaymentType } from '../../types';

export type DatePreset = 'all' | 'last30' | 'last90' | 'thisYear';

type Props = {
  query: string;
  onQueryChange: (q: string) => void;

  datePreset: DatePreset;
  setDatePreset: (p: DatePreset) => void;

  type?: PaymentType;
  setType: (t?: PaymentType) => void;

  status?: PaymentStatus;
  setStatus: (s?: PaymentStatus) => void;
};

export default function HistoryFilters({
  query, onQueryChange,
  datePreset, setDatePreset,
  type, setType,
  status, setStatus,
}: Props) {
  // Only one menu open at a time
  const [open, setOpen] = React.useState<null | 'date' | 'type' | 'status'>(null);
  const closeAll = () => setOpen(null);

  return (
    <View style={{ gap: 12, paddingTop: 4 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Searchbar
          placeholder="Search payments"
          value={query}
          onChangeText={onQueryChange}
          style={{ borderRadius: 12, backgroundColor: '#e7ebf3', height: 48 }}
          inputStyle={{ fontSize: 16 }}
          iconColor="#4c669a"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 10, paddingBottom: 6 }}
      >
        {/* Date Range */}
        <Menu
          visible={open === 'date'}
          onDismiss={closeAll}
          anchor={
            // IMPORTANT: wrap anchor in a View with collapsable={false} so Paper can measure it reliably
            <View collapsable={false}>
              <ChipBtn
                label={labelDatePreset(datePreset)}
                onPress={() => setOpen(open === 'date' ? null : 'date')}
              />
            </View>
          }
          anchorPosition="bottom"
        >
          {(['all','last30','last90','thisYear'] as DatePreset[]).map((p) => (
            <Menu.Item
              key={p}
              title={labelDatePreset(p)}
              onPress={() => { setDatePreset(p); closeAll(); }}
            />
          ))}
        </Menu>

        {/* Payment Type */}
        <Menu
          visible={open === 'type'}
          onDismiss={closeAll}
          anchor={
            <View collapsable={false}>
              <ChipBtn
                label={`Payment Type${type ? `: ${labelType(type)}` : ''}`}
                onPress={() => setOpen(open === 'type' ? null : 'type')}
              />
            </View>
          }
          anchorPosition="bottom"
        >
          <Menu.Item title="All" onPress={() => { setType(undefined); closeAll(); }} />
          {(['maintenance','utility','amenity','assessment'] as PaymentType[]).map((t) => (
            <Menu.Item key={t} title={labelType(t)} onPress={() => { setType(t); closeAll(); }} />
          ))}
        </Menu>

        {/* Status */}
        <Menu
          visible={open === 'status'}
          onDismiss={closeAll}
          anchor={
            <View collapsable={false}>
              <ChipBtn
                label={`Status${status ? `: ${labelStatus(status)}` : ''}`}
                onPress={() => setOpen(open === 'status' ? null : 'status')}
              />
            </View>
          }
          anchorPosition="bottom"
        >
          <Menu.Item title="All" onPress={() => { setStatus(undefined); closeAll(); }} />
          {(['paid','pending','refunded'] as const).map((s) => (
            <Menu.Item key={s} title={labelStatus(s)} onPress={() => { setStatus(s); closeAll(); }} />
          ))}
        </Menu>
      </ScrollView>
    </View>
  );
}

function ChipBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Button
      mode="elevated"
      compact
      onPress={onPress}
      style={{ height: 40, borderRadius: 14, backgroundColor: '#e7ebf3' }}
      textColor="#0d121b"
      contentStyle={{ paddingHorizontal: 14 }}
      icon="chevron-down"
      labelStyle={{ fontSize: 13, fontWeight: '600', textTransform: 'none' }}
    >
      {label}
    </Button>
  );
}

function labelDatePreset(p: DatePreset): string {
  switch (p) {
    case 'all': return 'Date Range';
    case 'last30': return 'Last 30 days';
    case 'last90': return 'Last 90 days';
    case 'thisYear': return 'This year';
  }
}

function labelType(t: PaymentType): string {
  switch (t) {
    case 'maintenance': return 'Maintenance';
    case 'utility': return 'Utility';
    case 'amenity': return 'Amenity';
    case 'assessment': return 'Assessment';
  }
}

function labelStatus(s: PaymentStatus): string {
  switch (s) {
    case 'paid': return 'Paid';
    case 'pending': return 'Pending';
    case 'refunded': return 'Refunded';
  }
}
