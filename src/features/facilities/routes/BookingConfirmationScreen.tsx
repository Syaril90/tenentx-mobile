import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import { Appbar, Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Params = {
  facilityName?: string;     // e.g., "Gymnasium - Main Hall"
  dateISO?: string;          // e.g., "2024-10-26"
  slot?: string;             // e.g., "09:00 AM - 10:30 AM"
  durationLabel?: string;    // e.g., "1.5 Hours"
  fee?: string;              // e.g., "$15.00"
  bookingId?: string;        // e.g., "BOOK-XYZ123456"
  qrUrl?: string;            // optional custom QR url
};

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();

  // Fallbacks for a pleasant out-of-the-box preview (match your HTML mock)
  const facilityName = params.facilityName ?? 'Gymnasium - Main Hall';
  const dateISO = params.dateISO ?? '2024-10-26';
  const slot = params.slot ?? '09:00 AM - 10:30 AM';
  const durationLabel = params.durationLabel ?? '1.5 Hours';
  const fee = params.fee ?? '$15.00';
  const bookingId = params.bookingId ?? 'BOOK-XYZ123456';
  const qrUrl =
    params.qrUrl ??
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBLYo0P3nsZhPSumb3LA-lin6GloZ1ObdfxxiDCnIUjk44vvlcSylTH2Q_TR9ZQunEmy29jPmO1OMUQva_ObaBLsjatuNC4E2NZ4TWe5Lp7ICjEZ6FoKkCnjHpZtla6qe8B2BnB0vDoHaujhjJE9tX_YvTqBqu4j5VroPMt9a7KVEW3SUqtmkIvudXFZF9su6fokz_Q3nhunpz-wNNYXIiHAj6Brqgg_YcepA7DC3WWRRKUffiJ186LPpfdxXX2pNy69Wc8uNLrmeUj';

  const dateLabel = useMemo(() => {
    const d = new Date(dateISO);
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }, [dateISO]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8f9fc' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f8f9fc' }} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="Booking Details" />
        <View style={{ width: 48 }} />
      </Appbar.Header>

      {/* Success header */}
      <View style={{ alignItems: 'center', paddingHorizontal: 16, paddingTop: 12 }}>
        <View
          style={{
            backgroundColor: '#DCFCE7',
            borderRadius: 999,
            padding: 10,
            marginBottom: 8,
          }}
        >
          {/* MaterialCommunityIcons check-circle if desired; using Text to keep deps minimal */}
          <Text style={{ color: '#16A34A', fontSize: 32 }}>✓</Text>
        </View>
        <Text
          style={{
            color: '#0d121b',
            fontSize: 28,
            fontWeight: '800',
            textAlign: 'center',
            paddingHorizontal: 12,
            paddingTop: 6,
            paddingBottom: 8,
            letterSpacing: 0.2,
          }}
        >
          Your booking has been successfully confirmed!
        </Text>
      </View>

      {/* Details card */}
      <View style={{ paddingHorizontal: 16 }}>
        <Card mode="elevated" style={{ borderRadius: 16 }}>
          <Card.Content style={{ paddingVertical: 20 }}>
            <Text style={{ color: '#0d121b', fontSize: 20, fontWeight: '800' }}>
              {facilityName}
            </Text>

            <View style={{ marginTop: 12, gap: 4 }}>
              <Text style={{ color: '#6b7280', fontSize: 16 }}>{dateLabel}</Text>
              <Text style={{ color: '#6b7280', fontSize: 16 }}>
                {slot} ({durationLabel})
              </Text>
              <Text style={{ color: '#6b7280', fontSize: 16 }}>Fees: {fee}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* QR code */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={{ uri: qrUrl }}
          style={{ width: 192, height: 192, borderRadius: 12 }}
          resizeMode="cover"
        />
      </View>

      {/* Booking ID + note */}
      <View style={{ paddingHorizontal: 16, alignItems: 'center' }}>
        <Text style={{ color: '#0d121b', fontSize: 16 }}>{`Booking ID: ${bookingId}`}</Text>
        <Text style={{ color: '#6b7280', fontSize: 16, textAlign: 'center', marginTop: 4 }}>
          Scan this code at the facility entrance for check-in.
        </Text>
      </View>

      {/* Actions */}
      <View style={{ padding: 16, gap: 12 }}>
        <Button
          mode="contained"
          icon="calendar"
          onPress={() => {
            // TODO: Add to calendar
          }}
          style={{ borderRadius: 12, height: 52 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontSize: 16, fontWeight: '700' }}
        >
          Add to Calendar
        </Button>

        <Button
          mode="outlined"
          icon="share-variant"
          onPress={() => {
            // TODO: Share details
          }}
          style={{ borderRadius: 12, height: 52, borderColor: '#D1D5DB' }}
          contentStyle={{ height: 52 }}
          textColor="#0d121b"
          labelStyle={{ fontSize: 16, fontWeight: '700' }}
        >
          Share Details
        </Button>

        <Button
          mode="outlined"
          icon="cancel"
          onPress={() => {
            // TODO: Cancel booking
          }}
          style={{
            borderRadius: 12,
            height: 52,
            borderColor: '#FCA5A5',
          }}
          contentStyle={{ height: 52 }}
          textColor="#DC2626"
          labelStyle={{ fontSize: 16, fontWeight: '700' }}
        >
          Cancel Booking
        </Button>
      </View>
    </SafeAreaView>
  );
}
