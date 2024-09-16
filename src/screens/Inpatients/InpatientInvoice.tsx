// Inpatient - Invoice
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Image, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../../navigation/types';
import { COLORS, assets } from '../../constants';
import {
  AbstractButton,
  AppContainer,
  Box,
  CustomDataNotFound,
  CustomHeader,
} from '../../components';
import { strings } from '../../i18n';
import { createBillPayment } from '../../service/BillAndPaymentService';
import { inpatientGetInvoice } from '../../service/InpatientService';
import { RootState } from '../../state';
import { handleRazorPayment } from '../../util/CommonFunctions';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../../styles/Common.styles';
import styles from '../../styles/BillAndPayments.styles';
import InpatientLoader from '../../components/InpatientLoader';
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

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString(undefined, { day: 'numeric' });
  const month = date.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  return { day, month };
};

const BillsCard = ({ item, navigation, getInpatientInvoice }: any) => {
  const { day, month } = formatDate(item?.date_created);

  const handlePayment = () => {
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
              return getInpatientInvoice();
            })
            .then(() => console.log(''))
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
      })
      .catch((error) => {
        // Handle unexpected errors
        console.log('Unexpected error:', error);
      });
  };
  return (
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
              disabled={Number(item?.is_paid) === 0 ? false : true}
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
  );
};

const InpatientInvoice = ({ route, navigation }: Props) => {
  const { handleScroll } = useScrollEndDetection();
  const ipAdmission = route?.params?.ipAdmission;
  // const { userId } = useSelector((state: RootState) => state.users);
  const { selectedInpatient } = useSelector((state: RootState) => state.inpatients);
  const [billPayment, setBillPayment] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getInpatientInvoice();
  }, []);

  const getInpatientInvoice = async () => {
    try {
      await inpatientGetInvoice(ipAdmission.patient_id, ipAdmission?.id).then((res) => {
        if (res.success) {
          const billPayments =
            res.data.length > 0
              ? res.data.filter((item) => item?.department_details?.dept_name == 'IP')
              : [];
          setBillPayment(billPayments);
        }
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      console.log('ERROR in inpatient invoice', error.message);
    }
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <CustomHeader
          leftIcon="arrow-left"
          title={strings.displayText.billAndPaymet}
          hasDivider
          permission
          rightIconType="text"
          rightIcon={strings.displayText.advance}
          onLeftIconPress={() => navigation.goBack()}
          onRightIconPress={() => {
            navigation.navigate('InpatientAdvancePayment');
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('InpatientAdvancePayment');
              }}
            >
              <Box>
                <Text style={styles.advanceTitle}>{strings.displayText.advance}</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box> */}
        {/* <Box marginTop={10} /> */}
        {/* <Box style={styles.divider} /> */}
        {isLoading && <InpatientLoader />}
        {!isLoading && billPayment.length > 0 && (
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginVertical={10}
            >
              <Box>
                <Box style={styles.accountBoxIconStyle}>
                  <IconButton
                    style={styles.accountIconStyle}
                    name="account"
                    size={commonStyles.userIcon.height}
                    color={COLORS.background.primary}
                  />
                  <Text style={styles.accNameStyle}>{ipAdmission ? ipAdmission?.name : ''}</Text>
                </Box>
              </Box>
            </Box>
            {isLoading && <InpatientLoader />}
            {!isLoading && (
              <Box style={styles.billContainer}>
                <FlatList
                  style={styles.scrollViewStyle}
                  data={billPayment}
                  onScroll={handleScroll}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(_item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <BillsCard
                      item={item}
                      navigation={navigation}
                      getInpatientInvoice={getInpatientInvoice}
                    />
                  )}
                />
              </Box>
            )}
          </>
        )}
        {!isLoading && billPayment.length === 0 && (
          <Box style={styles.boxFlexStyle}>
            {billPayment.length === 0 && (
              <Box style={styles.ScrollViewStyle}>
                {/* <Box style={styles.notFoundTextStyle}>
                  <Image source={assets.Payment} />
                  <Text>{strings.displayText.npBillFound}</Text>
                </Box> */}
                <CustomDataNotFound type="bills" />
              </Box>
            )}
          </Box>
        )}
      </AppContainer>
    </>
  );
};

export default InpatientInvoice;
