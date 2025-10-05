import React, { useMemo, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Appbar, Button, Divider, List, Switch, Text } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../../../shared/store/appStore';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  // pull what we can from your app store (fallbacks are safe)
  const me = useAppStore((s) => s.me);
  const unit = useAppStore((s) => s.unit);

  const displayName = me?.name ?? 'John Doe';
  const role = (me as any)?.role ?? 'Owner';
  const avatarUrl =
    me?.avatarUrl ??
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDJj2y8NlJGlcMzrQcnfnO5zOTuKM-68TvamRZx8SR-4H-A0_YCswcicGQOh55Oq_V2qrWResEQ2Yh-Co2Hu_wjtLjf3UKKFolEk7gqsvteVkIEhdXVwAarfsW7QNPt98yGij1Pre4E0-ar2d7OCFUu14js49igGH7I1_5U1drjgwQMXbdiSivHrVPOF6VVTdUsXZkyRTYdbOLMx2tDkhNm9ePUZH0HM6YosJBiDC7z7jSzs2hCmTv5IUnh51QxHCchdwvllQO8rhdn';

  const email = (me as any)?.email ?? 'john.doe@example.com';
  const phone = (me as any)?.phone ?? '+1 234 567 890';

  const unitTitle = useMemo(() => {
    const u = unit as any;
    const titleParts: string[] = [];
    if (u?.tower || u?.block || u?.building) titleParts.push(u.tower ?? u.block ?? u.building);
    if (u?.unitNo || u?.unit || u?.number) titleParts.push(u.unitNo ?? u.unit ?? u.number);
    return titleParts.length ? titleParts.join(', ') : 'Tower A, Unit 1201';
  }, [unit]);

  // local toggles for now (no store mutation yet)
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      {/* Top bar */}
      <Appbar.Header mode="small" style={{ backgroundColor: '#fff', elevation: 1 }}>
        <Appbar.Action icon="arrow-left" onPress={() => { /* optional: router.back() */ }} />
        <Appbar.Content title="Profile & Settings" />
        <View style={{ width: 48 }} />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 24,
          backgroundColor: '#F8F8F8',
        }}
      >
        {/* Hero / identity block */}
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <View style={{ alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                overflow: 'hidden',
                backgroundColor: '#eee',
              }}
            >
              <ImageBackground
                source={{ uri: avatarUrl }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#333', fontSize: 22, fontWeight: '700' }}>{displayName}</Text>
              <Text style={{ color: '#666', fontSize: 16, marginTop: 2 }}>{role}</Text>

              <Button
                mode="text"
                onPress={() => {}}
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
        </View>

        {/* Sections */}
        <View style={{ padding: 16, gap: 24 }}>
          {/* Personal Information */}
          <CardSection title="Personal Information">
            <RowChevron label="Name" value={displayName} onPress={() => {}} />
            <Divider />
            <RowChevron label="Email" value={email} onPress={() => {}} />
            <Divider />
            <RowChevron label="Phone Number" value={phone} onPress={() => {}} />
            <Divider />
            <RowChevron label="Password" value="••••••••" onPress={() => {}} />
          </CardSection>

          {/* My Units */}
          <CardSection title="My Units">
            <List.Item
              title={unitTitle}
              description="Primary Unit"
              left={(props) => <List.Icon {...props} color="#007BFF" icon="office-building" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" color="#9CA3AF" />}
              onPress={() => {}}
              style={{ minHeight: 72 }}
              titleStyle={{ color: '#333', fontWeight: '600' }}
              descriptionStyle={{ color: '#666' }}
            />
          </CardSection>

          {/* Preferences */}
          <CardSection title="Preferences">
            <RowSwitch
              icon="bell-outline"
              iconColor="#007BFF"
              label="Push Notifications"
              value={pushEnabled}
              onChange={setPushEnabled}
            />
            <Divider />
            <RowSwitch
              icon="email-outline"
              iconColor="#007BFF"
              label="Email Notifications"
              value={emailEnabled}
              onChange={setEmailEnabled}
            />
            <Divider />
            <RowChevron
              icon="translate"
              iconColor="#007BFF"
              label="Language"
              value="English"
              onPress={() => {}}
            />
          </CardSection>

          {/* Help & Support */}
          <CardSection title="Help & Support">
            <RowChevron icon="help-circle-outline" iconColor="#007BFF" label="FAQ" onPress={() => {}} />
            <Divider />
            <RowChevron
              icon="headset"
              iconColor="#007BFF"
              label="Contact Management Office"
              onPress={() => {}}
            />
          </CardSection>

          {/* Legal */}
          <CardSection>
            <RowChevron icon="gavel" iconColor="#007BFF" label="Terms of Service" onPress={() => {}} />
            <Divider />
            <RowChevron icon="shield-check" iconColor="#007BFF" label="Privacy Policy" onPress={() => {}} />
          </CardSection>

          {/* Logout */}
          <Button
            mode="contained-tonal"
            icon="logout"
            onPress={() => {}}
            style={{
              borderRadius: 12,
              backgroundColor: '#E0F2F7',
            }}
            textColor="#007BFF"
            contentStyle={{ paddingVertical: 8 }}
            labelStyle={{ fontWeight: '700' }}
          >
            Log Out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ========== helpers / small atoms ========== */

function CardSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      {title ? (
        <Text
          style={{
            color: '#333',
            fontSize: 18,
            fontWeight: '700',
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View>{children}</View>
    </View>
  );
}

function RowChevron({
  label,
  value,
  onPress,
  icon,
  iconColor,
}: {
  label: string;
  value?: string;
  onPress: () => void;
  icon?: string;
  iconColor?: string;
}) {
  return (
    <List.Item
      title={label}
      description={value}
      onPress={onPress}
      left={
        icon
          ? (props) => <List.Icon {...props} color={iconColor ?? props.color} icon={icon} />
          : undefined
      }
      right={(props) => <List.Icon {...props} icon="chevron-right" color="#9CA3AF" />}
      style={{ minHeight: 72 }}
      titleStyle={{ color: '#666', fontSize: 14 }}
      descriptionStyle={{ color: '#333', fontSize: 16, fontWeight: '600' }}
    />
  );
}

function RowSwitch({
  label,
  value,
  onChange,
  icon,
  iconColor,
}: {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
  icon?: string;
  iconColor?: string;
}) {
  return (
    <List.Item
      title={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon ? <List.Icon color={iconColor} icon={icon} /> : null}
          <Text style={{ color: '#333', fontSize: 16, fontWeight: '600' }}>{label}</Text>
        </View>
      )}
      right={() => <Switch value={value} onValueChange={onChange} />}
      style={{ minHeight: 72, paddingRight: 12 }}
    />
  );
}
