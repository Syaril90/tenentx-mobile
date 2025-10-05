import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View
} from 'react-native';
import {
    Appbar,
    Button,
    Chip,
    HelperText,
    IconButton,
    RadioButton,
    SegmentedButtons,
    Text,
    TextInput,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../../shared/store/appStore';
import type { CreateComplaintInput } from '../types';

const CATEGORIES = [
  { value: 'facility', label: 'Facility' },
  { value: 'security', label: 'Security' },
  { value: 'noise', label: 'Noise' },
  { value: 'cleanliness', label: 'Cleanliness' },
  { value: 'other', label: 'Other' },
] as const;

type Attachment = {
  uri: string;
  type?: string; // "image" | "video" | undefined
};

export default function NewComplaintScreen() {
  const router = useRouter();
  const creating = useAppStore((s) => s.creating);
  const createComplaint = useAppStore((s) => s.createComplaint);

  // form state
  const [category, setCategory] =
    useState<CreateComplaintInput['category']>('facility');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [preferredResolution, setPreferredResolution] =
    useState<CreateComplaintInput['preferredResolution']>('anytime');
  const [location, setLocation] =
    useState<CreateComplaintInput['location']>('my_unit');
  const [locationNote, setLocationNote] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // validation
  const errors = useMemo(
    () => ({
      title: !title.trim(),
      description: !description.trim(),
    }),
    [title, description]
  );
  const canSubmit = !errors.title && !errors.description && !creating;

  const requestMediaPermission = useCallback(async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  }, []);

  const pickMedia = useCallback(async () => {
    const granted = await requestMediaPermission();
    if (!granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // photos & videos
      allowsMultipleSelection: true,                // iOS 14+; Android returns first asset
      quality: 0.8,
      selectionLimit: 10,                           // cap selection
    });

    if (res.canceled) return;

    const newOnes: Attachment[] = res.assets.map((a) => ({
      uri: a.uri,
      type: a.type === 'video' ? 'video' : 'image',
    }));

    setAttachments((prev) => {
      // de-dup by uri
      const seen = new Set(prev.map((p) => p.uri));
      const merged = [...prev];
      for (const n of newOnes) {
        if (!seen.has(n.uri)) merged.push(n);
      }
      return merged;
    });
  }, [requestMediaPermission]);

  const removeAttachment = (uri: string) =>
    setAttachments((arr) => arr.filter((a) => a.uri !== uri));

  const onSubmit = async () => {
    if (!canSubmit) return;
    const input: CreateComplaintInput = {
      title: title.trim(),
      description: description.trim(),
      category,
      location,
      locationNote:
        location === 'common_area'
          ? locationNote.trim() || undefined
          : undefined,
      attachments: attachments.map((a) => a.uri),
      preferredResolution,
      preferredAtISO: null,
    };
    await createComplaint(input);
    router.back();
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: '#F8F9FC' }}
    >
      <Appbar.Header
        mode="small"
        style={{ backgroundColor: '#F8F9FC' }}
        statusBarHeight={0}
      >
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="Create Complaint" />
        <View style={{ width: 48 }} />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
          {/* Category */}
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              marginBottom: 8,
              color: '#0D121B',
            }}
          >
            Category
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 12,
            }}
          >
            {CATEGORIES.map((c) => (
              <Chip
                key={c.value}
                selected={category === c.value}
                onPress={() => setCategory(c.value)}
                mode="flat"
              >
                {c.label}
              </Chip>
            ))}
          </View>

          {/* Title */}
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={{ backgroundColor: '#F8F9FC', marginBottom: 6 }}
          />
          <HelperText type="error" visible={errors.title}>
            Title is required
          </HelperText>

          {/* Description (bigger multiline) */}
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={8}
            style={{
              backgroundColor: '#F8F9FC',
              minHeight: 160,
              textAlignVertical: 'top',
            }}
          />
          <HelperText type="error" visible={errors.description}>
            Description is required
          </HelperText>

          {/* Attachments */}
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              marginTop: 12,
              marginBottom: 8,
              color: '#0D121B',
            }}
          >
            Add Photos/Videos
          </Text>

          <View
            style={{
              borderWidth: 2,
              borderStyle: 'dashed',
              borderColor: '#CFD7E7',
              borderRadius: 12,
              alignItems: 'center',
              paddingVertical: 18,
              paddingHorizontal: 12,
              marginBottom: 12,
              gap: 10,
            }}
          >
            <Button
              mode="contained-tonal"
              onPress={pickMedia}
              icon="image-plus"
            >
              Add Photo/Video
            </Button>

            {/* Thumbnails grid */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 8,
                alignSelf: 'stretch',
              }}
            >
              {attachments.map((att) => (
                <View
                  key={att.uri}
                  style={{
                    width: 94,
                    height: 94,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: '#E5E7EB',
                  }}
                >
                  <Image
                    source={{ uri: att.uri }}
                    style={{ width: '100%', height: '100%' }}
                  />
                  {/* remove button */}
                  <IconButton
                    icon="close-circle"
                    size={18}
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      backgroundColor: '#fff',
                    }}
                    onPress={() => removeAttachment(att.uri)}
                  />
                  {/* video badge */}
                  {att.type === 'video' ? (
                    <View
                      style={{
                        position: 'absolute',
                        left: 6,
                        bottom: 6,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: 6,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 10 }}>VIDEO</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>

            {attachments.length === 0 ? (
              <Text style={{ color: '#4C669A', fontSize: 12 }}>
                Tap “Add Photo/Video” to browse your library
              </Text>
            ) : (
              <Text style={{ color: '#4C669A', fontSize: 12 }}>
                Tap the × to remove an item
              </Text>
            )}
          </View>

          {/* Preferred Resolution */}
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              marginBottom: 8,
              color: '#0D121B',
            }}
          >
            Preferred Resolution Time
          </Text>
          <SegmentedButtons
            value={preferredResolution}
            onValueChange={(v) =>
              setPreferredResolution(
                v as CreateComplaintInput['preferredResolution']
              )
            }
            buttons={[
              { value: 'anytime', label: 'Anytime' },
              { value: 'morning', label: 'Morning' },
              { value: 'afternoon', label: 'Afternoon' },
              { value: 'specific', label: 'Specific' },
            ]}
          />

          {/* Location */}
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              marginTop: 16,
              marginBottom: 8,
              color: '#0D121B',
            }}
          >
            Location
          </Text>
          <RadioButton.Group
            value={location}
            onValueChange={(v) => setLocation(v as any)}
          >
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <RadioButton.Item label="My Unit" value="my_unit" />
              <RadioButton.Item label="Common Area" value="common_area" />
            </View>
          </RadioButton.Group>

          {location === 'common_area' ? (
            <TextInput
              label="Specify common area (e.g., Gym, Lobby)"
              value={locationNote}
              onChangeText={setLocationNote}
              mode="outlined"
              style={{ backgroundColor: '#F8F9FC', marginTop: 4 }}
            />
          ) : (
            <TextInput
              label="Unit (pre-filled)"
              value="Unit 789, Azure Tower"
              mode="outlined"
              disabled
              style={{ backgroundColor: '#F8F9FC', marginTop: 4 }}
            />
          )}
        </ScrollView>

        {/* Sticky actions */}
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            padding: 16,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#EAEEF5',
          }}
        >
          <Button mode="outlined" onPress={() => router.back()} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={onSubmit}
            loading={creating}
            disabled={!canSubmit}
            style={{ flex: 1 }}
          >
            Submit Complaint
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
