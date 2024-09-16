import React from 'react';
import { StatusBar, StyleSheet, Platform, View } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export interface CustomStatusBarProps {
  statusBarBgColor: string;
  statusBarStyle: 'default' | 'light-content' | 'dark-content';
  statusBarHide?: boolean;
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  statusBarBgColor,
  statusBarStyle,
  statusBarHide,
}) => {
  // Adjust the height for iPhone X to handle the notch
  const statusBarHeight = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;

  return (
    <View
      style={[styles.statusBar, { backgroundColor: statusBarBgColor, height: statusBarHeight }]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={statusBarStyle}
        hidden={statusBarHide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1, // Make sure this view is above all others
  },
});

export default CustomStatusBar;
