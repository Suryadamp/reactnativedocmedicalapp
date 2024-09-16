import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
// import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Navigation } from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { useAppState, useDeviceInfo } from './hooks/useLogs';
import { useNetInfo } from "@react-native-community/netinfo";
import { useDispatch } from 'react-redux';
import { setNetworkState } from './state/network';
// import { scheduleDailyReminder, GetFCMToken } from './util/fcmHelper';

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   scheduleDailyReminder(
  //     'Hey, Karthik! here are your reminders 16:48',
  //     'Famocid 400gm tablet  1.0 dose',
  //     16,
  //     52,
  //   );
  //   GetFCMToken();
  // }, []);

  const { type, isConnected } = useNetInfo();
  dispatch(setNetworkState({ type, isConnected }));
  useDeviceInfo();
  useAppState();

  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <RootSiblingParent>
            <Navigation />
          </RootSiblingParent>
          {/* <FlashMessage position="top" /> */}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
