import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, Divider, Modal, Portal, Text } from 'react-native-paper';
import type { Facility, FacilitySlot } from '../../../facilities/types';
import DatePill from './DatePill';
import SlotPill from './SlotPill';

type Props = {
  visible: boolean;
  facility?: Facility;

  dateISO: string;
  slots: FacilitySlot[];
  slotsLoading: boolean;

  onDismiss(): void;
  onPickDate(dateISO: string): void;

  pickedSlotId?: string;
  onPickSlot(id: string): void;
  onConfirm(): void;
};

export default function FacilitySheet({
  visible,
  facility,
  dateISO,
  slots,
  slotsLoading,
  onDismiss,
  onPickDate,
  pickedSlotId,
  onPickSlot,
  onConfirm,
}: Props) {
  if (!facility) return null;

  const days = [-1, 0, 1, 2, 3].map((offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return {
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    };
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 16,
          maxHeight: '90%',
        }}
        style={{ margin: 0, justifyContent: 'flex-end' }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: 999,
                backgroundColor: '#CFD7E7',
              }}
            />
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <Text variant="titleLarge" style={{ fontWeight: '700', color: '#333' }}>
              {facility.name}
            </Text>

            <Image
              source={{ uri: facility.imageUrl }}
              style={{ width: '100%', height: 180, borderRadius: 12, marginTop: 12 }}
            />

            {facility.rules?.length ? (
              <View style={{ marginTop: 14 }}>
                <Text style={{ fontWeight: '600', color: '#1f2937' }}>
                  Booking Rules
                </Text>
                {facility.rules.map((r, i) => (
                  <Text key={i} style={{ color: '#6b7280', marginTop: 4 }}>
                    • {r}
                  </Text>
                ))}
              </View>
            ) : null}

            <View
              style={{
                marginTop: 14,
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: '#1f2937' }}>Capacity</Text>
                <Text style={{ color: '#6b7280', marginTop: 2 }}>
                  {facility.capacityLabel ?? '—'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: '#1f2937' }}>Fees</Text>
                <Text style={{ color: '#6b7280', marginTop: 2 }}>
                  {facility.feeLabel ?? '—'}
                </Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 14 }} />

            <Text style={{ fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
              Select Date
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingBottom: 2 }}
            >
              {days.map(({ iso, label }) => (
                <DatePill
                  key={iso}
                  label={label}
                  selected={iso === dateISO}
                  onPress={() => onPickDate(iso)}
                />
              ))}
            </ScrollView>

            <Text
              style={{
                fontWeight: '600',
                color: '#1f2937',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              Select Time
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                paddingBottom: 4,
              }}
            >
              {slotsLoading ? (
                <Text style={{ color: '#6b7280' }}>Loading slots…</Text>
              ) : (
                slots.map((s) => (
                  <SlotPill
                    key={s.id}
                    slot={s}
                    selected={pickedSlotId === s.id}
                    onPress={onPickSlot}
                  />
                ))
              )}
            </View>

            <Button
              mode="contained"
              style={{ marginTop: 16, borderRadius: 12 }}
              disabled={!pickedSlotId}
              onPress={onConfirm}
            >
              Proceed to Book
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
