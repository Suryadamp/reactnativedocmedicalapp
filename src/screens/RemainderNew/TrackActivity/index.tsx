import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AbstractButton, AppContainer, Box } from '../../../components';
import CustomHeader from '../../../components/CustomHeader';
import Line from '../../../components/Line';
import { COLORS, FONTS, assets } from '../../../constants';
import { RootStackParamList } from '../../../navigation/types';
import WeekdayProgress from './WeekdayProgress';
import styles from '../../../styles/Reminder.styles';

type Props = NativeStackScreenProps<RootStackParamList>;

const medicationIntake = {
  Mon: 3,
  Tue: 3,
  Wed: 2,
  Thu: 1,
  Fri: 2,
  Sat: 1,
  Sun: 0,
};

const TrackActivity = ({ navigation }: Props) => {
  const totalDoses = 3;
  const [medicationStatus] = useState(medicationIntake);

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
      style={styles.trackActivityContainer}
    >
      {/* Header & title section */}
      <CustomHeader
        leftIcon="arrow-left"
        hasDivider
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        title="Track Activity"
      />
      {/* <Line orientation="vertical" /> */}

      {/* Medication card */}
      <Box style={styles.card}>
        <Box style={styles.row}>
          {/* Medication Icon */}
          <Box style={styles.iconContainer}>
            <Image style={styles.medicationIcon} source={assets.CapsuleTable} />
          </Box>

          {/* Medication Info */}
          <Box style={styles.medicationInfoContainer}>
            <Text style={styles.medicationName}>Naloxone 1ml</Text>
            <Text style={styles.medicationTime}>09:00 AM - 12-05-2023</Text>
            <Text style={styles.medicationDays}>Monday - Friday</Text>
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
