import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { assets } from '../../../constants';
import styles from '../../../styles/Appointment.styles';

const SupportBottomSheet = () => {
  const copyToClipboard = () => {
    Clipboard.setString('04242236989');
  };
  return (
    <TouchableOpacity
      style={styles.bsItem}
      onPress={() => {
        copyToClipboard();
      }}
    >
      <Image source={assets.Headset} style={styles.bsIcon} />
      <Text style={styles.bsName}>04242236989</Text>
      <Image source={assets.Copy} style={styles.copyBsIcon} />
    </TouchableOpacity>
  );
};
export default SupportBottomSheet;
