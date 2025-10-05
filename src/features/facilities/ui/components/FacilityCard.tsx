import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import type { Facility } from '../../../facilities/types';

type Props = {
  item: Facility;
  onPress: (facility: Facility) => void;
};

export default function FacilityCard({ item, onPress }: Props) {
  return (
    <Card style={{ borderRadius: 16, overflow: 'hidden' }}>
      <Pressable onPress={() => onPress(item)}>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: '100%', aspectRatio: 4 / 3 }}
        />
        <View style={{ padding: 10 }}>
          <Text style={{ color: '#0d121b', fontWeight: '600' }}>
            {item.name}
          </Text>
          <Text style={{ color: '#0e74f1', marginTop: 2 }}>Book Now</Text>
        </View>
      </Pressable>
    </Card>
  );
}
