import { useEffect, useRef, useCallback } from 'react';
import DeviceInfo from 'react-native-device-info';
import { customLogger } from '../components/CustomLogger';
import { AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

export const useDeviceInfo = () => {
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const logsDirectory = `${RNFS.DocumentDirectoryPath}/logs`;
        const directoryExists = await RNFS.exists(logsDirectory);
        if (!directoryExists) {
          const device = {
            uniqueId: await DeviceInfo.getUniqueId(),
            manufacturer: await DeviceInfo.getManufacturer(),
            model: await DeviceInfo.getModel(),
            systemName: await DeviceInfo.getSystemName(),
            systemVersion: await DeviceInfo.getSystemVersion(),
            deviceId: await DeviceInfo.getDeviceId(),
            brand: await DeviceInfo.getBrand(),
            isEmulator: await DeviceInfo.isEmulator(),
            isTablet: await DeviceInfo.isTablet(),
            appName: await DeviceInfo.getApplicationName(),
            bundleId: await DeviceInfo.getBundleId(),
            buildNumber: await DeviceInfo.getBuildNumber(),
            version: await DeviceInfo.getVersion(),
            readableVersion: await DeviceInfo.getReadableVersion(),
            hasNotch: await DeviceInfo.hasNotch(),
            isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
            firstInstallTime: await DeviceInfo.getFirstInstallTime(),
            lastUpdateTime: await DeviceInfo.getLastUpdateTime(),
            androidId: await DeviceInfo.getAndroidId(),
            apiLevel: await DeviceInfo.getApiLevel(),
            availableLocationProviders: await DeviceInfo.getAvailableLocationProviders(),
            baseOs: await DeviceInfo.getBaseOs(),
            buildId: await DeviceInfo.getBuildId(),
            batteryLevel: await DeviceInfo.getBatteryLevel(),
            bootloader: await DeviceInfo.getBootloader(),
            carrier: await DeviceInfo.getCarrier(),
            codename: await DeviceInfo.getCodename(),
            device: await DeviceInfo.getDevice(),
            fingerprint: await DeviceInfo.getFingerprint(),
            fontScale: await DeviceInfo.getFontScale(),
            freeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
            freeDiskStorageOld: await DeviceInfo.getFreeDiskStorageOld(),
            hardware: await DeviceInfo.getHardware(),
            host: await DeviceInfo.getHost(),
            hostNames: await DeviceInfo.getHostNames(),
            ipAddress: await DeviceInfo.getIpAddress(),
            incremental: await DeviceInfo.getIncremental(),
            installerPackageName: await DeviceInfo.getInstallerPackageName(),
            installReferrer: await DeviceInfo.getInstallReferrer(),
            instanceId: await DeviceInfo.getInstanceId(),
            macAddress: await DeviceInfo.getMacAddress(),
            maxMemory: await DeviceInfo.getMaxMemory(),
            phoneNumber: await DeviceInfo.getPhoneNumber(),
            powerState: await DeviceInfo.getPowerState(),
            product: await DeviceInfo.getProduct(),
            previewSdkInt: await DeviceInfo.getPreviewSdkInt(),
            serialNumber: await DeviceInfo.getSerialNumber(),
            securityPatch: await DeviceInfo.getSecurityPatch(),
            systemAvailableFeatures: await DeviceInfo.getSystemAvailableFeatures(),
            tags: await DeviceInfo.getTags(),
            type: await DeviceInfo.getType(),
            totalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
            totalDiskCapacityOld: await DeviceInfo.getTotalDiskCapacityOld(),
            totalMemory: await DeviceInfo.getTotalMemory(),
            usedMemory: await DeviceInfo.getUsedMemory(),
            userAgent: await DeviceInfo.getUserAgent(),
            brightness: await DeviceInfo.getBrightness(),
            hasGms: await DeviceInfo.hasGms(),
            hasHms: await DeviceInfo.hasHms(),
            isAirplaneMode: await DeviceInfo.isAirplaneMode(),
            isBatteryCharging: await DeviceInfo.isBatteryCharging(),
            isKeyboardConnected: await DeviceInfo.isKeyboardConnected(),
            isLandscape: await DeviceInfo.isLandscape(),
            isLocationEnabled: await DeviceInfo.isLocationEnabled(),
            isMouseConnected: await DeviceInfo.isMouseConnected(),
            isHeadphonesConnected: await DeviceInfo.isHeadphonesConnected(),
            isTabletMode: await DeviceInfo.isTabletMode(),
            supported32BitAbis: await DeviceInfo.supported32BitAbis(),
            supported64BitAbis: await DeviceInfo.supported64BitAbis(),
            supportedAbis: await DeviceInfo.supportedAbis(),
            syncUniqueId: await DeviceInfo.syncUniqueId(),
            supportedMediaTypeList: await DeviceInfo.getSupportedMediaTypeList(),
          };
          customLogger('device', 'app', device);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeviceInfo();

    // Cleanup function
    return () => {
      // Any cleanup code can go here if needed
    };
  }, []);
};

export const useAppState = () => {
  useEffect(() => {
    const startTime = Date.now();
    if (AppState) {
      const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
          const closeTime = Date.now();
          customLogger('app', 'active time', `start time: ${startTime}, end time: ${closeTime}`);
        }
      };

      const stateListener = AppState.addEventListener('change', handleAppStateChange);
      return () => {
        stateListener.remove();
      };
    }
    return () => {};
  }, []);
};

export const useScreenActiveTime = (screenName) => {
  const startTimeRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    startTimeRef.current = Date.now();
    const handleBlur = () => {
      const endTime = Date.now();
      const duration = endTime - startTimeRef.current;
      customLogger(
        'screen',
        screenName,
        `${screenName} was active for ${duration}ms`,
        '',
        '',
        duration,
      );
    };

    const unsubscribe = navigation.addListener('blur', handleBlur);

    return () => {
      unsubscribe();
    };
  }, [screenName]);
};

export const useDebounce = (
  value: string | undefined,
  name: string,
  delay: number,
  type?: string,
) => {
  const navigation = useNavigation();
  const routeName = navigation.getState().routes[navigation.getState().index].name;
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (value !== '') {
        if (type) {
          if (type === 'error') {
            customLogger('error', routeName, value);
          } else {
            customLogger('event', routeName, value, 'input', name);
          }
        } else {
          customLogger('search', routeName, value, 'input', name);
        }
      }
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [value, delay]);
};

export const useScrollEndDetection = () => {
  const navigation = useNavigation();
  const routeName = navigation.getState().routes[navigation.getState().index].name;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleScroll = useCallback((event: any) => {
    const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;

    const isReachingEnd = layoutMeasurement.height + contentOffset.y + 1 >= contentSize.height;
    if (isReachingEnd) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        customLogger(
          'scroll',
          routeName,
          `Scroll End Detected. Total Height: ${contentSize.height}`,
        );
      }, 1000);
    }
  }, []);

  return { handleScroll };
};
