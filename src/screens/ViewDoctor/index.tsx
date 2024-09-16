import { Image, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AppContainer, Box } from '../../components';
import { assets, COLORS, FONTS, SIZES } from '../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const ViewDoctor = ({ navigation, route }: Props) => {
  const item = route.params?.item;
  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* <Box style={styles.container}> */}
      <Box>
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
            <Box style={styles.titleContainer}>
              <Text style={styles.title}>{item.doctor}</Text>
              <Box style={styles.options}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <Box style={styles.optionsIcons}>
                    <Image source={assets.HeartUnFilled} style={styles.like} />
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <Box style={styles.optionsIcons}>
                    <Image source={assets.Share} style={styles.like} />
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box style={styles.cardContainer}>
          <Box>
            <Image source={item.doctorImage} style={styles.doctorImage} />
          </Box>
          <Box style={styles.detailsContainer}>
            <Box style={styles.docDetails}>
              <Box style={styles.nameContainer}>
                <Text style={styles.name}>{item.doctor}</Text>
                <Text style={styles.category}>{item.category} Hospital</Text>
              </Box>
            </Box>
            <Box style={styles.venueDetails}>
              <Box style={styles.nameContainer}>
                <Text style={styles.time}>{item.venue}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box style={styles.aboutContainer}>
          <Text style={styles.name}>About Doctor</Text>
          <Text style={styles.aboutText}>
            Dr. Dianne Russell is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </Text>
        </Box>
        <Box style={styles.aboutContainer}>
          <Text style={styles.name}>Working Time</Text>
          <Text style={styles.aboutText}>{item.venue}</Text>
        </Box>
      </Box>
      <Box style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('BookAppointment', { item });
          }}
          style={styles.bookSlotBtn}
        >
          <Box>
            <Text style={styles.bookSlotBtnText}>Book Slot</Text>
          </Box>
        </TouchableOpacity>
      </Box>
      {/* </Box> */}
    </AppContainer>
  );
};

export default ViewDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.secondary,
  },
  header: {
    backgroundColor: COLORS.background.secondary,
  },
  topBar: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    alignItems: 'center',
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  title: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: SIZES.semiLarge,
    fontWeight: '600',
    color: COLORS.black,
  },
  icon: {
    height: 15,
    width: 20,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
  },
  optionsIcons: {
    marginHorizontal: 5,
    width: 35,
    height: 35,
    backgroundColor: COLORS.background.bg_icon,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  cardContainer: {
    height: 90,
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: "center",
    borderRadius: 8,
    overflow: 'hidden',
  },
  doctorImage: {
    width: 90,
    height: 90,
  },
  detailsContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.gray,
    paddingLeft: 5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  docDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    paddingHorizontal: 5,
    paddingTop: 2,
  },
  name: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
  },
  category: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    fontWeight: '400',
    color: COLORS.black,
  },
  likeBackground: {
    margin: 10,
    width: 30,
    height: 30,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  venueDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  time: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.extraSmall,
    fontWeight: '400',
    color: COLORS.placeHolder,
  },
  seeMore: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.base,
    fontWeight: '400',
    color: COLORS.background.primary,
    textDecorationLine: 'underline',
  },
  btn: {
    marginRight: 10,
    padding: 4,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: COLORS.background.primary,
  },
  btnText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.base,
    fontWeight: '400',
    color: COLORS.background.secondary,
    textAlign: 'center',
  },
  like: {
    // width: 13,
    // height: 12,
  },
  aboutContainer: {
    margin: 10,
    marginHorizontal: 20,
  },
  aboutText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    fontWeight: '400',
    color: COLORS.text,
    lineHeight: SIZES.large,
    marginTop: 5,
  },
  btnContainer: {
    margin: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bookSlotBtn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.primary,
  },
  bookSlotBtnText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.background.white,
    textAlign: 'center',
  },
});
