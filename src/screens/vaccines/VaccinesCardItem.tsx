/* eslint-disable react/react-in-jsx-scope */
import { Platform } from 'react-native';
import { Box } from '../../components';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/Vaccine.styles';
export interface Vaccine {
  key: string;
  dose: string;
  date: string;
  status: string;
}

interface VaccineCardProps {
  item: VaccineCardItem;
}
interface VaccineCardItem {
  due_date: string;
  given_date: string | null;
  head_cr: string;
  height: string;
  patient_id: string;
  reminder_sent: string | null;
  reminder_sent_at: string | null;
  vaccine_id: string;
  vaccine_master: {
    id: number;
    name: string;
  };
  weight: string;
}

const VaccineCardItem = ({ item }: VaccineCardProps) => {
  return (
    <Box style={[styles.card, Platform.OS === 'android' ? styles.androidShadow : styles.androidShadow]}>
      <Box flexDirection="row" alignItems="center" flex={1}>
        {item?.given_date && item?.due_date ? (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            color={'#01AD23'}
            size={styles.iconSize.height}
            style={styles.statusImage}
          />
        ) : !item?.given_date && item?.due_date && new Date(item.due_date) < new Date() ? (
          // <Image source={assets.CircleError} style={styles.statusImage} />
          <MaterialCommunityIcons
            name="alert-circle"
            color={'#FF3235'}
            size={styles.iconSize.height}
            style={styles.statusImage}
          />
        ) : (
          <MaterialCommunityIcons
            name="clock-time-four"
            color={'#FF8834'}
            size={styles.iconSize.height}
            style={styles.statusImage}
          />
        )}
        <Box style={[styles.verticalDivider]} />
        <Box flexDirection="column" marginLeft={styles.iconSize.marginLeft} marginVertical={10}>
          <Text style={item?.given_date && item?.due_date ? styles.successDose : styles.dose}>
            {item?.vaccine_master?.name}
          </Text>
          <Text style={styles.dateText}>Due:{item?.due_date}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default VaccineCardItem;
