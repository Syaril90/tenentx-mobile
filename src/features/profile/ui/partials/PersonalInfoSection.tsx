import React from 'react';
import { Divider } from 'react-native-paper';
import RowChevron from '../components/RowChevron';
import SectionCard from '../components/SectionCard';

type Props = {
  name: string;
  email: string;
  phone: string;
  onEditName: () => void;
  onEditEmail: () => void;
  onEditPhone: () => void;
  onEditPassword: () => void;
};

export default function PersonalInfoSection({
  name, email, phone, onEditName, onEditEmail, onEditPhone, onEditPassword,
}: Props) {
  return (
    <SectionCard title="Personal Information">
      <RowChevron label="Name" value={name} onPress={onEditName} />
      <Divider />
      <RowChevron label="Email" value={email} onPress={onEditEmail} />
      <Divider />
      <RowChevron label="Phone Number" value={phone} onPress={onEditPhone} />
      <Divider />
      <RowChevron label="Password" value="••••••••" onPress={onEditPassword} />
    </SectionCard>
  );
}
