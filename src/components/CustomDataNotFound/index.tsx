import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FONTS, assets } from '../../constants';
import { isHpTablet } from '../../hooks/useDeviceCheck';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export type ImageType =
  | 'appointments'
  | 'reminder'
  | 'medicalRecords'
  | 'bills'
  | 'investigations'
  | 'prescription'
  | 'resourceNotFound'
  | 'noDataFound'
  | 'noInternet'
  | 'cartIsEmpty'
  | 'noOrderFound';

const CustomDataNotFound = ({ text, type }: { text?: string; type?: ImageType }) => {
  const getImage = (image?: ImageType) => {
    switch (image) {
      case 'appointments':
        return assets.NoAppointment;
      case 'reminder':
        return assets.NoReminder;
      case 'medicalRecords':
        return assets.NoMedicalRecords;
      case 'bills':
        return assets.NoBills;
      case 'investigations':
        return assets.InvestigationsNoDataIcon;
      case 'prescription':
        return assets.NoPrescription;
      case 'resourceNotFound':
        return assets.NotFound;
      case 'noDataFound':
        return assets.NoData;
      case 'noInternet':
        return assets.NoInternet;
      case 'cartIsEmpty':
        return assets.EmptyCart;
      case 'noOrderFound':
        return assets.NoOrders;
      default:
        return assets.NoData;
    }
  };

  const imageName = getImage(type);

  return (
    <View style={styles.container}>
      <Image
        source={imageName}
        style={[
          styles.image,
          type === 'bills' ||
          type === 'medicalRecords' ||
          type === 'reminder' ||
          type === 'cartIsEmpty'
            ? {
                height: hp('20%'),
                width: hp('22%'),
              }
            : !type
              ? {
                  height: hp('15%'),
                  width: hp('23%'),
                }
              : null,
        ]}
      />
      <Text style={styles.noDataText}>{text ?? 'No data found'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
    marginVertical: hp('1%'),
  },
  image: {
    justifyContent: 'center',
    height: hp('22%'),
    width: hp('16%'),
  },
});

export default CustomDataNotFound;
