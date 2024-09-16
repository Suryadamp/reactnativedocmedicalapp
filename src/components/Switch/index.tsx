// Components - Switch
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../../styles/component_styles/Switch.styles';
import { COLORS } from '../../constants';
import Box from '../Box';

type SwitchProps = {
  //   name: string;
  value: boolean;
  label?: string;
  onChange: (value: any) => void;
};

const Switch = ({ value, label, onChange }: SwitchProps) => {
  const defaultStyles = {
    bgGradientColors: [COLORS.gray, COLORS.gray],
    headGradientColors: [COLORS.background.white, COLORS.background.white],
  };

  const activeStyles = {
    bgGradientColors: [COLORS.white_smoke, COLORS.white_smoke],
    headGradientColors: [COLORS.background.primary, COLORS.background.primary],
  };

  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    // Update the animated value when the value prop changes
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300, // Adjust the animation duration
      useNativeDriver: false,
    }).start();
  }, [value]); // eslint-disable-line

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 25],
  });

  const toggleSwitch = () => {
    onChange(!value);
  };

  const currentStyles = value ? activeStyles : defaultStyles;
  return (
    <Box style={styles.container}>
      <TouchableOpacity onPress={toggleSwitch} style={styles.boxContainer}>
        <LinearGradient
          colors={currentStyles.bgGradientColors}
          style={styles.backgroundGradient}
          start={{
            x: 0,
            y: 0.5,
          }}
        >
          <View style={styles.innerContainer}>
            <Animated.View
              style={{
                transform: [{ translateX }],
              }}
            >
              <LinearGradient
                colors={currentStyles.headGradientColors}
                style={styles.headGradient}
              />
            </Animated.View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {label && <Text style={styles.labelTxt}>{label}</Text>}
    </Box>
  );
};

export default Switch;
