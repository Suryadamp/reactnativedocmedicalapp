// Helper - Notification
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission(callback) {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Firebase-Authorization status:', authStatus);
    getFcmToken(callback);
  }
}

export const getFcmToken = async (callback) => {
  try {
    let fcmToken = await messaging().getToken();
    console.log('Firebase-new fcmToken', fcmToken);
    notificationService(callback);
  } catch (error) {
    console.log('Firebase-Fcm Token Get Error', error.message);
  }
};

export const notificationService = (callback) => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Firebase-Message handled in the background!', JSON.stringify(remoteMessage));
    callback(remoteMessage.notification);
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      'Firebase-Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // Clear delivered notifications
    callback(remoteMessage.notification, true);
  });

  // Foreground message
  messaging().onMessage(async (remoteMessage) => {
    console.log('Firebase-A new FCM message arrived!', JSON.stringify(remoteMessage));
    callback(remoteMessage.notification);
  });

  // Check initial message
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Firebase-Initial Notification', remoteMessage.notification);
        // Clear delivered notifications
        callback(remoteMessage.notification, true);
      }
    });
};
