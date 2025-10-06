import { useRouter } from 'expo-router';
import React from 'react';
import FacilityScreen from '../src/features/facilities/routes/FacilityScreen';

export default function FacilitiesPage() {
  const router = useRouter();
  return <FacilityScreen  />;
}
