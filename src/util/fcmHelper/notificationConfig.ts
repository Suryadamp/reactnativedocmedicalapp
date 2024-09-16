import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

export const createNotificationChannel = (channelConfig: ChannelConfig) => {
  PushNotification.createChannel(
    {
      channelId: channelConfig.channelId,
      channelName: channelConfig.channelName,
      channelDescription: channelConfig.channelDescription,
      playSound: channelConfig.channelPlaySound,
      soundName: channelConfig.channelSoundName,
      importance: channelConfig.channelImportance,
      vibrate: channelConfig.channelVibrate,
    },
    (created) => console.log(`CreateChannel returned '${created}'`),
  );
};

export const configureNotifications = (config: NotificationConfig) => {
  PushNotification.configure({
    onRegister: config.onRegister,
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    permissions: config.permissions,
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
};

export interface ChannelConfig {
  channelId: string;
  channelName: string;
  channelDescription?: string;
  channelPlaySound?: boolean;
  channelSoundName?: string;
  channelImportance?: any;
  channelVibrate?: boolean;
}

export interface NotificationConfig {
  onRegister: (token: any) => void;
  // onNotification: (notification: any) => void;
  permissions: {
    alert: boolean;
    badge: boolean;
    sound: boolean;
  };
}
