import { Image, StatusBar, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AppContainer, Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';

const RemainderDetail = () => {
  const [frameSwitchSwitchValueState, setFrameSwitchSwitchValueState] = useState(false);
  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.remindersList}
    >
      {/* <Box style={styles.remindersList}> */}
      {/* <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} /> */}
      <Box style={styles.divider} />
      <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ padding: 1 }}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              //   navigatio.goBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.doctors}>Naloxone 1ml</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              //   navigation.navigate('CreateRemainder');
            }}
          >
            <Image source={assets.PencilSquare} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box>
      <Box style={[styles.frameParent, styles.frameLayout]}>
        <Box style={[styles.frame, styles.frameLayout]}>
          <Text style={styles.doctors1}>Reminder</Text>
          <Switch
            style={styles.frameChild}
            value={frameSwitchSwitchValueState}
            onValueChange={setFrameSwitchSwitchValueState}
            thumbColor="#fff"
            trackColor={{ false: '#939393', true: '#c6c6c6' }}
          />
        </Box>
        {/* <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require('../assets/frame-10979.png')}
        /> */}
      </Box>
      <Text style={[styles.doctors2, styles.doctorsTypo]}>Details</Text>
      <Box style={[styles.doctorsParent, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>Symptoms</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>Blood Thinner</Text>
      </Box>
      <Box style={[styles.doctorsGroup, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>Dosage</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>1-0-1-1</Text>
      </Box>
      <Box style={[styles.doctorsContainer, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>Frequency</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>4 Times a day</Text>
      </Box>
      <Box style={[styles.frameView, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>Duration For</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>10 Days</Text>
      </Box>
      <Box style={[styles.doctorsParent1, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>End Date</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>22-05-2023</Text>
      </Box>
      <Box style={[styles.doctorsParent2, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>Medicine Name</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>Naloxone 1ml</Text>
      </Box>
      <Box style={[styles.doctorsParent3, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>Start Date</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>09-05-2023</Text>
      </Box>
      <Box style={[styles.doctorsParent4, styles.doctorsParentPosition]}>
        <Text style={styles.doctors3}>Schedule</Text>
        <Text style={[styles.doctors4, styles.doctorsTypo]}>Everyday</Text>
      </Box>
      <Box style={[styles.frameGroup, styles.frameGroupLayout]}>
        <Box style={[styles.addAReminderWrapper, styles.frameGroupLayout]}>
          <Text style={[styles.addAReminder, styles.doctorsTypo]}>Add a Reminder</Text>
        </Box>
        <Text style={[styles.trackActivity, styles.doctorsTypo]}>Track Activity</Text>
      </Box>
      {/* </Box> */}
    </AppContainer>
  );
};

export default RemainderDetail;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    paddingVertical: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  icon: {
    height: 15,
    width: 20,
    justifyContent: 'center',
  },
  topBarTitle: {
    ...FONTS.h4,
    justifyContent: 'center',
  },
  iconPosition: {
    top: 64,
    position: 'absolute',
    overflow: 'hidden',
  },
  frameLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
  },
  doctorsTypo: {
    fontFamily: FONTS.SFProDisplayBold,
    textAlign: 'center',
    fontWeight: '600',
  },
  doctorsParentPosition: {
    height: 40,
    left: 20,
    position: 'absolute',
  },
  frameGroupLayout: {
    width: 319,
    alignItems: 'center',
  },
  timeLightBase: {
    borderRadius: 32,
    width: 54,
    height: 21,
  },
  rightSideIcon: {
    width: 67,
    marginLeft: 220,
    height: 21,
  },
  chips: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONTS.SFProDisplayBold,
    color: '#246bfd',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0,
  },
  sizemediumTypeborderIcon: {
    top: 119,
    left: 449,
    borderRadius: 100,
    borderColor: '#207dff',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
  },
  styleoutlinedIcon: {
    left: 15,
    width: 24,
    height: 24,
  },
  doctors: {
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  divider: {
    borderColor: '#e6e6e6',
    borderTopWidth: 1,
    width: '100%',
    height: 1,
    left: 0,
    borderStyle: 'solid',
  },
  pencilSquareIcon: {
    left: 333,
    width: 20,
    height: 20,
  },
  doctors1: {
    fontFamily: FONTS.InterBold,
    color: '#207dff',
    fontSize: 15,
    fontWeight: '700',
    marginStart: 15,
  },
  frame: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 13,
    justifyContent: 'flex-end',
  },
  frameChild: {
    width: 34,
    height: 20,
    borderRadius: 30,
  },
  frameParent: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  doctors2: {
    top: 166,
    fontSize: 14,
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.gray,
    left: 20,
    position: 'absolute',
  },
  doctors3: {
    fontSize: SIZES.small,
    fontFamily: FONTS.Inter,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
  doctors4: {
    marginTop: 8,
    fontSize: SIZES.small,
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.gray,
    letterSpacing: 0,
  },
  doctorsParent: {
    top: 211,
    width: 99,
  },
  doctorsGroup: {
    top: 321,
    width: 51,
    alignItems: 'center',
  },
  doctorsContainer: {
    top: 431,
    width: 98,
  },
  frameView: {
    top: 541,
    width: 70,
  },
  doctorsParent1: {
    top: 596,
    width: 87,
  },
  doctorsParent2: {
    top: 266,
    width: 93,
    justifyContent: 'flex-end',
  },
  doctorsParent3: {
    top: 376,
    width: 88,
  },
  doctorsParent4: {
    top: 486,
    width: 65,
  },
  addAReminder: {
    color: COLORS.white,
    fontSize: 15,
  },
  addAReminderWrapper: {
    borderRadius: 10,
    backgroundColor: '#207dff',
    height: 56,
    justifyContent: 'center',
  },
  trackActivity: {
    color: '#fc7b04',
    marginTop: 20,
    fontSize: 15,
  },
  frameGroup: {
    top: 678,
    left: 28,
    height: 94,
    position: 'absolute',
  },
  remindersList: {
    backgroundColor: COLORS.white,
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 30,
  },
});
