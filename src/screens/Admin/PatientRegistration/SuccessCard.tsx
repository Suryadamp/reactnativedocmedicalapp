// PatientRegistration - SuccessCard
import { StyleSheet, Text, Image } from 'react-native';
import React from 'react';

import { assets, COLORS, FONTS, SIZES } from '../../../constants';
import ConfirmPopUp from './ConfirmPopup';
import { Box, AbstractButton } from '../../../components';

interface ISuccessCard {
  navigation: any;
  patientData: any;
  onClose: () => void;
}

const SuccessCard = ({ patientData, onClose }: ISuccessCard) => {
  const handleNext = () => {
    onClose();
  };

  return (
    <ConfirmPopUp
      visible={true}
      children={
        <>
          <Box style={styles.wrapper}>
            <Box alignItems="center" marginTop={100}>
              <Image source={assets.Success} />
              <Box flexDirection="row">
                <Text style={[styles.title, { paddingTop: 20, color: '#17CF9E' }]}>
                  Patient created Successfully
                </Text>
              </Box>
            </Box>
            <Box marginTop={10} alignItems="center">
              <Box width={'60%'}>
                <Text style={styles.info}>
                  Welcome to Dr.Carrot! Your account is ready with UHID
                  <Text style={styles.highlighted}>{`"${patientData?.uhid}"`}</Text>
                </Text>
                <Text style={styles.info}>Take control of your health now login and explore!</Text>
              </Box>
            </Box>
          </Box>
          <Box justifyContent="center">
            <Box style={styles.buttonBoxContainer}>
              <AbstractButton
                buttonStyle={styles.confirmBtnStyle}
                textStyle={styles.confirmTxtStyle}
                onPress={handleNext}
              >
                Done
              </AbstractButton>
            </Box>
          </Box>
        </>
      }
    />
  );
};

export default SuccessCard;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  highlighted: {
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.black,
    fontSize: 15,
    fontWeight: '700',
  },
  buttonBoxContainer: {
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  confirmBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 10,
    height: 50,
    width: SIZES.screenWidth * 0.9,
  },
  confirmTxtStyle: { color: COLORS.white, fontSize: 15, fontFamily: FONTS.InterMedium },
  title: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: SIZES.semiLarge,
    fontWeight: '600',
    color: COLORS.black,
  },
  info: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    fontWeight: '400',
    color: COLORS.black,
    textAlign: 'center',
  },
});
