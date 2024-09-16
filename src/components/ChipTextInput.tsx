import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Box } from '../components';
import { COLORS, assets, strings } from '../constants';
import styles from '../styles/AppointmentVitals.styles';
import { Chip, TextInput } from 'react-native-paper';
import { Text } from 'react-native';

const ChipTextInput = ({ handleOpen, handleRemove, value }: any) => {
  const renderChipsLabel = () => {
    return (
      <Box style={styles.chipLabelBox}>
        {value?.map((chip, index) => (
          <TouchableOpacity
            onPress={() => {
              handleRemove(chip);
            }}
            key={index}
          >
            <Chip style={{ margin: 2 }}>
              {chip?.name}
              <Image source={assets.CloseX} style={styles.closeIcon} />
            </Chip>
          </TouchableOpacity>
        ))}
      </Box>
    );
  };

  const renderLabel = () => {
    return (
      <Box
        style={[
          styles.chipLabel,
          {
            top: value?.length > 0 ? -5 : 15,
          },
        ]}
      >
        <Text style={{ color: value?.length > 0 ? COLORS.text : COLORS.gray }}>
          {strings.displayText.selectParameters}
        </Text>
      </Box>
    );
  };

  const getInputHeight = () => {
    const numLines = Math.ceil(value?.length / 2);
    return 60 + (numLines - 1) * 25;
  };

  return (
    <TouchableOpacity onPress={handleOpen}>
      <Box marginHorizontal={20} marginTop={20}>
        <Box>
          {renderLabel()}
          {renderChipsLabel()}
          <TextInput
            mode="outlined"
            style={[
              styles.searchInput,
              {
                height: value?.length > 0 ? getInputHeight() : styles.searchInput.height,
              },
            ]}
            outlineColor={COLORS.gray}
            multiline={true}
            disabled={true}
            theme={{
              colors: {
                primary: COLORS.gray,
                underlineColor: 'transparent',
                background: COLORS.background.secondary,
                onSurfaceVariant: '#8A8A8A',
              },
            }}
            right={
              <TextInput.Icon
                style={{ marginTop: 10 }}
                iconColor={COLORS.black}
                disabled={true}
                icon="chevron-down"
              />
            }
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default ChipTextInput;
