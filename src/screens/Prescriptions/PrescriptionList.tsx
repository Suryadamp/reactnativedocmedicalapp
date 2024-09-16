import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, SIZES, assets } from '../../constants';
import { AppContainer, Box, CustomHeader, PatientBottomSheet } from '../../components';
import PrescriptionCard, { Prescription } from './PrescriptionCard';
import { RootState } from '../../state';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPrescriptionList,
  getAppointmentPrescriptions,
} from '../../service/PrescriptionService';
import { showSnackBar, showSuccessSnackBar, Snackbar } from '../../util/AlertUtil';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import CustomFilterBottomSheet from '../../components/CustomBottomSheet/CustomFilterBottomSheet';
import CustomCalenderBottomSheet from '../../components/CustomBottomSheet/CustomCalenderBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { strings } from '../../i18n';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import OptionBottomSheet from './OptionBottomSheet';
import commonStyles from '../../styles/Common.styles';
import styles from '../../styles/Prescription.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import CustomDataNotFound from '../../components/CustomDataNotFound';
import InpatientLoader from '../../components/InpatientLoader';
import DeleteMedicine from '../../dialogs/DeleteMedicineDialog';
import { setPrescriptionAction } from '../../state/prescriptions/prescriptionProduct';
import { deletePrescription } from '../../service/PrescriptionService';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}
interface IDate {
  start_date: string;
  end_date: string;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const selectOptions = ['All', 'Today', 'Custom'];

const PrescriptionList = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const { handleScroll } = useScrollEndDetection();
  const appointmentId = route?.params?.appointmentId || '';
  const [noPrescription, setNoPrescription] = useState(false);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const { prescriptionAction } = useSelector((state: RootState) => state.prescriptionProductList);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [filterDate, setFilterDate] = useState<IDate>({
    start_date: '',
    end_date: '',
  });
  const [prescriptionList, setPrescriptionList] = useState<Prescription[]>();
  const [prescriptionItem, setPrescriptionItem] = useState<Prescription[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [isCalenderOpen, setIsCalenderIsOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState('All');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  // BottomSheet Callbacks
  const handleClosePress = useCallback(() => {
    setIsOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleCalenderClosePress = useCallback(() => {
    setIsCalenderIsOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleOptionsClosePress = useCallback(() => {
    setIsOptionsOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleSelectedFilterType = (filterType: string | any) => {
    if (typeof filterType === 'string') {
      setSelectedFilterType(filterType);

      if (filterType === 'All') {
        setFilterDate({
          start_date: '',
          end_date: '',
        });
      } else {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setFilterDate({
          start_date: formattedDate,
          end_date: formattedDate,
        });
      }
    } else {
      setSelectedFilterType('Custom');
      setFilterDate({
        start_date: filterType?.startDate,
        end_date: filterType?.endDate,
      });
    }
  };

  const handleOpen = () => {
    setIsOptionsOpen(true);
  };

  useEffect(() => {
    if (selectedPatient?.name) {
      getPrescriptions();
    }
  }, [selectedPatient?.name, filterDate, prescriptionAction]);

  const getPrescriptions = async () => {
    const patientId =
      route?.params?.from === 'AdminAppointment' ? route.params.patientId : selectedPatient?.id;

    if (!appointmentId) {
      await getPrescriptionList(patientId, filterDate?.start_date, filterDate?.end_date)
        .then((resp) => {
          console.log({ resp });
          if (resp) {
            if (resp?.data?.length > 0) {
              setNoPrescription(false);
              setPrescriptionList(resp.data);
            } else {
              setNoPrescription(true);
              // showSnackBar('Invalid data');
            }
          } else {
            setNoPrescription(true);
            // showSnackBar('Invalid data');
          }
          setLoading(false);
        })
        .catch((_err) => {
          setNoPrescription(true);
          setLoading(false);
          // showSnackBar('Invalid data');
        });
    } else {
      await getAppointmentPrescriptions(appointmentId)
        .then((resp) => {
          if (resp) {
            if (resp?.data?.length > 0) {
              setNoPrescription(false);
              setPrescriptionList(resp.data);
            } else {
              setNoPrescription(true);
              // showSnackBar('Invalid data');
            }
          } else {
            setNoPrescription(true);
            // showSnackBar('Invalid data');
          }
          setLoading(false);
        })
        .catch((_err) => {
          setNoPrescription(true);
          setLoading(false);
        });
    }
  };

  const handleDelete = async () => {
    handleClosePress?.();
    setShowLoader(true);
    try {
      if (prescriptionItem?.id) {
        const result = await deletePrescription(prescriptionItem?.id);
        if (result?.message === 'Success') {
          dispatch(setPrescriptionAction(!prescriptionAction));
          showSuccessSnackBar('Deleted Successfully');
        } else {
          // showSnackBar('Delete Failed');
        }
        setShowDialog(false);
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      // Handle the error
      console.log('Error occurred:', error);
    }
  };

  return (
    <AppContainer
      statusBarBgColor={'transparent'}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon={navigation.getState().type === 'drawer' && !appointmentId ? 'menu' : 'arrow-left'}
        title={strings.displayText.prescriptions}
        rightIcon="plus"
        permission={UsePermission(permissionList.mobilePrescriptionAdd)}
        onLeftIconPress={() => {
          if (navigation.getState().type === 'drawer' && !appointmentId) {
            navigation.dispatch(DrawerActions.openDrawer());
          } else {
            navigation.goBack();
          }
        }}
        onRightIconPress={() => {
          navigation.navigate('CreateRemainder', {
            from: route?.params?.from,
            appointmentId,
          });
        }}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              if (navigation.getState().type === 'drawer') {
                navigation.dispatch(DrawerActions.openDrawer());
              } else {
                if (route?.params?.from === 'AdminAppointment') {
                  navigation.navigate('Appointment Booking');
                } else {
                  navigation.goBack();
                }
              }
            }}
          >
            <Image
              source={
                navigation.getState().type === 'drawer'
                  ? assets.HamburgerMenu
                  : assets.backArrowBlack
              }
              style={commonStyles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.prescriptions}</Text>
          {UsePermission(permissionList.mobilePrescriptionAdd) ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('CreateRemainder', {
                  from: route?.params?.from,
                  appointmentId,
                });
              }}
            >
              <Image source={assets.AddPlusBlue} style={commonStyles.menuIcon} />
            </TouchableOpacity>
          ) : (
            <Box />
          )}
        </Box>
      </Box> */}
      <Box marginTop={10}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingRight={20}
          backgroundColor={COLORS.grey_line}
        >
          <Box
            width={SIZES.screenWidth * 0.7}
            height={46}
            marginHorizontal={20}
            justifyContent="center"
          >
            <TouchableOpacity
              onPress={() => {
                setIsSelectOpen(true);
              }}
            >
              <Box display="flex" flexDirection="row">
                <IconButton
                  style={styles.accountIconStyle}
                  name="account"
                  size={commonStyles.userIcon.height}
                  color={COLORS.background.primary}
                />
                <Text style={styles.accNameStyle}>
                  {selectedPatient?.name ? selectedPatient?.name : 'Select'}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ left: 50, right: 50 }}
            onPress={() => {
              setIsOpen(true);
            }}
            style={{ justifyContent: 'center' }}
          >
            <Image source={assets.filterBlack} style={commonStyles.filterIcon} />
          </TouchableOpacity>
        </Box>
        {selectedPatient?.name && selectedFilterType !== 'All' && (
          <Box>
            <View style={styles.line} />
            <Box flexDirection="row" justifyContent="space-between">
              <Box flexDirection="row" marginHorizontal={10}>
                <Text style={styles.filterText}>{strings.displayText.filtersApplied} </Text>
                <Text style={styles.filterValue}>
                  {selectedFilterType}{' '}
                  {selectedFilterType === 'Custom'
                    ? filterDate?.start_date + ' - ' + filterDate?.end_date
                    : filterDate?.start_date}
                </Text>
              </Box>
              <Box marginHorizontal={styles.noAppointmentText.marginVertical}>
                <TouchableOpacity
                  onPress={() => {
                    handleSelectedFilterType('All');
                  }}
                >
                  <Text style={styles.clearText}>{strings.displayText.clearAll} </Text>
                </TouchableOpacity>
              </Box>
            </Box>
            <View style={[styles.line, styles.viewStyle]} />
          </Box>
        )}
      </Box>
      {isLoading && <InpatientLoader />}
      {!isLoading && noPrescription ? (
        <CustomDataNotFound text="No prescriptions found" type="prescription" />
      ) : (
        !isLoading && (
          <Box height={SIZES.screenHeight / 1.2}>
            <FlatList
              style={styles.scrollViewStyle}
              data={prescriptionList}
              onScroll={handleScroll}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  // disabled={item?.access || Boolean(appointmentId)}
                  disabled={Boolean(appointmentId)}
                  onPress={() => {
                    navigation.navigate('PrescriptionDetail', { item: [item] });
                  }}
                >
                  <PrescriptionCard
                    item={item}
                    handleOpen={handleOpen}
                    setSelectItem={setPrescriptionItem}
                    key={index?.toString()}
                    isAppointment={Boolean(appointmentId)}
                  />
                </TouchableOpacity>
              )}
            />
          </Box>
        )
      )}
      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          snapPoints={[
            '40%',
            // Platform.OS === 'ios' ? isHpBottomTablet('48', 1.2) : `${isHpBottomTablet(6, 2)}`,
          ]}
          title="Filters"
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          enableDynamicSizing
          backgroundStyle={styles.backgroundStyle}
        >
          <CustomFilterBottomSheet
            selectOptions={selectOptions}
            handleSelectedFilterType={handleSelectedFilterType}
            handleClosePress={handleClosePress}
            setSheetState={setIsCalenderIsOpen}
          />
        </CustomBottomSheet>
      )}
      {isCalenderOpen && (
        <CustomBottomSheet
          openBSheet={isCalenderOpen}
          snapPoints={[
            // Platform.OS === 'ios' ? isHpBottomTablet(83, 1.6) : `${isHpBottomTablet(9.5)}`,
            '83%',
          ]}
          setSheetState={setIsCalenderIsOpen}
          enablePanDownToClose={false}
          enableDynamicSizing
          backgroundStyle={styles.backgroundStyle}
          title="Custom Date"
        >
          <CustomCalenderBottomSheet
            handleSelectedFilterType={handleSelectedFilterType}
            handleClosePress={handleCalenderClosePress}
            handleParentClosePress={handleClosePress}
          />
        </CustomBottomSheet>
      )}
      {isOptionsOpen && (
        <CustomBottomSheet
          openBSheet={isOptionsOpen}
          // snapPoints={[Platform.OS === 'ios' ? '18%' : `${isHpBottomTablet(2.2)}`]}
          snapPoints={['18%']}
          setSheetState={setIsOptionsOpen}
          enablePanDownToClose={false}
          enableDynamicSizing
          backgroundStyle={styles.backgroundStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title="Options"
        >
          <OptionBottomSheet
            selectedItem={prescriptionItem}
            handleClosePress={handleOptionsClosePress}
            onDelete={() => {
              setShowDialog(true);
              setIsOptionsOpen(false);
            }}
            navigation={navigation}
          />
        </CustomBottomSheet>
      )}
      {isSelectOpen && <PatientBottomSheet isOpen={isSelectOpen} setIsOpen={setIsSelectOpen} />}
      {showDialog && (
        <DeleteMedicine
          visible={showDialog}
          onClose={() => setShowDialog(false)}
          callback={handleDelete}
          closeDialog={() => setShowDialog(false)}
          loader={showLoader}
        />
      )}
    </AppContainer>
  );
};

export default PrescriptionList;
