import React from 'react';
import { Image, Text } from 'react-native';
import { Box } from '../../../components';
import CircularProgressBar from '../../../components/CircularProgressBar';
import { assets } from '../../../constants';
import styles from '../../../styles/Reminder.styles';

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
    <Box style={[styles.weekDayContainer, selectedStyle]}>
      <Text style={styles.dayLabel}>{day}</Text>
      {isComplete ? (
        <Box style={styles.progressBarContainer}>
          <Image style={styles.circleTickIcon} source={assets.CircleWithTickIcon} />
        </Box>
      ) : (
        <Box style={styles.progressBarContainer}>
          <CircularProgressBar
            progress={progress}
            size={styles.circularBarHeight.height}
            strokeWidth={styles.circularBarHeight.width}
          />
        </Box>
      )}
    </Box>
  );
};

export default WeekdayProgress;
