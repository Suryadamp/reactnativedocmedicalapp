// Admin - AppointmentItem
import { StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Box } from '../../../components';
import { FONTS, assets, COLORS } from '../../../constants';
import { getFormattedTime } from '../../../util/DateUtil';
import { SvgIcon } from '../../../constants/SvgIcon';
import { setSelectPatient } from '../../../state/patients';
import { RootState } from '../../../state';
import { UsePermission } from '../../../hooks/usePermissionCheck';
import { permissionList } from '../../../constants/ApiConstants';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IAppointmentItemProps = {
  appointment: any;
  navigation: any;
  onMenu: () => void;
  onTrackStatus: () => void;
};

export const AppointmentItem = (props: IAppointmentItemProps) => {
  const dispatch = useDispatch();
  const { patientList } = useSelector((state: RootState) => state.patients);
  const { appointment, navigation, onTrackStatus, onMenu } = props;
  const {
    patient_name,
    vitals_count,
    medical_records_count,
    patient_id,
    investigations_count,
    prescription_count,
    out,
    consulting,
    arrived,
    purpose,
    slot_label,
    id,
  } = props?.appointment;
  const status =
    out && consulting && arrived
      ? 'success'
      : !out && !consulting && !arrived
        ? 'booked'
        : 'waiting';

  const handleNavigate = async (type: string) => {
    const patient = (patientList || []).find((ptn) => ptn.id === appointment.patient_id);

    if (patient) {
      await dispatch(setSelectPatient(patient));
    }
    navigation.navigate(type, {
      from: 'AdminAppointment',
      patientId: patient_id,
      doctorId: appointment.doctor_id,
      appointmentId: id,
      item: appointment,
      appointment,
    });
  };

  return (
    <Card style={styles.cardContainer} mode="contained">
      <LinearGradient
        colors={['rgba(210, 229, 255, 0.50)', 'rgba(235, 243, 255, 0.00)']}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.container}
      >
        <ImageBackground
          source={assets.OpBookedBg}
          style={styles.backgroundImage}
          imageStyle={styles.bgImage}
        >
          <Card.Content style={styles.cardContent}>
            <TouchableOpacity style={styles.leftContainer} onPress={onTrackStatus}>
              <SvgIcon
                name={
                  status === 'success'
                    ? 'SuccessIcon'
                    : status === 'waiting'
                      ? 'WaitingIcon'
                      : appointment.status === 2
                        ? 'CancelAppointmentIcon'
                        : 'BookedIcon'
                }
              />
            </TouchableOpacity>
            <Box style={styles.middleContainer}>
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Box>
                  <Text style={styles.title}>{patient_name}</Text>
                  <Text style={styles.info}>Consulting For {purpose}</Text>
                  <Text style={styles.description}>{getFormattedTime(slot_label)}</Text>
                </Box>
                {appointment?.type === 2 &&
                  UsePermission(permissionList.mobileAppointmentVideoCallView) && (
                    <Box
                      style={{
                        justifyContent: 'center',
                        alignContent: 'flex-end',
                        alignSelf: 'flex-end',
                        width: 60,
                        height: 28,
                        borderRadius: 5,
                        backgroundColor: '#17CF9D',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('VideoCallLobby', {
                            appointmentId: appointment.id,
                            roomId: appointment.video_call_id,
                            doctorId: appointment.doctor_id,
                          });
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            color: COLORS.background.white,
                            fontFamily: FONTS.SFProDisplayRegular,
                          }}
                        >
                          <MuiIcon name="video" size={15} />
                          Join
                        </Text>
                      </TouchableOpacity>
                    </Box>
                  )}
              </Box>

              <Box style={styles.iconsContainer}>
                <TouchableOpacity
                  style={styles.iconItem}
                  onPress={() => handleNavigate('AppointmentVitals')}
                >
                  <SvgIcon name={vitals_count > 0 ? 'ActiveVitalIcon' : 'ActiveVitalIcon'} />
                </TouchableOpacity>
                {UsePermission(permissionList.mobilePrescriptionView) && (
                  <TouchableOpacity
                    style={styles.iconItem}
                    onPress={() => handleNavigate('PrescriptionList')}
                  >
                    <SvgIcon
                      name={
                        prescription_count > 0 ? 'ActivePrescriptionIcon' : 'ActivePrescriptionIcon'
                      }
                    />
                  </TouchableOpacity>
                )}
                {UsePermission(permissionList.mobileInvestigationsView) && (
                  <TouchableOpacity
                    style={styles.iconItem}
                    onPress={() => handleNavigate('InvestigationsList')}
                  >
                    <SvgIcon
                      name={
                        investigations_count > 0
                          ? 'ActiveInvestigationIcon'
                          : 'ActiveInvestigationIcon'
                      }
                    />
                  </TouchableOpacity>
                )}
                {/* {UsePermission(permissionList.moibileMediRecordView) && ( */}
                <TouchableOpacity
                  style={styles.iconItem}
                  onPress={() => handleNavigate('MedicalRecords')}
                >
                  <SvgIcon
                    name={
                      medical_records_count && medical_records_count > 0
                        ? 'ActiveAdminMedicalRecords'
                        : 'ActiveAdminMedicalRecords'
                    }
                  />
                </TouchableOpacity>
                {/* )} */}
                {UsePermission(permissionList.mobileBillsPaymentList) && (
                  <TouchableOpacity
                    style={styles.iconItem}
                    onPress={() => handleNavigate('Bills & Payments')}
                  >
                    <SvgIcon name={'ActiveInvoiceIcon'} />
                  </TouchableOpacity>
                )}
              </Box>
            </Box>
            <Box style={styles.rightContainer}>
              <TouchableOpacity style={styles.iconItem} onPress={() => onMenu()}>
                <SvgIcon name="MenuIcon" />
              </TouchableOpacity>
            </Box>
          </Card.Content>
        </ImageBackground>
      </LinearGradient>
    </Card>
  );
};

// Define the styles for the component
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background.white,
    height: hp('16%'),
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: COLORS.white_smoke,
    width: wp('90%'),
    justifyContent: 'center',
  },
  container: {
    borderRadius: 7,
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
  },
  bgImage: {
    resizeMode: 'contain',
    marginLeft: '35%',
  },
  leftContainer: {
    width: '10%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    marginHorizontal: '6%',
    marginVertical: '5%',
    width: '75%',
  },
  iconsContainer: {
    marginTop: '7%',
    flexDirection: 'row',
    width: '100%',
  },
  iconItem: {
    marginRight: '6%',
  },
  title: {
    fontFamily: FONTS.SFProDisplayBold,
    fontWeight: '700',
    fontSize: 14,
  },
  info: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontWeight: '500',
    fontSize: 12,
    paddingTop: '2%',
    color: '#A5A5A5',
  },
  description: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontWeight: '500',
    fontSize: 11,
    paddingTop: '2%',
    color: '#232323',
  },
  rightContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    paddingVertical: '5%',
  },
});

export default AppointmentItem;
