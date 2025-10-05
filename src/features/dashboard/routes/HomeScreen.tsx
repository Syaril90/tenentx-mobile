import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatMoney } from '../../../shared/lib/format';
import { useAppStore } from '../../../shared/store/appStore';
import { ds } from '../lib/tokens';
import StatusSnippet from '../ui/components/StatusSnippet';
import TopAppBar from '../ui/components/TopAppBar';
import UnitSummaryCard, { Money, UnitCardUnit } from '../ui/components/UnitSummaryCard';
import AnnouncementsCarousel from '../ui/partials/AnnouncementsCarousel';
import QuickActionsGrid from '../ui/partials/QuickActionsGrid';

export default function HomeScreen() {
  const router = useRouter();

  const me = useAppStore((s) => s.me);
  const unit = useAppStore((s) => s.unit);
  const balance = useAppStore((s) => s.balance);
  const announcements = useAppStore((s) => s.announcements);
  const tickets = useAppStore((s) => s.tickets);
  const nextDue = useAppStore((s) => s.nextDue);

  const loading = useAppStore((s) => s.dashboardLoading);
  const loadDashboard = useAppStore((s) => s.loadDashboard);

  useEffect(() => { void loadDashboard(); }, [loadDashboard]);

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;

  // --- adapt unit to UI type (same logic as before)
  type UnitCandidates = Partial<{
    id: string; displayName: string; name: string; label: string; unit: string; unitNo: string; number: string;
    block: string; tower: string; building: string; address: string; street: string; city: string;
    imageUrl: string; photoUrl: string; picture: string;
  }>;
  const u = (unit as UnitCandidates | undefined) ?? {};
  const titleParts: string[] = [];
  const idLike = u.displayName ?? u.name ?? u.label ?? u.unit ?? u.unitNo ?? u.number ?? u.id;
  if (idLike) titleParts.push(idLike);
  const towerLike = u.block ?? u.tower ?? u.building;
  if (towerLike) titleParts.push(towerLike);
  const streetLike = u.address ?? u.street;
  if (streetLike) titleParts.push(streetLike);
  if (u.city) titleParts.push(u.city);

  const uiUnit: UnitCardUnit = {
    title: titleParts.length ? titleParts.join(', ') : 'Your Unit',
    address: streetLike ?? u.building ?? undefined,
    imageUrl: u.imageUrl ?? u.photoUrl ?? u.picture ?? undefined,
  };

  type BalanceCandidates = Partial<{ amountCents: number; minor: number; amountMinor: number; cents: number; valueCents: number; currency: string }>;
  const b = (balance as BalanceCandidates | undefined) ?? {};
  const uiBalance: Money = {
    amountCents: b.amountCents ?? b.minor ?? b.amountMinor ?? b.cents ?? b.valueCents ?? 0,
    currency: ((): Money['currency'] => (b.currency === 'MYR' || b.currency === 'PHP' || b.currency === 'USD' ? b.currency : 'USD'))(),
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: ds.color.bg }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: ds.space.lg,
          paddingTop: ds.space.sm,
          paddingBottom: ds.space['2xl'],
          backgroundColor: ds.color.bg,
          rowGap: ds.space.lg,
        }}
        style={{ backgroundColor: ds.color.bg }}
      >
        <TopAppBar name={me?.name ?? 'User'} avatarUrl={me?.avatarUrl} />

        <UnitSummaryCard unit={uiUnit} balance={uiBalance} onViewDetails={() => {}} />

        <QuickActionsGrid
          items={[
            {
              key: 'facility',
              label: 'Facility Booking',
              icon: 'calendar-clock',
              onPress: () => router.push('/facilities'),
            },
            { key: 'visitor', label: 'Register Visitor', icon: 'account-plus-outline', onPress: () => {} },
            { key: 'complaint', label: 'New Complaint', icon: 'file-document-edit', onPress: () => {} },
            { key: 'history', label: 'Payment History', icon: 'history', onPress: () => {} },
          ]}
        />

        <AnnouncementsCarousel items={announcements} onViewAll={() => {}} />

        <View style={{ gap: ds.space.lg }}>
          <StatusSnippet
            caption="Open Tickets"
            value={(tickets?.openCount ?? 0).toString()}
            actionLabel="View Details"
            onAction={() => {}}
          />
          <StatusSnippet
            caption="Next Payment Due"
            value={`${formatMoney(nextDue?.nextDueAmountCents ?? 0)} ${nextDue?.nextDueLabel ?? ''}`}
            actionLabel="Pay Now"
            onAction={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
