import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Card, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../../shared/store/appStore';
import { Complaint } from '../types';
import ChatBubble, { SystemChip } from '../ui/components/ChatBubble';
import MessageBar from '../ui/components/MessageBar';
import RatingCard from '../ui/components/RatingCard';
import Timeline, { TimelineItem } from '../ui/components/Timeline';

type ChatItem =
  | { kind: 'outgoing'; text: string; time: string }
  | { kind: 'incoming'; text: string; time: string }
  | { kind: 'system'; text: string };

export default function ComplaintDetailsScreen(){
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id ?? '';

  // read from store (already loaded by list screen)
  const complaints = useAppStore((s) => s.complaints);
  const complaint = useMemo(
    () => complaints.find((c : Complaint) => c.id === id),
    [complaints, id]
  );

  const titleText = `Complaint #${id || '—'}`;
  const subtitle = complaint?.description ?? '';
  const statusLabel = (() => {
    switch (complaint?.status) {
      case 'resolved':
        return 'Resolved';
      case 'in_progress':
        return 'In-Progress';
      case 'on_hold':
        return 'On Hold';
      case 'new':
        return 'New';
      default:
        return '';
    }
  })();

  // timeline (must use { label, icon, at } to satisfy TimelineItem)
  const timeline: TimelineItem[] = useMemo(() => {
    const submitted =
      complaint?.createdAtISO
        ? new Date(complaint.createdAtISO).toLocaleString()
        : '—';
    return [
      { icon: 'file-upload-outline', label: 'Complaint Submitted', at: submitted },
      { icon: 'account-hard-hat-outline', label: 'Assigned to Maintenance', at: '2023-10-26 02:30 PM' },
      { icon: 'progress-clock', label: 'Progress Update — Leak repaired', at: '2023-10-27 09:00 AM' },
      { icon: 'check-circle-outline', label: 'Resolved', at: '2023-10-27 04:00 PM' },
      { icon: 'close-circle-outline', label: 'Closed', at: '2023-10-28 11:00 AM' },
    ];
  }, [complaint?.createdAtISO]);

  // chat (kept as-is)
  const chat: ChatItem[] = [
    {
      kind: 'outgoing',
      text:
        "Hello, I'm having an issue with a leaky pipe in my kitchen sink. It's been dripping constantly since this morning.",
      time: '10:00 AM',
    },
    {
      kind: 'incoming',
      text:
        "Hi there. We've received your complaint. Our maintenance team will be assigned shortly.",
      time: '02:30 PM',
    },
    { kind: 'system', text: 'Complaint marked as resolved by Admin' },
    {
      kind: 'incoming',
      text:
        'Hi, just an update. The leaky pipe has been repaired by our team. Please let us know if you have any other issues.',
      time: 'Yesterday, 04:00 PM',
    },
  ];

  // local message state
  const [message, setMessage] = useState<string>('');

  return (
   <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        style={{
          backgroundColor: '#f0f4f8', // ← match page bg
          elevation: 0,               // Android
          shadowOpacity: 0,           // iOS
          borderBottomWidth: 0,       // extra safety
        }}
      >
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="Complaint Details" />
        <View style={{ width: 48 }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Summary card */}
        <View style={{ padding: 16 }}>
          <Card mode="elevated" style={{ borderRadius: 16, backgroundColor: '#F3F5FB' }}>
            <Card.Content>
              <Text style={{ color: '#102a43', fontSize: 22, fontWeight: '800' }}>
                {titleText}
              </Text>
              {!!subtitle && (
                <Text style={{ color: '#486581', marginTop: 6 }}>{subtitle}</Text>
              )}
              {!!statusLabel && (
                <Text style={{ color: '#0369a1', fontWeight: '800', marginTop: 10 }}>
                  {`Current Status: ${statusLabel}`}
                </Text>
              )}
            </Card.Content>
          </Card>
        </View>

        {/* Timeline */}
        <Text
          style={{
            color: '#102a43',
            fontSize: 22,
            fontWeight: '800',
            paddingHorizontal: 16,
            paddingTop: 6,
          }}
        >
          Complaint Timeline
        </Text>
        <Timeline items={timeline} />

        <View style={{ paddingHorizontal: 16 }}>
          <Divider style={{ marginVertical: 16, backgroundColor: '#dbeafe' }} />
        </View>

        {/* Chat */}
        <Text
          style={{
            color: '#102a43',
            fontSize: 22,
            fontWeight: '800',
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          Chat with Management
        </Text>

        <View style={{ paddingHorizontal: 16, gap: 12 }}>
          {chat.map((c, idx) =>
            c.kind === 'system' ? (
              <SystemChip key={`sys-${idx}`} text={c.text} />
            ) : (
              <ChatBubble
                key={`msg-${idx}`}
                side={c.kind === 'outgoing' ? 'right' : 'left'}
                text={c.text}
                time={c.time}
              />
            )
          )}
        </View>

        {/* Rating */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <RatingCard
            onSubmit={(stars, note) => {
              // TODO: send rating to API
              console.log('rate', stars, note);
            }}
          />
        </View>
      </ScrollView>

      {/* Message composer (sticky) */}
      <MessageBar
        value={message}
        onChange={setMessage}
        onAddMedia={() => {
          /* hook image picker if needed */
        }}
        onSend={() => {
          if (!message.trim()) return;
          // TODO: post message
          setMessage('');
        }}
      />
    </SafeAreaView>
  );
}
