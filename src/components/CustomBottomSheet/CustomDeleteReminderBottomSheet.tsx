import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AbstractButton, Box } from '..';
import { COLORS, FONTS, assets } from '../../constants';
import { ICustomDeleteBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import { ScrollView } from 'react-native-gesture-handler';

const CustomDeleteReminderBottomSheet: React.FC<ICustomDeleteBottomSheetProps> = ({
  handleClosePress,
  handleDelete,
}) => {
  return (
    <Box style={styles.container}>
      <Box style={styles.boxStyle}>
        <Box height={'100%'}>
          <ScrollView>
            <Image source={assets.DeleteRed} style={{ alignSelf: 'center', marginTop: 10 }} />
            <Text style={styles.reminderText}>{strings.displayText.delete_reminder} ?</Text>
            <Text style={styles.deleteContent}>{strings.displayText.delete_content}</Text>
          </ScrollView>
        </Box>
      </Box>
      <AbstractButton
        onPress={() => {
          handleDelete?.();
          handleClosePress?.();
        }}
        buttonStyle={styles.applyBtnStyle}
        textStyle={styles.applyTxtStyle}
      >
        {strings.displayText.delete}
      </AbstractButton>
      <AbstractButton
        onPress={() => {
          handleClosePress?.();
        }}
        buttonStyle={styles.clearBtnStyle}
        textStyle={styles.clearTxtStyle}
      >
        {'Cancel'}
      </AbstractButton>
    </Box>
  );
};

export default CustomDeleteReminderBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonBoxContainer: {
    flex: 1,
  },
  closeXStyle: {
    width: 16,
    height: 16,
  },
  titleText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.black,
  },
  boxStyle: {
    height: 180,
  },
  applyBtnStyle: {
    backgroundColor: COLORS.background.primary,
    height:50,
    borderRadius: 10,
    width: '100%',
  },
  applyTxtStyle: { color: COLORS.background.secondary, fontSize: 15, fontFamily: FONTS.SFProDisplaySemibold },
  clearBtnStyle: {
    backgroundColor: COLORS.background.white,
    borderRadius: 10,
    height:50,
    marginBottom: 20,
    width: '100%',
  },
  clearTxtStyle: { color: COLORS.text, fontSize: 15, fontFamily: FONTS.SFProDisplaySemibold },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: 10,
  },
  textStyle: {
    width: 100,
    height: 40,
  },
  selectedRadioText: {
    color: COLORS.background.primary,
  },
  reminderText: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: FONTS.SFProDisplaySemibold,
    color: COLORS.black,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  deleteContent: {
    color: COLORS.grey_949494,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FONTS.SFProDisplayRegular,
  },
});
