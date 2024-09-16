import React from 'react';
import { Text } from 'react-native';
import { AbstractButton, Box } from '../../../components';
import styles from '../../../styles/Appointment.styles';

const PaymentSummaryBottomSheet = ({ paymentSummaryData, checkAppointment }: any) => {
  const renderDetailBox = (title: string, content: string | JSX.Element | React.ReactFragment) => (
    <Box marginVertical={5} marginHorizontal={20}>
      <Text style={styles.appointTimeText}>{title}</Text>
      <Text style={styles.resText}>{content}</Text>
    </Box>
  );

  const renderDetailRow = (value: string | JSX.Element | React.ReactFragment) => (
    <Box display="flex" flexDirection="row">
      {/* <Text style={styles.locationText}>{label}</Text> */}
      <Text style={styles.resText}>{value}</Text>
    </Box>
  );

  const renderAmountRow = (label: string, amount: string | JSX.Element | React.ReactFragment) => (
    <Box display="flex" flexDirection="row" justifyContent="space-between" marginVertical={5}>
      <Text style={styles.appointFeeText}>{label}</Text>
      <Text style={styles.appointFee}>{amount}</Text>
    </Box>
  );

  return (
    <Box>
      {renderDetailBox(
        'Appointment Details',
        `Tuesday, ${paymentSummaryData?.selectedDateString} - ${
          paymentSummaryData?.slotLabel ?? ''
        }`,
      )}
      {renderDetailBox('Patient Details', renderDetailRow(paymentSummaryData?.name))}

      <Box marginVertical={2} marginBottom={20} marginHorizontal={20}>
        <Text style={styles.appointTimeText}>Hospital Details</Text>
        {renderDetailRow('KMCH Multispecialty Hospital')}
        {renderDetailRow(
          'Opposite to Arena Layout Near Metro Pillar, Erode-638004.',
        )}
      </Box>

      <Box backgroundColor="rgba(88, 158, 255, 0.08)" paddingHorizontal={20}>
        {/* {renderAmountRow('Appointment Fee', `₹ ${paymentSummaryData?.price}`)}
        {renderAmountRow('Service Fee*', '₹ 0.00')} */}
        {renderAmountRow('Total Amount', `₹ ${paymentSummaryData?.price}`)}
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="center" marginVertical={10}>
        <Text style={styles.agreeText}>By Clicking on “Confirm & Pay”, I agree to</Text>
        <Text style={styles.termsText}>Terms and conditions </Text>
      </Box>

      <Box style={styles.bottomFlexBox}>
        <AbstractButton
          onPress={checkAppointment}
          textStyle={styles.payBtnText}
          buttonStyle={styles.payBtn}
        >
          {'Confirm & Pay'}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default PaymentSummaryBottomSheet;
