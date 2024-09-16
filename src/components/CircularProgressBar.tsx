import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../constants';

type CircularProgressBarProps = {
  progress: number; // Expected to be a value between 0 and 100
  size: number; // The size of the circle (diameter)
  strokeWidth: number; // The width of the stroke
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size,
  strokeWidth,
}) => {
  const radius = (size - strokeWidth) / 2; // Radius of the inner circle
  const circumference = radius * 2 * Math.PI; // The total circumference of the inner circle
  const strokeDashoffset = circumference - (progress / 100) * circumference; // The length of the stroke to be 'filled'

  return (
    <View style={styles.container}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        {/* Foreground circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progress <= 50 ? COLORS.red_FF434F : COLORS.background.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularProgressBar;
