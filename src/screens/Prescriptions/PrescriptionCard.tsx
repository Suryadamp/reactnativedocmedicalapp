import React from 'react';
import { Image, Platform } from 'react-native';
import { Box } from '../../components';
import { COLORS, assets } from '../../constants';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import styles from '../../styles/Prescription.styles';

export interface Prescription {
  id: string;
  patient_id: string;
  invoice_no: string;
  appointment: Appointment;
  access: boolean;
  prescription_product: PrescriptionProduct[];
}
export interface Appointment {
  id: string;
  doctor: Doctor;
}

export interface PrescriptionProduct {
  symptom: Symptom;
}

export interface Symptom {
  id: string;
  symptom_name: string;
}

export interface Doctor {
  id: string;
  name: string;
}
interface PrescriptionCardProps {
  item: Prescription;
  setIsOptionsOpen?: any;
  setSelectItem?: any;
  handleOpen?: any;
  navigation?: any;
  isAppointment: boolean;
}

const PrescriptionCard = ({
  item,
  setSelectItem,
  handleOpen,
  navigation,
  isAppointment,
}: PrescriptionCardProps) => {
  const dateOnly = item?.created_at ? new Date(item?.created_at).toISOString().split('T')[0] : '-';
  return (
    <>
      <Box
        style={[
          item?.access || isAppointment ? styles.selfCard : styles.card,
          Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow,
        ]}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor={
            item?.access || isAppointment ? 'rgba(58, 141, 255, 0.8)' : COLORS.green_00C792
          }
          padding={8}
          alignItems="center"
        >
          <Text style={styles.prescriptionNo}> {item?.invoice_no}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ padding: 5 }}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            disabled={!item?.access}
            onPress={(event) => {
              event.stopPropagation();
              handleOpen();
              setSelectItem(item);
            }}
          >
            <Image source={assets.More} style={styles.imageStyle} />
          </TouchableOpacity>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" padding={8}>
          <Box flexDirection="column" justifyContent="center">
            <Text style={styles.doctorName}>{item?.appointment?.doctor?.name ?? 'Self'}</Text>
            {isAppointment && (
              <Text style={styles.symptoms}>
                {item.prescription_product.map((prd) => prd.symptom.symptom_name)}
              </Text>
            )}
            {!isAppointment && (
              <Text style={styles.symptoms}>
                {Object.keys(item?.prescription_product).join(', ') ?? ''}
              </Text>
            )}
            <Text style={styles.symptoms}>{dateOnly ?? '-'}</Text>
          </Box>
          <Image
            source={item?.access || isAppointment ? assets.SelfImage : assets.DocRec1}
            style={styles.doctorImage}
          />
        </Box>
      </Box>
    </>
  );
};

export default PrescriptionCard;
