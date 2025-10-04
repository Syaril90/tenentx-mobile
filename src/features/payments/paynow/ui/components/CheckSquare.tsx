import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

type Props = {
  checked: boolean;
  onToggle: () => void;
  size?: number;                // outer square size
  color?: string;               // active blue
  borderColor?: string;         // idle border
};

export default function CheckSquare({
  checked,
  onToggle,
  size = 20,
  color = '#0F49BD',
  borderColor = '#CFD7E7',
}: Props) {
  const iconSize = Math.max(12, Math.round(size * 0.7)); // tick size
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: checked ? color : borderColor,
        backgroundColor: checked ? color : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked ? (
        <MaterialCommunityIcons name="check-bold" size={iconSize - 4} color="#FFFFFF" />
      ) : (
        <View />
      )}
    </Pressable>
  );
}
