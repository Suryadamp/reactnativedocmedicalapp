// InpatientRoomList
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { strings } from '../../i18n';
import { RootStackParamList } from '../../navigation/types';
import { COLORS } from '../../constants';
import { inpatientGetRoomList } from '../../service/InpatientService';
import { AppContainer, Box, AbstractButton, CustomHeader } from '../../components';
import { SvgIcon } from '../../constants/SvgIcon';
import styles from '../../styles/Inpatients/InpatientRoomList.styles';
import { setInpatientItem, setInpatientSelectedRoom } from '../../state/inpatients';
import InpatientLoader from '../../components/InpatientLoader';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

export const InpatientRoomList = ({ route, navigation }: Props) => {
  const navigationFrom = route?.params?.from || '';
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<boolean>(false);
  const [roomList, setRoomList] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<any>('');
  const [activeIndex, setActiveIndex] = useState<any>('');
  const [items, setItems] = useState<any>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getRoomList();
  }, []);

  const getRoomList = async () => {
    const response = await inpatientGetRoomList();
    console.log('response', JSON.stringify(response));
    if (response.success) {
      setRoomList(response.data);
      setActiveTab(response.data[0].id);
      setActiveIndex(0);
      const itemId = response.data[0].id;
      const existItem = response.data.find((itm: any) => itm.id == itemId);

      setItems(
        existItem?.rooms?.map((room: any) => ({
          ...room,
          floorId: itemId,
          floorName: existItem?.name,
        })),
      );
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setLoader(true);
    if (navigationFrom == 'AddInpatient') {
      await dispatch(
        setInpatientItem({
          name: 'roomDetail',
          value: {
            bed: selectedRoom.room_no,
            name: selectedRoom.floorName,
            roomId: selectedRoom.id,
          },
        }),
      );
      navigation.goBack();
      setLoader(false);
    } else if (navigationFrom == 'InpatientRoomTransfer') {
      await dispatch(
        setInpatientSelectedRoom({
          roomNo: selectedRoom.room_no,
          floor_name: selectedRoom.floorName,
          room_id: selectedRoom.id,
        }),
      );
      navigation.goBack();
      setLoader(false);
    }
  };

  const handleChangeTab = (itemId: string, index: any) => {
    setActiveIndex(index);
    setActiveTab(itemId);
    const existItem = roomList.find((itm: any) => itm.id == itemId);
    setItems(
      existItem?.rooms?.map((room: any) => ({
        ...room,
        floorId: itemId,
        floorName: existItem?.name,
      })),
    );
  };

  const handleSelectRoom = (item: any) => {
    setSelectedRoom(item);
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon="arrow-left"
        title={strings.displayText.ipRoomsList}
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
          <Text style={commonStyles.topTitleText}>{strings.displayText.ipRoomsList}</Text>
          <TouchableOpacity activeOpacity={0.8}>
            {/* <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      {isLoading && <InpatientLoader />}
      {!isLoading && (
        <ScrollView style={styles.scrollViewStyle}>
          <Box style={styles.roomList}>
            <Box style={styles.floorListContainer}>
              {roomList &&
                roomList.length > 0 &&
                roomList.map((item: any, index: number) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={
                      item.id == activeTab
                        ? styles.floorActiveItem
                        : index == activeIndex - 1
                          ? styles.floorBeforeItem
                          : index == activeIndex + 1
                            ? styles.floorAfterItem
                            : styles.floorItem
                    }
                    onPress={() => handleChangeTab(item.id, index)}
                  >
                    <Text style={item.id == activeTab ? styles.roomActiveLabel : styles.roomLabel}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              <Box style={styles.bgColor} />
            </Box>
            <Box style={styles.roomListContainer}>
              <Box style={styles.roomItemContainer}>
                <Box style={styles.listContainer}>
                  {items &&
                    items.length > 0 &&
                    items.map((item: any) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={
                          item.ip_admission.length > 0
                            ? styles.roomActiveIconContainer
                            : selectedRoom?.id == item.id && selectedRoom?.floorId == item.floorId
                              ? styles.roomSelectedContainer
                              : styles.roomIconContainer
                        }
                        onPress={() =>
                          item.ip_admission.length > 0 ? null : handleSelectRoom(item)
                        }
                      >
                        <SvgIcon
                          name={
                            item.room_or_bed == 1
                              ? item.ip_admission.length > 0
                                ? 'IpHospitalFillIcon'
                                : 'IpHospitalIcon'
                              : item.ip_admission.length > 0
                                ? 'IpBedFillIcon'
                                : 'IpBedIcon'
                          }
                        />
                        <Text
                          style={item.ip_admission.length > 0 ? styles.roomFillNo : styles.roomNo}
                        >
                          {item.room_no}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      )}
      {selectedRoom && selectedRoom.floorId && selectedRoom.id && (
        <Box style={styles.btnContainer}>
          <AbstractButton
            loader={loader}
            onPress={handleSave}
            buttonStyle={styles.saveBtn}
            textStyle={styles.saveBtnText}
          >
            {strings.displayText.save}
          </AbstractButton>
        </Box>
      )}
    </AppContainer>
  );
};

export default InpatientRoomList;
