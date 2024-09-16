// Admin - StatusTrackSheet
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from 'react-native-step-indicator';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS } from '../../../constants';
import { Box } from '../../../components';
import { SvgIcon } from '../../../constants/SvgIcon';

const stepIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  // currentStepStrokeWidth: 1,
  // stepStrokeWidth: 1,
  stepStrokeCurrentColor: '#F6B178',
  // stepIndicatorCurrentColor: '#F6B178',
  stepStrokeFinishedColor: '#17CF9D',
  separatorFinishedColor: '#17CF9D',
  separatorUnFinishedColor: COLORS.white_smoke,
  stepIndicatorFinishedColor: '#17CF9D',
  stepIndicatorUnFinishedColor: COLORS.white_smoke,
  stepIndicatorLabelFinishedColor: COLORS.white_smoke,
  stepIndicatorLabelUnFinishedColor: COLORS.white_smoke,
  labelSize: 13,
  currentStepLabelColor: COLORS.white_smoke,
};

export const StatusTrackBottomSheet = ({ appointment, onTrackStatus }: any) => {
  const stepperLabels = ['Patients Arrived', 'Patient Consulting', 'Patient Exit'];
  const [step, setStep] = useState(
    appointment.out ? 3 : appointment.consulting ? 2 : appointment.arrived ? 1 : 0,
  );

  const renderStepIndicator = ({ stepStatus }: any): any => {
    let name = 'circle';
    let color = COLORS.white;
    let size = 12;

    if (stepStatus === 'finished') {
      name = 'check-bold';
      size = 14;
    } else if (stepStatus === 'current') {
      name = 'clock-time-four';
      color = '#F6B178';
      size = 20;
    }

    if (stepStatus === 'current') {
      return <SvgIcon name="WaitingIcon" />;
    }

    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  };

  const renderLabel = (data: any) => {
    const handleChangeStatus = () => {
      onTrackStatus(
        appointment.id,
        step === 0 ? 'patient_arrived_chk' : step === 1 ? 'consulting_chk' : 'patient_out_chk',
      ).then(() => setStep(step + 1));
    };

    return (
      <View style={styles.labelContainer}>
        <View style={{ width: SCREEN_WIDTH * 0.74 }}>
          <Text style={{ color: '#000', paddingLeft: 15 }}>{data.label}</Text>
        </View>
        <TouchableOpacity style={styles.icon} onPress={handleChangeStatus}>
          <SvgIcon name={data.stepStatus === 'finished' ? 'CheckIcon' : 'UnCheckIcon'} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <Box style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={3}
            direction="vertical"
            currentPosition={step}
            renderStepIndicator={renderStepIndicator}
            renderLabel={renderLabel}
            labels={stepperLabels.map((item) => item)}
          />
        </View>
      </Box>
    </ScrollView>
  );
};

export default StatusTrackBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: '100%',
  },
  stepIndicator: {
    height: 200,
    width: '100%',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
