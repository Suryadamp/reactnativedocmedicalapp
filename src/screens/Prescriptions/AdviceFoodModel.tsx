import React, { useState } from 'react';
import { Text, Modal, TouchableOpacity, Image } from 'react-native';
import { Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { TextInput } from 'react-native-paper';
import { showSnackBar } from '../../util/AlertUtil';

const DaysWeeks = [
  {
    value: '1',
    name: 'Weeks',
  },
  {
    value: '2',
    name: 'Days',
  },
];

const BeforeAfterFoods = [
  {
    value: '1',
    name: 'Before Food',
  },
  {
    value: '2',
    name: 'After Food',
  },
];

const FreqTimes = [
  {
    value: '1',
    name: 'Min',
  },
  {
    value: '2',
    name: 'Hour',
  },
];

interface DaysWeek {
  value?: string;
  name: string;
}

interface BeforeAfterFood {
  value?: string;
  name: string;
}

const AdviceFoodDialog = ({ visible, title, onClose, result }) => {
  const [inputTime, setInputTime] = useState<string>('');
  const [isFoodFocus, setFoodFocus] = useState(false);
  const [isTimeFocus, setTimeFocus] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<BeforeAfterFood | undefined>(undefined);
  const [selectedTimeItem, setSelectedTimeItem] = useState<DaysWeek | undefined>(undefined);

  const renderFoodLabel = () => {
    return (
      <Text style={[styles.daysWeekLable, isFoodFocus && { color: COLORS.background.primary }]}>
        Select
      </Text>
    );
  };

  const renderTimeLabel = () => {
    return (
      <Text style={[styles.daysWeekLable, isTimeFocus && { color: COLORS.background.primary }]}>
        Select
      </Text>
    );
  };

  const setResult = () => {
    if (inputTime.length > 0 && selectedTimeItem && selectedFoodItem) {
      const data = {
        freq: inputTime,
        freq_time: selectedTimeItem?.name,
        freq_time_type: selectedFoodItem?.name,
      };
      result(data);
    } else {
      showSnackBar('Please enter all the fields');
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Box style={styles.container}>
        <Box style={styles.dialog}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor={COLORS.background.primary}
          >
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              activeOpacity={0.8}
              onPress={() => {
                onClose();
              }}
            >
              <Image source={assets.CloseWhite} style={styles.icon} />
            </TouchableOpacity>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginHorizontal={10}
            marginTop={20}
          >
            <TextInput
              mode="outlined"
              placeholderTextColor={'grey'}
              placeholder={'0'}
              keyboardType="numeric"
              value={inputTime}
              onChangeText={(val) => setInputTime(val)}
              style={styles.dosageInputTxt}
              outlineColor={COLORS.background.primary}
              activeOutlineColor={COLORS.background.primary}
              theme={{
                colors: {
                  primary: COLORS.gray,
                  underlineColor: 'transparent',
                  background: COLORS.background.secondary,
                },
                roundness: 5,
              }}
              maxLength={2}
            />
            <Box width={SIZES.screenWidth * 0.25} marginTop={5}>
              {renderTimeLabel()}
              {/* <Dropdown
                style={[styles.foodDropdown, { borderColor: COLORS.background.primary }]}
                placeholderStyle={styles.foodplaceholderStyle}
                selectedTextStyle={styles.selectedFoodTextStyle}
                itemTextStyle={styles.selectedFoodTextStyle}
                iconStyle={styles.iconFoodStyle}
                data={FreqTimes}
                valueField={'name'}
                placeholder={!isTimeFocus ? 'Select' : '...'}
                value={selectedTimeItem}
                onFocus={() => setTimeFocus(true)}
                onBlur={() => setTimeFocus(false)}
                onChange={(item) => {
                  setSelectedTimeItem(item);
                  setTimeFocus(false);
                }}
                labelField={'name'}
              /> */}
            </Box>
            <Box width={SIZES.screenWidth * 0.27} marginTop={5}>
              {renderFoodLabel()}
              {/* <Dropdown
                style={[styles.foodDropdown, { borderColor: COLORS.background.primary }]}
                placeholderStyle={styles.foodplaceholderStyle}
                selectedTextStyle={styles.selectedFoodTextStyle}
                itemTextStyle={styles.selectedFoodTextStyle}
                iconStyle={styles.iconFoodStyle}
                data={BeforeAfterFoods}
                valueField={'name'}
                placeholder={!isFoodFocus ? 'Select' : '...'}
                value={selectedFoodItem}
                onFocus={() => setFoodFocus(true)}
                onBlur={() => setFoodFocus(false)}
                onChange={(item) => {
                  setSelectedFoodItem(item);
                  setFoodFocus(false);
                }}
                renderLeftIcon={() => (
                  <Image source={assets.BeforeFood} style={([styles.icon], { marginEnd: 3 })} />
                )}
                labelField={'name'}
              /> */}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            marginHorizontal={14}
            marginTop={20}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onClose();
              }}
            >
              <Text style={styles.textButton}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginStart: 20 }}
              activeOpacity={0.8}
              onPress={() => {
                setResult();
              }}
            >
              <Text style={styles.textButton}>SET</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '80%',
    paddingBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    paddingVertical: 13,
    paddingHorizontal: 14,
    color: COLORS.white,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: COLORS.background.primary,
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  circleMinus: {
    flex: 1,
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 12.5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  DaysContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  textStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    color: COLORS.black,
    marginTop: 2,
  },
  daysWeekLable: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 6,
    top: -5,
    paddingStart: 5,
    paddingEnd: 5,
    paddingHorizontal: 1,
    zIndex: 999,
    fontSize: 9,
    color: COLORS.text,
  },
  foodDropdown: {
    height: 35,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    padding: 11,
    margin: 3,
  },
  foodplaceholderStyle: {
    fontSize: SIZES.small,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  selectedFoodTextStyle: {
    fontSize: SIZES.small,
  },
  iconFoodStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    height: 15,
    width: 20,
  },
  textButton: {
    color: COLORS.background.primary,
    fontSize: 12,
    fontFamily: FONTS.SFProDisplayRegular,
  },
  daysContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  daysTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 20,
  },
  daysBoxText: {
    fontSize: SIZES.extraSmall,
    color: COLORS.placeHolder,
  },
  selectedDaysBoxText: {
    fontSize: SIZES.extraSmall,
    color: COLORS.white,
  },
  daysBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.background.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedDaysBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: COLORS.background.primary,
    borderColor: COLORS.background.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dosageInputTxt: {
    backgroundColor: 'white',
    fontSize: SIZES.small,
    height: 30,
    maxWidth: 50,
    textAlign: 'center',
  },
};

export default AdviceFoodDialog;
