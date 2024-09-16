// Admin - VitalsItem
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { strings } from '../../../i18n';
import { Box } from '../../../components';
import { COLORS, SIZES, FONTS } from '../../../constants';
import { vitalsLeft, vitalsRight } from '../helper/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { IVitalsState } from '../helper/types';

interface IVitalsItemProps {
  state: IVitalsState;
  onChange: (state: any) => void;
}

export const VitalsItem = (props: IVitalsItemProps) => {
  const { state, onChange } = props;

  const handleChange = (name: string, value: any) => {
    onChange((prev: IVitalsState) => ({ ...prev, [name]: value }));
  };

  return (
    <ScrollView>
      <Box style={styles.container}>
        <Box style={styles.column1}>
          {vitalsLeft.map((column) => (
            <View>
              <TextInput
                label={column.name}
                mode="outlined"
                value={state[column.id]}
                style={styles.inputTxt1}
                outlineColor={COLORS.white_smoke}
                onChangeText={(value) => handleChange(column.id, value)}
                activeOutlineColor={COLORS.background.primary}
                theme={{
                  colors: {
                    primary: COLORS.gray,
                    background: COLORS.background.secondary,
                    onSurfaceVariant: '#8A8A8A',
                  },
                  roundness: SIZES.padding * 0.8,
                }}
              />
              <View style={{ position: 'absolute', right: 10, top: 30 }}>
                <Text style={styles.suffixStyle}>{column.suffix}</Text>
              </View>
            </View>
          ))}
        </Box>
        <Box style={styles.column2}>
          {vitalsRight.map((column) => (
            <View>
              <TextInput
                label={column.name}
                mode="outlined"
                style={styles.inputTxt1}
                value={state[column.id]}
                outlineColor={COLORS.white_smoke}
                activeOutlineColor={COLORS.background.primary}
                onChangeText={(value) => handleChange(column.id, value)}
                theme={{
                  colors: {
                    primary: COLORS.gray,
                    background: COLORS.background.secondary,
                    onSurfaceVariant: '#8A8A8A',
                  },
                  roundness: SIZES.padding * 0.8,
                }}
              />
              <View style={{ position: 'absolute', right: 10, top: 30 }}>
                <Text style={{ color: '#8A8A8A' }}>{column.suffix}</Text>
              </View>
            </View>
          ))}
        </Box>
      </Box>
      <Box style={{ marginVertical: 10 }}>
        <Text style={styles.title}>{strings.displayText.diagnosisInformation}</Text>
        <TextInput
          label={'Description'}
          mode="outlined"
          multiline
          style={styles.descriptionStyle}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          value={state.diag_info}
          onChangeText={(value) => handleChange('diag_info', value)}
          theme={{
            colors: {
              primary: COLORS.gray,
              background: COLORS.background.secondary,
              onSurfaceVariant: '#8A8A8A',
            },
            roundness: SIZES.padding * 0.8,
          }}
        />
      </Box>
    </ScrollView>
  );
};

export default VitalsItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  column1: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: '45%',
  },
  column2: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: '45%',
  },
  inputTxt1: {
    marginVertical: 8,
    height: 50,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
  },
  descriptionStyle: {
    marginVertical: 8,
    minHeight: 137,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
  },
  suffixStyle: {
    color: '#8A8A8A',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
  },
  title: {
    ...FONTS.h4,
    color: '#232323',
    paddingLeft: 10,
  },
});
