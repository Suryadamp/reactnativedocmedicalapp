import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
import styles from '../styles/component_styles/CustomRadioGroup.styles';

// Defining the type for a single option
type RadioButtonProps = {
  value?: string;
  color?: string;
  status: 'checked' | 'unchecked';
  onPress: () => void;
};

// RadioButton component
const RadioButton = ({ value, color, status, onPress }: RadioButtonProps) => {
  const defaultColor = 'gray'; // Default color if none is provided
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={[styles.outerCircle, { borderColor: color || defaultColor }]}>
          {status === 'checked' && (
            <View style={[styles.innerCircle, { backgroundColor: color || defaultColor }]} />
          )}
        </View>
        {value && <Text style={styles.text}>{value}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
