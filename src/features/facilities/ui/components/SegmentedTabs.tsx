import React from 'react';
import { Pressable, Text, View } from 'react-native';

type Value = 'browse' | 'mine';

type Props = {
  value: Value;
  onChange: (v: Value) => void;
  leftLabel?: string;
  rightLabel?: string;
};

export default function SegmentedTabs({
  value,
  onChange,
  leftLabel = 'Browse Facilities',
  rightLabel = 'My Bookings',
}: Props) {
  const active = (v: Value) => value === v;

  return (
    <View
      style={{
        height: 44,
        borderRadius: 14,
        padding: 6,
        backgroundColor: '#E7EBF3',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => onChange('browse')}
        style={{
          flex: 1,
          height: '100%',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active('browse') ? '#F8F9FC' : 'transparent',
          // subtle “popped” feel for the active pill
          shadowColor: active('browse') ? '#000' : 'transparent',
          shadowOpacity: active('browse') ? 0.08 : 0,
          shadowRadius: active('browse') ? 6 : 0,
          shadowOffset: { width: 0, height: 2 },
          elevation: active('browse') ? 2 : 0,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: active('browse') ? '#0D121B' : '#4C669A',
          }}
        >
          {leftLabel}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange('mine')}
        style={{
          flex: 1,
          height: '100%',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active('mine') ? '#F8F9FC' : 'transparent',
          shadowColor: active('mine') ? '#000' : 'transparent',
          shadowOpacity: active('mine') ? 0.08 : 0,
          shadowRadius: active('mine') ? 6 : 0,
          shadowOffset: { width: 0, height: 2 },
          elevation: active('mine') ? 2 : 0,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: active('mine') ? '#0D121B' : '#4C669A',
          }}
        >
          {rightLabel}
        </Text>
      </Pressable>
    </View>
  );
}
