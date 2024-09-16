import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AbstractButton, AppContainer, Box } from '../../../components';
import CustomHeader from '../../../components/CustomHeader';
import Line from '../../../components/Line';
import { COLORS, FONTS, assets } from '../../../constants';
import WeekdayProgress from './WeekdayProgress';
import { useSelector } from 'react-redux';
import { getTextForDurationList } from '../../../util/DateUtil';
import { RootState } from '../../../state';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NavigateProps;
const medicationIntake = {
  Mon: 3,
  Tue: 3,
  Wed: 2,
  Thu: 1,
  Fri: 2,
  Sat: 1,
  Sun: 0,
};

const TrackActivity = ({ navigation, route }: Props) => {
  const reminder = route?.params?.reminder;
  const patient = route?.params?.patient;
  const totalDoses = 3;
  const [medicationStatus, setMedicationStatus] = useState(medicationIntake);
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const scheduleOptions = commonVariable[0]?.duration_type;
  const getTextForDurationType = (durationType: any) => {
    const matchingType = scheduleOptions.find((type) => type.id === durationType);
    return matchingType ? matchingType.value : '';
  };

  const durationText = getTextForDurationType(reminder?.duration_type);
  const durationList = getTextForDurationList(reminder);

  const handleLogPress = () => {
    console.log('Implement your logic for when the log button is pressed');
  };

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* Header & title section */}
      <CustomHeader
        leftIcon="back"
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        title="Track Activity"
      />
      <Line orientation="vertical" />

      {/* Medication card */}
      <Box style={styles.card}>
        <Box style={styles.row}>
          {/* Medication Icon */}
          <Box style={styles.iconContainer}>
            <Image style={styles.medicationIcon} source={assets.CapsuleTable} />
          </Box>

          {/* Medication Info */}
          <Box style={styles.medicationInfoContainer}>
            <Text style={styles.medicationName}>{reminder.productname}</Text>
            <Text style={styles.medicationTime}>
              {durationList} - {reminder.start_date}
            </Text>
            <Text style={styles.medicationDays}>{durationText}</Text>
          </Box>

          {/* Log Button */}
          <Box style={styles.buttonContainer}>
            <AbstractButton
              onPress={handleLogPress}
              buttonStyle={styles.logButton}
              textStyle={styles.logButtonText}
            >
              {'Log now'}
            </AbstractButton>
          </Box>
        </Box>
      </Box>

      {/* Track Activity Progress Section */}
      <Box>
        <Box paddingHorizontal={15}>
          <Text style={styles.activityTitle}>Medication Taken his week</Text>
        </Box>
        <Box style={[styles.card, styles.row, styles.MedicationCard]}>
          {Object.entries(medicationStatus).map(([day, dosesTaken]) => (
            <TouchableOpacity key={day} onPress={() => handleDayPress(day)}>
              <WeekdayProgress
                day={day}
                dosesTaken={dosesTaken}
                totalDoses={totalDoses}
                isSelected={day === selectedDay}
              />
            </TouchableOpacity>
          ))}
        </Box>
      </Box>

      {/* Contact us card */}
      <Box style={[styles.card, styles.doctorCard]}>
        <Image source={assets.AppLogowithName} style={styles.IconImg} />
        <Box>
          <Text style={styles.title}>Book Your</Text>
          <Text style={styles.title}>Appointment with</Text>
          <Text style={styles.title}>Experienced Doctors</Text>
        </Box>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('contact up button pressed')}
        >
          <Text style={styles.buttonText}>Contact us</Text>
        </TouchableOpacity>
        <Image source={assets.DoctorWithCircleBg} style={styles.doctorImg} />
      </Box>
    </AppContainer>
  );
};

export default TrackActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.white,
    flexDirection: 'column',
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: 13,
  },
  IconImg: { height: 16.33, width: 26 },
  doctorCard: {
    overflow: 'hidden',
    height: 180,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  doctorImg: { width: 200, height: 220, position: 'absolute', right: -70, bottom: -50 },
  /* Track activity styles */
  activityTitle: {
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplayMedium,
    marginTop: 15,
    marginBottom: 11,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 6,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    marginBottom: 4,
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'grey',
  },

  /* Medication card styles */
  buttonContainer: {
    paddingRight: 12,
  },
  medicationIcon: {
    height: 24,
    width: 25,
    marginHorizontal: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  MedicationCard: {
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexShrink: 0,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationInfoContainer: {
    flex: 1,
    padding: 10,
    borderLeftColor: '#DDD',
    borderLeftWidth: 1,
  },
  medicationName: {
    fontFamily: FONTS.InterMedium,
    color: COLORS.text,
    letterSpacing: 0.3,
    fontSize: 16,
    marginBottom: 2,
  },
  medicationTime: {
    fontFamily: FONTS.Inter,
    color: COLORS.text,
    fontSize: 13,
    marginBottom: 2,
  },
  medicationDays: {
    fontSize: 13,
    fontFamily: FONTS.Inter,
    color: COLORS.text,
  },
  logButton: {
    width: 67,
    height: 25,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  logButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: FONTS.InterBold,
  },

  /* Contact us card */
  title: {
    fontSize: 17,
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.background.primary,
    lineHeight: 20,
    letterSpacing: -0.5,
  },
  button: {
    backgroundColor: COLORS.background.primary,
    height: 25,
    width: 68,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.InterBold,
    fontSize: 10,
    lineHeight: 12,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
