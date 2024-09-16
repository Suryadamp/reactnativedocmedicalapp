// Components - CustomCheckbox
import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../constants';
import styles from '../../styles/component_styles/Checkbox.styles';

type CheckboxProps = {
  // name: string;
  value: boolean;
  label?: string;
  onChange: (value: any) => void;
};

const Checkbox = ({ value, label, onChange }: CheckboxProps) => {
  const handleChange = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handleChange}>
      <MaterialCommunityIcons
        name={value ? 'checkbox-marked' : 'checkbox-blank-outline'}
        color={value ? COLORS.background.primary : COLORS.white_smoke}
        size={25}
        style={styles.checkIcon}
      />
      {label && <Text style={styles.labelTxt}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default Checkbox;
