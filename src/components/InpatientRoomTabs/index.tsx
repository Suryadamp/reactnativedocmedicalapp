// InpatientRoomTabs
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Box from '../Box';
import { strings } from '../../i18n';
import { SvgIcon } from '../../constants/SvgIcon';
import { formatDateBType } from '../../util/DateUtil';
import styles from '../../styles/Inpatients/InpatientRoomList.styles';

const Ring = (props: any) => {
  const { index } = props;
  const opacityValue = useSharedValue(0.3);
  const scaleValue = useSharedValue(0.2);

  useEffect(() => {
    opacityValue.value = withDelay(
      index * 0.001,
      withRepeat(
        withTiming(0, {
          duration: 2500,
        }),
        -1,
        false,
      ),
    );

    scaleValue.value = withDelay(
      index * 0.00000001,
      withRepeat(
        withTiming(3, {
          duration: 2500,
        }),
        -1,
        false,
      ),
    );
  }, [opacityValue, scaleValue, index]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleValue.value,
        },
      ],
      opacity: opacityValue.value,
    };
  });

  return <Animated.View style={[styles.dot, rStyle]} />;
};

const DotAnimation = () => {
  return (
    <View style={styles.dotStyle}>
      <View style={[styles.dotContainer, styles.center]}>
        {[...Array(3).keys()].map((_, index) => (
          <Ring key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

const TabBar = ({ tab, onChange }: any) => {
  return (
    <Box style={styles.tabBar}>
      <TouchableOpacity
        style={tab === 'room-transfer' ? styles.tabActiveItem : styles.tabItem}
        onPress={() => onChange('room-transfer')}
      >
        <Text style={tab === 'room-transfer' ? styles.tabActiveTitle : styles.tabTitle}>
          {strings.displayText.roomTransfer}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tab === 'room-history' ? styles.tabActiveItem : styles.tabItem}
        onPress={() => onChange('room-history')}
      >
        <Text style={tab === 'room-history' ? styles.tabActiveTitle : styles.tabTitle}>
          {strings.displayText.roomHistory}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

const TabRoomTransfer = ({ currentRoom, newRoom, onClickNewRoom }: any) => {
  return (
    <Box style={styles.roomTransferContainer}>
      <Box style={styles.itemContainer}>
        <Text style={styles.label}>{strings.displayText.currentWardNo}</Text>
        <Box style={styles.content}>
          <Box style={styles.roomTabIconContainer}>
            <SvgIcon name="IpHospitalIcon" />
            <Text style={styles.roomNo}>{currentRoom?.room_no || ''}</Text>
          </Box>
          <Box style={styles.roomDetails}>
            <Text style={styles.floor}>{`●  ${currentRoom?.tname || ''}`}</Text>
            {/* <Text style={styles.ward}>● Female Ward -1</Text> */}
          </Box>
        </Box>
      </Box>
      <Box style={styles.itemContainer}>
        <Text style={styles.label}>{strings.displayText.newWardNo}</Text>

        {!newRoom && (
          <TouchableOpacity style={styles.content} onPress={onClickNewRoom}>
            <Box style={styles.newContainer}>
              <SvgIcon name="AddIcon" />
            </Box>
          </TouchableOpacity>
        )}
        {newRoom && (
          <Box style={styles.content}>
            <Box style={styles.roomIconContainer}>
              {/* <Box style={styles.dotStyle}>
                <SvgIcon name="NotificationDotIcon" />
              </Box> */}
              <DotAnimation />
              <SvgIcon name="IpHospitalIcon" />
              <Text style={styles.roomNo}>{newRoom.roomNo}</Text>
            </Box>
            <Box style={styles.roomDetails}>
              <Text style={styles.floor}>{`●  ${newRoom.floor_name}`}</Text>
              {/* <Text style={styles.ward}>● Female Ward -1</Text> */}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const TabRoomHistory = ({ roomHistory }: any) => {
  return (
    <Box style={styles.roomHistoryContainer}>
      {roomHistory &&
        roomHistory.length > 0 &&
        roomHistory.map((history: any) => (
          <Box style={styles.roomTransferContainer}>
            <Box style={styles.itemHistoryContainer}>
              <Box style={styles.content}>
                <Box style={styles.historyLeft}>
                  <SvgIcon name="HospitalHistoryIcon" />
                  <Text style={[styles.roomNo, { color: '#C3C3C3' }]}>{history.room_no}</Text>
                </Box>
                <Box style={styles.roomDetails}>
                  <Text style={[styles.floor, { color: '#C3C3C3' }]}>{`●  ${history.tname}`}</Text>
                  {/* <Text style={[styles.ward, { color: '#C3C3C3' }]}>● Female Ward -1</Text> */}
                </Box>
              </Box>
            </Box>
            <Box style={styles.itemHistoryContainer}>
              <Box style={styles.content}>
                <Box style={[styles.roomDetails]}>
                  <Text
                    style={[styles.floor, { color: '#C3C3C3' }]}
                  >{`●  In: ${formatDateBType(history.doa, 'YYYY/MM/DD HH:mm A')}`}</Text>
                  {history.dod && (
                    <Text
                      style={[styles.ward, { color: '#C3C3C3' }]}
                    >{`●  Out: ${formatDateBType(history.dod, 'YYYY/MM/DD HH:mm A')}`}</Text>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

// Main component
export const InpatientRoomTabs = ({ roomHistory, newRoom, onClickNewRoom }: any) => {
  const [tab, setTab] = useState('room-transfer');

  return (
    <Box style={styles.tabContainer}>
      <TabBar tab={tab} onChange={setTab} />
      {tab === 'room-transfer' && (
        <TabRoomTransfer
          currentRoom={roomHistory[roomHistory.length - 1]}
          newRoom={newRoom}
          onClickNewRoom={onClickNewRoom}
        />
      )}
      {tab === 'room-history' && <TabRoomHistory roomHistory={roomHistory} />}
    </Box>
  );
};

export default InpatientRoomTabs;
