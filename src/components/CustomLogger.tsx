import RNFS from 'react-native-fs';
export const customLogger = async (
  eventType: string,
  screen: string,
  log: any,
  type?: string,
  label?: string,
  time?: any,
) => {
  try {
    let message: any = {
      eventType: eventType.toUpperCase(),
      screen: screen,
      message: log,
      time: time,
      timestamp: new Date().toISOString(),
    };

    switch (eventType) {
      case 'app':
        message = {
          ...message,
          event: screen,
          screen: 'App',
        };
        break;
      case 'identifier':
        message = {
          ...message,
          message: `User ID : ${log}`,
        };
        break;
      case 'search':
      case 'event':
        message = {
          ...message,
          eventType: (type ? type.toUpperCase() : eventType).toUpperCase(),
          label: label,
        };
        break;
      default:
        break;
    }

    const logsDirectory = `${RNFS.DocumentDirectoryPath}/logs`;

    const logFilePath = `${logsDirectory}/app_logs.log`;

    const directoryExists = await RNFS.exists(logsDirectory);
    if (!directoryExists) {
      await RNFS.mkdir(logsDirectory);
    }

    await RNFS.appendFile(logFilePath, JSON.stringify(message) + '\n', 'utf8');
  } catch (error: any) {
    console.log('Error writing log to file:', error);
  }
};
