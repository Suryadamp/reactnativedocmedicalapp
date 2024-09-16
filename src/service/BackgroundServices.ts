import BackgroundService from 'react-native-background-actions';
import { updateUserData } from './AuthService';

// TypeScript definitions for task data arguments
type TaskDataArguments = {
  delay: number;
};

const sleep = (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));

export const backgroundNotificationJob = async (
  taskDataArguments: TaskDataArguments = { delay: 1000 },
) => {
  const { delay = 1000 } = taskDataArguments;
  for (let i = 0; BackgroundService.isRunning(); i++) {
    console.log(i);
    await BackgroundService.updateNotification({ taskDesc: `My counter is running ${i}` });
    await sleep(delay);
  }
};

export const backgroundSyncDbJob = async (userInfo: any) => {
  await updateUserData(userInfo);
  await BackgroundService.stop();
};

const options = {
  taskName: 'Dr Carrot',
  taskTitle: 'DrCarrot app is running',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_drcarrot',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane',
  parameters: {
    delay: 5000,
  },
};

export const startBackgroundServices = async () => {
  try {
    await BackgroundService.start(backgroundNotificationJob, options);
    await BackgroundService.updateNotification({ taskDesc: 'My counter is running' });
  } catch (error) {
    console.error('Error starting background service:', error);
  }
};

export const stopBackgroundServices = async () => {
  try {
    await BackgroundService.stop();
  } catch (error) {
    console.error('Error stopping background service:', error);
  }
};
