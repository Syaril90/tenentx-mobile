import React, { useEffect, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../../../shared/store/appStore';
import LogoutButton from '../ui/components/LogoutButton';
import ProfileHeader from '../ui/components/ProfileHeader';
import HelpSupportSection from '../ui/partials/HelpSupportSection';
import LegalSection from '../ui/partials/LegalSection';
import MyUnitsSection from '../ui/partials/MyUnitsSection';
import PersonalInfoSection from '../ui/partials/PersonalInfoSection';
import PreferencesSection from '../ui/partials/PreferencesSection';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const me = useAppStore((s) => s.profileMe);
  const units = useAppStore((s) => s.profileUnits);
  const prefs = useAppStore((s) => s.profilePrefs);
  const loading = useAppStore((s) => s.profileLoading);

  const loadProfile = useAppStore((s) => s.loadProfile);
  const togglePush = useAppStore((s) => s.togglePushPref);
  const toggleEmail = useAppStore((s) => s.toggleEmailPref);
  const logout = useAppStore((s) => s.logoutProfile);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const unitTitle = useMemo(() => {
    const primary = units.find((u) => u.primary) ?? units[0];
    if (!primary) return 'Tower A, Unit 1201';
    const parts: string[] = [];
    if (primary.building || primary.tower || primary.block) {
      parts.push(primary.building ?? primary.tower ?? primary.block ?? '');
    }
    if (primary.unitNo || primary.label) {
      parts.push(primary.unitNo ?? primary.label ?? '');
    }
    return parts.filter(Boolean).join(', ');
  }, [units]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <Appbar.Header mode="small" style={{ backgroundColor: '#fff', elevation: 1 }} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => { /* router.back() if needed */ }} />
        <Appbar.Content title="Profile & Settings" />
        <View style={{ width: 48 }} />
      </Appbar.Header>

      {loading || !prefs ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24, backgroundColor: '#F8F8F8' }}>
          {/* Hero */}
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
            <ProfileHeader
              name={me?.name ?? 'John Doe'}
              role={me?.role ?? 'Owner'}
              avatarUrl={me?.avatarUrl}
              onEdit={() => {}}
            />
          </View>

          {/* Sections */}
          <View style={{ padding: 16, gap: 24 }}>
            <PersonalInfoSection
              name={me?.name ?? 'John Doe'}
              email={me?.email ?? 'john.doe@example.com'}
              phone={me?.phone ?? '+1 234 567 890'}
              onEditName={() => {}}
              onEditEmail={() => {}}
              onEditPhone={() => {}}
              onEditPassword={() => {}}
            />

            <MyUnitsSection
              title={unitTitle}
              subtitle="Primary Unit"
              onPress={() => {}}
            />

            <PreferencesSection
              push={prefs.push}
              email={prefs.email}
              language={prefs.language}
              onTogglePush={() => void togglePush()}
              onToggleEmail={() => void toggleEmail()}
              onLanguage={() => {}}
            />

            <HelpSupportSection
              onFaq={() => {}}
              onContact={() => {}}
            />

            <LegalSection
              onTerms={() => {}}
              onPrivacy={() => {}}
            />

            <LogoutButton onPress={() => void logout()} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
