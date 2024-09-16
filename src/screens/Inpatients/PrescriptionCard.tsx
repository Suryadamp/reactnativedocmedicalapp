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
  item: any;
  setIsOptionsOpen?: any;
  setSelectItem?: any;
  handleOpen?: any;
  navigation?: any;
}

const InpatientPrescriptionCard = ({ item, setSelectItem, handleOpen }: PrescriptionCardProps) => {
  const dateOnly = item?.created_at ? new Date(item?.created_at).toISOString().split('T')[0] : '-';

  return (
    <>
      <Box
        style={[styles.card, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor={COLORS.green_00C792}
          padding={8}
          alignItems="center"
        >
          <Text style={styles.prescriptionNo}> {item?.doctor_name}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ padding: 5 }}
            onPress={() => {
              handleOpen();
              setSelectItem(item);
            }}
          >
            <Image source={assets.More} style={styles.imageStyle} />
          </TouchableOpacity>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" padding={8}>
          <Box flexDirection="column" justifyContent="center">
            <Text style={styles.doctorName}>{item?.product_name}</Text>
            <Text style={styles.symptoms}>{`Qty: ${item?.quantity}`}</Text>
            <Text style={styles.symptoms}>{dateOnly ?? '-'}</Text>
          </Box>
          <Image source={assets.DocRec1} style={styles.doctorImage} />
        </Box>
      </Box>
    </>
  );
};

export default InpatientPrescriptionCard;
