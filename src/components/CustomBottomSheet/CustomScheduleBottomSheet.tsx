import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AbstractButton, Box } from '..';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { ICustomFilterBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { showErrorSnackBar, showSnackBar, Snackbar } from '../../util/AlertUtil';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import styles from '../../styles/component_styles/CustomPrescriptionBottomSheet.styles';

const durationCountList = Array.from({ length: 100 }, (_, index) => (index + 1).toString());
const CustomScheduleBottomSheet: React.FC<ICustomFilterBottomSheetProps> = ({
  type,
  handleClosePress,
  handleSelectedFilterType,
}) => {
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);

  const dateFormatList = commonVariable[0]?.interval;

  const specifiDaysList = commonVariable[0]?.specific_days;

  const [selectedDuration, setSelectedDuration] = useState('3');
  const [specificDays, setSpecificDays] = useState([]);
  const [selectDurationIndex, setSelectDurationIndex] = useState(2);
  const [selectDayWeekIndex, setSelectDayWeekIndex] = useState(0);
  const [selecteddayWeek, setSelecteddayWeek] = useState(dateFormatList[0].value);
  const [days, setDays] = useState('');

  const handleSelectSlot = (slot: string) => {
    const selectedIndex = specificDays.indexOf(slot);
    let newSelectedItems: any = [];
    if (selectedIndex === -1) {
      newSelectedItems = [...specificDays, slot];
    } else {
      specificDays.splice(selectedIndex, 1);
      newSelectedItems = [...specificDays];
    }
    setSpecificDays(newSelectedItems);
  };

  const handleApply = () => {
    const data = {
      specific_days: type === 'Select Days' || type === 'Interval Days' ? [] : specificDays,
      interval_days: type === 'Select Days' || type === 'Specific Days' ? '' : days,
      duration_count: { label: selectedDuration, value: selectDurationIndex },
      interval: { label: selecteddayWeek, value: selectDayWeekIndex },
    };
    if (parseInt(selectedDuration, 10) > 0) {
      if (type === 'Select Days') {
        if (selectedDuration) {
          handleSelectedFilterType?.({
            value: selectedDuration + ' ' + selecteddayWeek,
            data,
          });
          handleClosePress?.();
        } else {
          showAlert('Please select the duration');
        }
      } else if (type === 'Specific Days') {
        if (specificDays && selectedDuration && selecteddayWeek) {
          handleSelectedFilterType?.({
            value: specificDays.join(',') + ' - ' + selectedDuration + ' ' + selecteddayWeek,
            data,
          });
          handleClosePress?.();
        } else {
          const fields = {
            specificDays: !specificDays && 'Specific Day',
            selectedDuration: !selectedDuration && 'Duration',
            selecteddayWeek: !selecteddayWeek && 'Day Week',
          };
          const missingField = Object.entries(fields).find(([_, message]) => message);
          if (missingField) {
            showErrorSnackBar(`Please enter ${missingField[1]}.`);
          }
          // showAlert('Please select the duration');
        }
      } else if (type === 'Interval Days') {
        if (days && selectedDuration && selecteddayWeek) {
          handleSelectedFilterType?.({
            value:
              'Every ' + ' ' + days + ' days' + ' - ' + selectedDuration + ' ' + selecteddayWeek,
            data,
          });
          handleClosePress?.();
        } else {
          const fields = {
            days: !days && 'Day',
            selectedDuration: !selectedDuration && 'Duration',
            selecteddayWeek: !selecteddayWeek && 'Day Week',
          };
          const missingField = Object.entries(fields).find(([_, message]) => message);
          if (missingField) {
            showErrorSnackBar(`Please enter ${missingField[1]}.`);
          }
        }
      }
    } else {
      showAlert('Please select valid duration');
    }
  };

  const showAlert = (message: string) => {
    showErrorSnackBar(message);
  };

  return (
    <Box
      style={[
        styles.scheduleContainer,
        { height: type === 'Select Days' ? SIZES.screenHeight / 3.5 : SIZES.screenHeight / 2.4 },
      ]}
    >
      <Box>
        {type === 'Interval Days' && (
          <>
            <Box style={styles.intervalDaysBox}>
              <Text style={styles.everyDayText}>Every</Text>
              <Box>
                <TextInput
                  value={days}
                  style={styles.inputStyle}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={(value) => {
                    setDays(value);
                  }}
                />
                {/* <Box style={styles.boxBoderStyle} /> */}
              </Box>

              <Text style={styles.everyDayText}>Days</Text>
            </Box>
            <Box style={styles.scheduleSelectDurationBox}>
              <Text style={styles.mariginStyle}>{'Select Duration'}</Text>
            </Box>
          </>
        )}
        {type === 'Specific Days' && (
          <>
            <Box style={styles.specificDayBox}>
              {specifiDaysList?.map((day) => (
                <TouchableOpacity
                  key={day.id.toString()}
                  activeOpacity={0.8}
                  onPress={() => {
                    handleSelectSlot(day.value);
                  }}
                >
                  <Box
                    style={
                      specificDays.find((item) => item === day.value) != null
                        ? styles.scheduleSelectedDaysBox
                        : styles.scheduleDaysBox
                    }
                  >
                    <Text
                      style={
                        specificDays.find((item) => item === day.value) != null
                          ? styles.scheduleSelectedDaysBoxText
                          : styles.scheduleDaysBoxText
                      }
                    >
                      {day.value}
                    </Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </Box>
            <Box style={styles.scheduleSelectDurationBox}>
              <Text style={styles.mariginStyle}>{'Select Duration'}</Text>
            </Box>
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="row">
        <Box style={styles.timeNumberBox}>
          <ScrollPicker
            dataSource={durationCountList}
            selectedIndex={2}
            renderItem={(data, index) => {
              // Customize the rendering of each item if needed
              return (
                <Text
                  key={index.toLocaleString()}
                  style={[
                    styles.scheduleScrollPickerText,
                    {
                      color: selectDurationIndex === index ? COLORS.black : COLORS.shade_grey,
                    },
                  ]}
                >
                  {data}
                </Text>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              setSelectDurationIndex(selectedIndex);
              setSelectedDuration(data);
            }}
            wrapperHeight={styles.scrollPickerStyles.height}
            wrapperBackground={COLORS.background.white}
            itemHeight={styles.scrollPickerStyles.itemHeight}
            highlightColor={COLORS.background.primary}
            highlightBorderWidth={styles.scrollPickerStyles.highlightBorderWidth}
          />
        </Box>
        <Box style={styles.timeDayweekBox}>
          <ScrollPicker
            dataSource={dateFormatList}
            selectedIndex={selectDayWeekIndex}
            renderItem={(data: any, index) => (
              <Text
                key={index.toLocaleString()}
                style={[
                  styles.scheduleScrollPickerText,
                  { color: selectDayWeekIndex === index ? COLORS.black : COLORS.shade_grey },
                ]}
              >
                {data.value}
              </Text>
            )}
            onValueChange={(data, selectedIndex) => {
              setSelectDayWeekIndex(selectedIndex);
              setSelecteddayWeek(data.value);
            }}
            wrapperHeight={styles.scrollPickerStyles.height}
            wrapperBackground={COLORS.background.white}
            itemHeight={styles.scrollPickerStyles.itemHeight}
            highlightColor={COLORS.background.primary}
            highlightBorderWidth={styles.scrollPickerStyles.highlightBorderWidth}
          />
        </Box>
      </Box>

      <Box style={styles.scheduleButtonBoxContainer}>
        <AbstractButton
          onPress={() => {
            handleApply?.();
          }}
          buttonStyle={styles.scheduleApplyBtnStyle}
          textStyle={styles.scheduleApplyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomScheduleBottomSheet;
