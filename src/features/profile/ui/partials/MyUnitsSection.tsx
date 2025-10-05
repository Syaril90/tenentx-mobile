import React from 'react';
import SectionCard from '../components/SectionCard';
import UnitRow from '../components/UnitRow';

type Props = {
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export default function MyUnitsSection({ title, subtitle, onPress }: Props) {
  return (
    <SectionCard title="My Units">
      <UnitRow title={title} subtitle={subtitle} onPress={onPress} />
    </SectionCard>
  );
}
