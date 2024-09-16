// Admin - FileBottomSheet
import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { SvgIcon } from '../../../constants/SvgIcon';
import { Box } from '../../../components';
import styles from '../../../styles/MedicalRecords.styles';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const PLATFORM_CAMERA_PERMISSIONS: any = {
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
};

const requestCameraPermission = async () => {
  try {
    const permissions = PLATFORM_CAMERA_PERMISSIONS[Platform.OS];
    const isAllowed = Platform.OS == 'android' ? await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) : await check(permissions);
    if (isAllowed) {
      return true;
    }

    const options = {
      title: 'App Camera Permission',
      message: 'App needs access to your camera ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    };
    const granted = Platform.OS == 'android' ? PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, options): await request(permissions, options);
    const isGranted = granted === (Platform.OS == 'android' ? PermissionsAndroid.RESULTS.GRANTED : RESULTS.GRANTED);
    if (isGranted) {
      console.log('Camera permission given');
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

const FileBottomSheet = ({ files, onSetState }: any) => {
  const newFiles = files ? [...files] : [];
  const handleUploadFile = async (type: string) => {
    if (type === 'camera') {
      const options: any = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      requestCameraPermission().then((resp) => {
        if (resp) {
          launchCamera(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response?.errorMessage) {
              console.log('ImagePicker Error: ', response.errorMessage);
            } else {
              if (response?.assets) {
                newFiles.push({
                  uri: response?.assets[0].uri,
                  type: response?.assets[0].type,
                  name: response?.assets[0].fileName,
                });
              }
              onSetState((prev: any) => ({ ...prev, files: newFiles, isOpenFileOption: false }));
            }
          });
        }
      });
    } else if (type === 'gallery') {
      const options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response?.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          if (response?.assets) {
            newFiles.push({
              uri: response?.assets[0].uri,
              type: response?.assets[0].type,
              name: response?.assets[0].fileName,
            });
            onSetState((prev: any) => ({ ...prev, files: newFiles, isOpenFileOption: false }));
          }
        }
      });
    } else if (type === 'files') {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
      });
      newFiles.push({
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
        fileCopyUri: res[0].fileCopyUri,
      });
      onSetState((prev: any) => ({ ...prev, files: newFiles, isOpenFileOption: false }));
    }
  };

  return (
    <ScrollView>
      <Box style={styles.container}>
        <TouchableOpacity style={styles.bsItem} onPress={() => handleUploadFile('camera')}>
          <SvgIcon name="FilePhotoIcon" />
          <Text style={styles.title}>Take a photo</Text>
        </TouchableOpacity>
        <Box style={styles.divider} />
        <TouchableOpacity style={styles.bsItem} onPress={() => handleUploadFile('gallery')}>
          <SvgIcon name="FileGalleryIcon" />
          <Text style={styles.title}>Upload From Gallery</Text>
        </TouchableOpacity>
        <Box style={styles.divider} />
        <TouchableOpacity style={styles.bsItem} onPress={() => handleUploadFile('files')}>
          <SvgIcon name="FileUploadIcon" />
          <Text style={styles.title}>Upload Files</Text>
        </TouchableOpacity>
        <Box style={styles.divider} />
      </Box>
    </ScrollView>
  );
};
export default FileBottomSheet;
