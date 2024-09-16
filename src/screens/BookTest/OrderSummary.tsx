import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, assets } from '../../constants';
import {
  AbstractButton,
  AppContainer,
  Box,
  PatientBottomSheet,
  CustomHeader,
} from '../../components';
import { strings } from '../../i18n';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import TestPreparationBottomSheet from './TestPreparationBottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { addBillPayment } from '../../service/BillAndPaymentService';
import { handleRazorPayment } from '../../util/CommonFunctions';
import { showErrorSnackBar } from '../../util/AlertUtil';
import { getPatientsList } from '../../service/Patients';
import styles from '../../styles/BookTest.styles';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const OrderSummary = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const { handleScroll } = useScrollEndDetection();
  const { mobile, userId } = useSelector((state: RootState) => state.users);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const [testSelected, setTestSelected] = useState(route?.params?.items ?? '');
  const [selectedTestsDetails, setSelectedTestsDetails] = useState({
    totalAmount: 0,
    count: 0,
    selectedTests: {},
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleItemDelete = (index: number) => {
    // Deselect the item and remove it from the list
    const updatedIndexes = [index];
    const updatedTests = testSelected.filter((test: any, i: number) => !updatedIndexes.includes(i));

    const totalAmount = updatedTests.reduce((sum: any, test: any) => sum + Number(test?.price), 0);

    setSelectedTestsDetails({
      totalAmount,
      count: updatedTests.length,
      selectedTests: updatedTests,
    });

    setTestSelected(updatedTests);
  };

  const itemList = testSelected?.map((item: any) => item?.id);

  const handlePayment = (item: any) => {
    const paymentItems = {
      description: item?.billType ?? commonVariable[0]?.lab_bill,
      amount: item?.totalAmount,
      name: selectedPatient?.name,
    };
    setLoader(true);

    handleRazorPayment(paymentItems)
      .then(async (result) => {
        if (result.success) {
          const data = selectedPatient?.uhid
            ? {
                patient_id: selectedPatient?.id,
                transaction_id: result.response?.razorpay_payment_id,
                transaction_by: 'Razorpay',
                // department: commonVariable[0]?.lab_bill,
                items: itemList,
              }
            : {
                patient_id: null,
                transaction_id: result.response?.razorpay_payment_id,
                transaction_by: 'Razorpay',
                // department: commonVariable[0]?.lab_bill,
                items: itemList,
                user_mobile: mobile,
                title: selectedPatient?.title,
                name: selectedPatient?.name,
                age: selectedPatient?.age,
                sex: selectedPatient?.sex,
                dob: selectedPatient?.dob,
                mobile: selectedPatient?.mobile,
                blood_group: selectedPatient?.blood_group,
                email: selectedPatient?.email,
                area: selectedPatient?.address,
              };
          await addBillPayment(data)
            .then(async (res) => {
              if (res) {
                if (selectedPatient?.uhid === undefined) {
                  console.error("Need to implement patient delete");
                  // await Patient.deletePatient(selectedPatient?.id);
                  // const localPatients: any = await Patient.getPatientByUserId(userId);
                  // dispatch(setTempPatientList(localPatients));
                  await getPatientsList();
                }
                setLoader(false);
                navigation.goBack();
                navigation.navigate('TransactionSuccess', {
                  item: res?.data,
                  header: 'Success',
                  paymentItems,
                });
              }
            })
            .catch((err) => {
              navigation.goBack();
              navigation.navigate('TransactionSuccess', {
                header: 'Failed',
                paymentItems,
                err,
              });
              setLoader(false);
            });
        } else {
          // Payment failed, access result.error
          console.log('Error:', result.error?.code, result.error?.description);
          navigation.goBack();
          navigation.navigate('TransactionSuccess', {
            header: 'Failed',
            paymentItems,
          });
          setLoader(false);
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        showErrorSnackBar('Payment Canceled');
        console.log('Unexpected error:', error);
        setLoader(false);
      });
  };

  useEffect(() => {
    const totalAmount = testSelected.reduce((sum: any, test: any) => sum + Number(test?.price), 0);
    setSelectedTestsDetails({
      totalAmount,
      count: testSelected.length,
      selectedTests: {},
    });
  }, []);

  const TestPreparationRender = ({ item, index }: any) => {
    const [isTestListVisible, setIsTestListVisible] = useState<boolean>(false);

    const toggleTestListVisibility = () => {
      setIsTestListVisible((prev) => !prev);
    };

    return (
      <Box style={styles.testBoxStyle}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" margin={10}>
          <TouchableOpacity
            onPress={toggleTestListVisibility}
            hitSlop={{ bottom: 15, top: 20, left: 50, right: 250 }}
            disabled={item?.lab_tests ? false : true}
          >
            <Box display="flex" flexDirection="row">
              <Text style={styles.orderSumTestNameStyle}>{item?.name}</Text>
              {item?.lab_tests ? (
                <IconButton
                  name={isTestListVisible ? 'chevron-up' : 'chevron-down'}
                  size={styles.commonStyle.height}
                  color={COLORS.background.primary}
                />
              ) : null}
            </Box>
          </TouchableOpacity>
          <Text style={styles.testAmountStyle}>₹ {item?.price}</Text>
        </Box>
        {isTestListVisible
          ? item?.lab_tests?.map((data: any) => {
              return (
                <Text style={styles.showTextStyle} key={data?.test_name}>
                  {data?.test_name}
                </Text>
              );
            })
          : null}
        <Box display="flex" flexDirection="row" justifyContent="space-between" margin={10}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 15, top: 20, left: 10, right: 150 }}
            onPress={() => {
              setIsTestOpen(true);
            }}
          >
            <Text style={styles.testPreparationStyle}>{strings.displayText.testPreparation}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 10, top: 10, left: 50, right: 10 }}
            onPress={() => handleItemDelete(index)}
          >
            {/* <IconButton name="delete" size={12} color={'red'} />
             */}
            <Image style={styles.orderSumDeleteIcon} source={assets.deleteRed} />
          </TouchableOpacity>
        </Box>
      </Box>
    );
  };

  const PatientDetail = ({ label, value }: any) => (
    <Box style={styles.patientDetailsSubBoxStyle}>
      <Text style={[styles.patientSubTxtStyle, styles.widthOne]}>{label}</Text>
      <Text style={[styles.patientSubTxtStyle, styles.widthTwo]}>:</Text>
      <Text style={[styles.patientSubTxtStyle, styles.widthThree]}>{value}</Text>
    </Box>
  );

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <CustomHeader
          leftIcon={'arrow-left'}
          hasDivider
          title={strings.displayText.orderSummary}
          onLeftIconPress={() => navigation.goBack()}
        />
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              onPress={() => navigation.goBack()}
              style={{ padding: 1 }}
            >
              <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
            </TouchableOpacity>
            <Text style={commonStyles.topTitleText}>{strings.displayText.orderSummary}</Text>
            <Box />
          </Box>
        </Box> */}

        {/* <Box marginTop={10} style={styles.divider} /> */}

        <Box display="flex" flexDirection="row" justifyContent="space-between" margin={20}>
          <Box>
            <Text style={styles.patientDetailTitleStyle}>{strings.displayText.patientDetails}</Text>
          </Box>
          {/* <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
            }}
          > */}
            <Box display="flex" flexDirection="row" alignItems="center">
              <IconButton
                style={styles.orderSumAccountIconStyle}
                name="account"
                size={styles.userIcon.height}
                color={COLORS.background.primary}
              />
              <Text style={styles.accNameStyle}>{selectedPatient?.name}</Text>
            </Box>
          {/* </TouchableOpacity> */}
        </Box>

        <Box style={styles.flatBoxStyle}>
          <Box style={styles.patientBoxStyle}>
            <Text style={styles.patienBoxTextStyle}>{selectedPatient?.name}</Text>
            <PatientDetail label="Age" value={selectedPatient?.age ?? '-'} />
            <PatientDetail
              label="Sex"
              value={
                selectedPatient?.sex === null ? '-' : selectedPatient?.sex === 1 ? 'Male' : 'Female'
              }
            />
            <PatientDetail label="UHID" value={selectedPatient?.uhid ?? '-'} />
            <PatientDetail label="Mail id" value={selectedPatient?.email ?? '-'} />
          </Box>
          <Box marginVertical={25} style={styles.divider} />

          <Box marginHorizontal={20} height={'65%'}>
            <Text style={styles.selectTestStyle}>
              {strings.displayText.testedSelected}
              {`(${selectedTestsDetails?.count})`}
            </Text>
            <ScrollView>
              <FlatList
                data={testSelected}
                onScroll={handleScroll}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TestPreparationRender item={item} index={index} key={index?.toString()} />
                )}
              />
            </ScrollView>
          </Box>
        </Box>

        <Box style={styles.orderSumBottomFlexBox}>
          <Box height={'30%'} width={'99%'} backgroundColor={'#F8F8F8'}>
            <Box
              marginTop={10}
              display={'flex'}
              justifyContent={'space-between'}
              flexDirection={'row'}
              marginHorizontal={20}
            >
              <Text style={styles.totalAmountStyle}>{'Total Amount'}</Text>
              <Text style={styles.totalAmountStyle}>₹ {selectedTestsDetails?.totalAmount}</Text>
            </Box>
          </Box>
          <Box justifyContent="center" alignItems="center" marginBottom={10} marginTop={20}>
            <Text style={styles.agreeTextStyle}>
              {strings.displayText.proceedAgree}{' '}
              <Text style={styles.termsTxtStyle}>{strings.displayText.termsAndConditions}</Text>
            </Text>
          </Box>
          <AbstractButton
            disabled={selectedTestsDetails.totalAmount > 0 ? false : true}
            buttonStyle={styles.payBtn}
            textStyle={styles.btnText}
            loader={loader}
            onPress={() => {
              handlePayment(selectedTestsDetails);
            }}
          >
            {strings.displayText.confirmAndPay}
          </AbstractButton>
        </Box>
      </AppContainer>
      {isOpen && <PatientBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isTestOpen && (
        <CustomBottomSheet
          openBSheet={isTestOpen}
          // snapPoints={[Platform.OS === 'ios' ? '15%' : `${isHpBottomTablet(2)}`]}
          snapPoints={['40%']}
          enableDynamicSizing
          setSheetState={setIsTestOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.testPreparation}
          enableHideIconClose={true}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.orderSumContentContainerStyle}
        >
          <TestPreparationBottomSheet />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default OrderSummary;
