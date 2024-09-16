// Survey Input
import React from 'react';
import { TextInput } from 'react-native-paper';

import styles from '../../styles/component_styles/SurveySelect.styles';
import { COLORS } from '../../constants';
import Box from '../Box';
import { isHpTablet } from '@/hooks/useDeviceCheck';

interface SurveySelectProps {
  question: string;
  name: string;
  value: any;
  type: string;
  onChange: (name: string, value: any) => void;
  onSubmit: (data: any) => void;
}

const SurveySelect = (props: SurveySelectProps) => {
  const { question, value, name, type = 'input' } = props;

  const handleSubmit = (data) => {
    console.log('handleSubmit', data);
  };

  const handleChange = (text) => {
    console.log('handleChange', text);
  };

  return (
    <Box>
      <TextInput
        mode="outlined"
        value={value}
        onSubmitEditing={handleSubmit}
        style={styles.input}
        outlineColor={COLORS.white_smoke}
        activeOutlineColor={COLORS.background.primary}
        theme={{
          colors: {
            primary: COLORS.gray,
            background: COLORS.background.white,
          },
          roundness: isHpTablet(1.8),
        }}
        onChangeText={handleChange}
      />
    </Box>
  );
};

export default SurveySelect;
