import React from 'react';
import { Text, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package
import { Box } from '../../components';
import { LabItems } from '../../service/LaboratoryService';
import styles from '../../styles/Laboratory.styles';
import { useScrollEndDetection } from '../../hooks/useLogs';
const reportDetails = ({ item }: any) => {
  return (
    <Box style={styles.resultRow}>
      <Text style={styles.resultName}>{item?.test_name}</Text>
      <Box>
        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Text
            style={
              item?.result_type === 'Abnormal' ? styles.resultValueAbnormal : styles.resultValue
            }
          >
            {item?.reading_value}
          </Text>
          {item?.result_level ? (
            <MaterialCommunityIcons
              name={
                item?.result_level === 'High'
                  ? 'arrow-up-bold'
                  : item?.result_level === 'Low'
                    ? 'arrow-down-bold'
                    : ''
              }
              size={styles.labReportIconStyle.height}
              color={item?.result_type === 'Abnormal' ? 'red' : 'black'}
              style={{ marginLeft: styles.labReportIconStyle.marginLeft }}
            />
          ) : null}
        </Box>
        <Text style={styles.resultReference}>{item?.ref_range}</Text>
      </Box>
    </Box>
  );
};

const LabReportBottomSheet: React.FC<LabItems> = ({ sub_tests }) => {
  const { handleScroll } = useScrollEndDetection();
  return (
    <>
      <Box>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sub_tests}
          onScroll={handleScroll}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={reportDetails}
        />
      </Box>
    </>
  );
};

// const styles = StyleSheet.create({
//   resultRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomColor: COLORS.ligth_gray,
//     borderBottomWidth: 1,
//   },
//   resultName: {
//     color: '#707070',
//     textAlign: 'center',
//     fontSize: 14,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     letterSpacing: 0.12,
//     lineHeight: 14,
//     fontFamily: FONTS.SFProDisplayRegular,
//   },
//   resultValue: {
//     color: '#121212',
//     textAlign: 'center',
//     fontFamily: FONTS.SFProDisplaySemibold,
//     fontSize: 14,
//     fontStyle: 'normal',
//     fontWeight: '600',
//   },
//   resultValueAbnormal: {
//     color: COLORS.red_FD002E,
//     textAlign: 'center',
//     fontFamily: FONTS.SFProDisplaySemibold,
//     fontSize: 14,
//     fontStyle: 'normal',
//     fontWeight: '600',
//   },
//   resultReference: {
//     color: COLORS.grey_949494,
//     fontSize: 10,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontFamily: FONTS.SFProDisplayRegular,
//   },
// });

export default LabReportBottomSheet;
