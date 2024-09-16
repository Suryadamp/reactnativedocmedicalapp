import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppContainer, Box } from '../../../components';
import { COLORS, FONTS, assets } from '../../../constants';
import { RootStackParamList } from '../../../navigation/types';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const ViewRemainder = ({ navigation }: Props) => {
  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* <Box style={styles.container}> */}
      {/* <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} /> */}
      <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={assets.Back} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Reminder</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CreateRemainder');
            }}
          >
            <Image source={assets.Add} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box>
      <Box style={styles.noAppointment}>
        <Image source={assets.Schedule} />
        <Box>
          <Text style={styles.section}>You have no reminders</Text>
        </Box>
        <Box>
          <Text style={styles.messageText}>
            Set a reminder for medicine, to drink enough water, or tootake a break a work.
          </Text>
        </Box>
      </Box>
      {/* </Box> */}
    </AppContainer>
  );
};

export default ViewRemainder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.grey,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  topBarTitle: {
    ...FONTS.h4,
    width: '75%',
  },
  icon: {
    height: 15,
    width: 20,
  },
  addIcon: {
    height: 25,
    width: 25,
  },
  sectionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  section: {
    ...FONTS.text,
  },
  messageText: {
    ...FONTS.text,
    fontSize: 8,
    textAlign: 'center',
    width: 300,
  },
  sectionBorderStyle: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
    width: '30%',
  },
  noAppointment: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
