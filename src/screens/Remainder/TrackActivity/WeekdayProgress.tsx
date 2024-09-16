import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { Box } from '../../../components';
import CircularProgressBar from '../../../components/CircularProgressBar';
import { FONTS, assets } from '../../../constants';

// Define props types for the WeekdayProgress component
type WeekdayProgressProps = {
  day: string;
  dosesTaken: number;
  totalDoses: number;
  isSelected: boolean;
};

const WeekdayProgress: React.FC<WeekdayProgressProps> = ({
  day,
  dosesTaken,
  totalDoses,
  isSelected,
}) => {
  const isComplete = dosesTaken === totalDoses;
  const progress = (dosesTaken / totalDoses) * 100;

  const selectedStyle: any = isSelected ? styles.selectedBorder : undefined;

  return (
    <Box style={[styles.dayContainer, selectedStyle]}>
      <Text style={styles.dayLabel}>{day}</Text>
      {isComplete ? (
        <Box style={styles.progressBarContainer}>
          <Image style={styles.circleTickIcon} source={assets.CircleWithTickIcon} />
        </Box>
      ) : (
        <Box style={styles.progressBarContainer}>
          <CircularProgressBar progress={progress} size={28} strokeWidth={5} />
        </Box>
      )}
    </Box>
  );
};

// Define your StyleSheet here, remember to use StyleSheet.create
const styles = StyleSheet.create({
  circleTickIcon: {
    width: 28,
    height: 28,
  },
  dayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 92,
    width: 48,
    marginVertical: 8,
  },
  selectedBorder: {
    borderColor: '#CDCDCD',
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  dayLabel: {
    fontSize: 14,
    marginBottom: 20,
    color: '#232323',
    fontFamily: FONTS.InterBold,
  },
  progressBarContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'blue',
    // The width will be set dynamically to reflect the progress
  },
});

export default WeekdayProgress;
