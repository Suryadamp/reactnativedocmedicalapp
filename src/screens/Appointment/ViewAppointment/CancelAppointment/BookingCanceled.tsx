import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text } from 'react-native';
import { AppContainer, Box } from '../../../../components';
import { COLORS, SIZES, assets, strings } from '../../../../constants';
import { RootStackParamList } from '../../../../navigation/types';
import styles from '../../../../styles/Appointment.styles';
import CustomHeader from '../../../../components/CustomHeader';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const BookingCanceled = ({ navigation, route }: Props) => {
  const item = route?.params?.item;
  const moveAnim = useRef(new Animated.Value(SIZES.screenHeight)).current;

  useEffect(() => {
    Animated.spring(moveAnim, {
      toValue: 0,
      tension: 30,
      useNativeDriver: true,
    }).start(() => {});
  }, [moveAnim]);
  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.BookAptCancelcontainer}
    >
      <CustomHeader
        leftIcon={'arrow-left'}
        title={strings.displayText.bookingCanceled}
        onLeftIconPress={() => {
          navigation.navigate('My Appointments', {
            screen: 'My Appointments',
          });
        }}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            style={{ padding: 1 }}
            onPress={() => {
              if (route?.params?.from === 'AdminAppointment') {
                navigation.navigate('Appointment Booking');
              } else {
                navigation.navigate('My Appointments', {
                  screen: 'My Appointments',
                });
              }
            }}
          >
            <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.bookingCanceled}</Text>
          <Box />
        </Box>
        <Box style={styles.divider} />
      </Box> */}
      <Animated.View style={{ transform: [{ translateY: moveAnim }] }}>
        <Box alignItems="center" marginVertical={20}>
          <Image source={assets.CancelUserIcon} style={styles.cancelIcon} />
        </Box>
        <Box alignItems="center" marginHorizontal={55}>
          <Box display="flex" flexDirection="row">
            <Image
              source={assets.CalendarxFill}
              style={{
                width: 19,
                height: 19,
                alignSelf: 'center',
                tintColor: '#FF7981',
                marginRight: 10,
              }}
            />
            <Text style={styles.appointTextCancelMain}>Appointment Cancelled</Text>
          </Box>
          <Text style={styles.cancelAppText}>
            Appointment ID <Text style={styles.textBold}>{item?.appoint_id}</Text> has been
            cancelled with <Text style={styles.textBold}>{item?.doctor_name}</Text> for{' '}
            <Text style={styles.textBold}>{item?.slot_label}</Text> on{' '}
            <Text style={styles.textBold}>{item?.appoint_date}</Text>{' '}
          </Text>
        </Box>

        <Box marginTop={20} style={styles.divider} />
      </Animated.View>
    </AppContainer>
  );
};

export default BookingCanceled;
