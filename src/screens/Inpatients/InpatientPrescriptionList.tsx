/* eslint-disable react-native/no-inline-styles */
// PrescriptionList
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../../navigation/types';
import { COLORS, SIZES } from '../../constants';
import { AppContainer, Box, CustomDataNotFound, CustomHeader } from '../../components';
import { RootState } from '../../state';
import {
  inpatientGetPrescriptions,
  inpatientDeletePrescription,
} from '../../service/InpatientService';
import { showErrorSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import { strings } from '../../i18n';
import styles from '../../styles/Prescription.styles';
import inpatientStyles from '../../styles/Inpatients/InpatientPrescription.styles';
import InpatientPrescriptionCard from './PrescriptionCard';
import { SvgIcon } from '../../constants/SvgIcon';
import InpatientLoader from '../../components/InpatientLoader';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const InpatientPrescriptionList = ({ navigation }: Props) => {
  const { prescriptions, selectedInpatient } = useSelector((state: RootState) => state.inpatients);
  const { handleScroll } = useScrollEndDetection();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [prescriptionItem, setPrescriptionItem] = useState<any>();
  const [prescriptionItems, setPrescriptions] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setPrescriptions(prescriptions);
  }, [prescriptions]);

  const handleOpen = () => {
    setIsOptionsOpen(true);
  };

  const handleDelete = () => {
    setIsOptionsOpen(false);
    Alert.alert('Delete confirmation', 'Are you sure you want to delete this record ?', [
      {
        text: 'No',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => onDelete() },
    ]);
  };

  const onDelete = () => {
    setLoading(true);
    inpatientDeletePrescription(prescriptionItem.id)
      .then(async (resp) => {
        if (resp) {
          if (resp?.success) {
            await inpatientGetPrescriptions(selectedInpatient?.ip_admissions.id);
            showSuccessSnackBar('Prescription deleted successfully');
            setLoading(false);
          } else {
            showErrorSnackBar(resp.message);
          }
        } else {
          showErrorSnackBar('Something went wrong');
        }
      })
      .catch((err) => {
        showErrorSnackBar(err.message);
      });
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon="arrow-left"
        title={strings.displayText.prescriptions}
        hasDivider
        permission
        rightIcon="plus"
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => {
          navigation.navigate('InpatientAddPrescription');
        }}
      />
      {/* <Box style={inpatientStyles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.prescriptions}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('InpatientAddPrescription');
            }}
          >
            <Image source={assets.AddPlusBlue} style={commonStyles.menuIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {isLoading && <InpatientLoader />}
      {!isLoading && (
        <Box marginTop={10}>
          {prescriptionItems.length === 0 && (
            <Box style={{ justifyContent: 'center', width: '100%', height: '90%' }}>
              <CustomDataNotFound type="prescription" />
            </Box>
          )}
          {prescriptionItems.length > 0 && (
            <Box height={SIZES.screenHeight / 1.2}>
              <FlatList
                style={styles.scrollViewStyle}
                data={prescriptionItems}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <InpatientPrescriptionCard
                    item={item}
                    setSelectItem={setPrescriptionItem}
                    key={index?.toString()}
                    handleOpen={handleOpen}
                  />
                )}
              />
            </Box>
          )}
        </Box>
      )}
      {isOptionsOpen && (
        <CustomBottomSheet
          openBSheet={isOptionsOpen}
          // snapPoints={[Platform.OS === 'ios' ? '18%' : `${isHpBottomTablet(2.5)}`]}
          snapPoints={['20%']}
          enableDynamicSizing
          setSheetState={setIsOptionsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title="Options"
        >
          <Box style={inpatientStyles.menuContainer}>
            <TouchableOpacity style={styles.bsItem} onPress={handleDelete}>
              <SvgIcon name="TrashIcon" />
              <Text style={inpatientStyles.trashTitle}>Delete</Text>
            </TouchableOpacity>
          </Box>
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default InpatientPrescriptionList;
