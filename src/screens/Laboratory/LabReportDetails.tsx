import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNFetchBlob from 'react-native-blob-util';
import PdfViewer from '../../components/PdfViewer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import KeyChainService from '../../service/KeyChainService';
import { showSnackBar, showSuccessSnackBar, Snackbar } from '../../util/AlertUtil';
import { FONTS, COLORS } from '../../constants';
import Share from 'react-native-share';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignButton from 'react-native-vector-icons/AntDesign';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, AppContainer } from '../../components';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import { ActivityIndicator } from 'react-native-paper';
import CustomIconButton from '../../components/IconButton';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const LabReportDetails = ({ route, navigation }: Props) => {
  const item = route.params?.item;
  console.log({ item });
  const pdf_url = item?.url;
  const [pageInfo, setPageInfo] = useState({ currentPage: 0, totalPage: 0 });
  const [localPdfPath, setLocalPdfPath] = useState('');
  const [isNotFound, setNotFound] = useState(false);
  console.log('LabReportDetails', pdf_url);

  useEffect(() => {
    if (pdf_url) {
      getReportDocs('get');
    }
  }, []);

  // useEffect(() => {
  //   getReportDocs('get');
  // }, [localPdfPath, pdf_url, item?.bill_no, item?.department_details?.dept_name]);

  const getReportDocs = async (type: string) => {
    const authToken = await KeyChainService.getSecureValue('accessToken');
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/report_${item?.bill_no}.pdf`;
    const fileType = type === 'get' ? { fileCache: true } : { path };
    try {
      const response = await RNFetchBlob.config(fileType).fetch('GET', pdf_url, {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
      });
      console.log('response', response, authToken);
      if (response.respInfo.status === 200) {
        console.log('File downloaded successfully!', response);
        setLocalPdfPath(response.path());
        if (type === 'download') {
          showSuccessSnackBar('File downloaded successfully!');
        }
        if (type === 'share') {
          await shareFile(response.path());
        }
      } else {
        setNotFound(true);
        console.error('Failed to download PDF');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  /* const getReportDocs = async (type: string) => {
    const authToken = await KeyChainService.getSecureValue('accessToken');
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/report_${item?.bill_no}.pdf`;
    const fileType = type === 'get' ? { fileCache: true } : { path };
    try {
      const response = await RNFetchBlob.config(fileType).fetch('GET', pdf_url, {
        Authorization: `Bearer ${authToken}`,
      });
      if (response.respInfo.status === 200) {
        setLocalPdfPath(response.path());
        if (type === 'download') {
          showSnackBar('File downloaded successfully!', {
            textColor: '#fff',
            backgroundColor: '#43a446',
          });
        }
        if (type === 'share') {
          await shareFile(response.path());
        }
      } else {
        console.error('Failed to download PDF');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }; */

  const handlePageChanged = (currentPage: number, totalPage: number) => {
    setPageInfo({ currentPage, totalPage });
  };

  const shareFile = async (file: string) => {
    console.log({ file });
    try {
      const options = {
        type: 'application/pdf',
        url: `file://${file}`,
      };
      await Share.open(options);
      console.log('File shared successfully');
    } catch (error) {
      console.error('Error sharing file:', error);
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
            <CustomIconButton
              name="BackIcon"
              isMaterial={false}
              onClick={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.topBarTitle}>{`${item?.bill_no} Bill`}</Text>
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              {UsePermission(permissionList.mobileLabreportShare) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    getReportDocs('share');
                  }}
                >
                  <IconButton
                    // style={styles.accountIconStyle}
                    style={{ marginHorizontal: 10 }}
                    name="share-variant-outline"
                    size={17}
                    color={COLORS.background.white}
                  />
                </TouchableOpacity>
              )}
              {UsePermission(permissionList.mobileLabreportDownload) ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    getReportDocs('download');
                  }}
                >
                  <AntDesignButton
                    style={{ marginHorizontal: 10 }}
                    name="download"
                    size={17}
                    color={COLORS.background.white}
                  />
                </TouchableOpacity>
              ) : (
                <Box />
              )}
            </Box>
          </Box>
        </Box>
        <Box style={styles.content}>
          <Box style={styles.fileContainer}>
            <Box style={styles.pdfContainer}>
              {localPdfPath ? (
                <PdfViewer source={localPdfPath} handlePageChanged={handlePageChanged} />
              ) : isNotFound ? (
                <Text
                  style={{ fontSize: 16, fontFamily: FONTS.SFProDisplayMedium, color: COLORS.text }}
                >
                  Reports are not generated.
                </Text>
              ) : (
                <ActivityIndicator color="black" size="large" />
              )}
            </Box>
          </Box>
        </Box>
        <Box style={styles.buttonBoxContainer}>
          <Text style={styles.pages}>{`${pageInfo.currentPage}/${pageInfo.totalPage}`}</Text>
        </Box>
      </AppContainer>
    </>
  );
};

export default LabReportDetails;

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
    justifyContent: 'space-between',
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
    // textTransform: 'capitalize',
  },
  buttonBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
});
