import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppContainer, Box, PatientBottomSheet } from '../../components';
import CustomHeader from '../../components/CustomHeader';
import { COLORS, assets } from '../../constants';
import { RootStackParamList } from '../../navigation/types';
import { RootState } from '../../state';
import { truncateString } from '../../util/CommanUtil';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import styles from '../../styles/Profile.styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isHpTablet } from '../../hooks/useDeviceCheck';
type Props = NativeStackScreenProps<RootStackParamList>;

const Profile = ({ navigation }: Props) => {
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const { roles } = useSelector((state: RootState) => state.users);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle="dark-content"
      style={styles.container}
    >
      {/* Header & title section */}
      <CustomHeader
        leftIcon="arrow-left"
        onLeftIconPress={() => {
          navigation.goBack();
        }}
        title="Profile"
      />

      {/* User name section */}
      <Box style={styles.changeUserSecion}>
        <Box style={styles.userNamesStyle}>
          <FontIcon
            name="user-alt"
            style={styles.userIcon}
            size={isHpTablet('1.6%')}
            color={COLORS.background.primary}
          />
          <Text style={styles.userName}>{selectedPatient?.name}</Text>
        </Box>
        {roles.includes('patient') && (
          <TouchableOpacity
            style={styles.changeBtn}
            onPress={() => {
              setIsOpen(true);
            }}
          >
            <Text style={styles.changeTxt}>Change</Text>
          </TouchableOpacity>
        )}
      </Box>

      {/* scan qrCode section */}
      <Box style={styles.qrcodeSection}>
        <Image source={assets.ProfileQrcode} style={styles.qrcodeImg} />
        <Text style={styles.uhidNo}>UHID No</Text>
        <Text style={styles.userIdTxt}>{selectedPatient?.uhid}</Text>
      </Box>

      <Box style={styles.separator} />

      {/* User detail cards */}
      <Box paddingVertical={hp(1.5)}>
        <Box style={styles.userDetailSection}>
          <Box style={styles.userDetailCard}>
            <Image source={assets.AgeIcon} style={styles.iconStyle} />
            <Text style={styles.cardtitle}>Age</Text>
            <Text style={styles.descTxt}>{selectedPatient?.age} Years</Text>
          </Box>
          <Box style={styles.userDetailCard}>
            <Ionicons name="male" size={isHpTablet(2.8)} color={COLORS.background.primary} />
            <Text style={styles.cardtitle}>Gender</Text>
            <Text style={styles.descTxt}>{selectedPatient?.sex === 1 ? 'Male' : 'Female'}</Text>
          </Box>
        </Box>

        <Box style={styles.userDetailSection}>
          <Box style={styles.userDetailCard}>
            <Image source={assets.WeightIcon} style={styles.iconStyle} />
            <Text style={styles.cardtitle}>Weight</Text>
            <Text style={styles.descTxt}>70kg</Text>
          </Box>
          <Box style={styles.userDetailCard}>
            <OcticonsIcon
              name="device-mobile"
              size={isHpTablet(2.3)}
              color={COLORS.background.primary}
            />
            <Text style={styles.cardtitle}>Contact</Text>
            <Text style={styles.descTxt}>{selectedPatient?.mobile}</Text>
          </Box>
        </Box>

        <Box style={styles.userDetailSection}>
          <Box style={styles.userDetailCard}>
            {/* <Image source={assets.MapMark} /> */}
            <Ionicons
              name={'location-outline'}
              size={isHpTablet(3)}
              color={COLORS.background.primary}
            />
            <Text style={styles.cardtitle}>Address</Text>
            <Text style={styles.descTxt}>APT Road, Erode</Text>
          </Box>
          <Box style={styles.userDetailCard}>
            {/* <Image source={assets.Envelope} /> */}
            <MaterialCommunityIcons
              name="email-outline"
              size={isHpTablet(2.8)}
              color={COLORS.background.primary}
            />
            <Text style={styles.cardtitle}>Email</Text>
            <Text style={styles.descTxt}>
              {selectedPatient?.email != null && truncateString(selectedPatient?.email, 16)}
            </Text>
          </Box>
        </Box>
      </Box>

      {isOpen && <PatientBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
    </AppContainer>
  );
};

export default Profile;
