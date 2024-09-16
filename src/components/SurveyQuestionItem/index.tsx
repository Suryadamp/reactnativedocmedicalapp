/* eslint-disable @typescript-eslint/no-unused-vars */
// Survey Input
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../../styles/component_styles/SurveyQuestionItem.styles';
import Box from '../Box';
import SurveyInput from '../SurveyInput';
import Checkbox from '../Checkbox';
import Switch from '../Switch';
// import InputRange from '../InputRange';
import FileUpload from '../FileUpload';
import Radio from '../Radio';

interface SurveyQuestionItemProps {
  item: any;
  value: any;
  onClickCalendar: () => void;
  onClickList: () => void;
  onClickMultiList: () => void;
  onChange: (item: any, value: any) => void;
}

const SurveyQuestionItem = (props: SurveyQuestionItemProps) => {
  const { item, value, onChange, onClickCalendar, onClickList, onClickMultiList } = props;
  const [isUnattainable, setUnattainable] = useState(false);

  const handleClickList = () => {
    if (!isUnattainable) {
      if (item.data_type === 'select') {
        onClickList();
      } else {
        onClickMultiList();
      }
    }
  };

  const handleClickCalendar = () => {
    if (!isUnattainable) {
      onClickCalendar();
    }
  };

  const handleChange = (data: string | number | boolean) => {
    onChange(item, data);
  };

  return (
    <Box>
      <Box style={styles.content}>
        <Text style={styles.title}>{item.question}</Text>
        {/* {item && item.unattainable_label && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.checkRow}
            onPress={() => setUnattainable(!isUnattainable)}
          >
            <MaterialCommunityIcons
              name={isUnattainable ? 'checkbox-marked' : 'checkbox-blank-outline'}
              color={isUnattainable ? COLORS.background.primary : COLORS.white_smoke}
              size={18}
              style={styles.statusImage}
            />
            <Text style={styles.chartTxt}>{item.unattainable_label}</Text>
          </TouchableOpacity>
        )} */}
      </Box>
      {item.data_type === 'automatic' && <Text style={styles.autoText}>{value} days</Text>}
      {item.data_type === 'checkbox' && (
        <Checkbox value={value} onChange={handleChange} label="Test" />
      )}
      {(item.data_type === 'fileupload' || item.data_type === 'multifileupload') && (
        <FileUpload
          value={value}
          allowedType="pdf,images"
          maxSize={item.maxSize}
          onChange={handleChange}
        />
      )}
      {item.data_type === 'radio' && <Radio onChange={handleChange} value={value} label="Test" />}
      {item.data_type === 'switch' && <Switch value={value} onChange={handleChange} label="test" />}
      {item.data_type !== 'automatic' &&
        item.data_type !== 'checkbox' &&
        item.data_type !== 'switch' &&
        item.data_type !== 'radio' &&
        item.data_type !== 'fileupload' &&
        item.data_type !== 'multifileupload' &&
        item.data_type !== 'range' && (
          <SurveyInput
            value={value}
            keyboardType={
              item.data_type === 'number'
                ? 'numeric'
                : item.data_type === 'input' || item.data_type === 'textarea'
                  ? 'default'
                  : undefined
            }
            type={item.data_type ? item.data_type : 'input'}
            editable={
              item.data_type === 'input' ||
              item.data_type === 'number' ||
              item.data_type === 'textarea'
            }
            onChangeText={handleChange}
            onClickCalendar={handleClickCalendar}
            onClickList={handleClickList}
          />
        )}
      {/* {item.data_type === 'range' && (
        <InputRange min={1} max={2} value={Number(value)} onChange={handleChange} />
      )} */}
    </Box>
  );
};

export default SurveyQuestionItem;
