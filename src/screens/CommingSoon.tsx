import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { AbstractButton, Box } from '../components';
import { FONTS } from '../constants';
import { RootStackParamList } from '../navigation/types';

const CommingSoon = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <Box style={styles.container}>
      <Box style={styles.space} />
      <Text>Coming soon ...</Text>
      <AbstractButton
        buttonStyle={styles.backBtn}
        onPress={() => {
          navigation?.goBack();
        }}
        textStyle={styles.nextBtn}
      >
        Back
      </AbstractButton>
    </Box>
  );
};

export default CommingSoon;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  nextBtn: {
    fontFamily: FONTS.Inter,
    fontSize: 12,
    lineHeight: 14,
  },
  backBtn: {
    marginTop: '4%',
    width: '20%',
    height: '5%',
  },
  space: { height: 40, backgroundColor: 'transparent' },
});
