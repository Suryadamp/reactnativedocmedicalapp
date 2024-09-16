import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { AbstractButton, Box } from '../../components';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FONTS } from '../../constants';

const SignUp = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <Box style={styles.wrapper}>
      <Box style={styles.spaceY} />
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

export default SignUp;

const styles = StyleSheet.create({
  spaceY: { height: 40, backgroundColor: 'transparent' },
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
});
