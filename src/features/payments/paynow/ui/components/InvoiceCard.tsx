import React from 'react';
import { Platform, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { Invoice } from '../../../paynow/types';
import CheckSquare from './CheckSquare';

type Props = {
  invoice: Invoice;
  checked: boolean;
  expanded: boolean;
  onToggleCheck(): void;
  onToggleExpand(): void;
};

export default function InvoiceCard({
  invoice, checked, expanded, onToggleCheck, onToggleExpand,
}: Props) {
  const due = new Date(invoice.dueDateISO).toLocaleDateString(undefined, {
    day: '2-digit', month: 'short', year: 'numeric',
  });
  const money = formatMoney(invoice.total.minor, invoice.total.currency);

  return (
    // OUTER: shadow + radius (no overflow)
    <View
      style={{
        borderRadius: 16,
        backgroundColor: 'transparent',
        // iOS shadow
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        // Android shadow
        ...Platform.select({ android: { elevation: 3 } }),
      }}
    >
      {/* INNER: clipping + background */}
      <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
        {/* Header row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <CheckSquare checked={checked} onToggle={onToggleCheck} size={20} />

          <View style={{ marginLeft: 12, flex: 1, minWidth: 0 }}>
            <Text
              variant="titleSmall"
              style={{ color: '#0D121B', fontWeight: '600' }}
              numberOfLines={1}
            >
              {invoice.title}
            </Text>
            <Text variant="bodySmall" style={{ color: '#4C669A', marginTop: 2 }} numberOfLines={1}>
              Due Date: {due}
            </Text>
          </View>

          {/* Amount + chevron */}
          <View style={{ alignItems: 'flex-end' }}>
            <Text variant="titleSmall" style={{ color: '#0D121B', fontWeight: '700' }}>
              {money}
            </Text>
            {invoice.items?.length ? (
              <IconButton
                icon={expanded ? 'chevron-up' : 'chevron-down'}
                onPress={onToggleExpand}
                iconColor="#0F49BD"
                size={18}
                style={{ margin: 0 }}
              />
            ) : (
              <IconButton icon="chevron-down" disabled size={18} style={{ opacity: 0, margin: 0 }} />
            )}
          </View>
        </View>

        {/* Details */}
        {expanded && invoice.items?.length ? (
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: '#F1F5F9',
              paddingHorizontal: 16,
              paddingBottom: 12,
              paddingTop: 12,
            }}
          >
            {invoice.items.map((it) => (
              <View
                key={it.id}
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
              >
                <Text variant="bodySmall" style={{ color: '#4C669A' }}>
                  {it.label}
                </Text>
                <Text variant="bodySmall" style={{ color: '#4C669A' }}>
                  {formatMoney(it.amount.minor, it.amount.currency)}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

function formatMoney(minor: number, currency: 'MYR' | 'PHP' | 'USD'): string {
  const amount = minor / 100;
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
  } catch {
    const sym = currency === 'MYR' ? 'RM ' : currency === 'PHP' ? '₱' : '$';
    return `${sym}${amount.toFixed(2)}`;
  }
}
