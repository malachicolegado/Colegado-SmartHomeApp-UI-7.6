import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { SettingRow } from '@/components/setting-row';
import { StatusBanner } from '@/components/status-banner';
import { Palette } from '@/constants/smart-home';
import { useIoT } from '@/context/IoTContext';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);
  const {
    gatewayConnected,
    gatewayConnecting,
    gatewayError,
    temperatureUnit,
    connectGateway,
    disconnectGateway,
    toggleTemperatureUnit,
  } = useIoT();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.rows}>
        <SettingRow
          label="IoT Gateway"
          hint={gatewayConnecting ? 'Connecting...' : gatewayConnected ? 'Connected' : 'Disconnected'}>
          {gatewayConnecting ? (
            <ActivityIndicator color={Palette.text} />
          ) : (
            <Switch
              value={gatewayConnected}
              onValueChange={(on) => (on ? connectGateway() : disconnectGateway())}
              trackColor={{ false: Palette.track, true: Palette.accent }}
              thumbColor="#FAFAFA"
              ios_backgroundColor={Palette.track}
            />
          )}
        </SettingRow>

        <SettingRow label="Notifications">
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Palette.track, true: Palette.accent }}
            thumbColor="#FAFAFA"
            ios_backgroundColor={Palette.track}
          />
        </SettingRow>

        <SettingRow label="Temperature Unit">
          <Pressable hitSlop={12} onPress={toggleTemperatureUnit}>
            <Text style={styles.value}>{temperatureUnit}</Text>
          </Pressable>
        </SettingRow>
      </View>

      {gatewayError ? (
        <StatusBanner message={gatewayError} busy={gatewayConnecting} onAction={connectGateway} />
      ) : null}
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
    gap: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Palette.text,
  },
  rows: {
    marginTop: 16,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.text,
  },
});
