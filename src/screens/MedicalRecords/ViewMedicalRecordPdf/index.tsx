// View Medical Record
import { StyleSheet, Text, Image, ActivityIndicator, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

import { COLORS, FONTS } from '../../../constants';
import { RootStackParamList } from '../../../navigation/types';

import { Box, AppContainer } from '../../../components';
import { showSuccessSnackBar } from '../../../util/AlertUtil';
import { UsePermission } from '../../../hooks/usePermissionCheck';
import { permissionList } from '../../../constants/ApiConstants';
import IconButton from '../../../components/IconButton';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

export const ViewMedicalRecord = ({ route, navigation }: Props) => {
  const filePath = route.params.filePath;
  const type = route.params.type;
  const fileName = route.params.fileName;
  const fileType = route.params.fileType;

  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPages] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoadComplete = (noOfPages: number) => {
    setTotalPages(noOfPages);
  };
  const handlePageChanged = (page: number) => {
    setCurrentPages(page);
  };

  const handleNavigateHeader = () => {
    navigation.goBack();
  };

  const downloadPdf = async () => {
    console.log('Downloading...');
    setIsLoading(true);
    try {
      const downloadDir = RNFS.DownloadDirectoryPath;

      const options = {
        fromUrl: filePath,
        toFile: `${downloadDir}/${fileName}`,
      };
      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode === 200) {
        console.log('File downloaded successfully:', filePath);
        setIsLoading(false);
        showSuccessSnackBar('File downloaded successfully!');
      } else {
        console.error('Failed to download PDF');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle="dark-content"
        style={styles.container}
      >
        <Box style={styles.header}>
          <Box style={styles.topBar}>
            <IconButton name="BackIcon" isMaterial={false} onClick={handleNavigateHeader} />
            {/* <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              onPress={handleNavigateHeader}
            >
              <SvgIcon name="BackIcon" />
            </TouchableOpacity> */}
            <Text style={styles.topBarTitle}>{type}</Text>
          </Box>
        </Box>
        <Box style={styles.content}>
          {isLoading && (
            <View style={styles.loaderContainer}>
              <View style={styles.loadingBg}>
                <ActivityIndicator size="large" />
                <Text style={styles.waitTxt}>Please wait...</Text>
              </View>
            </View>
          )}
          {!isLoading && (
            <Box style={styles.fileContainer}>
              {fileType === 'pdf' ? (
                <Box style={styles.pdfContainer}>
                  <Pdf
                    source={{ uri: filePath }}
                    style={styles.pdfStyle}
                    page={1}
                    scale={1.0}
                    minScale={0.5}
                    maxScale={3.0}
                    trustAllCerts={false}
                    renderActivityIndicator={() => <ActivityIndicator color="black" size="large" />}
                    enablePaging={true}
                    onLoadComplete={handleLoadComplete}
                    onPageChanged={handlePageChanged}
                    spacing={10}
                  />
                </Box>
              ) : (
                <Box style={styles.imageContainer}>
                  <Image source={{ uri: filePath }} style={styles.image} />
                </Box>
              )}
            </Box>
          )}
        </Box>
        <Box style={styles.buttonBoxContainer}>
          <Box style={styles.downloadIcon}>
            {UsePermission(permissionList.moibileMediRecordDownload) && (
              <IconButton
                name="DownloadIcon"
                isMaterial={false}
                style={{ alignItems: 'flex-start' }}
                onClick={downloadPdf}
              />
            )}
          </Box>
          {currentPage && totalPages && (
            <Box>
              <Text style={styles.pages}>{`${currentPage}/${totalPages}`}</Text>
            </Box>
          )}
        </Box>
      </AppContainer>
    </>
  );
};

export default ViewMedicalRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    backgroundColor: '#232323',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  topBarTitle: {
    ...FONTS.h4,
    paddingLeft: '5%',
    color: '#fff',
    fontFamily: FONTS.SFProDisplayMedium,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  buttonBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#232323',
    paddingHorizontal: 15,
    height: 50,
  },
  content: {
    flexGrow: 1,
    height: '80%',
  },
  fileContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'row',
  },
  pdfContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  pdfStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  pages: {
    fontFamily: FONTS.SFProDisplayMedium,
    textTransform: 'capitalize',
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  waitTxt: {
    fontSize: 16,
    marginStart: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  loadingBg: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 6,
  },
  downloadIcon: {
    padding: 15,
    flexGrow: 1,
  },
  btnDownload: {
    width: 60,
  },
});
