/* eslint-disable react-hooks/exhaustive-deps */
// RoomTransfer
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { strings } from '../../i18n';
import { RootState } from '../../state';
import { RootStackParamList } from '../../navigation/types';
import { COLORS } from '../../constants';
import { inpatientRoomTransferUpdate, inpatientGetById } from '../../service/InpatientService';
import { AppContainer, Box, AbstractButton, CustomHeader } from '../../components';
import { showErrorSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import styles from '../../styles/Inpatients/InpatientRegistration.styles';
import { resetInpatientSelectedRoom } from '../../state/inpatients';

import InPatientSummary from '../../components/InpatientSummary';
import InpatientRoomTabs from '../../components/InpatientRoomTabs';
import InpatientLoader from '../../components/InpatientLoader';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

export const RoomTransfer = ({ route, navigation }: Props) => {
  const ipAdmissionId = route?.params?.ipAdmissionId;
  const { selectedRoom } = useSelector((state: RootState) => state.inpatients);
  const [loader, setLoader] = useState(false);
  const [inpatient, setInpatient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ipAdmissionId) {
      getRoomTransferDetail();
    }
    return () => {
      dispatch(resetInpatientSelectedRoom());
    };
  }, []);

  const getRoomTransferDetail = async () => {
    const response = await inpatientGetById(ipAdmissionId);

    if (response.success) {
      setInpatient(response.data);
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setLoader(true);

    try {
      const response = await inpatientRoomTransferUpdate(ipAdmissionId, {
        floor_name: selectedRoom?.floor_name,
        room_id: selectedRoom?.room_id,
      });
      console.log('response.data.errors', response);

      if (response.success) {
        navigation.navigate('Admissions');
        showSuccessSnackBar('Room transferred successfully');
        setLoader(false);
        getRoomTransferDetail();
        dispatch(resetInpatientSelectedRoom());
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

  const onClickNewRoom = () => {
    navigation.navigate('InpatientRoomList', { from: 'InpatientRoomTransfer' });
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon="arrow-left"
        title={strings.displayText.roomTransfer}
        hasDivider
        onLeftIconPress={() => navigation.goBack()}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={
                navigation.getState().type === 'drawer'
                  ? assets.HamburgerMenu
                  : assets.backArrowBlack
              }
              style={commonStyles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.roomTransfer}</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {isLoading && <InpatientLoader />}
      {!isLoading && (
        <ScrollView>
          <Box style={styles.boxSummaryContainer}>
            <InPatientSummary
              name={inpatient?.ip_admissions?.name || ''}
              doa={inpatient?.ip_admissions?.doa || ''}
              admissionFor={inpatient?.ip_admissions?.ip_type || ''}
              admissionId={inpatient?.ip_admissions?.ip_no || ''}
              navigation={navigation}
            />
            <InpatientRoomTabs
              roomHistory={inpatient?.room_transfer_history || []}
              newRoom={selectedRoom}
              onClickNewRoom={onClickNewRoom}
            />
          </Box>
        </ScrollView>
      )}
      {selectedRoom && (
        <Box style={styles.btnContainer}>
          <AbstractButton
            loader={loader}
            buttonStyle={styles.saveBtn}
            textStyle={styles.saveBtnText}
            onPress={handleSave}
          >
            {strings.displayText.save}
          </AbstractButton>
        </Box>
      )}
    </AppContainer>
  );
};

export default RoomTransfer;
