import React from 'react';
import { Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Payment } from '../../types';
import StatusChip from './StatusChip';

type Props = {
  item: Payment;
  onPressPrimary?: (item: Payment) => void;
};

export default function PaymentCard({ item, onPressPrimary }: Props) {
  const date = new Date(item.dateISO);
  const displayDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }); 

  const money = formatMoney(item.amountMinor, item.currency);
  const primaryLabel =
    item.cta === 'receipt' ? 'Download Receipt' : item.cta === 'view' ? 'View Details' : 'Pay Now';

  const linkBlue = '#0E74F1';
  const grayBG = '#e7ebf3';

  return (
    // OUTER: shadow container (no overflow)
    <View
      style={{
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        ...Platform.select({ android: { elevation: 3 } }),
      }}
    >
      {/* INNER: rounded + clipping */}
      <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
        <View style={{ gap: 12, paddingHorizontal: 16, paddingVertical: 14 }}>
          {/* Top row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text variant="titleSmall" style={{ fontWeight: '700', color: '#0d121b' }} numberOfLines={2}>
                {item.title}
              </Text>
              <Text variant="bodySmall" style={{ color: '#4c669a', marginTop: 2 }}>
                {displayDate}
              </Text>
            </View>
            <Text variant="titleSmall" style={{ fontWeight: '700', color: '#0d121b' }}>
              {money}
            </Text>
          </View>

          {/* Bottom row */}
          <View
            style={{
              marginTop: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
              <StatusChip status={item.status} />
              {/* optional refund note */}
            </View>

            <View style={{ flexShrink: 0 }}>
              <Button
                mode={item.cta === 'pay' ? 'contained' : 'elevated'}
                onPress={() => onPressPrimary?.(item)}
                style={{
                  borderRadius: 16,
                  backgroundColor: item.cta === 'pay' ? linkBlue : grayBG,
                  minHeight: 40,
                }}
                textColor={item.cta === 'pay' ? '#fff' : '#0d121b'}
                contentStyle={{ paddingHorizontal: 18 }}
                labelStyle={{ fontSize: 14, fontWeight: '600' }}
              >
                {primaryLabel}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function formatMoney(minor: number, currency: 'PHP' | 'MYR' | 'USD'): string {
  const amount = minor / 100;
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
  } catch {
    const symbol = currency === 'PHP' ? '₱' : currency === 'MYR' ? 'RM' : '$';
    return `${symbol}${amount.toFixed(2)}`;
  }
}
