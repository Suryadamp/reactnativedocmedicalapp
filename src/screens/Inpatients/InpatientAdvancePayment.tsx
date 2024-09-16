import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { COLORS, SIZES } from '../../constants';
import { AbstractButton, AppContainer, Box, CustomHeader } from '../../components';
import { TextInput } from 'react-native-paper';
import { strings } from '../../i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { handleRazorPayment } from '../../util/CommonFunctions';
import { addAdvicePayment } from '../../service/BillAndPaymentService';
import { showErrorSnackBar, showSnackBar, Snackbar } from '../../util/AlertUtil';

import styles from '../../styles/BillAndPayments.styles';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const AdvancePayment = ({ navigation }: Props) => {
  const { selectedInpatient } = useSelector((state: RootState) => state.inpatients);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isOpen, setIsOpen] = useState(false); // eslint-disable-line
  const [loader, setLoader] = useState(false);

  const handlePaymentCreate = () => {
    const paymentItems = {
      description: remarks,
      amount: amount,
      name: selectedInpatient?.ip_admissions?.name,
    };
    setLoader(true);
    handleRazorPayment(paymentItems)
      .then(async (result) => {
        if (result.success) {
          const data = {
            patient_id: selectedInpatient?.ip_admissions?.patient_id,
            transaction_id: result.response?.razorpay_payment_id,
            transaction_by: 'Razorpay',
          };
          await addAdvicePayment(data)
            .then(async (res) => {
              if (res) {
                setLoader(false);
                navigation.goBack();
                navigation.navigate('TransactionSuccess', {
                  item: res?.data,
                  header: 'Success',
                  paymentItems,
                  type: 'IP',
                });
                setAmount('');
                setRemarks('');
              }
            })
            .catch((err) => {
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
        setLoader(false);
        console.log('Unexpected error:', error);
      });
  };

  const themeColors = {
    primary: COLORS.gray,
    underlineColor: 'transparent',
    background: COLORS.background.secondary,
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        {/* <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} /> */}
        <CustomHeader
          leftIcon={'arrow-left'}
          hasDivider
          title={strings.displayText.advancePayement}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              style={{ padding: 1 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
            </TouchableOpacity>
            <Text style={commonStyles.topTitleText}> {strings.displayText.advancePayement}</Text>
            <Box />
          </Box>
        </Box>
        <Box marginTop={10} />
        <Box style={styles.divider} /> */}
        <Box marginTop={20} margin={20} height={'70%'}>
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <TextInput
              label={strings.displayText.patientsName}
              mode="outlined"
              placeholderTextColor={COLORS.gray}
              placeholder={strings.displayText.search}
              style={styles.inputTxtStyle}
              value={selectedInpatient?.ip_admissions?.name}
              // disabled={true}
              editable={false}
              outlineColor={COLORS.white_smoke}
              activeOutlineColor={COLORS.grey_838383}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.5,
              }}
              // Add an icon at the end of the TextInput
              right={
                <TextInput.Icon
                  style={styles.iconStyle}
                  iconColor={COLORS.black}
                  disabled={true}
                  icon="chevron-down"
                />
              }
              onPressIn={() => setIsOpen(true)}
            />
          </TouchableOpacity>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <TextInput
              label={strings.displayText.uhidNumber}
              mode="outlined"
              placeholderTextColor={COLORS.gray}
              placeholder={strings.displayText.enterUhidNumber}
              value={selectedInpatient?.ip_admissions?.uhid ?? ''}
              style={styles.uhidInputTxtStyle}
              outlineColor={COLORS.white_smoke}
              editable={false}
              activeOutlineColor={COLORS.grey_838383}
              // onChangeText={(_value) => {
              //   setUhidNumber(_value);
              // }}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.5,
              }}
            />
            <TextInput
              label={strings.displayText.mobile}
              mode="outlined"
              placeholderTextColor={COLORS.gray}
              placeholder={strings.displayText.enterMobile}
              value={selectedInpatient?.ip_admissions?.mobile ?? ''}
              style={styles.mobileInputTxtStyle}
              outlineColor={COLORS.white_smoke}
              editable={false}
              keyboardType="numeric"
              // onChangeText={(_value) => {
              //   setMobile(_value);
              // }}
              activeOutlineColor={COLORS.grey_838383}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.5,
              }}
            />
          </Box>
          <TextInput
            label={strings.displayText.amount}
            mode="outlined"
            placeholderTextColor={COLORS.gray}
            placeholder={strings.displayText.enterAmount}
            value={amount}
            style={styles.inputTxtStyle}
            outlineColor={COLORS.white_smoke}
            outlineStyle={{ borderWidth: 1 }}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(_value) => {
              setAmount(_value);
            }}
            keyboardType="numeric"
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.5,
            }}
            left={
              <TextInput.Icon
                style={styles.iconStyle}
                iconColor={COLORS.black}
                icon="currency-inr"
                size={styles.currencyIocn.height}
              />
            }
          />
          <TextInput
            label={strings.displayText.remarks}
            mode="outlined"
            placeholderTextColor={COLORS.gray}
            placeholder={strings.displayText.enterRemarks}
            style={styles.inputTxtStyle}
            outlineColor={COLORS.white_smoke}
            value={remarks}
            outlineStyle={{ borderWidth: 1 }}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(_value) => {
              setRemarks(_value);
            }}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.5,
            }}
          />
        </Box>
        <Box style={styles.bottomFlexBox}>
          <AbstractButton
            disabled={!selectedInpatient?.ip_admissions?.name || !amount || !remarks}
            buttonStyle={styles.payBtn}
            textStyle={styles.payText}
            loader={loader}
            onPress={handlePaymentCreate}
          >
            {strings.displayText.pay}
          </AbstractButton>
        </Box>
      </AppContainer>
    </>
  );
};

export default AdvancePayment;
