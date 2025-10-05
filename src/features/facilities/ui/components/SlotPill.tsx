import React from 'react';
import { Pressable, Text } from 'react-native';
import type { FacilitySlot } from '../../types';

type Props = {
  slot: FacilitySlot;
  selected: boolean;
  onPress: (slotId: string) => void;
};

export default function SlotPill({ slot, selected, onPress }: Props) {
  const disabled = !!slot.disabled;
  const bg = disabled ? '#E5E7EB' : selected ? '#DBEAFE' : '#EEF2F7';
  const fg = disabled ? '#9CA3AF' : '#1F2937';

  return (
    <Pressable
      onPress={() => !disabled && onPress(slot.id)}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: bg,
        opacity: disabled ? 0.7 : 1,
      }}
      disabled={disabled}
    >
      <Text style={{ color: fg, fontSize: 13, fontWeight: '600' }}>
        {slot.label}
      </Text>
    </Pressable>
  );
}
