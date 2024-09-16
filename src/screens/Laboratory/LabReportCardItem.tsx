/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Image, Platform } from 'react-native';
import { Box } from '../../components';
import { COLORS, FONTS, assets } from '../../constants';
import { Text } from 'react-native-paper';

export interface LabReport {
  labId: string;
  date: string;
  doctorName: string;
  source: string;
}

interface LabReportCardProps {
  item: LabReport;
}

const LabReportCardItem = ({ item }: LabReportCardProps) => {
  return (
    <Box style={[styles.card, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
      <Box flex={1}>
        <Box justifyContent="space-between" flexDirection="row">
          <Text style={styles.labId}>{item.labId}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </Box>
        <Text style={styles.contentText}>Go Inside the report, to view details</Text>
        <Box marginTop={10} flexDirection="row" justifyContent="space-between">
          <Box>
            <Box style={styles.divider} />
            <Box flexDirection="row" justifyContent="space-between">
              <Text style={styles.text}>{item.doctorName}</Text>
              <Box marginLeft={20} />
              <Text style={styles.text}>{item.source}</Text>
            </Box>
          </Box>
          <Image source={assets.rightArrowBlack} style={styles.statusImage} />
        </Box>
      </Box>
    </Box>
  );
};

export default LabReportCardItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.grey_D8D8D8,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 18,
    shadowColor: COLORS.grey_FAFAFA,
    padding: 10,
  },
  prescriptionNo: {
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
  prescriptionNoBold: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: 12,
    marginStart: 5,
    fontWeight: 'bold',
  },
  name: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: 12,
    fontWeight: 'bold',
  },
  symptoms: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: 10,
    marginTop: 10,
  },
  iosShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  statusImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  labId: {
    color: COLORS.black_2D3339,
    fontSize: 14,
    fontWeight: '700',
  },
  dateText: {
    color: COLORS.grey_838383,
    fontSize: 12,
    fontWeight: '400',
  },
  contentText: {
    color: COLORS.black_2D3339,
    fontSize: 10,
    fontWeight: '400',
    marginTop: 10,
  },
  text: {
    color: COLORS.black_2D3339,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 10,
  },
  divider: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: 10,
  },
});
