import React from 'react';
import { Divider } from 'react-native-paper';
import RowChevron from '../components/RowChevron';
import SectionCard from '../components/SectionCard';

type Props = {
  onFaq: () => void;
  onContact: () => void;
};

export default function HelpSupportSection({ onFaq, onContact }: Props) {
  return (
    <SectionCard title="Help & Support">
      <RowChevron icon="help-circle-outline" iconColor="#007BFF" label="FAQ" onPress={onFaq} />
      <Divider />
      <RowChevron icon="headset" iconColor="#007BFF" label="Contact Management Office" onPress={onContact} />
    </SectionCard>
  );
}
