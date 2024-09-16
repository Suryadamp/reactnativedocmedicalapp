import React from 'react';
import { Text } from 'react-native';
import { Box } from '../../../components';
import { COLORS, FONTS } from '../../../constants';
import styles from '../../../styles/AppointmentVitals.styles';

const VitalHistoryCard = ({ item }: any) => {
  return (
    <Box style={styles.boxMainContainer}>
      <Box width={'20%'} justifyContent="center" alignContent="center" alignItems="center">
        <Text style={{ fontFamily: FONTS.SFProDisplayBold, fontSize: 16, color: COLORS.text }}>
          {item?.value}
        </Text>
        <Text style={{ fontFamily: FONTS.SFProDisplayRegular, fontSize: 10, color: '#9A9FA4' }}>
          mg/dL
        </Text>
      </Box>

      <Box
        style={{
          borderLeftWidth: 5,
          height: '100%',
          marginHorizontal: 10,
          width: 10,
          borderColor:
            item?.name === 'Low Pressure'
              ? '#FF9500'
              : item?.name === 'Normal'
                ? '#17CF9D'
                : '#FF3B30',
        }}
      />

      <Box style={styles.secondWidth}>
        <Text style={styles.vitalHistoryTextReason}>{item?.name}</Text>
        <Text style={styles.vitalHistoryTextTaken}>{item?.taken}</Text>
        <Text style={styles.vitalHistoryTextDate}>{item?.date}</Text>
      </Box>
    </Box>
  );
};

export default VitalHistoryCard;
