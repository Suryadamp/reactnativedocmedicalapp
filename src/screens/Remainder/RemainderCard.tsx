/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Image, Platform, View } from 'react-native';
import { Box } from '../../components';
import { COLORS, FONTS, assets } from '../../constants';
import { Text } from 'react-native-paper';

export interface Remainder {
  id: string;
  patient_id: string;
  invoice_no: string;
  appointment: Appointment;
  Remainderproduct: RemainderProduct[];
}
export interface Appointment {
  id: string;
  doctor: Doctor;
}

export interface RemainderProduct {
  symptom: Symptom;
}

export interface Symptom {
  id: string;
  symptom_name: string;
}

export interface Doctor {
  id: string;
  name: string;
}
interface RemainderCardProps {
  item: Remainder;
}

const RemainderCard = () => {
  return (
    <Box>
      <Box
        style={[styles.card, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={20}
          paddingTop={10}
          paddingBottom={14}
        >
          <Box style={styles.medicienBox}>
            <Text style={styles.title}>Naloxone 1ml</Text>
            <Text style={styles.doseStyle}>10 dose</Text>
            <Box flexDirection="row" alignItems="center">
              <Text style={styles.remainderTimeStyle}>Mon, Tue</Text>
              <Text style={styles.sperator}>|</Text>
              <Text style={styles.remainderTimeStyle}>10:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>11:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>12:00 PM,</Text>
              <Text style={styles.remainderTimeStyle}>01:00 PM,</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        style={[styles.card, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={20}
          paddingTop={10}
          paddingBottom={14}
        >
          <Box style={styles.medicienBox}>
            <Text style={styles.title}>Naloxone 1ml</Text>
            <Text style={styles.doseStyle}>10 dose</Text>
            <Box flexDirection="row" alignItems="center">
              <Text style={styles.remainderTimeStyle}>Mon, Tue</Text>
              <Text style={styles.sperator}>|</Text>
              <Text style={styles.remainderTimeStyle}>10:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>11:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>12:00 PM,</Text>
              <Text style={styles.remainderTimeStyle}>01:00 PM,</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        style={[styles.card, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={20}
          paddingTop={10}
          paddingBottom={14}
        >
          <Box style={styles.medicienBox}>
            <Text style={styles.title}>Naloxone 1ml</Text>
            <Text style={styles.doseStyle}>10 dose</Text>
            <Box flexDirection="row" alignItems="center">
              <Text style={styles.remainderTimeStyle}>Mon, Tue</Text>
              <Text style={styles.sperator}>|</Text>
              <Text style={styles.remainderTimeStyle}>10:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>11:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>12:00 PM,</Text>
              <Text style={styles.remainderTimeStyle}>01:00 PM,</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        style={[styles.card, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={20}
          paddingTop={10}
          paddingBottom={14}
        >
          <Box style={styles.medicienBox}>
            <Text style={styles.title}>Naloxone 1ml</Text>
            <Text style={styles.doseStyle}>10 dose</Text>
            <Box flexDirection="row" alignItems="center">
              <Text style={styles.remainderTimeStyle}>Mon, Tue</Text>
              <Text style={styles.sperator}>|</Text>
              <Text style={styles.remainderTimeStyle}>10:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>11:00 AM,</Text>
              <Text style={styles.remainderTimeStyle}>12:00 PM,</Text>
              <Text style={styles.remainderTimeStyle}>01:00 PM,</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RemainderCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  medicienBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 17,
    paddingTop: 10,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    overflow: 'hidden',
    height: 85,
    shadowColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  RemainderNo: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  RemainderNoBold: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: 12,
    marginStart: 5,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#222B45',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.3,
    paddingBottom: 4,
  },
  doseStyle: {
    color: '#222B45',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    letterSpacing: 0.3,
    paddingBottom: 7,
  },
  remainderTimeStyle: {
    color: '#222B45',
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: 10,
    lineHeight: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
    paddingRight: 5,
  },
  sperator: {
    color: '#222B45',
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: 16,
    lineHeight: 16,
    fontStyle: 'normal',
    fontWeight: '300',
    letterSpacing: 0.3,
    paddingRight: 5,
  },
  iosShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: 5,
  },
  doctorImage: {
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 48,
    marginVertical: 5,
  },
});
