import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box } from '../../../components';
import { COLORS, assets } from '../../../constants';
import { strings } from '../../../i18n';
import { AppointmentDetails } from '../../../state/appointments/appointments';
import styles from '../../../styles/Appointment.styles';
import { formatDateBType, getFormattedTime } from '../../../util/DateUtil';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { isHpTablet, isWpTablet } from '../../../hooks/useDeviceCheck';
import { UsePermission } from '../../../hooks/usePermissionCheck';
import { permissionList } from '../../../constants/ApiConstants';
import { SvgIcon } from '../../../constants/SvgIcon';
import CustomIconButton from '../../../components/IconButton';

interface AppointmentCardProps {
  navigation: any;
  item: AppointmentDetails;
  tabNo: number;
  openBSheet: (item: AppointmentDetails) => void;
  isAdmin: boolean;
}

type Props = AppointmentCardProps;

const AppointmentCard = ({ item, navigation, tabNo, openBSheet, isAdmin }: Props) => {
  const handleClick = () => {
    if (item.status == 2) {
      navigation.navigate('BookAppointment', { bookAgain: item });
    } else if (item.type == 2 && UsePermission(permissionList.mobileAppointmentVideoCallView)) {
      navigation.navigate('VideoCallLobby', {
        appointmentId: item.id,
        roomId: item.video_call_id,
        doctorId: item.doctor_id,
      });
    }
  };

  return (
    <Box style={styles.AppointmentcardContainer}>
      <Image source={assets.Seperator} style={styles.seperator} />
      <Box style={[styles.card, tabNo === 1 ? styles.upcomingCard : styles.pastCard]}>
        <Box
          style={[
            styles.cardHeader,
            tabNo === 1
              ? Number(item?.status) === 1 || Number(item?.status) === 3
                ? styles.upcomingHeader
                : styles.upcomingFailedHeader
              : styles.pastHeader,
          ]}
        >
          <Box flexDirection="row">
            <Text
              style={[
                styles.headerTitle,
                tabNo === 1
                  ? Number(item?.status) === 1 || Number(item?.status) === 3
                    ? styles.upcomingHeaderTitle
                    : styles.upcomingFailedHeaderTitle
                  : styles.pastHeaderTitle,
              ]}
            >
              {strings.displayText.appointment_booked} ({item.op_no})
            </Text>
            <MaterialCommunityIcons
              name={
                tabNo === 1
                  ? Number(item?.status) === 1 || Number(item?.status) === 3
                    ? 'check-circle'
                    : 'close-circle'
                  : Number(item?.status) === 1 || Number(item?.status) === 3
                    ? 'check-circle'
                    : 'close-circle'
              }
              size={isHpTablet('1.7%')}
              color={
                tabNo === 1
                  ? Number(item?.status) === 1 || Number(item?.status) === 3
                    ? '#207DFF'
                    : '#FA4D5E'
                  : '#A4A4A4'
              }
              style={styles.tickImage}
            />
          </Box>
          {/* <TouchableOpacity
            style={styles.cababMenu}
            activeOpacity={0.8}
            hitSlop={{ bottom: 20, top: 20, right: 20, left: 20 }}
            onPress={() => {
              openBSheet(item);
            }}
            disabled={tabNo === 1 ? false : true}
          >
            <CustomIcon name="ellipsis-vertical-sharp" size={hp(1.7)} color="#000" type="ionicon" />
          </TouchableOpacity> */}
          <Box style={styles.cababMenu}>
            <CustomIconButton
              name="dots-vertical"
              size={hp('2.2%')}
              onClick={() => {
                if (tabNo === 1) {
                  openBSheet(item);
                }
              }}
            />
          </Box>
        </Box>
        <Box style={styles.cardContent}>
          <Box>
            <Text
              style={styles.dateStyle}
            >{`${formatDateBType(item?.appoint_date, 'MMM D')}, ${getFormattedTime(item.slot_label)}`}</Text>
            <Text style={styles.doctorStyle}>{item?.doctor_name.toUpperCase()}</Text>
            <Text style={styles.categoryStyle}>{item?.purpose}</Text>
            <Text style={[styles.hospitalStyle, { lineHeight: 22 }]}>
              {item?.patient_sys_id ?? 'KMCH Multispecialty Hospital, Erode.'}
            </Text>
          </Box>
          {tabNo === 1 && (
            <TouchableOpacity
              style={
                item.status == 2
                  ? styles.bookAgnBtn
                  : item.type == 2 && UsePermission(permissionList.mobileAppointmentVideoCallView)
                    ? styles.joinBtn
                    : {}
              }
              onPress={handleClick}
            >
              {item.status != 2 &&
                item?.type === 2 &&
                UsePermission(permissionList.mobileAppointmentVideoCallView) && (
                  <MaterialCommunityIcons
                    size={styles.joinBtnIcon.height}
                    name="video"
                    color={COLORS.white}
                  />
                )}
              <Text
                style={
                  item.status == 2
                    ? styles.bookAgnTxt
                    : item.type == 2 && UsePermission(permissionList.mobileAppointmentVideoCallView)
                      ? styles.joinTxt
                      : {}
                }
              >
                {item.status == 2
                  ? 'Book again'
                  : item.type == 2 && UsePermission(permissionList.mobileAppointmentVideoCallView)
                    ? 'Join'
                    : ''}
              </Text>
            </TouchableOpacity>

            // <TouchableOpacity
            //   onPress={() => {
            //     if (Number(item?.status) !== 1 && Number(item?.status) !== 3) {
            //       navigation.navigate('BookAppointment', { bookAgain: item });
            //     } else {
            //       if (
            //         item?.type === 2 &&
            //         UsePermission(permissionList.mobileAppointmentVideoCallView)
            //       ) {
            //         navigation.navigate('VideoCallLobby', {
            //           appointmentId: item.id,
            //           roomId: item.video_call_id,
            //           doctorId: item.doctor_id,
            //         });
            //       }
            //     }
            //   }}
            //   disabled={tabNo === 1 ? false : true}
            // >
            //   <Text
            //     style={[
            //       tabNo === 1
            //         ? Number(item?.status) === 1 || Number(item?.status) === 3
            //           ? item?.type === 2 &&
            //             UsePermission(permissionList.mobileAppointmentVideoCallView)
            //             ? styles.txtPaid
            //             : {}
            //           : styles.txtPaynow
            //         : styles.txtPaynowPast,
            //     ]}
            //   >
            //     {Number(item?.status) === 1 &&
            //       item?.type === 2 &&
            //       UsePermission(permissionList.mobileAppointmentVideoCallView) && (
            //         <MaterialCommunityIcons name="video" size={14} />
            //       )}
            //     {Number(item?.status) === 2
            //       ? 'Book again'
            //       : (Number(item?.status) === 1 && item?.type === 1) ||
            //         (Number(item?.status) === 3 && item?.type === 1) ||
            //         !UsePermission(permissionList.mobileAppointmentVideoCallView) ||
            //         !item.video_call_id
            //         ? ''
            //         : 'Join'}
            //   </Text>
            // </TouchableOpacity>
          )}
        </Box>
        <Box style={styles.divider} />
        <Box style={styles.cardFooter}>
          <Box style={styles.footerContainer}>
            {/* <Box style={styles.patientContainer}>
              <Ionicons name="person-outline" size={isHpTablet(1.4)} color={'#121212'} />
              <Text style={styles.patientStyle}>{toTitleCase(item.patient_name)}</Text>
            </Box> */}
            <Box style={styles.patientContainer}>
              {UsePermission(permissionList.mobileVitalsView) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{ left: 10, right: 10, top: 5, bottom: 5 }}
                  onPress={() => {
                    navigation.navigate('AppointmentVitals', {
                      appointmentId: item.id,
                      doctorId: item.doctor_id,
                    });
                  }}
                  disabled={tabNo === 1 ? false : true}
                >
                  <Box style={{ marginEnd: isWpTablet('5%') }}>
                    <SvgIcon name={'VitalIcon'} />
                  </Box>
                </TouchableOpacity>
              )}
              {UsePermission(permissionList.mobilePrescriptionView) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{ left: 10, right: 10, top: 5, bottom: 5 }}
                  onPress={() => {
                    navigation.navigate('PrescriptionList', { appointmentId: item.id });
                  }}
                  disabled={tabNo === 1 ? false : true}
                >
                  <MaterialCommunityIcons
                    name="prescription"
                    size={isHpTablet(2.5)}
                    style={{ marginEnd: isWpTablet('5%') }}
                    color={'#BCBCBC'}
                  />
                </TouchableOpacity>
              )}
              {UsePermission(permissionList.mobileInvestigationsView) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{ left: 10, right: 10, top: 5, bottom: 5 }}
                  onPress={() => {
                    if (Number(item?.status) !== 2) {
                      navigation.navigate('InvestigationsList', { item });
                    }
                  }}
                  disabled={tabNo === 1 ? false : true}
                >
                  <Ionicons
                    name="flask-outline"
                    size={isHpTablet(2)}
                    onPress={() => {
                      if (Number(item?.status) !== 2) {
                        navigation.navigate('InvestigationsList', { item });
                      }
                    }}
                    style={{ marginEnd: isWpTablet('5%') }}
                    color={'#BCBCBC'}
                  />
                </TouchableOpacity>
              )}
              {UsePermission(permissionList.moibileMedirecordView) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{ left: 10, right: 10, top: 5, bottom: 5 }}
                  onPress={() => {
                    if (Number(item?.status) !== 2) {
                      navigation.navigate('MedicalRecords', { appointment: item });
                    }
                  }}
                  disabled={tabNo === 1 ? false : true}
                >
                  <Ionicons
                    name="reader-outline"
                    size={isHpTablet(2)}
                    style={{ marginEnd: isWpTablet('5%') }}
                    onPress={() => {
                      if (Number(item?.status) !== 2) {
                        navigation.navigate('MedicalRecords', { appointment: item });
                      }
                    }}
                    color={'#BCBCBC'}
                  />
                </TouchableOpacity>
              )}
              {UsePermission(permissionList.mobileBillsPaymentList) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{ left: 10, right: 10, top: 5, bottom: 5 }}
                  onPress={() => {
                    navigation.navigate('BillsPayment');
                  }}
                  disabled={tabNo === 1 ? false : true}
                >
                  <Ionicons name="receipt-outline" size={isHpTablet(2)} color={'#BCBCBC'} />
                </TouchableOpacity>
              )}
            </Box>
            {isAdmin && (
              <Box justifyContent="center">
                <Box style={styles.accountBoxIconStyle}>
                  <CustomIconButton
                    style={styles.accountIconStyle}
                    name="account-outline"
                    size={styles.patientIcon.height}
                    iconColor={COLORS.black_231F20}
                  />
                  <Text style={styles.patientName}>{item?.patient_name}</Text>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentCard;
