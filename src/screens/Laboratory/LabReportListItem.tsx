/* eslint-disable react/react-in-jsx-scope */
import { Image, TouchableOpacity } from 'react-native';
import { Box } from '../../components';
import { COLORS } from '../../constants';
import { Text } from 'react-native-paper';
import { getDayOfMonth, getMonth } from '../../util/DateUtil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/Laboratory.styles';

const LabReportListItem = ({
  item,
  bill_date,
  setIsOpenReportBs,
  setSelectedLabItem,
}: {
  item: any;
  navigation: any;
  setIsOpenReportBs: any;
  setSelectedLabItem: any;
}) => {
  return (
    <>
      <Box marginTop={styles.userIcon.height}>
        <Box flexDirection="row" flex={1}>
          <Box flexDirection="column" width={'10%'} alignItems="flex-start">
            <Box alignItems="center">
              <Box style={styles.dayBoxStyle}>
                <Text style={styles.dateDay}>{bill_date ? getDayOfMonth(bill_date) : '-'}</Text>
              </Box>
              <Text style={styles.dateMonth}>{bill_date ? getMonth(bill_date) : '-'}</Text>
              <Box style={[styles.verticalDivider]} />
            </Box>
          </Box>
          <Box width={'87%'} marginTop={styles.dateMonth.marginTop}>
            {item?.sub_tests?.length > 1 && item?.sub_tests[0] !== null ? (
              <Box flexDirection="row" justifyContent="space-between">
                <Text style={styles.nametext}>{item?.item_name}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedLabItem(item);
                    setIsOpenReportBs(true);
                  }}
                >
                  <Box style={styles.viewBox}>
                    <Text style={styles.viewText}>View</Text>
                  </Box>
                </TouchableOpacity>
              </Box>
            ) : (
              <Box flexDirection="row" justifyContent="space-between">
                <Text style={styles.nametext}>{item?.item_name}</Text>
                <Box flexDirection="column">
                  <Box flexDirection="row" justifyContent="flex-end">
                    {item?.sub_tests[0]?.result_type === 'Abnormal' ? (
                      <Text style={styles.pointsOneTextRed}>
                        {item?.sub_tests[0]?.reading_value}
                      </Text>
                    ) : (
                      <Text style={styles.pointsOneTextBlack}>{item?.sub_tests[0]?.ref_range}</Text>
                    )}
                    {item?.sub_tests[0]?.result_level === 'High' ? (
                      // <Image
                      //   source={assets.greenUpArrow}
                      //   style={{ alignSelf: 'center', marginLeft: 3 }}
                      // />
                      <MaterialCommunityIcons
                        name="arrow-up-bold"
                        style={{ alignSelf: 'center' }}
                        size={styles.labReportIconStyle.height}
                        color={COLORS.green}
                      />
                    ) : item?.sub_tests[0]?.result_level === 'Low' ? (
                      // <Image
                      //   source={assets.redDownArrow}
                      //   style={{ alignSelf: 'center', marginLeft: 3 }}
                      // />
                      <MaterialCommunityIcons
                        name="arrow-down-bold"
                        style={{ alignSelf: 'center' }}
                        size={styles.labReportIconStyle.height}
                        color={COLORS.danger}
                      />
                    ) : (
                      <Image />
                    )}
                  </Box>
                  <Text style={styles.pointsTwoText}>{item?.sub_tests[0]?.ref_range}</Text>
                </Box>
              </Box>
            )}
            <Box flexDirection="row">
              <Text style={styles.optext}>{item?.bill_no ? item?.bill_no : 'LAB0014'}</Text>
              <Box style={[styles.smallVerticalDivider]} />
              <Text style={styles.optext}>
                {item?.doctor_name ? item?.doctor_name : 'Dr. Anbu'}
              </Text>
            </Box>
            <Box style={styles.divider} marginTop={styles.nametext.lineHeight} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LabReportListItem;
