import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import Box from './Box';
import { COLORS } from '../constants';

// Define the types for the props
type CustomComponentProps = {
  orientation: 'vertical' | 'horizontal';
  lineColor?: string;
};

const Line: React.FC<CustomComponentProps> = ({ orientation, lineColor = '#DDDDDD' }) => {
  // Determine the style based on orientation
  const containerStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    orientation === 'vertical' ? styles.vertical : styles.horizontal,
    { borderColor: lineColor },
  ]);

  return <Box style={containerStyle} />;
};

export default Line;

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRightWidth: 1,
  },
});
