import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceTile } from '@/components/device-tile';
import { GatewayBanner } from '@/components/gateway-banner';
import { HomeRoom, Palette } from '@/constants/smart-home';
import { formatTemperature, useIoT } from '@/context/IoTContext';

export default function DashboardScreen() {
  const {
    devices,
    devicesLoading,
    updatingDeviceIds,
    sensorData,
    sensorsLoading,
    gatewayConnected,
    temperatureUnit,
  } = useIoT();

  const tiles = devices.slice(0, 4);
  const activeCount = devices.filter((device) => device.status).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Smart Home</Text>
        <Link href="/settings" asChild>
          <Pressable hitSlop={12}>
            <Ionicons name="settings-outline" size={28} color={Palette.text} />
          </Pressable>
        </Link>
      </View>

      <View style={styles.gatewayRow}>
        <View style={[styles.dot, { backgroundColor: gatewayConnected ? '#2E9E4F' : Palette.danger }]} />
        <Text style={styles.gatewayText}>
          Gateway {gatewayConnected ? 'connected' : 'disconnected'} · {activeCount} of {devices.length}{' '}
          devices on
        </Text>
      </View>

      <GatewayBanner />

      <Link href="/sensors" asChild>
        <Pressable style={styles.thermostat}>
          <Ionicons name="thermometer-outline" size={40} color={Palette.text} />
          {sensorData ? (
            <Text style={styles.temperature}>
              {formatTemperature(sensorData.temperature, temperatureUnit)}
            </Text>
          ) : sensorsLoading ? (
            <ActivityIndicator size="large" color={Palette.text} />
          ) : (
            <Text style={styles.temperature}>--</Text>
          )}
          <Text style={styles.room}>{HomeRoom}</Text>
          {sensorData ? (
            <Text style={styles.subReading}>
              {sensorData.humidity} % humidity · {sensorData.lightLevel} lux
            </Text>
          ) : null}
        </Pressable>
      </Link>

      {devicesLoading && devices.length === 0 ? (
        <Text style={styles.loading}>Loading devices...</Text>
      ) : (
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            {tiles.slice(0, 2).map((device) => (
              <DeviceTile
                key={device.id}
                device={device}
                updating={updatingDeviceIds.includes(device.id)}
              />
            ))}
          </View>
          <View style={styles.gridRow}>
            {tiles.slice(2, 4).map((device) => (
              <DeviceTile
                key={device.id}
                device={device}
                updating={updatingDeviceIds.includes(device.id)}
              />
            ))}
          </View>
        </View>
      )}

      <Link href="/devices" asChild>
        <Pressable>
          <Text style={styles.viewAll}>View All Devices →</Text>
        </Pressable>
      </Link>
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
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Palette.text,
  },
  gatewayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  gatewayText: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.muted,
  },
  thermostat: {
    // Matches the 405x358 proportion of the reference design.
    aspectRatio: 1.13,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surface,
  },
  temperature: {
    fontSize: 62,
    fontWeight: '800',
    color: Palette.text,
  },
  room: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.text,
  },
  subReading: {
    fontSize: 14,
    color: Palette.muted,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: Palette.muted,
    paddingVertical: 24,
  },
  grid: {
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  viewAll: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: Palette.text,
  },
});
