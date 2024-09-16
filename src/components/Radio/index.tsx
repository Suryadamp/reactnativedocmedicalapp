// Components - Radio
import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../constants';
import styles from '../../styles/component_styles/Checkbox.styles';

type RadioProps = {
  // name: string;
  value: boolean;
  label?: string;
  onChange: (value: any) => void;
};

const Radio = ({ value, label, onChange }: RadioProps) => {
  const handleChange = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handleChange}>
      <MaterialCommunityIcons
        name={value ? 'radiobox-marked' : 'radiobox-blank'}
        color={value ? COLORS.background.primary : COLORS.white_smoke}
        size={25}
        style={styles.checkIcon}
      />
      {label && <Text style={styles.labelTxt}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default Radio;
