import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/smart-home';

type Props = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export function SensorCard({ label, value, icon }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={icon} size={24} color={Palette.text} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.muted,
  },
  value: {
    fontSize: 36,
    fontWeight: '800',
    color: Palette.text,
  },
});
