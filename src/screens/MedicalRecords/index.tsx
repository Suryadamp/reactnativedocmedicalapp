// Medical Records
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, FlatList } from 'react-native';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../../navigation/types';
import { COLORS, assets } from '../../constants';
import {
  AppContainer,
  Box,
  CustomDataNotFound,
  CustomHeader,
  PatientBottomSheet,
} from '../../components';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import { strings } from '../../i18n';
import { getMedicalRecords } from '../../service/MedicalRecordService';
import MenuBottomSheet from './MenuBottomSheet';
import { SvgIcon } from '../../constants/SvgIcon';
import { showErrorSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import { getMedicalRecordById, deleteMedicalRecord } from '../../service/MedicalRecordService';
import { IMAGE_PDF_URL } from '../../util/ApiUtil';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import styles from '../../styles/MedicalRecords.styles';
import commonStyles from '../../styles/Common.styles';
import InpatientLoader from '../../components/InpatientLoader';
import { useScrollEndDetection } from '../../hooks/useLogs';
import { RootState } from '../../state';
import DeleteMedicine from '../../dialogs/DeleteMedicineDialog';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Item = {
  date_created: string;
  id: number;
  patient_id: string;
  patient_name: string;
  name: string;
  type?: string;
};

type ResponseData = {
  item: Item;
  onMenu: (medicalRecordId: any) => void;
  onEdit: (medicalRecordId: any) => void;
};

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString(undefined, { day: 'numeric' });
  const month = date.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  return { day, month };
};

const MedicalItem = ({ item, onMenu, onEdit }: ResponseData) => {
  const date = item.date_created
    ? formatDate(item.date_created)
    : {
        day: new Date().toLocaleDateString(undefined, { day: 'numeric' }),
        month: new Date().toLocaleDateString(undefined, { month: 'short' }).toUpperCase(),
      };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onEdit(item)}>
      <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box style={styles.billBoxStyle}>
          <Box style={styles.dayBoxStyle}>
            <Text style={styles.dayStyle}>{date && date.day}</Text>
          </Box>
          <Text style={styles.monthStyle}>{date && date.month}</Text>
          <Image source={assets.Line} style={styles.separator} />
        </Box>
        <Box style={styles.card}>
          <Box>
            <Text style={styles.cardTitleStyle}>Records Added by {item?.patient_name}</Text>
            <Text style={styles.nameStyle}>Records for {item.patient_name}</Text>
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.billNoStyle}>{`1 ${item.type}`}</Text>
            </Box>
          </Box>
          <Box style={{ paddingLeft: '8%' }}>
            <TouchableOpacity
              hitSlop={{ left: 50, right: 50, top: 20, bottom: 50 }}
              style={styles.iconSpace}
              onPress={() => onMenu(item)}
            >
              <SvgIcon name="MenuIcon" />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export const MedicalRecords = ({ route, navigation }: Props) => {
  const appointment = route?.params?.appointment;
  // const { userId } = useSelector((state: RootState) => state.users);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [medicalRecord, setRecord] = useState<any>();
  const [isOpenPatient, setIsOpenPatient] = useState<boolean>(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [loader, setLoader] = useState(false);
  const { handleScroll } = useScrollEndDetection();

  useEffect(() => {
    getMedicalRecords(appointment?.id || '', selectedPatient?.id || '')
      .then((resp) => {
        setMedicalRecords(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('ERROR in getMedicalRecords', err.message);
        setLoading(false);
      });
  }, [selectedPatient?.id, appointment?.id]);

  const handleMenu = (record: string) => {
    setRecord(record);
    setOpenMenu(true);
  };

  const handleEdit = (record: any) => {
    navigation.navigate('ViewMedicalRecord', {
      medicalRecordId: record.id,
      appointment,
      setMedicalRecords,
    });
    setOpenMenu(false);
  };

  const downloadFile = async (filePath: string) => {
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${`${filePath.split('/').pop()}`}`;
      const options = {
        fromUrl: `${IMAGE_PDF_URL}${filePath}`,
        toFile: downloadDest,
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
    const resp = await getMedicalRecordById(medicalRecord.id);
    if (resp.success) {
      try {
        const filePath = await downloadFile(resp.data.name);
        if (filePath) {
          await shareFile(filePath);
        } else {
          console.error('Failed to download file');
        }
      } catch (error) {
        console.error('Error sharing file from URL:', error);
      }
    }

    setOpenMenu(false);
  };

  const getFileMimeType = (fileName: string) => {
    const extension = fileName ? fileName?.split('.')?.pop()?.toLowerCase() : '';
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
      const options: any = {
        type: getFileMimeType(medicalRecord.name),
        url: `file://${filePath}`,
      };
      await Share.open(options);
      setOpenMenu(false);
      console.log('File shared successfully');
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleDeleteRecord = () => {
    setLoader(true);
    return deleteMedicalRecord(medicalRecord.id)
      .then((resp) => {
        if (resp.success) {
          getMedicalRecords(appointment?.id, selectedPatient?.id).then((response) => {
            setMedicalRecords(response.data);
          });
          showSuccessSnackBar('Medical record delete successfully');
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

  console.log('medicalRecords', medicalRecords);
  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <CustomHeader
          leftIcon={
            navigation.getState().type === 'drawer' && !appointment?.id ? 'menu' : 'arrow-left'
          }
          title={strings.displayText.medicalRecords}
          rightIcon="plus"
          hasDivider
          permission={UsePermission(permissionList.moibileMediRecordAdd) && appointment}
          onLeftIconPress={() => {
            if (navigation.getState().type === 'drawer' && !appointment?.id) {
              navigation.dispatch(DrawerActions.openDrawer());
            } else {
              navigation.goBack();
            }
          }}
          onRightIconPress={() => {
            navigation.navigate('AddMedicalRecord', { appointment, setMedicalRecords });
          }}
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between" marginVertical={10}>
          <Text style={styles.yearMarginStyle}>
            {(appointment ? new Date(appointment.appoint_date) : new Date()).getFullYear()}
          </Text>
          <Box>
            <TouchableOpacity
              onPress={() => {
                setIsOpenPatient(true);
              }}
            >
              <Box style={styles.accountBoxIconStyle}>
                <IconButton
                  style={styles.accountIconStyle}
                  name="account"
                  size={commonStyles.userIcon.height}
                  color={COLORS.background.primary}
                />
                <Text style={styles.accNameStyle}>
                  {appointment?.patient_name || selectedPatient?.name}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box style={styles.listContainer}>
          {isLoading && (
            <Box
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '90%' }}
            >
              <InpatientLoader />
            </Box>
          )}
          {!isLoading && medicalRecords && medicalRecords.length > 0 && (
            <FlatList
              style={styles.scrollViewStyle}
              data={medicalRecords}
              onScroll={handleScroll}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => (
                <MedicalItem item={item} onMenu={handleMenu} onEdit={handleEdit} />
              )}
            />
          )}
          {!isLoading && medicalRecords.length === 0 && (
            <Box
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '90%' }}
            >
              <CustomDataNotFound type="medicalRecords" />
            </Box>
          )}
        </Box>

        <Box marginTop={10} />
      </AppContainer>
      {isOpenPatient && <PatientBottomSheet isOpen={isOpenPatient} setIsOpen={setIsOpenPatient} />}
      {isOpenMenu && (
        <CustomBottomSheet
          openBSheet={isOpenMenu}
          // snapPoints={[`${isHpBottomTablet(3)}`]}
          snapPoints={['30%']}
          setSheetState={(data) => setOpenMenu(data)}
          enableDynamicSizing
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title="Options"
        >
          <MenuBottomSheet
            isEdit
            onEdit={handleEdit}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        </CustomBottomSheet>
      )}
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

export default MedicalRecords;
