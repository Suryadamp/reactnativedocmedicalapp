import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RadioButton } from 'react-native-paper';

import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, SIZES } from '../../constants';
import { strings } from '../../i18n';
import CustomRadioButton from '../../components/CustomRadioButton';
import { isHpTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface IListBottomSheet {
  title?: string;
  items?: object[];
  type?: string;
  item?: any | null;
  onChange: (item: any) => void;
}

export const ListBottomSheet: React.FC<IListBottomSheet> = ({ items, item, type, onChange }) => {
  const [selectedItem, setItem] = useState(item);
  const valueType = type || 'name';
  const { handleScroll } = useScrollEndDetection();
  const handleRadioPress = (data: any) => {
    setItem({
      id: data,
      [valueType]: items?.find((itm) => itm.id == data)[valueType],
      ...data,
    });
  };

  const handleChange = () => {
    onChange({
      id: selectedItem?.id || '',
      [valueType]: selectedItem?.[valueType] || '',
    });
  };

  const selectPatientDetails = (props: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handleRadioPress(props.item);
        }}
      >
        <Box style={styles.selectBoxContainer}>
          <Box style={styles.selectContainer}>
            <Box style={styles.selectTextBoxStyle}>
              <Text style={styles.selectTextStyle}>{props.item?.[valueType]?.slice(0, 1)}</Text>
            </Box>
            <Box style={styles.selectMarginLeftStyle}>
              <Text style={styles.nameTextStyle}>{props.item?.[valueType]}</Text>
            </Box>
          </Box>
          <Box>
            <CustomRadioButton
              // value={item.name}
              color={
                selectedItem?.[valueType] === props.item?.[valueType]
                  ? COLORS.background.primary
                  : '#8A8A8A'
              }
              status={
                selectedItem?.[valueType] === props.item?.[valueType] ? 'checked' : 'unchecked'
              }
              onPress={() => {
                handleRadioPress(props.item);
              }}
            />
          </Box>
        </Box>
        <Box style={styles.divider} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Box style={styles.container}>
        <Box style={styles.boxStyle}>
          <Box height={'100%'}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            {/* <FlatList
                showsVerticalScrollIndicator={false}
                data={items}
                onScroll={handleScroll}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={selectPatientDetails}
              /> */}
            {/* </ScrollView> */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <RadioButton.Group onValueChange={handleRadioPress} value={selectedItem?.id}>
                {items?.map((option: any) => (
                  <React.Fragment key={option.id}>
                    <RadioButton.Item
                      mode="android"
                      style={styles.itemStyle}
                      label={option[valueType]}
                      value={option.id}
                      key={option.id}
                      labelStyle={[
                        styles.selectedRadioText,
                        {
                          color:
                            selectedItem?.id === option.id
                              ? COLORS.background.primary
                              : COLORS.text,
                        },
                      ]}
                      uncheckedColor={
                        selectedItem?.id === option.id ? COLORS.background.primary : COLORS.gray
                      }
                      color={COLORS.background.primary}
                    />
                    {/* <Box style={styles.divider} /> */}
                  </React.Fragment>
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Box>
        </Box>
        <Box style={styles.buttonBoxContainer}>
          <AbstractButton
            buttonStyle={styles.addBtnStyle}
            textStyle={styles.applyTxtStyle}
            onPress={handleChange}
          >
            {strings.displayText.confirm}
          </AbstractButton>
        </Box>
      </Box>
    </>
  );
};

export default ListBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '2%',
  },
  buttonBoxContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingTop: 10,
  },
  boxStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: SIZES.screenHeight / 3.8,
  },
  addBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 10,
    height: 50,
    width: SIZES.screenWidth * 0.9,
  },
  applyTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: 15,
    color: COLORS.background.white,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: 5,
  },
  nameTextStyle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
    lineHeight: 16,
    color: COLORS.text,
  },
  selectBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('7%'),
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('5%'),
  },
  selectTextBoxStyle: {
    height: 25,
    width: 25,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  selectTextStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.white,
    marginTop: 2,
  },
  selectMarginLeftStyle: {
    marginLeft: 10,
  },
  itemStyle: {
    height: isHpTablet('7%'),
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderBottomColor: COLORS.grey_E5E5E5,
  },
  selectedRadioText: {
    color: COLORS.background.primary,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
    // marginTop: isHpTablet('1.5%'),
  },
});
