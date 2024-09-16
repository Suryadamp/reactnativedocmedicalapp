import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Image, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, SIZES, assets } from '../../constants';
import { AbstractButton, AppContainer, Box, CustomHeader } from '../../components';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import CustomBillPayFilterBottomSheet from '../../components/CustomBottomSheet/CustomBillPayFilterBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { strings } from '../../i18n';
import { createBillPayment, getBillAndPaymentList } from '../../service/BillAndPaymentService';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import CustomCalenderBottomSheet from '../../components/CustomBottomSheet/CustomCalenderBottomSheet';
import { DrawerActions } from '@react-navigation/native';
import { handleRazorPayment } from '../../util/CommonFunctions';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../../styles/Common.styles';
import styles from '../../styles/BillAndPayments.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import InpatientLoader from '../../components/InpatientLoader';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}

type PatientDetails = {
  id: number;
  mobile: string;
  name: string;
  title: string;
};

type DoctorDetails = {
  id: number;
  name: string;
};

type DepartmentDetails = {
  id: number;
  dept_name: string;
};

type Item = {
  balance: string;
  bill_no: string;
  date_created: string;
  department_details: DepartmentDetails;
  dept_id: string;
  doctor: DoctorDetails;
  doctor_id: string;
  id: number;
  is_paid: string;
  net_total_amt: string;
  paid_amt: string;
  patient_id: string;
  patients_details: PatientDetails;
  type?: string;
};

type ResponseData = {
  item: Item;
};

type DateType = {
  startDate: string;
  endDate: string;
};

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const BillsCard = ({ item, handleSelectedFilterType, selectedFilterType, navigation }: any) => {
  const [showLoader, setShowLoader] = useState(false);
  const [selectBill, setSelectBill] = useState<any>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString(undefined, { day: 'numeric' });
    const month = date.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const handlePayment = (item: Item) => {
    setSelectBill(item);
    setShowLoader(true);
    const paymentItems = {
      description: item?.department_details?.dept_name,
      amount: item?.net_total_amt,
      name: item?.doctor?.name,
    };

    handleRazorPayment(paymentItems)
      .then(async (result) => {
        if (result.success) {
          // Payment successful, access result.response
          console.log('Success:', result.response?.razorpay_payment_id);
          const data = {
            type: item?.type,
            transaction_id: result.response?.razorpay_payment_id,
            transaction_by: 'Razorpay',
          };
          await createBillPayment(item?.id, data)
            .then((res) => {
              navigation.navigate('TransactionSuccess', {
                item: res?.data,
                header: 'Success',
                paymentItems,
              });
              handleSelectedFilterType(selectedFilterType);
            })
            .catch((err) => {
              navigation.navigate('TransactionSuccess', {
                header: 'Failed',
                paymentItems,
                err,
              });
            });
        } else {
          // Payment failed, access result.error
          console.log('Error:', result.error?.code, result.error?.description);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        // Handle unexpected errors
        setShowLoader(false);
        console.log('Unexpected error:', error);
      });
  };

  const { day, month } = formatDate(item?.date_created);
  return (
    <TouchableOpacity
      disabled={!UsePermission(permissionList.mobileBillsPaymentInvoice)}
      onPress={() => {
        navigation.navigate('BillsPdfViewer', { item });
      }}
    >
      <Box style={styles.cardContainer}>
        <Box style={styles.billBoxStyle}>
          <Box style={styles.dayBoxStyle}>
            <Text style={styles.dayStyle}>{day}</Text>
          </Box>
          <Text style={styles.monthStyle}>{month}</Text>

          <Image source={assets.Line} style={styles.seperator} />
        </Box>
        <Box style={styles.card}>
          <Box style={styles.cardContent}>
            <Box marginBottom={10} marginHorizontal={20}>
              <Text style={styles.cardTitleStyle}>{item?.department_details?.dept_name} Bill</Text>
              <Text style={styles.nameStyle}>{item?.doctor?.name ?? 'Doctor Name'}</Text>
              <Text style={styles.billNoStyle}>{item?.bill_no}</Text>
            </Box>
            <Box marginBottom={30}>
              <Text style={styles.amountTxtStyle}>
                {'₹ '}
                {item?.net_total_amt}
              </Text>

              <AbstractButton
                buttonStyle={[
                  styles.payBtnStyle,
                  {
                    backgroundColor:
                      Number(item?.is_paid) === 0 ? COLORS.background.primary : COLORS.green,
                  },
                ]}
                disabled={
                  Number(item?.is_paid) === 0 && UsePermission(permissionList.mobileBillsPaymentPay)
                    ? false
                    : true
                }
                textStyle={styles.bookAgainTxtStyle}
                onPress={() => {
                  Number(item?.is_paid) === 0 ? handlePayment(item) : null;
                }}
              >
                {Number(item?.is_paid) === 0 ? 'Pay Now' : 'Paid'}
              </AbstractButton>
            </Box>
          </Box>
          <Box style={styles.divider} />
          <Box style={styles.marginStyle} />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const BillsPayment = ({ navigation }: Props) => {
  const { handleScroll } = useScrollEndDetection();
  // const { userId } = useSelector((state: RootState) => state.users);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [billPayment, setBillPayment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCalenderOpen, setIsCalenderIsOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState('All');
  const [dateRange, setDateRange] = useState<DateType>();
  const [isLoading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    getBillAndPaymentDetails('All', {
      startDate: null,
      endDate: null,
    });
  }, [selectedPatient?.id]);

  const getBillAndPaymentDetails = async (
    filter: string,
    date: { startDate: string | null; endDate: string | null },
  ) => {
    try {
      await getBillAndPaymentList(selectedPatient?.id, filter, date).then((res) => {
        setBillPayment(res?.data);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSelectedFilterType = (filterType: string) => {
    if (typeof filterType === 'string') {
      setSelectedFilterType(filterType);
      getBillAndPaymentDetails(filterType, {
        startDate: null,
        endDate: null,
      });
    } else {
      setSelectedFilterType('Custom');
      setDateRange(filterType);
      getBillAndPaymentDetails('Custom', filterType);
    }
  };
  return (
    <>
      <AppContainer
        statusBarBgColor={'transparent'}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <CustomHeader
          leftIcon={navigation.getState().type === 'drawer' ? 'menu' : 'arrow-left'}
          title={strings.displayText.billAndPaymet}
          rightIcon="Advance"
          rightIconType="text"
          onLeftIconPress={() => {
            if (navigation.getState().type === 'drawer') {
              navigation.dispatch(DrawerActions.openDrawer());
            } else {
              navigation.goBack();
            }
          }}
          onRightIconPress={() => {
            navigation.navigate('AdvancePayment');
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
                  navigation.goBack();
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
            <Box marginLeft={30}>
              <Text style={commonStyles.topTitleText}>{strings.displayText.billAndPaymet}</Text>
            </Box>
            {UsePermission(permissionList.mobileBillsPaymentAdvance) ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('AdvancePayment');
                }}
              >
                <Box>
                  <Text style={styles.advanceTitle}>{strings.displayText.advance}</Text>
                </Box>
              </TouchableOpacity>
            ) : (
              <Box />
            )}
          </Box>
        </Box> */}
        <Box marginTop={10} />
        <Box style={styles.divider} />
        {isLoading && <InpatientLoader />}
        {!isLoading && (
          <>
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
                // justifyContent="center"
                alignContent="center"
                display="flex"
                flexDirection="row"
              >
                <Text style={styles.marginTopStyle}>{selectedFilterType}</Text>
                {selectedFilterType === 'Custom' ? (
                  <Text style={styles.marginTopStyle}>
                    {' ('}
                    {dateRange?.startDate} - {dateRange?.endDate} {')'}
                  </Text>
                ) : null}
              </Box>
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ bottom: 15, top: 15, left: 100, right: 70 }}
                style={styles.filterIconStyle}
                onPress={() => setIsOpen(true)}
              >
                <Image source={assets.filterBlack} style={commonStyles.filterIcon} />
              </TouchableOpacity>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginVertical={10}
            >
              <Text style={styles.yearMarginStyle}>2024</Text>
              <Box>
                <Box style={styles.accountBoxIconStyle}>
                  <IconButton
                    style={styles.accountIconStyle}
                    name="account"
                    size={commonStyles.userIcon.height}
                    color={COLORS.background.primary}
                  />
                  <Text style={styles.accNameStyle}>{selectedPatient?.name}</Text>
                </Box>
              </Box>
            </Box>
            {billPayment.length > 0 && (
              <Box style={styles.billContainer}>
                <FlatList
                  style={styles.scrollViewStyle}
                  data={billPayment}
                  onScroll={handleScroll}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <BillsCard
                      selectedFilterType={selectedFilterType}
                      navigation={navigation}
                      item={item}
                      handleSelectedFilterType={handleSelectedFilterType}
                    />
                  )}
                />
              </Box>
            )}
            {(!billPayment || billPayment.length === 0) && (
              <Box style={styles.boxFlexStyle}>
                <Box style={styles.ScrollViewStyle}>
                  <Box style={styles.notFoundTextStyle}>
                    <Image source={assets.Payment} />
                    <Text>{strings.displayText.npBillFound}</Text>
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}
      </AppContainer>
      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          // snapPoints={[
          //   Platform.OS === 'ios' ? isHpBottomTablet('61', 1.7) : `${isHpBottomTablet(6.8)}`,
          // ]}
          snapPoints={['70%']}
          enableDynamicSizing
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.filters}
        >
          <CustomBillPayFilterBottomSheet
            handleSelectedFilterType={handleSelectedFilterType}
            handleClosePress={handleClosePress}
            setSheetState={setIsCalenderIsOpen}
          />
        </CustomBottomSheet>
      )}
      {isCalenderOpen && (
        <CustomBottomSheet
          openBSheet={isCalenderOpen}
          // snapPoints={[
          //   Platform.OS === 'ios' ? isHpBottomTablet('70', 1.2) : `${isHpBottomTablet(9.5)}`,
          // ]}
          snapPoints={['72%']}
          enableDynamicSizing
          setSheetState={setIsCalenderIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.selectDate}
        >
          <CustomCalenderBottomSheet
            handleSelectedFilterType={handleSelectedFilterType}
            handleClosePress={handleCalenderClosePress}
            handleParentClosePress={handleClosePress}
          />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default BillsPayment;
