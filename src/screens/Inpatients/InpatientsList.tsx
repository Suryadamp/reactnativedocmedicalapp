/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
// InPatients
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';

import { RootStackParamList } from '../../navigation/types';
import { COLORS, FONTS, assets } from '../../constants';
import { SvgIcon } from '../../constants/SvgIcon';
import { AppContainer, Box, CustomBottomSheet, CustomHeader } from '../../components';
import { strings } from '../../i18n';
import store, { RootState } from '../../state';
import {
  getInpatientList,
  inpatientGetById,
  inpatientGetPrescriptions,
  inpatientDelete,
} from '../../service/InpatientService';

import InpatientLoader from '../../components/InpatientLoader';
import InpatientCard from '../../components/InpatientCard';
import InpatientFilterBottomSheet from '../../sheets/Inpatients/FilterBottomSheet';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {
  showErrorSnackBar,
  showSnackBar,
  showSuccessSnackBar,
  Snackbar,
} from '../../util/AlertUtil';
import commonStyles from '../../styles/Common.styles';
import { isHpTablet } from '../../hooks/useDeviceCheck';
import { CustomDataNotFound } from '../../components';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const InpatientsList = ({ navigation }: Props) => {
  const currentState = store.getState();
  const { inpatientList } = useSelector((state: RootState) => state.inpatients);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedInPatient, setInpatient] = useState<any>('');
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const [isOpenFilter, setOpenFilterSheet] = useState<boolean>(false);
  const [inpatients, setInpatients] = useState<any>(inpatientList);
  const [filterValues, setFilterValues] = useState<any>([]);
  const [filterType, setFilterType] = useState<any>([]);

  useEffect(() => {
    getInpatients();
  }, []);

  useEffect(() => {
    setInpatients(inpatientList);
  }, [inpatientList]);

  const getInpatients = async () => {
    if (inpatientList.length === 0) {
      await getInpatientList().then((response) => {
        if (response.success || response.data) {
          setInpatients(response.data);
          setIsLoading(false);
        }
      });
    } else {
      setInpatients(inpatientList);
    }
    setIsLoading(false);
  };

  const handleMenu = (ipAdmission: any) => {
    if (ipAdmission.status != 'Discharge') {
      setInpatient(ipAdmission);
      setOpenMenu(true);
    }
  };

  const onRoomTransfer = () => {
    navigation.navigate('InpatientRoomTransfer', {
      ipAdmissionId: selectedInPatient.id,
      patientName: selectedInPatient.name,
    });
    setOpenMenu(false);
  };

  const onDelete = () => {
    Alert.alert('Delete confirmation', 'Are you sure you want to delete this record ?', [
      {
        text: 'No',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => handleDelete() },
    ]);
    // Left empty
  };

  const handleDelete = () => {
    setOpenMenu(false);
    setIsLoading(true);

    inpatientDelete(selectedInPatient?.id)
      .then(async (resp) => {
        console.log('inpatientDelete', JSON.stringify(resp));
        if (resp) {
          if (resp?.success) {
            getInpatients();
            if (resp?.data?.original?.status === 'error') {
              const message = resp?.data?.original?.message
                ?.map((item: any) => item.table)
                .join(',');
              showErrorSnackBar(
                `You can't delete this admission because you have the data for ${message}`,
              );
              setIsLoading(false);
            } else {
              showSuccessSnackBar('Inpatient deleted successfully');
            }
          } else {
            showErrorSnackBar('Something went wrong');
          }
        } else {
          showErrorSnackBar('Something went wrong');
        }
      })
      .catch((err) => {
        showErrorSnackBar(err.message);
      });
  };

  const handleApplyFilter = (tabName: string, option: any) => {
    if (tabName == strings.displayText.uhidNumber) {
      setInpatients(inpatientList.filter((inpatient: any) => inpatient.uhid == option.uhid));
      setFilterValues([option.uhid]);
      setFilterType('uhid');
      setOpenFilterSheet(false);
    } else if (tabName == strings.displayText.ipNo) {
      setInpatients(inpatientList.filter((inpatient) => inpatient.ip_no == option.ipNo));
      setOpenFilterSheet(false);
      setFilterValues([option.ipNo]);
      setFilterType('ipNo');
    } else {
      const today = new Date();

      if (option.date === 'Last 1 Year') {
        const lastYear = new Date(today);
        lastYear.setMonth(today.getFullYear() - 1);
        setInpatients(
          inpatientList.filter(
            (inpatient) => inpatient.doa >= lastYear && inpatient.doa <= lastYear,
          ),
        );
      } else if (option.date === 'Last 6 Month') {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 6);
        setInpatients(
          inpatientList.filter(
            (inpatient) => inpatient.doa >= lastMonth && inpatient.doa <= lastMonth,
          ),
        );
      }
      setOpenFilterSheet(false);
    }
  };

  const handleClearFilter = () => {
    setInpatients(inpatientList);
    setFilterValues([]);
    setOpenFilterSheet(false);
  };

  const onPrescription = async (ipAdmission: any) => {
    await inpatientGetById(ipAdmission.id);
    await inpatientGetPrescriptions(ipAdmission?.id);
    navigation.navigate('InpatientPrescriptionList', {
      ipAdmissionId: ipAdmission.id,
      patientName: ipAdmission.name,
      ipAdmission,
    });
  };

  const onVitals = async (ipAdmission: any) => {
    if (currentState.network.isConnected) {
      await inpatientGetById(ipAdmission.id);
    }
    navigation.navigate('InpatientVitalList', {
      ipAdmissionId: ipAdmission.id,
      doctorId: ipAdmission.doctorId,
    });
  };

  const onInvestigation = async (ipAdmission: any) => {
    console.log('ipAdmission', ipAdmission);
    await inpatientGetById(ipAdmission.id);
    navigation.navigate('InpatientInvestigation', {
      ipAdmission,
    });
  };

  const onInvoice = async (ipAdmission: any) => {
    await inpatientGetById(ipAdmission.id);
    navigation.navigate('InpatientInvoice', {
      ipAdmission,
    });
  };

  const handleClickDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon="menu"
        title={strings.displayText.admissionList}
        onRightIconPress={() => {
          navigation.navigate('AddInpatient');
        }}
        rightIcon="plus"
        permission
        onLeftIconPress={handleClickDrawer}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={handleClickDrawer}
          >
            <Image source={assets.HamburgerMenu} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.admissionList}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('AddInpatient');
            }}
          >
            <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {isLoading && (
        <Box style={{ width: '100%', height: '100%' }} justifyContent="center" alignItems="center">
          <InpatientLoader />
        </Box>
      )}
      {!isLoading && (
        <>
          {inpatients.length > 0 && (
            <Box style={styles.filterContainer}>
              {filterValues.length > 0 ? (
                <Text>
                  {`${strings.displayText.resultsFound} `}
                  <Text style={styles.countStyle}>({`${inpatients.length}`})</Text>
                </Text>
              ) : (
                <Text style={styles.filterText}>{strings.displayText.filters}</Text>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ left: 60, right: 60, top: 20, bottom: 60 }}
                onPress={() => setOpenFilterSheet(true)}
                style={{ justifyContent: 'center' }}
              >
                <Image source={assets.filterBlack} style={commonStyles.filterIcon} />
              </TouchableOpacity>
            </Box>
          )}
          {filterValues.length > 0 && (
            <Text
              style={styles.filterApplied}
            >{`${strings.displayText.filtersApplied} ${filterValues.join(',')}`}</Text>
          )}
          {inpatients.length === 0 && <CustomDataNotFound type="bills" />}
          {inpatients.length > 0 && (
            <ScrollView style={{ marginVertical: '3%' }}>
              {inpatients.map((item: any) => (
                <InpatientCard
                  key={`ip-${item.id}`}
                  ipAdmission={item}
                  onMenu={handleMenu}
                  onVitals={onVitals}
                  onPrescription={onPrescription}
                  onInvestigation={onInvestigation}
                  onInvoice={onInvoice}
                />
              ))}
            </ScrollView>
          )}
        </>
      )}
      {isOpenMenu && (
        <CustomBottomSheet
          openBSheet={isOpenMenu}
          // snapPoints={[
          //   Platform.OS === 'ios' ? `${isHpBottomTablet('4.5', 2.9)}` : `${isHpBottomTablet(3.5)}`,
          // ]}
          snapPoints={['30%']}
          enableDynamicSizing
          setSheetState={(data) => setOpenMenu(data)}
          backgroundStyle={styles.backgroundStyle}
          title="Options"
        >
          <Box style={styles.menuContainer}>
            <TouchableOpacity style={styles.bsItem} onPress={onRoomTransfer}>
              <SvgIcon name="RoomTransferIcon" />
              <Text style={styles.title}>{strings.displayText.roomTransfer}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bsItem} onPress={onDelete}>
              <SvgIcon name="TrashIcon" />
              <Text style={styles.trashTitle}>Delete</Text>
            </TouchableOpacity>
          </Box>
        </CustomBottomSheet>
      )}
      {isOpenFilter && (
        <CustomBottomSheet
          openBSheet={isOpenFilter}
          snapPoints={[
            Platform.OS === 'ios' ? `${isHpBottomTablet(10, 3)}` : `${isHpBottomTablet(7, 2.8)}`,
          ]}
          enablePanDownToClose={false}
          setSheetState={(data) => setOpenFilterSheet(data)}
          backgroundStyle={styles.backgroundStyle}
          title="Filters"
        >
          <InpatientFilterBottomSheet
            filterType={filterType}
            filterValues={filterValues}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
          />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default InpatientsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    justifyContent: 'center',
    marginTop: 10,
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
    fontFamily: FONTS.SFProDisplayBold,
    fontWeight: '600',
    justifyContent: 'center',
  },
  icon: {
    height: 22,
    width: 22,
    justifyContent: 'center',
  },
  addIcon: {
    height: 22,
    width: 22,
    justifyContent: 'center',
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: '2%',
  },
  title: {
    fontSize: 16,
    color: '#232323',
    paddingHorizontal: 10,
  },
  trashTitle: {
    fontSize: 16,
    color: '#FE0000',
    paddingHorizontal: 10,
  },
  bsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: isHpTablet('8%'),
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.white_smoke,
    borderBottomWidth: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
  filterIcon: { alignItems: 'center', height: 16, width: 16 },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    backgroundColor: '#F5F5F5',
    height: heightPercentageToDP('7%'),
  },
  filterText: {
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
  },
  filterApplied: {
    fontSize: isHpTablet('1.8%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#232323',
    paddingHorizontal: '6%',
    paddingVertical: '2%',
  },
  resultFound: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#207DFF',
    paddingHorizontal: '3%',
  },
  countStyle: {
    fontSize: 15,
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#207DFF',
    paddingHorizontal: '3%',
  },
});
