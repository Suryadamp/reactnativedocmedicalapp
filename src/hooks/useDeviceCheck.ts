import { Dimensions, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');
const iTablet = width >= 600 && height >= 600;

const adjustValue = (value: string | number) => {
  return typeof value === 'number' ? `${value / 1.5}%` : `${parseFloat(value) / 1.5}%`;
};

export const isHpTablet = (value: string | number) => {
  const adjustedValue = adjustValue(value);
  return iTablet ? hp(adjustedValue) : hp(value);
};

export const isWpTablet = (value: string | number) => {
  const adjustedValue = adjustValue(value);
  return iTablet ? wp(adjustedValue) : wp(value);
};

export const isHpBottomTablet = (value: string | number, adjVal?: string | number) => {
  const adjustedValue =
    typeof value === 'number'
      ? `${value / (adjVal ? Number(adjVal) : 2.4)}%`
      : `${parseFloat(value) / (adjVal ? Number(adjVal) : 2.4)}%`;
  const newValue = Platform.OS === 'ios' ? Number(value) / 1.18 : value;
  return iTablet ? hp(adjustedValue) : hp(newValue);
};
