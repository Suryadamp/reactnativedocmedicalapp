import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import React, { useEffect, useState } from 'react';
import {decode as atob} from 'base-64'
import KeyChainService from '../../service/KeyChainService';
import PdfViewer from '../../components/PdfViewer';
import { Box, AppContainer } from '../../components';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignButton from 'react-native-vector-icons/AntDesign';
import { Buffer } from "buffer";
import { COLORS, FONTS } from '../../constants';
import { showErrorSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import Share from 'react-native-share';
import { exists, readFile, writeFile } from 'react-native-fs';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import CustomIconButton from '../../components/IconButton';

const BillsPdfViewer = ({ navigation, route }: any) => {
  const item = route?.params?.item;
  const pdf_url = item?.pdf_url;
  const [pageInfo, setPageInfo] = useState({ currentPage: 0, totalPage: 0 });
  const [localPdfPath, setLocalPdfPath] = useState('');
  useEffect(() => {
    if (pdf_url) {
      getPdf('get');
    }
  }, []);

  const storeBinaryAsPDF = async(filePath: string, base64Data: string): Promise<void> => {
    try {
      const binaryData: any = base64ToBin(base64Data);
        const binaryString = String.fromCharCode.apply(null, binaryData);
        await writeFile(filePath + ".bin", binaryString, 'ascii');
        console.log('PDF file saved successfully:', filePath);
    } catch (error) {
      console.error('Error saving PDF file:', error);
    }
  }

  const pdfToBinary = async(filePath: string): Promise<string | null> => {
    try {
      const binaryData = await readFile(filePath, 'ascii');
      return binaryData;
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }

  const binToBase64 = async(filePath: string): Promise<string | null> => {
    try {
      const binaryFile: string = await pdfToBinary(`${filePath}.bin`) ?? "";
      const base64Data = Buffer.from(binaryFile, 'binary').toString('base64');
      return `data:application/pdf;base64,${base64Data}`;
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }

  const base64ToBin = (base64Data: string): Uint8Array => {
    const binaryString = atob(base64Data);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  const getPdf = async (type: string) => {
    const authToken = await KeyChainService.getSecureValue('accessToken');
    var path: string = `${RNFetchBlob.fs.dirs.DownloadDir}/${item?.department_details?.dept_name}_bill_${item?.bill_no}`;
    const isFileExists = await exists(`${path}.bin`);
    // const fileType = type === 'get' ? { fileCache: true } : { path };
    try {
        if(isFileExists) {
          const buffer: string = await binToBase64(path) ?? "";
          setLocalPdfPath(buffer);
        } else {
          const response = await RNFetchBlob.fetch('GET', pdf_url, {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
          });
          if (response.respInfo.status === 200) {
            storeBinaryAsPDF(path, response.base64());
            setLocalPdfPath(`data:application/pdf;base64,${response.base64()}`);
          } else {
            showErrorSnackBar('Failed to download PDF');
            path = "";
          }
        }
      if (path && type === 'download') {
        showSuccessSnackBar('File downloaded successfully!');
      }
      if (path && type === 'share') {
        await shareFile(path);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

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
            {/* <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <SvgIcon name="BackIcon" />
            </TouchableOpacity> */}
            <Text style={styles.topBarTitle}>{`${item?.department_details?.dept_name} Bill`}</Text>
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              {UsePermission(permissionList.mobileBillsPaymentShare) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    getPdf('share');
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
              {UsePermission(permissionList.mobileBillsPaymentDownload) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    getPdf('download');
                  }}
                >
                  <AntDesignButton
                    style={{ marginHorizontal: 10 }}
                    name="download"
                    size={17}
                    color={COLORS.background.white}
                  />
                </TouchableOpacity>
              )}
            </Box>
          </Box>
        </Box>
        <Box style={styles.content}>
          <Box style={styles.fileContainer}>
            <Box style={styles.pdfContainer}>
              <PdfViewer source={localPdfPath} handlePageChanged={handlePageChanged} />
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

export default BillsPdfViewer;
