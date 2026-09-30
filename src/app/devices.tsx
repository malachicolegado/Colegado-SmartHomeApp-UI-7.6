import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceRow } from '@/components/device-row';
import { GatewayBanner } from '@/components/gateway-banner';
import { StatusBanner } from '@/components/status-banner';
import { Palette } from '@/constants/smart-home';
import { useIoT } from '@/context/IoTContext';

export default function DevicesScreen() {
  const {
    devices,
    devicesLoading,
    devicesError,
    updatingDeviceIds,
    deviceErrors,
    gatewayConnected,
    loadDevices,
    setDeviceStatus,
  } = useIoT();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My Devices</Text>

      <GatewayBanner />

      {devicesError ? (
        <StatusBanner
          message={devicesError}
          busy={devicesLoading}
          busyLabel="Loading..."
          onAction={loadDevices}
        />
      ) : null}

      {devicesLoading && devices.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Palette.text} />
          <Text style={styles.loadingText}>Loading devices...</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {devices.map((device) => (
            <DeviceRow
              key={device.id}
              device={device}
              updating={updatingDeviceIds.includes(device.id)}
              disabled={!gatewayConnected}
              error={deviceErrors[device.id]}
              onToggle={(status) => setDeviceStatus(device.id, status)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Palette.text,
  },
  list: {
    gap: 12,
  },
  loading: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.muted,
  },
});
