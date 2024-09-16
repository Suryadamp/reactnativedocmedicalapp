// components - FileUpload
import React, { useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../constants';
import { showErrorSnackBar, showSnackBar } from '../../util/AlertUtil';
import { isHpTablet, isWpTablet } from '../../hooks/useDeviceCheck';

interface IFileUpload {
  value: string | any[];
  maxSize: number;
  allowedType: string;
  onChange: (value: any) => void;
}

const checkPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 30) {
      // Android 11 and higher
      let isStorageManager = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE &&
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
      );
      if (isStorageManager) {
        return true;
      } else {
        // Request for the permission
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
            // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          isStorageManager = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
            // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          console.log('isStorageManager', isStorageManager);
          return isStorageManager;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    } else {
      // Below Android 11
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
};

const FileUpload = ({ allowedType, value, maxSize, onChange }: IFileUpload) => {
  useEffect(() => {
    checkPermission().then((isPermission) => {
      if (!isPermission) {
        showErrorSnackBar('Please enable the permission to upload the files');
      }
    });
  }, []);

  const getAllowedTypes = () => {
    let types = [DocumentPicker.types.allFiles];
    if (!allowedType) {
      return types;
    }

    const allowedTypes = allowedType.split(',');
    types = allowedTypes.map((type: any) => DocumentPicker.types[type]);
    return types;
  };

  const handleUploadFile = async () => {
    console.log('maxSize', maxSize, maxSize > 1);
    const res = await DocumentPicker.pick({
      type: getAllowedTypes(),
      copyTo: 'documentDirectory',
      allowMultiSelection: maxSize > 1,
    });
    console.log('res', res);

    if (res.length > maxSize) {
      Alert.alert('Max file reached', `Please upload only ${maxSize} files.`, [
        {
          text: 'No',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => handleUploadFile() },
      ]);
    }
    onChange([
      {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
        fileCopyUri: res[0].fileCopyUri,
      },
    ]);

    if (res.length > 1) {
      onChange(
        res.map((dat) => ({
          uri: dat.uri,
          type: dat.type,
          name: dat.name,
          fileCopyUri: dat.fileCopyUri,
        })),
      );
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete confirmation', 'Are you sure you want to delete this file ?', [
      {
        text: 'No',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => onChange('') },
    ]);
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handleUploadFile}>
      {value && value.length > 1 && (
        <Text style={{ maxWidth: isWpTablet(80), flexGrow: 1 }}>
          {value.map((val) => val.name).join(',')}
        </Text>
      )}
      {value && value.length === 1 && (
        <Text style={{ maxWidth: isWpTablet(80), flexGrow: 1 }}>{value[0].name}</Text>
      )}
      {!value && <Text>Upload the file</Text>}
      {value && (
        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons
            name="delete"
            color={COLORS.grey_525252}
            size={18}
            // style={styles.statusImage}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default FileUpload;

const styles = StyleSheet.create({
  container: {
    width: isWpTablet(90),
    height: isHpTablet(10),
    paddingHorizontal: isWpTablet(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.white_smoke,
  },
  title: {
    fontSize: 15,
    color: '#232323',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
});
