import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Box } from '../components';
import { COLORS } from '../constants';
import { RootStackParamList } from '../navigation/types';
import { SyncScreen, useSyncLocalDatabase } from '../database/DBSync';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const Splash = ({ navigation }: Props) => {
  useSyncLocalDatabase(SyncScreen.login);
  const handleAnimationFinish = () => {
    navigation.replace('SignIn');
  };

  return (
    <Box style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'light-content'} />
      <LottieView
        style={styles.lottieAnimation}
        source={require('../assets/lottie/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
    </Box>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 400,
    height: 400,
  },
});
