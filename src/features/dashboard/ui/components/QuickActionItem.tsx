import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { ds } from '../../lib/tokens';

type Props = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
};

export default function QuickActionItem({ label, icon, onPress }: Props) {
  return (
    <View style={{ alignItems: 'center', gap: ds.space.sm }}>
      <TouchableRipple
        borderless
        onPress={onPress}
        style={{
          width: '100%',
          height: 120,
          borderRadius: ds.radius.lg,
          backgroundColor: ds.color.tile,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialCommunityIcons name={icon} size={34} color={ds.color.link} />
      </TouchableRipple>
      <Text variant="bodyMedium" style={{ color: ds.color.text }}>
        {label}
      </Text>
    </View>
  );
}
