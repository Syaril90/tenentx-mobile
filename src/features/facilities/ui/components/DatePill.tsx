import React from 'react';
import { Chip } from 'react-native-paper';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function DatePill({ label, selected, onPress }: Props) {
  return (
    <Chip
      selected={selected}
      onPress={onPress}
      style={{ backgroundColor: selected ? '#DBEAFE' : '#EEF2F7' }}
    >
      {label}
    </Chip>
  );
}
