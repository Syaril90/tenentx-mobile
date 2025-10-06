import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type FacilityKey = 'gym' | 'swimming_pool' | 'function_room' | 'bbq_pit' | 'clubhouse';

const FACILITIES: { key: FacilityKey; label: string }[] = [
  { key: 'gym',            label: 'Gym' },
  { key: 'swimming_pool',  label: 'Swimming Pool' },
  { key: 'function_room',  label: 'Function Room' },
  { key: 'bbq_pit',        label: 'BBQ Pit' },
  { key: 'clubhouse',      label: 'Clubhouse' },
];

const DURATIONS = [
  { key: '30_mins',  label: '30 minutes' },
  { key: '1_hour',   label: '1 hour' },
  { key: '1_5_hours',label: '1.5 hours' },
  { key: '2_hours',  label: '2 hours' },
] as const;

const TIME_SLOTS = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
] as const;

export default function BookFacilityScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ facilityId?: string; facilityName?: string }>();

  // Facility select
  const initialFacility = useMemo<FacilityKey>(() => {
    const fromParam = FACILITIES.find(f => f.key === params.facilityId)?.key;
    return (fromParam ?? 'gym');
  }, [params.facilityId]);

  const [facility, setFacility] = useState<FacilityKey>(initialFacility);
  const [facilityPickerOpen, setFacilityPickerOpen] = useState(false);

  // Month grid (simple mock like the HTML)
  const [activeMonthLabel] = useState<string>('August 2024');
  const [selectedDay, setSelectedDay] = useState<number>(5); // default selected like the mock

  // Time slots
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 - 11:00');

  // Duration
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]['key']>('1_hour');
  const [durationOpen, setDurationOpen] = useState(false);

  // Rules accordion
  const [rulesOpen, setRulesOpen] = useState(false);

  const facilityLabel =
    params.facilityName ??
    FACILITIES.find(f => f.key === facility)?.label ??
    'Gym';

  // Helpers to build confirmation params
  const durationLabel =
    DURATIONS.find(d => d.key === duration)?.label ?? '1 hour';

  const dateISO = useMemo(() => {
    // activeMonthLabel example: "August 2024"
    const [monthName, yearStr] = activeMonthLabel.split(' ');
    const year = Number(yearStr) || 2024;
    const monthIndex = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December',
    ].indexOf(monthName);
    const month = (monthIndex >= 0 ? monthIndex : 7) + 1; // Aug default
    const mm = String(month).padStart(2, '0');
    const dd = String(selectedDay).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }, [activeMonthLabel, selectedDay]);

  const handleProceed = () => {
    // Fake fee + booking id (replace with real calculation/response later)
    const fee = '$10.00';
    const bookingId = `BOOK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    router.push({
      pathname: '/facilities/confirm',
      params: {
        facilityName: facilityLabel,
        dateISO,
        slot: selectedSlot,
        durationLabel,
        fee,
        bookingId,
      },
    });
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f8f9fc' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#f8f9fc' }} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="Book a Facility" />
        <View style={{ width: 40 }} />
      </Appbar.Header>

      {/* Stepper (1 Facility ✓, 2 Date & Time active, 3 Review) */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          {/* Step 1 */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 40, height: 40, borderRadius: 20,
                backgroundColor: '#2D8EFF', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>
            </View>
            <Text style={{ color: '#2D8EFF', fontSize: 12, fontWeight: '600' }}>Facility</Text>
          </View>

          <View style={{ flex: 1, height: 2, backgroundColor: '#2D8EFF' }} />

          {/* Step 2 */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 40, height: 40, borderRadius: 20,
                backgroundColor: '#2D8EFF', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>2</Text>
            </View>
            <Text style={{ color: '#2D8EFF', fontSize: 12, fontWeight: '600' }}>Date & Time</Text>
          </View>

          <View style={{ flex: 1, height: 2, backgroundColor: '#cfd7e7' }} />

          {/* Step 3 */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 40, height: 40, borderRadius: 20,
                backgroundColor: '#cfd7e7', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
              }}
            >
              <Text style={{ color: '#4c669a', fontWeight: 'bold' }}>3</Text>
            </View>
            <Text style={{ color: '#4c669a', fontSize: 12, fontWeight: '600' }}>Review</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}>
        {/* Select Facility */}
        <View style={{ marginTop: 8 }}>
          <Text style={{ color: '#0d121b', fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
            Select Facility
          </Text>

          <Pressable onPress={() => setFacilityPickerOpen(true)}>
            <View
              style={{
                height: 56,
                borderRadius: 12,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#cfd7e7',
                paddingHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 1 },
              }}
            >
              <Text style={{ color: '#0d121b', fontSize: 16 }}>{facilityLabel}</Text>
              <Text style={{ color: '#4c669a' }}>▾</Text>
            </View>
          </Pressable>
        </View>

        {/* Select Date */}
        <View style={{ marginTop: 18 }}>
          <Text style={{ color: '#0d121b', fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
            Select Date
          </Text>

          <Card mode="elevated" style={{ borderRadius: 12 }}>
            <Card.Content style={{ padding: 0 }}>
              <View style={{ paddingHorizontal: 8, paddingTop: 8, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconButton icon="chevron-left" onPress={() => { /* month prev */ }} />
                <Text style={{ color: '#0d121b', fontSize: 16, fontWeight: '700' }}>{activeMonthLabel}</Text>
                <IconButton icon="chevron-right" onPress={() => { /* month next */ }} />
              </View>

              <Divider />

              {/* Weekday header */}
              <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                {['S','M','T','W','T','F','S'].map((wd) => (
                  <View key={wd} style={{ height: 48, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#0d121b', fontSize: 13, fontWeight: '700' }}>{wd}</Text>
                  </View>
                ))}
              </View>

              {/* Simple grid like the HTML (col-start-4 for the 1st) */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8, paddingBottom: 8 }}>
                {/* blanks for offset (Sun=1..Sat=7) -> col-start-4 means we need 3 blanks */}
                {[0,1,2].map((i) => (
                  <View key={`blank-${i}`} style={{ width: `${100/7}%`, height: 48, alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
                    <Text style={{ color: '#4c669a' }}> </Text>
                  </View>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
                  const isDisabled = d <= 4; // mimic the HTML disabled 1..4
                  const isSelected = d === selectedDay;
                  return (
                    <Pressable
                      key={d}
                      onPress={() => !isDisabled && setSelectedDay(d)}
                      disabled={isDisabled}
                      style={{ width: `${100/7}%`, height: 48, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <View
                        style={{
                          width: 40, height: 40, borderRadius: 20,
                          alignItems: 'center', justifyContent: 'center',
                          backgroundColor: isSelected ? '#2D8EFF' : 'transparent',
                        }}
                      >
                        <Text style={{
                          color: isDisabled ? '#94a3b8' : (isSelected ? '#fff' : '#0d121b'),
                          fontWeight: '600',
                        }}>
                          {d}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Available Time Slots */}
        <View style={{ marginTop: 18 }}>
          <Text style={{ color: '#0d121b', fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
            Available Time Slots
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, padding: 4 }}>
            {TIME_SLOTS.map((slot) => {
              const active = slot === selectedSlot;
              return (
                <Pressable
                  key={slot}
                  onPress={() => setSelectedSlot(slot)}
                  style={{
                    height: 40,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: active ? '#2D8EFF' : '#e5e7eb',
                    backgroundColor: active ? '#2D8EFF' : 'white',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOpacity: active ? 0.15 : 0.05,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 1 },
                  }}
                >
                  <Text style={{ color: active ? '#fff' : '#0d121b', fontSize: 14, fontWeight: '600' }}>
                    {slot}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Duration */}
        <View style={{ marginTop: 18 }}>
          <Text style={{ color: '#0d121b', fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
            Booking Duration
          </Text>
          <Pressable onPress={() => setDurationOpen(true)}>
            <View
              style={{
                height: 56,
                borderRadius: 12,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#cfd7e7',
                paddingHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 1 },
              }}
            >
              <Text style={{ color: '#0d121b', fontSize: 16 }}>
                {DURATIONS.find(d => d.key === duration)?.label ?? '1 hour'}
              </Text>
              <Text style={{ color: '#4c669a' }}>▾</Text>
            </View>
          </Pressable>
        </View>

        {/* Rules & Fees */}
        <View style={{ marginTop: 18 }}>
          <Card mode="elevated" style={{ borderRadius: 12 }}>
            <List.Accordion
              title="Rules & Fees"
              expanded={rulesOpen}
              onPress={() => setRulesOpen((v) => !v)}
              titleStyle={{ fontWeight: '700', color: '#0d121b' }}
              style={{ borderRadius: 12 }}
            >
              <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
                <Text style={{ color: '#475569', fontSize: 14 }}>• Maximum 2 hours per booking.</Text>
                <Text style={{ color: '#475569', fontSize: 14, marginTop: 4 }}>• Cancellation must be 24 hours prior.</Text>
                <Text style={{ color: '#475569', fontSize: 14, marginTop: 4 }}>• Non-refundable booking fee applies.</Text>
              </View>
            </List.Accordion>
            <Divider />
            <View style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#0d121b', fontSize: 16, fontWeight: '700' }}>Estimated Fee:</Text>
              <Text style={{ color: '#0d121b', fontSize: 16, fontWeight: '700' }}>$10.00</Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Sticky footer button */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, backgroundColor: '#f8f9fc' }}>
        <Button
          mode="contained"
          onPress={handleProceed}
          style={{ height: 56, borderRadius: 12 }}
          contentStyle={{ height: 56 }}
          labelStyle={{ fontSize: 16, fontWeight: '700' }}
        >
          Proceed to Booking
        </Button>
      </View>

      {/* Facility picker modal */}
      <Modal visible={facilityPickerOpen} transparent animationType="fade" onRequestClose={() => setFacilityPickerOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} onPress={() => setFacilityPickerOpen(false)}>
          <View style={{ marginTop: 'auto', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 24 }}>
            <View style={{ alignItems: 'center', paddingVertical: 8 }}>
              <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#cfd7e7' }} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#0d121b', paddingHorizontal: 16, marginBottom: 8 }}>
              Select Facility
            </Text>
            <FlatList
              data={FACILITIES}
              keyExtractor={(it) => it.key}
              renderItem={({ item }) => (
                <List.Item
                  title={item.label}
                  onPress={() => {
                    setFacility(item.key);
                    setFacilityPickerOpen(false);
                  }}
                  right={(props) => (item.key === facility ? <List.Icon {...props} icon="check" /> : null)}
                />
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Duration picker modal */}
      <Modal visible={durationOpen} transparent animationType="fade" onRequestClose={() => setDurationOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} onPress={() => setDurationOpen(false)}>
          <View style={{ marginTop: 'auto', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 24 }}>
            <View style={{ alignItems: 'center', paddingVertical: 8 }}>
              <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#cfd7e7' }} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#0d121b', paddingHorizontal: 16, marginBottom: 8 }}>
              Booking Duration
            </Text>
            <FlatList
              data={DURATIONS as unknown as { key: string; label: string }[]}
              keyExtractor={(it) => it.key}
              renderItem={({ item }) => (
                <List.Item
                  title={item.label}
                  onPress={() => {
                    setDuration(item.key as typeof DURATIONS[number]['key']);
                    setDurationOpen(false);
                  }}
                  right={(props) =>
                    item.key === duration ? <List.Icon {...props} icon="check" /> : null
                  }
                />
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
