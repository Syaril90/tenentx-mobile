import React from 'react';
import { Image, Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export type Money = { amountCents: number; currency: 'USD' | 'MYR' | 'PHP' };

export type UnitCardUnit = {
  title: string;
  address?: string;
  imageUrl?: string;
};

type Props = {
  unit: UnitCardUnit;
  balance: Money;
  onViewDetails: () => void;
};

function formatCurrency(cents: number, currency: Money['currency']): string {
  const amount = cents / 100;
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
  } catch {
    const sym = currency === 'MYR' ? 'RM' : currency === 'PHP' ? '₱' : '$';
    return `${sym}${amount.toFixed(2)}`;
  }
}

export default function UnitSummaryCard({ unit, balance, onViewDetails }: Props) {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        ...Platform.select({ android: { elevation: 4 } }),
      }}
    >
      <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
        {unit.imageUrl ? (
          <Image source={{ uri: unit.imageUrl }} resizeMode="cover" style={{ width: '100%', aspectRatio: 16 / 9 }} />
        ) : (
          <View
            style={{
              width: '100%',
              aspectRatio: 16 / 9,
              backgroundColor: '#E5EDF9',
            }}
          />
        )}

        <View style={{ padding: 12, gap: 8 }}>
          <Text variant="titleSmall" style={{ fontWeight: '700', color: '#0D121B' }} numberOfLines={2}>
            {unit.title}
          </Text>
          {unit.address ? (
            <Text variant="bodySmall" style={{ color: '#64748B' }} numberOfLines={1}>
              {unit.address}
            </Text>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
            <View>
              <Text variant="bodySmall" style={{ color: '#496F9C' }}>Outstanding Balance:</Text>
              <Text variant="headlineSmall" style={{ fontWeight: '800', color: '#0D121B' }}>
                {formatCurrency(balance.amountCents, balance.currency)}
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={onViewDetails}
              style={{ height: 40, borderRadius: 12, backgroundColor: '#0E74F1' }}
              labelStyle={{ fontWeight: '700' }}
              contentStyle={{ paddingHorizontal: 16 }}
            >
              View Details
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
