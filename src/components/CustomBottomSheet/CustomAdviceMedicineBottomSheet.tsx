import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AbstractButton, Box } from '..';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { ICustomFilterBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { showErrorSnackBar, showSnackBar, Snackbar } from '../../util/AlertUtil';
import { RootState } from '../../state';
import { useSelector } from 'react-redux';
import styles from '../../styles/component_styles/CustomPrescriptionBottomSheet.styles';

const hourList = Array.from({ length: 24 }, (_, index) => (index + 1).toString());
const MinutesList = Array.from({ length: 60 }, (_, index) => (index + 1).toString());
const CustomAdviceMedicineBottomSheet: React.FC<ICustomFilterBottomSheetProps> = ({
  type,
  handleClosePress,
  handleSelectedFilterType,
}) => {
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const dateFormatList = commonVariable[0]?.freq_time_type;

  const freqList = commonVariable[0]?.freq;

  const [selectedDuration, setSelectedDuration] = useState('3');
  const [selecteddayWeek, setSelecteddayWeek] = useState(dateFormatList[0].value);
  const [specificDays, setSpecificDays] = useState('');
  const [selectDurationIndex, setSelectDurationIndex] = useState(2);
  const [selectDayWeekIndex, setSelectDayWeekIndex] = useState(0);
  const handleSelectSlot = (slot: string) => {
    // Clear the array to allow only one selection
    setSpecificDays(slot);
  };

  const durationCountList = selecteddayWeek === 'Hours' ? hourList : MinutesList;

  const handleApply = () => {
    if (specificDays) {
      const data = {
        freq: specificDays,
        freq_time: { label: selectedDuration, value: selectDurationIndex },
        freq_time_type: selecteddayWeek,
      };
      handleSelectedFilterType?.(data);
      setSpecificDays('');
      handleClosePress?.();
    } else {
      showAlert('Please choose a dosage time');
    }
  };

  const showAlert = (message: string) => {
    showErrorSnackBar(message, {
      textColor: '#fff',
      backgroundColor: '#cc0000',
      duration: Snackbar.LENGTH_LONG,
    });
  };

  const handleCloseAndRemoveData = () => {
    setSpecificDays('');
    handleClosePress?.();
  };

  return (
    <Box style={styles.container}>
      <Box>
        <>
          <Box style={styles.adviceMediBox}>
            {freqList?.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    handleSelectSlot(item.value);
                  }}
                >
                  <Box
                    key={index.toString()}
                    style={specificDays === item.value ? styles.selectedDaysBox : styles.daysBox}
                  >
                    <Image source={assets.BeforeFood} style={styles.maediImage} />
                    <Text
                      style={
                        specificDays === item.value
                          ? styles.selectedDaysBoxText
                          : styles.daysBoxText
                      }
                    >
                      {item?.value}
                    </Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
          <Box style={styles.selectDurationBox}>
            <Text style={styles.mariginStyle}>{'Select Duration'}</Text>
          </Box>
        </>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="row"
        marginTop={styles.adviceMarginTop.height}
      >
        <Box style={styles.numberBox}>
          <ScrollPicker
            dataSource={durationCountList}
            selectedIndex={2}
            renderItem={(data, index) => {
              // Customize the rendering of each item if needed
              return (
                <Text
                  key={index.toLocaleString()}
                  style={[
                    styles.scrollPickerText,
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
        <Box style={styles.dayweekBox}>
          <ScrollPicker
            dataSource={dateFormatList}
            selectedIndex={selectDayWeekIndex}
            renderItem={(data: any, index) => (
              <Text
                key={index.toLocaleString()}
                style={[
                  styles.scrollPickerText,
                  { color: selectDayWeekIndex === index ? COLORS.black : COLORS.shade_grey },
                ]}
              >
                {data.value}
              </Text>
            )}
            onValueChange={(data: any, selectedIndex) => {
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

      <Box style={styles.advanceButtonBoxContainer}>
        <AbstractButton
          onPress={() => {
            handleApply?.();
          }}
          buttonStyle={styles.advanceApplyBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomAdviceMedicineBottomSheet;

