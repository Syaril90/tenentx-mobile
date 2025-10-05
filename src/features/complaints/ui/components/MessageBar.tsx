import React from 'react';
import { View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onAddMedia: () => void;
  onSend: () => void;
};

export default function MessageBar({ value, onChange, onAddMedia, onSend }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <IconButton icon="image-multiple-outline" onPress={onAddMedia} size={22} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Type a message..."
        mode="outlined"
        style={{ flex: 1 }}
        contentStyle={{ paddingVertical: 6 }}
      />
      <IconButton icon="send" onPress={onSend} mode="contained" />
    </View>
  );
}
