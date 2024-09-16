// ListSheet
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, SIZES } from '../../constants';
import { strings } from '../../i18n';
import CustomRadioButton from '../../components/CustomRadioButton';
import { useScrollEndDetection } from '../../hooks/useLogs';

interface IListBottomSheet {
  items: object[];
  name: string;
  onChange: (name: string, value: string) => void;
}

export const ListBottomSheet: React.FC<IListBottomSheet> = ({ name, items, onChange }) => {
  const [selectedItem, setItem] = useState('');
  console.log('items', items);
  const { handleScroll } = useScrollEndDetection();

  const handleRadioPress = (data: any) => {
    setItem(data);
  };

  const handleChange = () => {
    onChange(name, selectedItem);
  };

  const ListItem = (props: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handleRadioPress(props.item);
        }}
      >
        <Box style={styles.selectBoxContainer}>
          <Box style={styles.selectContainer}>
            <Box style={styles.selectMarginLeftStyle}>
              <Text style={styles.nameTextStyle}>{props.item}</Text>
            </Box>
          </Box>
          <Box>
            <CustomRadioButton
              // value={item.name}
              color={selectedItem === props.item ? COLORS.background.primary : '#8A8A8A'}
              status={selectedItem === props.item ? 'checked' : 'unchecked'}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={items}
                onScroll={handleScroll}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={ListItem}
              />
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
});
