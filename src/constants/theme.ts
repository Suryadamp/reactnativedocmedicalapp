import { isHpTablet } from '../hooks/useDeviceCheck';
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const COLORS = {
  background: {
    primary: '#207DFF',
    secondary: '#F2F2EF',
    primary_gray: '#B7B7B7',
    bg_icon: '#E7EEFF',
    white: '#FFFFFF',
  },
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
  danger: '#F20000',
  lightRed: '#FF313A',
  red_FD002E: '#FD002E',
  red_FF434F: '#FF434F',
  lightGray: '#D1D8D1',
  grey: '#F2F2F2',
  gray: 'rgba(0, 0, 0, 0.1)',
  lightBlue: 'rgba(24, 160, 251, 0.08)',
  lightGrey: '#979797',
  green: '#07D09A',
  darkBlue: '#222B45',
  darkGreen: '#028108',
  green_00C792: '#00C792',
  green_E6FFF8: '#E6FFF8',
  green_C2F5E7: '#C2F5E7',
  iconColor: '#BDBDBD',
  placeHolder: '#8A8A8A',
  text: '#232323',
  radioGreen: '#07D09A',
  border: 'D6D6D6',
  greyText: '#919191',
  black_252525: '#252525',
  grey_line: '#F5F5F5',
  grey_FAFAFA: '#FAFAFA',
  grey_E5E5E5: '#E5E5E5',
  grey_525252: '#525252',
  blue_D3E5FF: '#D3E5FF',
  green_CFFED6: '#CFFED6',
  green_00B347: '#00B347',
  black_2A2A2A: '#2A2A2A',
  green_16BF92: '#16BF92',
  shadow_101010: '#101010',
  grey_F6F6F6: '#F6F6F6',
  black_121212: '#121212',
  green_00A77A: '#00A77A',
  blue_F3F8FF: '#F3F8FF',
  grey_969696: '#969696',
  grey_F8F8F8: 'F8F8F8',
  grey_D8D8D8: '#D8D8D8',
  grey_838383: '#838383',
  black_2D3339: '#2D3339',
  grey_3D3D3D: '#3D3D3D',
  grey_CACACA: '#CACACA',
  white_smoke: '#EFEFEF',
  ligth_sliver: '#D6D8D9',
  dim_grey: '#707070',
  ligth_shade_blue: '#D6E7FF',
  dodger_blue: '#00adf5',
  teleConsultation: {
    title: '#F5F9FF',
    body: '#E0ECFF',
    icon_bg: '#2D3440',
    alert: '#CC525F',
  },
  grey_949494: '#949494',
  shade_grey: '#9F9F9F',
  ligth_gray: '#EBEBEB',
  shade_greenish_blue: '#36D5AA',
  light_grayish: '#F1F1F1',
  dark_gray: '#454545',
  shade_of_gray_D6D6D6: '#D6D6D6',
  black_231F20: '#231F20',
};

export const SIZES = {
  tiny: isHpTablet('0.5%'), // Adjusted
  base: isHpTablet('1.2%'), // Adjusted
  extraSmall: isHpTablet('0.8%'), // Adjusted
  small: isHpTablet('1.4%'), // Adjusted
  font: isHpTablet('1.6%'), // Adjusted
  medium: isHpTablet('1.8%'), // Adjusted
  large: isHpTablet('2.2%'), // Adjusted
  semiLarge: isHpTablet('2.5%'), // Adjusted
  extraLarge: isHpTablet('3.5%'), // Adjusted

  // global sizes
  radius: isHpTablet('1%'), // Adjusted
  radiusSm: isHpTablet('0.5%'), // Adjusted
  padding: isHpTablet('0.8%'), // Adjusted
  padding2: isHpTablet('1.2%'), // Adjusted

  // font sizes
  largeTitle: isHpTablet('2.5%'), // Adjusted
  h1: isHpTablet('3.5%'), // Adjusted
  h2: isHpTablet('2.5%'), // Adjusted
  h3: isHpTablet('2%'), // Adjusted
  h4: isHpTablet('1.8%'), // Adjusted
  body1: isHpTablet('1.6%'), // Adjusted
  body2: isHpTablet('1.4%'), // Adjusted
  body3: isHpTablet('1.2%'), // Adjusted
  body4: isHpTablet('1%'), // Adjusted
  body5: isHpTablet('0.8%'), // Adjusted

  // app dimensions
  screenWidth: width,
  screenHeight: height,
};

type fontWeights =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

type fontWeightObj = {
  bold: fontWeights;
};

export const FONT_WEIGHT: fontWeightObj = {
  bold: '700',
};

export const FONTS = {
  InterLight: 'Inter-Light',
  Inter: 'Inter-Regular',
  InterBold: 'Inter-Bold',
  InterMedium: 'Inter-Medium',
  InterExtraBold: 'Inter-ExtraBold',

  Poppins: 'Poppins-Regular',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsBold: 'Poppins-Bold',
  PoppinsBlack: 'Poppins-Black',

  Urbanist: 'Urbanist-Regular',
  UrbanistBold: 'Urbanist-Bold',
  UrbanistBlack: 'Urbanist-Black',

  SFProDisplayBlackItalic:
    Platform.OS === 'ios' ? 'SFProDisplay-BlackItalic' : 'SF-Pro-Display-BlackItalic',
  SFProDisplayBold: Platform.OS === 'ios' ? 'SFProDisplay-Bold' : 'SF-Pro-Display-Bold',
  SFProDisplayHeavyItalic:
    Platform.OS === 'ios' ? 'SFProDisplay-HeavyItalic' : 'SF-Pro-Display-HeavyItalic',
  SFProDisplayLightItalic:
    Platform.OS === 'ios' ? 'SFProDisplay-LightItalic' : 'SF-Pro-Display-LightItalic',
  SFProDisplayMedium: Platform.OS === 'ios' ? 'SFProDisplay-Medium' : 'SF-Pro-Display-Medium',
  SFProDisplayRegular: Platform.OS === 'ios' ? 'SFProDisplay-Regular' : 'SF-Pro-Display-Regular',
  SFProDisplaySemibold: Platform.OS === 'ios' ? 'SFProDisplay-Semibold' : 'SF-Pro-Display-Semibold',
  SFProDisplaySemiboldItalic:
    Platform.OS === 'ios' ? 'SFProDisplay-SemiboldItalic' : 'SF-Pro-Display-SemiboldItalic',
  SFProDisplayThinItalic:
    Platform.OS === 'ios' ? 'SFProDisplay-ThinItalic' : 'SF-Pro-Display-ThinItalic',
  SFProDisplayUltralightItalic:
    Platform.OS === 'ios' ? 'SFProDisplay-UltralightItalic' : 'SF-Pro-Display-UltralightItalic',

  SFProDisplay_w100: 'SFProDisplay-Thin',
  SFProDisplay_w200: 'SFProDisplay-Ultralight',
  SFProDisplay_w300: 'SFProDisplay-Light',
  SFProDisplay_w400: 'SFProDisplay-Regular',
  SFProDisplay_w500: 'SFProDisplay-Medium',
  SFProDisplay_w600: 'SFProDisplay-Semibold',
  SFProDisplay_w700: 'SFProDisplay-Bold',
  SFProDisplay_w800: 'SFProDisplay-Heavy',
  SFProDisplay_w900: 'SFProDisplay-Black',

  h1: { fontFamily: 'SFProDisplay-Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h3, lineHeight: hp('2.5%') },
  h4: {
    fontFamily: Platform.OS === 'ios' ? 'SFProDisplay-Bold' : 'SF-Pro-Display-Bold',
    fontSize: SIZES.h4,
    lineHeight: isHpTablet('1.8%'),
  },
  h5: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: SIZES.large,
    lineHeight: hp('2%'),
  },

  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.body3, //16px
    lineHeight: 24,
    letterSpacing: 0.300349,
  },
  titleText3: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.300349,
  },
  pageTitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.large, //18px
    lineHeight: 27,
    letterSpacing: 0.300349,
  },
  pageHeaderTitleText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: SIZES.large, //18px
    lineHeight: 21,
    letterSpacing: 0.300349,
    color: COLORS.text,
  },
  MenuText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: SIZES.body1, // 16px
    lineHeight: hp('2.5%'),
    letterSpacing: -0.3,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 35,
    lineHeight: 35,
    letterSpacing: 0.16,
  },
  text: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: SIZES.font, // 14px
    lineHeight: 21,
    letterSpacing: -0.3,
  },
  smallText: {
    fontFamily: 'Poppins',
    fontSize: SIZES.extraSmall, //10px
    lineHeight: 24,
  },
  splashTitle: {
    fontFamily: 'SFProDisplay-Medium', // 500 weight
    fontSize: SIZES.font, // 14px
    lineHeight: 21,
    letterSpacing: -0.3,
  },
  splashbody: {
    fontFamily: 'Poppins',
    fontSize: SIZES.base, // 14px
    lineHeight: 10,
  },
  bottomSheetTitle: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: SIZES.extraLarge, // 14px
    lineHeight: 33,
    letterSpacing: -0.3,
  },
  InputText: {
    fontFamily: 'Inter',
    fontSize: SIZES.small, //12px
    lineHeight: 24,
  },
  InputLabel: {
    fontFamily: 'Poppins',
    fontSize: SIZES.font, //12px
    lineHeight: 21,
    letterSpacing: -0.3,
  },
  InputValue: {
    fontFamily: 'Poppins',
    fontSize: SIZES.small, //12px
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  labelText: {
    fontFamily: 'Poppins',
    fontSize: SIZES.extraSmall, //10px
    lineHeight: 12,
    opacity: 0.6,
  },
  placeholderTxt: {
    fontFamily: 'Poppins',
    fontSize: SIZES.small, //12px
    lineHeight: 24,
  },
  btnText: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.font, //14px
    lineHeight: 22,
  },
  badgeText: {
    fontFamily: 'Poppins',
    fontSize: SIZES.base, //8px
    lineHeight: 10,
  },
  modalBtn: {
    fontFamily: 'Poppins',
    fontSize: SIZES.small, //12px
    lineHeight: 18,
    letterSpacing: 0.300349,
  },
  listTitle: {
    fontFamily: 'Poppins-Medium', // 500 weight
    fontSize: SIZES.medium, //16px
    lineHeight: 24,
    letterSpacing: -0.3,
  },
};

export const DEFAULT_STYLE = {
  BackArrow: {
    height: 15,
    width: 20,
  },
  BtnPlacedOnBottom: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    top: Platform.OS === 'ios' ? SIZES.screenWidth / 0.53 : SIZES.screenHeight / 1.1,
  },
};
