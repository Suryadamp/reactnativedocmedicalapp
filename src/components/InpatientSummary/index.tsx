// InpatientSummary
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { strings } from '../../i18n';
import { RootState } from '../../state';
import { inpatientSetIpNo, inpatientCreate } from '../../service/InpatientService';
import { Box } from '../../components';
import { showErrorSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import styles from '../../styles/Inpatients/InpatientRegistration.styles';
import { SvgIcon } from '../../constants/SvgIcon';
import { formatDateBType } from '../../util/DateUtil';

const Detail = ({ title, value, icon }) => {
  return (
    <Box style={styles.detail}>
      <Text style={styles.labelTitle}>{title}</Text>
      <Box style={styles.valueContainer}>
        <Box>
          <SvgIcon name={icon} />
        </Box>
        <Text style={styles.value}>{value}</Text>
      </Box>
    </Box>
  );
};

const InpatientSummary = ({ navigation, name, doa, admissionFor, admissionId }: Props) => {
  const { item } = useSelector((state: RootState) => state.inpatients);
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);

  const ipTypes = commonVariable[0]?.ip_type;
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setIpNo();
  }, []);

  const setIpNo = async () => {
    await inpatientSetIpNo();
  };

  const handleSave = async () => {
    setLoader(true);
    const { patient, doctor, ipType, ...rest } = item;

    try {
      const response = await inpatientCreate({
        ...rest,
        bed: 1,
        patient_id: patient?.id,
        doctor_id: doctor?.id,
        ip_type: ipType?.id,
      });
      console.log('response.data.errors', response);

      if (response.success) {
        navigation.navigate('Admissions');
        showSuccessSnackBar('Inpatient created successfully');
        setLoader(false);
      } else if (response.data.errors) {
        showErrorSnackBar(response.data.message);
        setTimeout(() => {
          setLoader(false);
        }, 6000);
      }
    } catch (err: any) {
      showErrorSnackBar(err.message);

      setTimeout(() => {
        setLoader(false);
      }, 6000);
    }
  };

  return (
    <Box style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>{strings.displayText.admissionDetails}</Text>
      <Box style={styles.detailContainer}>
        <Box style={styles.leftContainer}>
          <Detail title={strings.displayText.patient} value={name} icon="UserIcon" />
          <Detail
            title={strings.displayText.admissionFor}
            value={admissionFor}
            icon={'IpReasonIcon'}
          />
        </Box>
        <Box style={styles.rightContainer}>
          <Box>
            <Detail
              title={strings.displayText.dateAndTime}
              value={formatDateBType(doa, 'YYYY/MM/DD HH:mm A')}
              icon="IpCalendarIcon"
            />
          </Box>
          <Box>
            <Detail title={strings.displayText.admissionId} value={admissionId} icon="IpIdIcon" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InpatientSummary;
