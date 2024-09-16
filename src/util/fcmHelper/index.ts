import notifee, {
  AndroidImportance,
  EventType,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export const GetFCMToken = async () => {
  let storedToken = await AsyncStorage.getItem('fcmtoken');
  console.log(storedToken, 'old token');
  if (!storedToken) {
    await registerAppWithFCM();
    try {
      storedToken = await messaging().getToken();
      console.log(storedToken, 'new token');
      if (storedToken) {
        await AsyncStorage.setItem('fcmtoken', storedToken); // Added await for proper asynchronous operation
      }
    } catch (error) {
      console.log(error, 'error in getting FCM token');
    }
  }
  return storedToken;
};

//method was called on user register with firebase FCM for notification
export async function registerAppWithFCM() {
  console.log('registerAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then((status) => {
        console.log('registerDeviceForRemoteMessages status', status);
      })
      .catch((error) => {
        console.log('registerDeviceForRemoteMessages error ', error);
      });
  }
}

//method was called on un register the user from firebase for stoping receiving notifications
// export async function unRegisterAppWithFCM() {
//   console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);

//   if (messaging().isDeviceRegisteredForRemoteMessages) {
//     await messaging()
//       .unregisterDeviceForRemoteMessages()
//       .then((status) => {
//         console.log('unregisterDeviceForRemoteMessages status', status);
//       })
//       .catch((error) => {
//         console.log('unregisterDeviceForRemoteMessages error ', error);
//       });
//   }
//   await messaging().deleteToken();
//   console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
// }

// export const checkApplicationNotificationPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     GetFCMToken();
//   }
//   request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
//     .then((result) => {
//       console.log('POST_NOTIFICATIONS status:', result);
//     })
//     .catch((error) => {
//       console.log('POST_NOTIFICATIONS error ', error);
//     });
// };

//method was called to listener events from firebase for notification triger
// export function registerListenerWithFCM() {
//   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//     console.log('onMessage Received : ', JSON.stringify(remoteMessage));
//     if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
//       onDisplayNotification(
//         remoteMessage.notification?.title,
//         remoteMessage.notification?.body,
//         remoteMessage?.data,
//       );
//     }
//   });
// notifee.onForegroundEvent(({ type, detail }) => {
//   switch (type) {
//     case EventType.DISMISSED:
//       console.log('User dismissed notification', detail.notification);
//       break;
//     case EventType.PRESS:
//       console.log('User pressed notification', detail.notification);
//       // if (detail?.notification?.data?.clickAction) {
//       //   onNotificationClickActionHandling(
//       //     detail.notification.data.clickAction
//       //   );
//       // }
//       break;
//   }
// });

//   messaging().onNotificationOpenedApp(async (remoteMessage) => {
//     console.log('onNotificationOpenedApp Received', JSON.stringify(remoteMessage));
//     // if (remoteMessage?.data?.clickAction) {
//     //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
//     // }
//   });
//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage) => {
//       if (remoteMessage) {
//         console.log('Notification caused app to open from quit state:', remoteMessage.notification);
//       }
//     });

//   return unsubscribe;
// }

//method was called to display notification
// async function onDisplayNotification(
//   title: string,
//   body: string,
//   data: { [key: string]: string } | undefined,
// ) {
//   console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

//   // Request permissions (required for iOS)
//   await notifee.requestPermission();
//   // Create a channel (required for Android)
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     lightColor: '#ff0000',
//   });

//   // Display a notification
//   await notifee.displayNotification({
//     title: title,
//     body: body,
//     data: data,
//     android: {
//       channelId,
//       // pressAction is needed if you want the notification to open the app when pressed
//       pressAction: {
//         id: 'default',
//       },
//     },
//   });
// }

// This should be done when your app starts (e.g., in your main App component)
async function setupNotificationCategories() {
  await notifee.setNotificationCategories([
    {
      id: 'your-channel-id',
      actions: [
        {
          id: 'skip',
          title: 'Skip',
          foreground: true,
        },
        {
          id: 'taken',
          title: 'Taken',
          foreground: true,
        },
      ],
    },
  ]);
}

export async function scheduleDailyReminder(
  title: string,
  body: string,
  hour: number,
  minute: number,
) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a date object for the reminder time
  let reminderTime = new Date();
  reminderTime.setHours(hour, minute, 0);

  // Check if the reminder time is in the past
  const now = new Date();
  if (reminderTime <= now) {
    // Set the reminder for the next day if it's already past the time today
    reminderTime.setDate(reminderTime.getDate() + 1);
  }

  // Create a time-based trigger
  const trigger: any = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + 5000,
    // timestamp: reminderTime.getTime(),
    // repeatFrequency: RepeatFrequency.DAILY,
  };

  // Schedule the notification
  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId: 'your-channel-id',
      },
      ios: {
        categoryId: 'your-channel-id', // The ID of the category you created earlier
      },
    },
    trigger,
  );
}

// export const handleScheduleNotification = (title: string, message: string, date: any) => {
//   PushNotification.localNotificationSchedule({
//     channelId: 'your-channel-id',
//     smallIcon: 'ic_drcarrot',
//     title: title,
//     message: message,
//     date: date, // Use the date parameter for scheduling
//     repeatTime: 1,
//     actions: ['Yes', 'No'],
//   });
// };

export const handleScheduleNotification = async (title: string, message: string, date: any) => {
  // First, create a channel (for Android)
  const channelId = await notifee.createChannel({
    id: 'your-channel-id',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Create a trigger for the specified date
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date, // Schedule for the provided date
    repeatFrequency: RepeatFrequency.DAILY, // Set repeat frequency as required
  };

  // Schedule the notification
  await notifee.createTriggerNotification(
    {
      title,
      body: message,
      ios: {
        categoryId: channelId, // The ID of the category you created earlier
      },
      android: {
        channelId: channelId, // Use the created channel ID
        smallIcon: 'ic_drcarrot', // Make sure this icon is available in your drawable resources
        actions: [
          {
            title: 'Skip',
            pressAction: {
              id: 'skip',
            },
          },
          {
            title: 'Taken',
            pressAction: {
              id: 'taken',
            },
          },
        ],
      },
    },
    trigger,
  );
};

// Don't forget to call this somewhere in your app's initialization flow
setupNotificationCategories();

// Call this function in your app's initialization flow
function setupNotificationListeners() {
  notifee.onForegroundEvent(({ type, detail }: any) => {
    switch (type) {
      case EventType.ACTION_PRESS:
        if (detail.pressAction.id === 'skip') {
          // Handle the skip action
          handleSkipAction();
        } else if (detail.pressAction.id === 'taken') {
          // Handle the taken action
          handleTakenAction();
        }
        break;
      // You can handle other event types here
    }
  });
}

function handleSkipAction() {
  // Implement what should happen when skip is pressed
  console.log('Skip action pressed');
  // Update state, log the event, etc.
}

function handleTakenAction() {
  // Implement what should happen when taken is pressed
  console.log('Taken action pressed');
  // Update state, log the event, etc.
}

// Don't forget to call this function as well
setupNotificationListeners();
