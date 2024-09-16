// Inpatient Registration
import React from 'react';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity, Image } from 'react-native';

import { Box } from '../components';
import { COLORS, SIZES, strings, assets } from '../constants';
import { SvgIcon } from '../constants/SvgIcon';
import styles from '../styles/Inpatients/InpatientRegistration.styles';
import IconButton from '../components/IconButton';

interface IIpType {
  id: string;
  value: string;
}

interface IPatient {
  id: string;
  name: string;
}

interface IDoctor {
  id: string;
  name: string;
}

export interface IRoomDetail {
  bed: string;
  floorId: string;
  name: string;
}

interface IInpatientRegistration {
  patient: IPatient | null;
  mobile: string;
  doctor: IDoctor | null;
  roomDetail: IRoomDetail | null;
  doa: string;
  ip_no: string;
  ipType: IIpType | null;
  attender: string;
  attender_mobile: string;
  health_condition: string;
  onAddPatient: () => void;
  onClickPatient: () => void;
  onClickDoctor: () => void;
  onClickWardNo: () => void;
  onClickDoa: () => void;
  onClickIpType: () => void;
  onChange: (name: string, value: string) => void;
}

export const InpatientRegistration = (props: IInpatientRegistration) => {
  const {
    patient,
    mobile,
    doctor,
    doa,
    ip_no,
    ipType,
    attender,
    attender_mobile,
    roomDetail,
    health_condition,
    onChange,
    onAddPatient,
    onClickDoa,
    onClickPatient,
    onClickDoctor,
    onClickIpType,
    onClickWardNo,
    onMenu,
  } = props;

  const themeColors = {
    primary: COLORS.black,
    underlineColor: 'transparent',
    background: COLORS.background.secondary,
    onSurfaceVariant: '#8A8A8A',
  };

  const handleChange = (name: string, value: any) => {
    onChange(name, value);
  };

  return (
    <Box style={styles.listContainer}>
      <Box style={styles.flexRow}>
        <Box justifyContent="center" alignContent="center">
          <TouchableOpacity onPress={onClickPatient}>
            <TextInput
              label={strings.displayText.patientsName}
              mode="outlined"
              style={styles.inputNameTxtStyle}
              value={patient ? patient?.name : ''}
              editable={false}
              outlineColor={COLORS.white_smoke}
              activeOutlineColor={COLORS.background.primary}
              onChangeText={(text) => handleChange('patient', text)}
              onPressIn={onClickPatient}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.8,
              }}
              right={
                <TextInput.Icon
                  style={styles.iconStyle}
                  color={COLORS.black}
                  disabled={true}
                  icon="chevron-down"
                />
              }
            />
          </TouchableOpacity>
        </Box>
        <Box style={styles.plusIcon}>
          {/* <TouchableOpacity onPress={onAddPatient}>
            <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity> */}
          <IconButton name="plus" iconColor={COLORS.background.primary} onClick={onAddPatient} />
        </Box>
      </Box>
      <Box style={styles.flexRow}>
        <TextInput
          label={strings.displayText.mobile}
          mode="outlined"
          placeholderTextColor={COLORS.gray}
          style={styles.inputStyle}
          value={mobile}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(text) => handleChange('mobile', text)}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
      </Box>
      <Box style={styles.flexRow}>
        <TouchableOpacity onPress={onClickDoctor}>
          <TextInput
            label={strings.displayText.doctorName}
            mode="outlined"
            style={styles.inputStyle}
            value={doctor ? doctor.name : ''}
            editable={false}
            outlineColor={COLORS.white_smoke}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(text) => handleChange('doctor', text)}
            onPressIn={onClickDoctor}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
            right={
              <TextInput.Icon
                style={styles.iconStyle}
                color={COLORS.black}
                disabled={true}
                icon="chevron-down"
                onPress={onClickDoctor}
              />
            }
          />
        </TouchableOpacity>
      </Box>
      <Box style={styles.flexRow}>
        <TextInput
          label={strings.displayText.ipNo}
          mode="outlined"
          placeholderTextColor={COLORS.gray}
          style={styles.inputStyle}
          editable={false}
          value={ip_no}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(text) => handleChange('ip_no', text)}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
      </Box>
      <Box style={styles.flexRow}>
        <TouchableOpacity onPress={onClickIpType}>
          <TextInput
            label={strings.displayText.ipType}
            mode="outlined"
            style={styles.inputStyle}
            value={ipType ? ipType.value : ''}
            editable={false}
            outlineColor={COLORS.white_smoke}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(text) => handleChange('ip_type', text)}
            onPressIn={onClickIpType}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
            right={
              <TextInput.Icon
                style={styles.iconStyle}
                color={COLORS.black}
                disabled={true}
                icon="chevron-down"
                onPress={onClickIpType}
              />
            }
          />
        </TouchableOpacity>
      </Box>
      <Box style={styles.flexRow}>
        <TextInput
          label={strings.displayText.attenderName}
          mode="outlined"
          placeholderTextColor={COLORS.gray}
          style={styles.inputStyle}
          value={attender}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(text) => handleChange('attender', text)}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
      </Box>
      <Box style={styles.flexRow}>
        <TextInput
          label={strings.displayText.attenderContact}
          mode="outlined"
          placeholderTextColor={COLORS.gray}
          style={styles.inputStyle}
          value={attender_mobile}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(text) => handleChange('attender_mobile', text)}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
      </Box>
      <Box style={styles.flexRow}>
        <TouchableOpacity onPress={onClickDoa}>
          <TextInput
            label={strings.displayText.admissionDate}
            mode="outlined"
            style={styles.inputStyle}
            value={doa}
            editable={false}
            outlineColor={COLORS.white_smoke}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(text) => handleChange('doa', text)}
            onPressIn={onClickDoa}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
            right={
              <TextInput.Icon
                style={{ width: 30, height: 30 }}
                color={COLORS.black}
                icon={() => <SvgIcon name="IpCalendarIcon" />}
                onPress={onClickDoa}
              />
            }
          />
        </TouchableOpacity>
      </Box>
      <Box style={styles.flexRow}>
        <TouchableOpacity onPress={onClickWardNo}>
          <TextInput
            label={strings.displayText.wardRoomNo}
            mode="outlined"
            style={styles.inputStyle}
            value={roomDetail ? `${roomDetail?.name} - ${roomDetail?.bed}` : ''}
            editable={false}
            outlineColor={COLORS.white_smoke}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(text) => handleChange('bed', text)}
            onPressIn={onClickWardNo}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
            right={
              <TextInput.Icon
                style={{ width: 30, height: 30 }}
                color={COLORS.black}
                icon={() => <SvgIcon name="IpRoomIcon" />}
                onPress={onClickWardNo}
              />
            }
          />
        </TouchableOpacity>
      </Box>
      <Box style={styles.flexRow}>
        <TextInput
          label={strings.displayText.healthStatus}
          mode="outlined"
          placeholderTextColor={COLORS.gray}
          style={styles.inputStyle}
          value={health_condition}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(text) => handleChange('health_condition', text)}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
      </Box>
    </Box>
  );
};

export default InpatientRegistration;
