import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ChatBubble({
  side,
  text,
  time,
}: {
  side: 'left' | 'right';
  text: string;
  time?: string;
}) {
  const isRight = side === 'right';
  return (
    <View style={{ flexDirection: 'row', justifyContent: isRight ? 'flex-end' : 'flex-start' }}>
      <View
        style={{
          backgroundColor: isRight ? '#2563eb' : '#fff',
          borderRadius: 16,
          borderBottomRightRadius: isRight ? 4 : 16,
          borderBottomLeftRadius: isRight ? 16 : 4,
          maxWidth: '78%',
          padding: 12,
          shadowColor: isRight ? undefined : '#000',
          shadowOpacity: isRight ? 0 : 0.05,
          shadowRadius: isRight ? 0 : 6,
          shadowOffset: { width: 0, height: 3 },
          elevation: isRight ? 0 : 1,
        }}
      >
        <Text style={{ color: isRight ? '#fff' : '#102a43', fontSize: 14 }}>{text}</Text>
        {time ? (
          <Text style={{ color: isRight ? '#bfdbfe' : '#486581', fontSize: 11, marginTop: 4, textAlign: isRight ? 'right' : 'left' }}>
            {time}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export function SystemChip({ text }: { text: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          backgroundColor: '#e0f2fe',
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
        }}
      >
        <Text style={{ color: '#0ea5e9', fontSize: 12, fontWeight: '700' }}>{text}</Text>
      </View>
    </View>
  );
}
