import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/state';
// import messaging from '@react-native-firebase/messaging';
// import NotificationUtil from './src/util/fcmHelper/NotificationUtil';
// import {
//   createNotificationChannel,
//   configureNotifications,
// } from './src/util/fcmHelper/notificationConfig';
// import { Importance } from 'react-native-push-notification';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

// Notification Config
// const channelConfig = {
//   channelId: 'your-channel-id',
//   channelName: 'Your Channel Name',
//   channelDescription: 'A channel to categorise your notifications',
//   channelPlaySound: false,
//   channelSoundName: 'default',
//   channelImportance: Importance.HIGH,
//   channelVibrate: true,
// };

// const notificationConfig = {
//   onRegister: (token) => console.log('TOKEN:', token),
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
// };

// configureNotifications(notificationConfig);

// createNotificationChannel(channelConfig);

// Remote Notification Handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
//   NotificationUtil;
// });

AppRegistry.registerComponent(appName, () => Root);
