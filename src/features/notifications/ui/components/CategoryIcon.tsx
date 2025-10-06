import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

type Props = { category: 'announcements' | 'payments' | 'complaints' | 'visitors'; size?: number };

const bg = '#E6F2FF';
const blue = '#007BFF';
const grayBg = '#e7edf4';
const grayIcon = '#0d141c';

export default function CategoryIcon({ category, size = 24 }: Props) {
  const wrapBg = category === 'announcements' || category === 'payments' ? bg : grayBg;
  const iconColor = category === 'announcements' || category === 'payments' ? blue : grayIcon;
  const name =
    category === 'announcements' ? 'bullhorn' :
    category === 'payments' ? 'credit-card' :
    category === 'complaints' ? 'alert-circle' :
    'account-check'; // visitors

  return (
    <View
      style={{
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: wrapBg,
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <MaterialCommunityIcons name={name as any} size={size} color={iconColor} />
    </View>
  );
}
