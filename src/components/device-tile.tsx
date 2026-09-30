import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/smart-home';
import type { Device } from '@/models/IoTModels';

export function DeviceTile({ device, updating }: { device: Device; updating: boolean }) {
  return (
    <View style={styles.tile}>
      <Ionicons name={device.icon} size={30} color={Palette.text} />
      <Text style={styles.name} numberOfLines={1}>
        {device.name}
      </Text>
      <Text style={styles.status}>{updating ? 'Updating...' : device.status ? 'ON' : 'OFF'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    // Matches the 196x122 proportion of the reference design.
    aspectRatio: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surface,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.text,
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.text,
  },
});
