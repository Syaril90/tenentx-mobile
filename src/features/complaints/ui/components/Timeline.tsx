import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type TimelineItem = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  at: string;
};

type Props = { items: TimelineItem[] };

export default function Timeline({ items }: Props) {
  return (
    <View style={styles.container}>
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <View key={`${it.label}-${idx}`} style={styles.row}>
            <View style={styles.railCol}>
              <View style={styles.dot}>
                <MaterialCommunityIcons name={it.icon} size={16} color="#2563EB" />
              </View>
              {!isLast && <View style={styles.connector} />}
            </View>

            <View style={styles.content}>
              <Text style={styles.label}>{it.label}</Text>
              <Text style={styles.time}>{it.at}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const DOT_SIZE = 32;
const RAIL_WIDTH = 28;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  railCol: {
    width: RAIL_WIDTH,
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: (RAIL_WIDTH - DOT_SIZE) / 2,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: '#DBEAFE',
    marginTop: 6,
    marginBottom: 6,
  },
  content: {
    flex: 1,
    paddingLeft: 10,         // a hair more space from the dot
    paddingBottom: 16,
  },
  label: {
    color: '#0F2A3E',
    fontSize: 16,            // ↓ softer size
    fontWeight: '600',       // ↓ from 800 → 600
    lineHeight: 22,
  },
  time: {
    marginTop: 4,
    color: '#5B768E',        // a touch lighter
    fontSize: 13,            // ↓ smaller timestamp
    fontWeight: '500',       // ↓ lighter weight
    lineHeight: 18,
  },
});
