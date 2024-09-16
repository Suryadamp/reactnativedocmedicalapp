// View Medical Records
/* eslint-disable react-hooks/exhaustive-deps */
import { Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Pdf from 'react-native-pdf';
import Share, { ShareOptions } from 'react-native-share';
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';

import { COLORS } from '../../../constants';
import { strings } from '../../../i18n';
import { RootStackParamList } from '../../../navigation/types';

import { Box, AppContainer } from '../../../components';
import { getMedicalRecordById } from '../../../service/MedicalRecordService';
import { formatDateBType } from '../../../util/DateUtil';
import { SvgIcon } from '../../../constants/SvgIcon';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import MenuBottomSheet from '../MenuBottomSheet';
import { deleteMedicalRecord, getMedicalRecords } from '../../../service/MedicalRecordService';
import { showErrorSnackBar, showSuccessSnackBar } from '../../../util/AlertUtil';
import { IMAGE_PDF_URL } from '../../../util/ApiUtil';
import styles from '../../../styles/MedicalRecords.styles';
import CustomHeader from '../../../components/CustomHeader';
import { RootState } from '../../../state';
import DeleteMedicine from '../../../dialogs/DeleteMedicineDialog';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

export const ViewMedicalRecord = ({ route, navigation }: Props) => {
  const appointment = route?.params?.appointment;
  const medicalRecordId = route?.params?.medicalRecordId;
  const setMedicalRecords = route?.params?.setMedicalRecords;
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [medicalRecord, setMedicalRecord] = useState<any>();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (medicalRecordId) {
      getMedicalRecord();
    }
  }, []);

  const getMedicalRecord = async () => {
    const resp = await getMedicalRecordById(medicalRecordId);

    if (resp.success) {
      setMedicalRecord(resp.data);
    }
  };

  const handleEdit = () => {
    const filePath = medicalRecord.name;
    const fileType = medicalRecord.name.split('/').pop().split('.').pop();
    navigation.navigate('ViewMedicalRecordPdf', {
      filePath: `${IMAGE_PDF_URL}${filePath}`,
      type: medicalRecord.type,
      fileType,
      fileName: `${medicalRecord.name.split('/').pop(1)}`,
    });
  };

  const downloadFile = async () => {
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${`${medicalRecord.name.split('/').pop(1)}`}`;
      const options = {
        fromUrl: `${IMAGE_PDF_URL}${medicalRecord.name}`,
        toFile: downloadDest,
        overwrite: true,
      };
      const result = await RNFS.downloadFile(options).promise;
      if (result.statusCode === 200) {
        console.log('File downloaded to:', downloadDest);
        return downloadDest;
      } else {
        console.error('Failed to download file');
        return null;
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      return null;
    }
  };

  const handleShare = async () => {
    try {
      const filePath = await downloadFile();
      if (filePath) {
        await shareFile(filePath);
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error sharing file from URL:', error);
    }
  };

  const getFileMimeType = (fileName: string) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      // Add more cases for other file types as needed
      default:
        return null; // Unknown MIME type
    }
  };

  const shareFile = async (filePath: string) => {
    try {
      const options: ShareOptions = {
        type: getFileMimeType(medicalRecord.name) || '',
        url: `file://${filePath}`,
      };
      await Share.open(options);
      console.log('File shared successfully');
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleDeleteRecord = () => {
    setLoader(true);
    return deleteMedicalRecord(medicalRecordId)
      .then((resp) => {
        if (resp.success) {
          getMedicalRecords(appointment?.id, selectedPatient?.id).then((response: any) => {
            setMedicalRecords(response.data);
            navigation.goBack();
            showSuccessSnackBar('Medical record delete successfully');
          });
        }
        setLoader(false);
        setOpenDelete(false);
      })
      .catch((error) => {
        showErrorSnackBar(error.message);
      });
  };

  const handleDelete = () => {
    setOpenMenu(false);
    setOpenDelete(true);
  };

  // Callback functions
  const handleLoadComplete = () => console.log('Loading Complete');
  const handlePageChanged = (page: number, totalPages: number) =>
    console.log(`${page}/${totalPages}`);

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle="dark-content"
        style={styles.container}
      >
        {/* Header & title section */}
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              onPress={handleHeaderNavigation}
            >
              <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={commonStyles.topTitleText}>{strings.displayText.recordDetails}</Text>
            </View>
          </Box>
        </Box> */}
        <CustomHeader
          leftIcon="arrow-left"
          onLeftIconPress={() => navigation.goBack()}
          title={strings.displayText.recordDetails}
          hasDivider
        />
        <Box style={styles.contentMediView}>
          {medicalRecord && (
            <Box style={styles.container1}>
              <Text style={styles.year}>
                {medicalRecord.date_created
                  ? new Date(medicalRecord.date_created).getFullYear()
                  : new Date().getFullYear()}
              </Text>
              <Text style={styles.date}>
                {medicalRecord.date_created
                  ? formatDateBType(medicalRecord.date_created, 'DD/MM/YYYY')
                  : formatDateBType(new Date(), 'DD/MM/YYYY')}
              </Text>
              <Text style={styles.recordTxt}>
                Records added by {appointment?.patient_name || selectedPatient?.name}
              </Text>
              <Text style={styles.countType}>1 {medicalRecord.type}</Text>
            </Box>
          )}
          {medicalRecord && (
            <TouchableOpacity style={styles.container2} onPress={handleEdit}>
              <Box style={styles.fileHeader}>
                <Text style={styles.fileTitle}>{medicalRecord.type}</Text>
                <TouchableOpacity style={styles.menuIcon} onPress={() => setOpenMenu(true)}>
                  <SvgIcon name="MenuIcon" />
                </TouchableOpacity>
              </Box>
              <Box style={styles.fileContainer}>
                {medicalRecord?.name?.split('/').pop().split('.').pop() === 'pdf' ? (
                  <Box style={styles.pdfContainerView}>
                    <Pdf
                      source={{ uri: `${IMAGE_PDF_URL}${medicalRecord.name}` }}
                      style={styles.pdfStyle}
                      page={1}
                      scale={1.0}
                      minScale={0.5}
                      maxScale={3.0}
                      trustAllCerts={false}
                      renderActivityIndicator={() => (
                        <ActivityIndicator color="black" size="large" />
                      )}
                      enablePaging={true}
                      onLoadComplete={handleLoadComplete}
                      onPageChanged={handlePageChanged}
                      spacing={10}
                    />
                  </Box>
                ) : (
                  <Box style={styles.imageContainer}>
                    <Image
                      source={{ uri: `${IMAGE_PDF_URL}${medicalRecord.name}` }}
                      style={styles.image}
                    />
                  </Box>
                )}
              </Box>
            </TouchableOpacity>
          )}
        </Box>
        {isOpenMenu && (
          <CustomBottomSheet
            openBSheet={isOpenMenu}
            snapPoints={['22%']}
            setSheetState={(data) => setOpenMenu(data)}
            backgroundStyle={styles.backgroundStyle}
            title="Options"
          >
            <MenuBottomSheet onShare={handleShare} onDelete={handleDelete} />
          </CustomBottomSheet>
        )}
      </AppContainer>
      {isOpenDelete && (
        <DeleteMedicine
          isOpenDelete={isOpenDelete}
          title="Medical Record"
          callback={handleDeleteRecord}
          loader={loader}
          onClose={() => setOpenDelete(false)}
          closeDialog={() => setOpenDelete(false)}
        />
      )}
    </>
  );
};

export default ViewMedicalRecord;
