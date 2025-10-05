import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type Props = {
  name: string;
  role: string;
  avatarUrl?: string;
  onEdit: () => void;
};

export default function ProfileHeader({ name, role, avatarUrl, onEdit }: Props) {
  return (
    <View style={{ alignItems: 'center', gap: 12 }}>
      <View
        style={{
          width: 128, height: 128, borderRadius: 64, overflow: 'hidden', backgroundColor: '#eee',
        }}
      >
        <ImageBackground
          source={{ uri: avatarUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#333', fontSize: 22, fontWeight: '700' }}>{name}</Text>
        <Text style={{ color: '#666', fontSize: 16, marginTop: 2 }}>{role}</Text>

        <Button
          mode="text"
          onPress={onEdit}
          textColor="#007BFF"
          icon="pencil-outline"
          style={{ marginTop: 6 }}
          labelStyle={{ fontWeight: '600' }}
          compact
        >
          Edit Profile
        </Button>
      </View>
    </View>
  );
}
