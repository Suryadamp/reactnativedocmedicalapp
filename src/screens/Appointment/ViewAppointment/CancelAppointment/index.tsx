import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { AbstractButton, AppContainer, Box } from '../../../../components';
import { COLORS, assets, strings } from '../../../../constants';
import { RootStackParamList } from '../../../../navigation/types';
import { cancelAppointment, getListOfAppointments } from '../../../../service/AppointmentService';
import styles from '../../../../styles/Appointment.styles';
import { showErrorSnackBar } from '../../../../util/AlertUtil';
import CancelRadioGroup from './CancelRadioButton';
import CustomHeader from '../../../../components/CustomHeader';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;
const reasonCancel = [
  { id: 'i_am_busy', value: 'I am busy' },
  { id: 'forgot_about_the_appointment', value: 'Forgot about the appointment' },
  { id: 'change_my_mind', value: 'Change my mind' },
  { id: 'visited_another_doctor', value: 'Visited another doctor' },
  { id: 'clinic_hospital_is_far', value: 'Clinic/Hospital is far' },
  { id: 'doctor_asked_me_to_cancel', value: 'Doctor asked me to cancel' },
  { id: 'Others', value: 'Others' },
];

const CancelAppointment = ({ navigation, route }: Props) => {
  const appointmentData = route?.params?.item;
  const [selectOption, setSelectOption] = useState('');
  const [loader, setLoader] = useState(false);

  const handleRadioChange = (radio: any) => {
    setSelectOption(radio);
  };

  const cancelDayFormat = (date: string) => {
    if (date) {
      const inputDate = new Date(date);

      const day = inputDate.getDate();
      const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
        inputDate,
      );
      const year = inputDate.getFullYear();
      const time = inputDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      const formattedDate = `${day} ${monthAbbreviation} ${year} - ${time}`;
      return formattedDate ?? '-';
    } else {
      return '-';
    }
  };

  const handleCancelApointment = async () => {
    if (selectOption) {
      setLoader(true);
      try {
        const result = await cancelAppointment(appointmentData?.id, 2, selectOption);

        if (result) {
          setSelectOption('');
          setLoader(false);
          navigation.navigate('BookingCanceled', {
            item: {
              appoint_id: result?.data?.appoint_id,
              appoint_date: result?.data?.appoint_date,
              slot_label: appointmentData?.slot_label,
              doctor_name: appointmentData?.doctor_name,
            },
            from: route?.params?.from,
          });
          getListOfAppointments();
        }
      } catch (error) {
        setLoader(false);
        showErrorSnackBar('Appointment Canceled Failed');
        console.log(error);
      }
    } else {
      showErrorSnackBar('Please select the cancel reason');
    }
  };

  const DetailRow = ({ label, value, icon = 'Image', type, iconStyle }: any) => (
    <Box width="50%">
      <Text style={styles.labelText}>{label}</Text>
      <Box display="flex" flexDirection="row">
        {type === 'Icon' ? (
          <AntIcon
            name={`${icon}`}
            size={styles.image.height}
            style={styles.antIcon}
            color={COLORS.background.primary}
          />
        ) : (
          <Image source={icon} style={iconStyle ? iconStyle : styles.image} />
        )}
        <Text style={styles.valueText}>{value}</Text>
      </Box>
    </Box>
  );

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} /> */}
      <CustomHeader
        leftIcon={'arrow-left'}
        title={strings.displayText.appointmentCancellation}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
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
          <Text style={commonStyles.topTitleText}>
            {strings.displayText.appointmentCancellation}
          </Text>
          <Box />
        </Box>
        <Box style={styles.divider} />
      </Box> */}
      <Box marginHorizontal={20} marginVertical={20}>
        <Text style={styles.appointmentDetailsText}>{strings.displayText.appointmentDetails}</Text>
        <Box display="flex" flexDirection="row" marginTop={20}>
          <DetailRow
            label={strings.displayText.doctorName}
            value={appointmentData?.doctor_name ?? '-'}
            icon={'user'}
            type="Icon"
          />
          <DetailRow
            label={strings.displayText.newDateTime}
            value={cancelDayFormat(
              `${appointmentData?.appoint_date}T${appointmentData?.slot_label}`,
            )}
            icon={assets.CalenderBlue}
          />
        </Box>
        <Box display="flex" flexDirection="row" marginTop={20}>
          <DetailRow
            label={strings.displayText.consultationFor}
            value={appointmentData?.purpose ?? '-'}
            icon={assets.NounSmell}
          />
          <DetailRow
            label={strings.displayText.appointmentId}
            value={appointmentData?.op_no ?? '-'}
            icon={assets.AppointmentId}
            iconStyle={styles.appointmentId}
          />
        </Box>
      </Box>
      <Box style={styles.divider} />
      <Box marginHorizontal={20} marginVertical={20}>
        <Text style={styles.helpText}>{strings.displayText.pleaseHelpCancel}</Text>
        <CancelRadioGroup
          options={reasonCancel}
          selectedOption={selectOption}
          onSelect={handleRadioChange}
        />
      </Box>
      <Box style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            handleCancelApointment();
          }}
          loader={loader}
          buttonStyle={styles.addBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          {strings.displayText.cancelAppointment}
        </AbstractButton>
      </Box>
    </AppContainer>
  );
};

export default CancelAppointment;
