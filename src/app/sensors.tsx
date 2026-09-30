import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GatewayBanner } from '@/components/gateway-banner';
import { SensorCard } from '@/components/sensor-card';
import { StatusBanner } from '@/components/status-banner';
import { Palette } from '@/constants/smart-home';
import { formatTemperature, useIoT } from '@/context/IoTContext';

export default function SensorsScreen() {
  const { sensorData, sensorsLoading, sensorsError, gatewayConnected, temperatureUnit, refreshSensors } =
    useIoT();

  const refreshDisabled = sensorsLoading || !gatewayConnected;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Sensors</Text>

      <GatewayBanner />

      {sensorsError && gatewayConnected ? (
        <StatusBanner message={sensorsError} busy={sensorsLoading} onAction={refreshSensors} />
      ) : null}

      <View style={styles.cards}>
        <SensorCard
          label="Temperature"
          icon="thermometer-outline"
          value={sensorData ? formatTemperature(sensorData.temperature, temperatureUnit) : '--'}
        />
        <SensorCard
          label="Humidity"
          icon="water-outline"
          value={sensorData ? `${sensorData.humidity} %` : '--'}
        />
        <SensorCard
          label="Light Level"
          icon="sunny-outline"
          value={sensorData ? `${sensorData.lightLevel} lux` : '--'}
        />
      </View>

      <Pressable
        onPress={refreshSensors}
        disabled={refreshDisabled}
        style={({ pressed }) => [styles.button, (pressed || refreshDisabled) && styles.dimmed]}>
        {sensorsLoading ? (
          <ActivityIndicator color={Palette.header} />
        ) : (
          <Ionicons name="refresh" size={20} color={Palette.header} />
        )}
        <Text style={styles.buttonText}>
          {sensorsLoading ? 'Refreshing Sensors...' : 'Refresh Sensors'}
        </Text>
      </Pressable>
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
  cards: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: Palette.text,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.header,
  },
  dimmed: {
    opacity: 0.6,
  },
});
