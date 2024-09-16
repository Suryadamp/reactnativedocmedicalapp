import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { AbstractButton, AppContainer, Box, CustomTextInput } from '../../components';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import usePasswordValidation from '../../hooks/usePasswordValidation';
import usePhoneValidation from '../../hooks/usePhoneValidation';
import { RootStackParamList } from '../../navigation/types';
import { login, storeAccessToken, updateUserData } from '../../service/AuthService';
import KeyChainService from '../../service/KeyChainService';
import styles from '../../styles/SignIn.styles';
import SnackbarUtil from '../../util/SnackbarUtil';

interface Props extends NativeStackScreenProps<RootStackParamList> {
  // Other props if needed
}

const SignIn = ({ navigation }: Props) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const { phoneError, validatePhone } = usePhoneValidation();
  const { passwordError, validatePassword } = usePasswordValidation();

  const input1Ref = useRef<any>(null);
  const input2Ref = useRef<any>(null);

  const focusInput2 = () => {
    if (input2Ref.current) {
      input2Ref.current.focus();
    }
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      setLoading(true);
      try {
        const accessToken = await KeyChainService.getSecureValue('accessToken');
        const refreshToken = await KeyChainService.getSecureValue('refreshToken');
        if (accessToken && refreshToken) {
          const userData = {
            data: {
              access_token: accessToken,
              refresh_token: refreshToken,
            },
          };
          await storeAccessToken(userData?.data)
            .then(async (result) => {
              if (result) {
                await updateUserData();
                navigation.replace('DashboardStack');
              }
            })
            .catch((error) => {
              crashlytics().recordError(error);
            });
        }
      } catch (error: any) {
        console.log('Error checking access token:', error);
        crashlytics().recordError(new Error(`${error}`));
      } finally {
        setLoading(false);
      }
    };

    checkAccessToken();
  }, [navigation]);

  const onSignInPress = async () => {
    if (validatePhone(phoneNo) && validatePassword(password)) {
      setLoader(true);
      try {
        const response = await login(phoneNo, password);
        if (response?.access_token) {
          navigation.navigate('DashboardStack');
          updateUserData();
        } else {
          handleErrorResponse(response);
        }
      } catch (error) {
        console.error(error);
        showSnackError('Login failed. Please try again.');
        crashlytics().recordError(new Error(`${error}`));
      } finally {
        setLoader(false);
      }
    }
  };

  const handleErrorResponse = (response: { errors: string; message: string }) => {
    if (typeof response.errors === 'string') {
      showSnackError(response.errors);
    } else if (typeof response.message === 'string') {
      showSnackError(response.message);
    } else {
      showSnackError('Login failed. Please try again.');
    }
  };

  function showSnackError(message: string) {
    SnackbarUtil.showError(message);
  }

  const handlePhoneChange = (phone: string) => {
    setPhoneNo(phone);
    validatePhone(phone);
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    validatePassword(pwd);
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <>
          <Box style={styles.topFlexBox}>
            <Box style={styles.logoBox}>
              <Image source={assets.logoPrimary} />
              <Text style={[FONTS.logoText, styles.logoText]}>Dr.Carrot</Text>
              <Text style={styles.logoDecTxt}>Better health through better living.</Text>
            </Box>
            <CustomTextInput
              label="Mobile"
              value={phoneNo}
              onChangeText={handlePhoneChange}
              errorText={phoneError}
              keyboardType="numeric"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={focusInput2}
              ref={input1Ref}
              placeholder="Enter your mobile no"
              rightIcon="account"
            />
            {/* <Box style={{ height: SIZES.padding * 0.4 }} /> */}
            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              errorText={passwordError}
              returnKeyType="done"
              ref={input2Ref}
              placeholder="Enter your password"
            />
            <TouchableOpacity
              style={styles.forgetPswBox}
              onPress={() => console.log('Forgot Password')}
            >
              <Text style={styles.forgotPswTxt}>Forgot Password?</Text>
            </TouchableOpacity>
          </Box>
          <Box style={styles.bottomFlexBox}>
            <AbstractButton
              buttonStyle={styles.signInBtn}
              textStyle={styles.signInBtnTxt}
              onPress={onSignInPress}
              loader={loader}
            >
              Sign In
            </AbstractButton>
            <Box style={{ height: SIZES.padding * 2 }} />
            <AbstractButton
              buttonStyle={styles.signUpBtn}
              textStyle={styles.signUpBtnTxt}
              onPress={onSignUpPress}
            >
              Sign Up
            </AbstractButton>
          </Box>
        </>
      )}
    </AppContainer>
  );
};

export default SignIn;
