import notifee, { TriggerType } from '@notifee/react-native';

class NotificationUtil {
  static displayLocalNotification = async (title: string, body: string, data?: any) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();

    const notificationId = await notifee.displayNotification({
      id: '123',
      title,
      body,
      data: data ? data : null,
      android: {
        channelId,
      },
    });

    // Sometime later...
    await notifee.displayNotification({
      id: '123',
      title,
      body,
      data: data ? data : null,
      android: {
        channelId,
      },
    });
  };
}
export default NotificationUtil;
