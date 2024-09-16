import React, { FC } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { Box } from '../../../components';
import { COLORS, FONTS, SIZES, assets } from '../../../constants';

interface Appointment {
  id: number;
  date: string;
  category: string;
  doctor: string;
  hospital: string;
  place: string;
  patient: string;
}

interface AppointmentCardProps {
  item: Appointment;
}
const AppointmentCard: FC<AppointmentCardProps> = ({ item }) => {
  return (
    <Box style={styles.cardContainer}>
      <Image source={assets.Seperator} style={styles.seperator} />
      <Box style={styles.card}>
        <Box style={styles.cardHeader}>
          <Text style={styles.headerTitle}>Appointment Confirmed ({item.id})</Text>
          <Image source={assets.TickCircle} />
        </Box>
        <Box style={styles.cardContent}>
          <Box>
            <Text style={styles.dateStyle}>{item.date}</Text>
            <Text style={styles.categoryStyle}>{item.category}</Text>
            <Text style={styles.doctorStyle}>{item.doctor}</Text>
            <Text style={styles.hospitalStyle}>{item.hospital}</Text>
            <Text style={styles.hospitalStyle}>{item.place}</Text>
          </Box>
          <Image source={assets.Doctor1} style={styles.doctorIcon} />
        </Box>
        <Box style={styles.divider} />
        <Box style={styles.cardFooter}>
          <Box style={styles.footerContainer}>
            <Box style={styles.patientContainer}>
              <Image source={assets.User2} style={styles.userIcon} />
              <Text style={styles.patientStyle}>{item.patient}</Text>
            </Box>
            <Box style={styles.patientContainer}>
              <Image source={assets.Available} style={styles.userIcon} />
              <Image source={assets.Report} style={styles.userIcon} />
              <Image source={assets.PaidReceipt} style={[styles.userIcon]} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  seperator: {
    marginRight: 8,
  },
  card: {
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: COLORS.green,
    padding: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  dateStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.extraSmall,
    color: COLORS.darkBlue,
  },
  categoryStyle: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: SIZES.small,
    fontWeight: '500',
    color: COLORS.darkBlue,
  },
  doctorStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    fontWeight: '400',
    color: COLORS.darkBlue,
  },
  hospitalStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.base,
    fontWeight: '300',
    color: COLORS.darkBlue,
  },
  doctorIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  cardFooter: {
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  userIcon: {
    width: 15,
    height: 15,
    marginRight: 20,
  },
  patientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  patientStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.extraSmall,
    fontWeight: '400',
    color: COLORS.darkBlue,
  },
});
