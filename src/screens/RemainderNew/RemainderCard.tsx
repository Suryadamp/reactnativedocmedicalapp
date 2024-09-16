import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from '../../components';
import { Remainder } from '../../service/RemainderService';
import { RootState } from '../../state';
import { useSelector } from 'react-redux';
import styles from '../../styles/Reminder.styles';

interface PrescriptionCardProps {
  item: Record<string, Remainder[]> | undefined;
  handleNavigation: Function;
  navigation: any;
}

const RemainderCard = ({ item, navigation }: PrescriptionCardProps) => {
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const scheduleOptions = commonVariable[0]?.duration_type;
  console.log(scheduleOptions);
  const getTextForDurationType = (durationType: any) => {
    const matchingType = scheduleOptions?.find((type) => type.id === durationType);
    return matchingType ? matchingType.value : '';
  };

  const getTextForDurationList = (durationType: any) => {
    const jsonObject = JSON.parse(durationType?.duration);
    if (jsonObject) {
      if (durationType?.duration_type === 'everyday') {
        const everydayValue = jsonObject?.duration_count
          ? jsonObject?.duration_count
          : '' + ' ' + jsonObject?.interval
            ? jsonObject?.interval
            : '';
        return everydayValue ? everydayValue : '';
      } else if (durationType?.duration_type === 'specific_days') {
        const specificdayValue =
          ' | ' +
          jsonObject?.specific_days?.join(',') +
          ' | ' +
          jsonObject?.duration_count +
          ' ' +
          jsonObject?.interval;
        return specificdayValue ? specificdayValue : '';
      } else if (durationType?.duration_type === 'interval_days') {
        const intervalDays =
          'Every ' +
          jsonObject?.interval_days +
          ' days' +
          ' | ' +
          jsonObject?.duration_count +
          ' ' +
          jsonObject?.interval;
        return intervalDays ? intervalDays : '';
      } else if (durationType?.duration_type === 'custom_date') {
        const customDate = jsonObject?.custom_date;
        const startDate = customDate?.startDate ? customDate?.startDate : '';
        const endDate = customDate?.endDate ? customDate?.endDate : '';
        return startDate + ' - ' + endDate;
      } else {
        return 'Mon, Tue | 10:00 AM, 12:00 AM, 01:00 PM';
      }
    }
  };

  return (
    <>
      {item &&
        Object.keys(item).map((symptomName, index) => (
          <Box key={index}>
            <Box justifyContent="space-between" flexDirection="row" style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{symptomName}</Text>
            </Box>
            {item[symptomName] &&
              item[symptomName].map((data, innerIndex) => {
                const durationText = getTextForDurationType(data?.duration_type);
                const durationList = getTextForDurationList(data);
                return (
                  <Box key={innerIndex}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('RemainderDetailNew', {
                          item: data,
                          patient: selectedPatient,
                        });
                      }}
                    >
                      <Box style={styles.cardContainer}>
                        <Box flexDirection="row" justifyContent="space-between">
                          <Text style={styles.medicineText}>
                            {data?.productname} {data?.units}
                          </Text>
                        </Box>
                        <Text style={styles.doseText}>
                          {data?.dosage ? data.dosage.substring(0, 7) : ''} {'dose'}
                        </Text>
                        <Text style={styles.doseText}>
                          {durationText} {durationList}
                        </Text>
                      </Box>
                    </TouchableOpacity>
                    <View style={[styles.line, styles.marginTopStyle]} />
                  </Box>
                );
              })}
          </Box>
        ))}
    </>
  );
};

export default RemainderCard;

// const styles = StyleSheet.create({
//   cardContainer: {
//     marginTop: 10,
//     display: 'flex',
//     flexDirection: 'column',
//     marginHorizontal: 20,
//   },
//   medicineText: {
//     fontFamily: FONTS.SFProDisplayMedium,
//     color: COLORS.black,
//     fontSize: 14,
//   },
//   doseText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     color: COLORS.black,
//     fontSize: 12,
//   },
//   line: {
//     borderBottomColor: COLORS.lightGray,
//     borderBottomWidth: 1,
//     marginTop: 10,
//   },
//   sectionHeader: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: 'rgba(247,247,247,1.0)',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.background.primary,
//   },
//   imageStyle: {
//     height: 10,
//     width: 10,
//   },
//   marginStartStyle: {
//     marginStart: 10,
//   },
//   marginTopStyle: {
//     marginTop: 15,
//   },
// });
