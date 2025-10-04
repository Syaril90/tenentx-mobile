import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppStore } from '../../../../shared/store/appStore';
import InvoiceCard from '../ui/components/InvoiceCard';
import MethodRow from '../ui/components/MethodRow';
import ToggleRow from '../ui/components/ToggleRow';

export default function PayNowScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ invoiceId?: string }>();

  const {
    invoices,
    selected,
    expanded,
    method,
    settings,
    invoicesLoading,
    loadPayNow,
    toggleInvoice,
    toggleExpand,
    setMethod,
    setSettings,
    totalSelectedMinor,
    countSelected,
  } = useAppStore((s) => s);

  // Load outstanding invoices (namespaced to avoid collisions)
  useEffect(() => { void loadPayNow(); }, [loadPayNow]);

  // Preselect/expand invoice from route, if any
  useEffect(() => {
    if (!invoices.length || !params.invoiceId) return;
    const id = params.invoiceId;
    const exists = invoices.some((i) => i.id === id);
    if (!exists) return;

    if (!selected[id]) toggleInvoice(id);
    const inv = invoices.find((i) => i.id === id);
    if (inv?.items?.length && !expanded[id]) toggleExpand(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices, params.invoiceId]);

  const totalMinor = totalSelectedMinor();
  const count = countSelected();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F8F9FC' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#F8F9FC' }} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => { /* router.back() if needed */ }} />
        <Appbar.Content title="Pay Now" />
        <View style={{ width: 40 }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <Text variant="titleMedium" style={{ fontWeight: '700', color: '#0D121B', marginBottom: 8 }}>
            Outstanding Invoices
          </Text>

          {invoicesLoading ? (
            <Text style={{ color: '#475569', paddingVertical: 8 }}>Loading invoices…</Text>
          ) : null}

          <View style={{ gap: 12 }}>
            {invoices.map((inv) => (
              <InvoiceCard
                key={inv.id}
                invoice={inv}
                checked={!!selected[inv.id]}
                expanded={!!expanded[inv.id]}
                onToggleCheck={() => toggleInvoice(inv.id)}
                onToggleExpand={() => toggleExpand(inv.id)}
              />
            ))}

            {!invoicesLoading && invoices.length === 0 ? (
              <Text style={{ color: '#64748B' }}>You have no outstanding invoices.</Text>
            ) : null}
          </View>
        </View>

        {/* Payment Method */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <Text variant="titleMedium" style={{ fontWeight: '700', color: '#0D121B', marginBottom: 8 }}>
            Payment Method
          </Text>

          <MethodRow
            id="fpx"
            label="FPX (Online Banking)"
            leftIcon="bank"
            selected={method === 'fpx'}
            onSelect={() => setMethod('fpx')}
          />
          <MethodRow
            id="card"
            label="Credit/Debit Card"
            leftIcon="credit-card-outline"
            selected={method === 'card'}
            onSelect={() => setMethod('card')}
          />
          <MethodRow
            id="ewallet"
            label="E-Wallets"
            leftIcon="wallet"
            selected={method === 'ewallet'}
            onSelect={() => setMethod('ewallet')}
          />
        </View>

        {/* Settings */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 12 }}>
            <ToggleRow
              label="Save Payment Method"
              value={settings.saveMethod}
              onToggle={(v) => setSettings({ saveMethod: v })}
            />
            <Divider style={{ marginVertical: 8, backgroundColor: '#F1F5F9' }} />
            <ToggleRow
              label="Enable Auto-Debit"
              value={settings.autoDebit}
              onToggle={(v) => setSettings({ autoDebit: v })}
            />
            <Divider style={{ marginVertical: 8, backgroundColor: '#F1F5F9' }} />
            <ToggleRow
              label="Payment Reminders"
              value={settings.reminders}
              onToggle={(v) => setSettings({ reminders: v })}
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Summary Bar */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: Math.max(insets.bottom, 12),
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 16,
          paddingTop: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          elevation: 6,
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}
        >
          <View>
            <Text variant="bodySmall" style={{ color: '#4C669A' }}>
              Selected Items ({count})
            </Text>
            <Text variant="headlineSmall" style={{ fontWeight: '800', color: '#0D121B' }}>
              {formatMYR(totalMinor)}
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              // integrate gateway; selected ids:
              // const ids = Object.keys(selected).filter((id) => selected[id]);
            }}
            style={{ borderRadius: 999, paddingHorizontal: 24, height: 48, justifyContent: 'center', backgroundColor: '#0F49BD' }}
            labelStyle={{ fontWeight: '700' }}
            disabled={count === 0 || !method}
          >
            Pay Now
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

function formatMYR(minor: number) {
  const amt = minor / 100;
  try {
    return new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(amt);
  } catch {
    return `RM ${amt.toFixed(2)}`;
  }
}
