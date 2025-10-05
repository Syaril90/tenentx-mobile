import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

type Props = {
  onSubmit: (stars: number, note: string) => void;
};

export default function RatingCard({ onSubmit }: Props) {
  const [stars, setStars] = useState(4);
  const [note, setNote] = useState('');

  return (
    <Card mode="elevated" style={{ borderRadius: 16 }}>
      <Card.Content>
        <Text style={{ color: '#102a43', fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 8 }}>
          Rate your resolution
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const filled = i < stars;
            return (
              <IconButton
                key={i}
                icon={filled ? 'star' : 'star-outline'}
                iconColor={filled ? '#F59E0B' : '#D1D5DB'}
                onPress={() => setStars(i + 1)}
                size={28}
              />
            );
          })}
        </View>
        <TextInput
          placeholder="Add a comment..."
          value={note}
          onChangeText={setNote}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={{ marginTop: 4 }}
        />
        <Button mode="contained" style={{ marginTop: 12 }} onPress={() => onSubmit(stars, note)}>
          Submit Rating
        </Button>
      </Card.Content>
    </Card>
  );
}
