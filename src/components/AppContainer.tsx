import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import Box from './Box';
import CustomStatusBar, { CustomStatusBarProps } from './CustomStatusBar';
import { VStack } from 'native-base';

interface AppContainerProps extends CustomStatusBarProps {
  style?: ViewStyle;
  children: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({
  children,
  style,
  statusBarBgColor,
  statusBarStyle,
  statusBarHide,
}) => {
  const containerStyle: ViewStyle = {
    ...style,
  };

  return (
    <VStack flex={1} bg="red" safeAreaTop style={containerStyle}>
      <CustomStatusBar
        statusBarBgColor={statusBarBgColor}
        statusBarStyle={statusBarStyle}
        statusBarHide={statusBarHide}
      />
      {children}
    </VStack>
  );
};

export default AppContainer;
