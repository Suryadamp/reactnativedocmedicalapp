import { Text, Image } from 'react-native';
import React from 'react';
import { Box } from '../../../components';
import { assets, COLORS } from '../../../constants';
import { ConfirmPopUp } from '../../../components/PopUpModal';
import { shortDateFormat } from '../../../util/DateUtil';
import styles from '../../../styles/Appointment.styles';
import CustomHeader from '../../../components/CustomHeader';

interface ISuccessCard {
  navigation: any;
  appointmentData: any;
  title?: string;
  navigationFrom?: string;
  close: () => void;
}

const SuccessCard = ({ appointmentData, navigation, title }: ISuccessCard) => {
  return (
    <ConfirmPopUp
      visible={true}
      children={
        <Box>
          <Box>
            <CustomHeader
              leftIcon={'arrow-left'}
              title={`${title ?? 'Booking'} Confirmed`}
              hasDivider
              onLeftIconPress={() => {
                navigation.navigate('My Appointments');
              }}
            />
            {/* <Box style={styles.topBar}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 1 }}
                onPress={() => {
                  if (navigationFrom === 'AdminAppointment') {
                    navigation.navigate('Appointment Booking');
                  } else {
                    navigation.navigate('My Appointments');
                  }
                  navigation.navigate('My Appointments');
                  // close();
                }}
              >
                <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
              </TouchableOpacity>
              <Text style={commonStyles.topTitleText}>{title ?? 'Booking'} Confirmed</Text>
              <Box style={styles.titleContainer} />
            </Box>
            <Box style={styles.divider1} /> */}
          </Box>
          <Box alignItems="center" marginTop={20}>
            <Image source={assets.Successfull} style={{ width: 74, height: 88 }} />
            <Box flexDirection="row">
              <Image source={assets.BookedSuccess} style={{ marginTop: 4, marginEnd: 5 }} />
              <Text style={[styles.title, { color: COLORS.background.primary }]}>
                {title ?? 'Booked'} Successfully
              </Text>
            </Box>
          </Box>
          <Box marginTop={10} alignItems="center">
            <Box width={'60%'}>
              <Text style={styles.info}>
                Appointment ID{' '}
                <Text style={styles.highlighted}>{appointmentData?.appoint_id?.toUpperCase()}</Text>{' '}
                booked successfully with{' '}
                <Text style={styles.highlighted}>{appointmentData?.name}</Text>
                for <Text style={styles.highlighted}>{appointmentData?.slot_label}</Text> on{' '}
                <Text style={styles.highlighted}>
                  {shortDateFormat(appointmentData?.appoint_date)}
                </Text>
                .
              </Text>
            </Box>
          </Box>
          <Box style={styles.divider} marginTop={20} />
          {title !== 'Rescheduled' && (
            <>
              <Box marginHorizontal={20} marginVertical={10}>
                <Text style={styles.subHeading}>Payment Details</Text>
                <Box flexDirection="row" justifyContent="space-between">
                  <Text style={styles.paymentItem}>Appointment Fee</Text>
                  <Text style={styles.paymentPrice}>₹ {appointmentData?.price}</Text>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Box marginTop={styles.totalAmountTop.height} />
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  height={'25%'}
                  backgroundColor={'#F8F8F8'}
                >
                  <Text style={styles.totalPrice}>Total Amount</Text>
                  <Text style={styles.totalPrice}>₹ {appointmentData?.price}</Text>
                </Box>
              </Box>
            </>
          )}
        </Box>
      }
    />
  );
};

export default SuccessCard;
