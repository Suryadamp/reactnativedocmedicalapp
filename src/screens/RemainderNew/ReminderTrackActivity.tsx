import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { AppContainer, Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { strings } from '../../i18n';
import React from 'react';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NavigateProps;

const ReminderTrackActivity = ({ navigation, route }: Props) => {
  const reminder = route?.params?.reminder;
  const patient = route?.params?.patient;

  // const DetailItem = () => (
  //   <Box style={styles.contentContainer}>
  //     <Box style={styles.subContentContainer}>
  //       <Image source={assets.TabletBlue} style={{ alignSelf: 'center' }} />
  //       <Box style={[styles.verticalDivider]} />
  //       <Box marginLeft={5} />
  //       <Box>
  //         <Box style={styles.titleContainer}>
  //           <Text style={styles.contentText}>{reminder.productname}</Text>
  //         </Box>
  //         <Text style={styles.lightText}>09:00 AM - 12-05-2023</Text>
  //         <Text style={styles.lightText}>Monday - Friday</Text>
  //       </Box>
  //     </Box>
  //     <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
  //       <Text style={styles.viewText}>Log now</Text>
  //     </TouchableOpacity>
  //   </Box>
  // );

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle={'dark-content'}
        style={styles.container}
      >
        <Box style={styles.header}>
          <Box style={styles.topBar}>
            <Box flexDirection="row" alignContent="center" alignItems="center">
              <TouchableOpacity
                activeOpacity={0.5}
                hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                onPress={() => {}}
              >
                <Image source={assets.TrackClock} style={styles.icon} />
              </TouchableOpacity>
            </Box>
            <Text style={styles.topBarTitle}>{strings.displayText.track_activity}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.imageTouchStyle}
            >
              <Image source={assets.Close} style={styles.filterIcon} />
            </TouchableOpacity>
          </Box>
        </Box>
        <Box marginTop={10} style={styles.divider} />
        {/* <DetailItem /> */}
        <Text style={styles.subTitleContainer}>{strings.displayText.medicine_taken_his_week}</Text>
        <Image
          source={assets.TrackMedicine}
          style={{ marginTop: 20, marginHorizontal: 20, alignSelf: 'center' }}
        />
        <Image
          source={assets.TrackReminderBanner}
          style={{ marginTop: 20, marginHorizontal: 20, alignSelf: 'center' }}
        />
      </AppContainer>
    </>
  );
};

export default ReminderTrackActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {},
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  topBarTitle: {
    ...FONTS.h4,
    marginStart: 15,
    marginTop: 3,
    color: COLORS.text,
  },
  reminderText: {
    marginTop: 3,
    fontWeight: '700',
    fontSize: 15,
    color: COLORS.background.primary,
  },
  imageTouchStyle: {
    justifyContent: 'center',
  },
  filterIcon: { marginTop: 8, alignItems: 'center' },
  icon: {},
  titleDetailsContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  titleContainer: {
    fontSize: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitleContainer: {
    fontSize: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: '600',
    marginHorizontal: 10,
    marginTop: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: 6,
    shadowColor: COLORS.gray,
    shadowOpacity: 6,
    shadowRadius: 6,
    borderColor: COLORS.gray,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  subContentContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  lightText: {
    color: COLORS.placeHolder,
    fontSize: 12,
    fontWeight: '300',
    fontFamily: FONTS.SFProDisplayRegular,
  },
  contentText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
  name: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
  },
  bookSlotBtnText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.background.white,
    textAlign: 'center',
  },
  bookSlotBtn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: COLORS.background.primary,
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.grey_D8D8D8,
    marginStart: 10,
  },
  viewText: {
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.white,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: COLORS.background.primary,
    borderColor: COLORS.background.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
