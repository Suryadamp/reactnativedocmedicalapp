import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IAbstractButton } from '../@types/components';
import { Box } from '../components';
import { COLORS, FONTS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { customLogger } from './CustomLogger';

function AbstractButton(props: IAbstractButton): JSX.Element {
  const navigation = useNavigation();

  const {
    children,
    buttonStyle = {},
    textStyle = {},
    onPress,
    onLongPress,
    disabled,
    loader = false,
    size = 20,
  } = props;

  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, `${onPress}`, 'BUTTON', children);
  };

  return (
    <TouchableOpacity
      style={[styles.buttonStyle, buttonStyle, (disabled || loader) && styles.disableButtonStyle]}
      onPress={async () => {
        if (onPress != null) {
          onPress();
          handleLogs();
        }
      }}
      onLongPress={onLongPress}
      disabled={disabled || loader}
    >
      <Box>
        <Text style={[styles.textStyle, textStyle]}>{children}</Text>
      </Box>
      {loader && (
        <Box ml={8}>
          <ActivityIndicator size={size} color={COLORS.white} />
        </Box>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: '90%',
    backgroundColor: COLORS.black,
    flexDirection: 'row',
  },
  disableButtonStyle: {
    opacity: 0.5,
  },
  textStyle: {
    color: COLORS.white,
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: 14,
  },
});

export default AbstractButton;
