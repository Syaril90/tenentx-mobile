import React from 'react';
import { Divider } from 'react-native-paper';
import RowChevron from '../components/RowChevron';
import SectionCard from '../components/SectionCard';

type Props = {
  onTerms: () => void;
  onPrivacy: () => void;
};

export default function LegalSection({ onTerms, onPrivacy }: Props) {
  return (
    <SectionCard>
      <RowChevron icon="gavel" iconColor="#007BFF" label="Terms of Service" onPress={onTerms} />
      <Divider />
      <RowChevron icon="shield-check" iconColor="#007BFF" label="Privacy Policy" onPress={onPrivacy} />
    </SectionCard>
  );
}
