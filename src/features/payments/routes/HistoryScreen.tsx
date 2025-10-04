import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '../../../shared/store/appStore';
import { Payment, PaymentStatus, PaymentType } from '../types';
import PaymentCard from '../ui/components/PaymentCard';
import HistoryFilters, { DatePreset } from '../ui/partials/HistoryFilters';

export default function HistoryScreen() {
  // zustand selectors (stable refs; no object selector)
  const history = useAppStore((s) => s.paymentsHistory);
  const loading = useAppStore((s) => s.paymentsLoading);
  const loadHistory = useAppStore((s) => s.loadHistory);

  // local UI state
  const [query, setQuery] = useState('');
  const [datePreset, setDatePreset] = useState<DatePreset>('all');
  const [type, setType] = useState<PaymentType | undefined>(undefined);
  const [status, setStatus] = useState<PaymentStatus | undefined>(undefined);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  // client-side filtering (title search + date preset + type + status)
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = new Date();
    const start = (() => {
      switch (datePreset) {
        case 'last30': return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
        case 'last90': return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90);
        case 'thisYear': return new Date(now.getFullYear(), 0, 1);
        default: return undefined; // 'all'
      }
    })();

    return history.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q)) return false;
      if (type && p.type !== type) return false;
      if (status && p.status !== status) return false;
      if (start) {
        const d = new Date(p.dateISO).getTime();
        if (d < start.getTime()) return false;
      }
      return true;
    });
  }, [history, query, datePreset, type, status]);

  const renderItem: ListRenderItem<Payment> = ({ item }) => (
    <PaymentCard
      item={item}
      onPressPrimary={() => {
        if (item.cta === 'pay') {
          // Link to Pay Now and pass the invoice id
          router.push({ pathname: '/pay-now', params: { invoiceId: item.id } });
        } else if (item.cta === 'receipt') {
          // TODO: handle receipt download
        } else {
          // TODO: view details
        }
      }}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8f9fc' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f8f9fc' }} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => { /* router.back() if nested */ }} />
        <Appbar.Content title="Payment History" />
        <View style={{ width: 40 }} />
      </Appbar.Header>

      <FlatList
        data={data}
        refreshing={loading}
        onRefresh={() => void loadHistory()}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 56 }}
        ListHeaderComponent={
          <View style={{ marginBottom: 8 }}>
            <HistoryFilters
              query={query}
              onQueryChange={setQuery}
              datePreset={datePreset}
              setDatePreset={setDatePreset}
              type={type}
              setType={setType}
              status={status}
              setStatus={setStatus}
            />
          </View>
        }
        ListFooterComponent={<View style={{ height: 16 }} />}
      />
    </SafeAreaView>
  );
}
