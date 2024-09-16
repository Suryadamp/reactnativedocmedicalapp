import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AbstractButton, AppContainer, Box, CustomBottomSheet, CustomHeader } from '../../components';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { Avatar, TextInput, Text } from 'react-native-paper';
import { SocketUserInfo } from './webrtc_socket';
import { validateRoom } from '../../service/AppointmentService';
import LocalVideoStream from './LocalStream';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;
interface ResponseAppointmentRoomCheck {
  data: string;
  message: string;
  success: boolean;
}

const LobbyScreen = ({ navigation, route }: Props) => {

  const { userId, userName, roles } = useSelector(
    (state: RootState) => state.users,
  );

  const { appointmentId, roomId, doctorId } = route.params as SocketUserInfo;

  const [progress, setProgress] = useState<boolean>(false);
  const [manualRoomId, setManualRoomId] = useState<string>("");
  const [isMicOn, setMic] = useState(true);
  const [isCameraOn, setCamera] = useState(true);
  const [showRoomCodeInput, setShowRoomCodeInput] = useState<boolean>(false);


  const onJoin = async () => {
    setProgress(true);
    setShowRoomCodeInput(false);
    await validateRoom(appointmentId, roomId).then((response: ResponseAppointmentRoomCheck) => {
      console.log(response);
      if (userId && response.success) {
        setProgress(false);
        navigation.navigate('CallConnected', {
          appointmentId,
          doctorId,
          userId,
          userName,
          sharedRoomId: roomId,
          audio: isMicOn,
          video: isCameraOn
        });
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    })
      .catch((err) => {
        console.log(err);
      })
    // navigation.navigate('CallConnected', {
    //   sharedRoomId: manualRoomId
    // });
  };


  const profileComponent = () => {
    return (
      <Box style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.avatarContainer}>
          <Avatar.Icon size={100} icon="account-circle" />
        </View>
        <Text style={[styles.bodyText, { marginTop: 10 }]}>{userName}</Text>
      </Box>
    );
  };

  const videoComponent = () => {
    return (
      <Box style={[styles.videoBox, { backgroundColor: COLORS.white }]}>
        {/* <StreamVideo stream={localStream} /> */}
        <LocalVideoStream />
      </Box>
    );
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'light-content'}
      style={styles.rootContainer}
    >
      <View style={{ flex: 1, width: '100%' }}>
        <CustomHeader
          leftIcon="back"
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <Text style={[styles.HeaderText]}>Get Started</Text>
      <Text style={[styles.bodyText]}>Setup your audio and video before joining</Text>
      <Box style={styles.videoBox}>{isCameraOn ? videoComponent() : profileComponent()}</Box>
      <Box style={[styles.rowContainer, { marginTop: 20 }]}>
        <Box style={{ flexDirection: 'row' }}>
          <Box
            style={[
              styles.iconContainer,
              {
                backgroundColor: isMicOn ? COLORS.teleConsultation.icon_bg : COLORS.white,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setMic(!isMicOn);
              }}
            >
              <MaterialIcon
                name={isMicOn ? 'microphone-outline' : 'microphone-off'}
                size={30}
                color={isMicOn ? COLORS.white : COLORS.black}
              />
            </TouchableOpacity>
          </Box>
          <Box
            style={[
              styles.iconContainer,
              {
                marginLeft: 15,
                backgroundColor: isCameraOn ? COLORS.teleConsultation.icon_bg : COLORS.white,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setCamera(!isCameraOn);
              }}
            >
              <MaterialIcon
                name={isCameraOn ? 'video-outline' : 'video-off-outline'}
                size={30}
                color={isCameraOn ? COLORS.white : COLORS.black}
              />
            </TouchableOpacity>
          </Box>
        </Box>
        <Box
          style={[
            styles.iconContainer,
            {
              backgroundColor: COLORS.black,
              borderWidth: 2,
              borderColor: COLORS.teleConsultation.icon_bg,
            },
          ]}
        >
          <AntIcon name="setting" size={30} color={COLORS.white} onPress={() => {
            if (userId)
              ToastAndroid.show(`RoomId: ${roomId}, AppId: ${appointmentId}`, ToastAndroid.SHORT);
          }}
            onLongPress={() => {

            }} />
        </Box>
      </Box>
      <Box style={[styles.rowContainer, { marginVertical: "5%" }]}>
        {/* <AbstractButton
          buttonStyle={[
            styles.joinButton,
            { backgroundColor: COLORS.teleConsultation.icon_bg, flex: 6 },
          ]}
          onPress={() => {
            setShowRoomCodeInput(true);
          }}
        >
          Join
        </AbstractButton>
        <Box style={{ width: 10 }} /> */}
        <AbstractButton buttonStyle={[styles.joinButton, { flex: 8 }]} onPress={onJoin} loader={progress}>
          Join
        </AbstractButton>
      </Box>
      {showRoomCodeInput && (
        <CustomBottomSheet
          openBSheet={showRoomCodeInput}
          snapPoints={['100%']}
          setSheetState={setShowRoomCodeInput}
        // enablePanDownToClose={false}
        >
          <Box style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <TextInput
              placeholder='Enter Room ID'
              style={{ width: "50%", borderRadius: 10 }}
              value={roomId}
              onChangeText={(text) => setManualRoomId(text)}
            />
            <AbstractButton buttonStyle={[styles.joinButton]} onPress={onJoin}>
              Join
            </AbstractButton>
          </Box>
        </CustomBottomSheet>
      )}
      {/* <Dialog visible={waiting} dismissable={false} style={{ borderRadius: 5 }}>
        <Dialog.Content>
          <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating={true} />
            <Text variant="bodyMedium">  Waiting for doctor . . .</Text>
          </View>
        </Dialog.Content>
      </Dialog> */}
    </AppContainer>
  );
};

export default LobbyScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  iconContainer: {
    borderRadius: SIZES.radius * 0.4,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.teleConsultation.icon_bg,
  },
  rowContainer: {
    height: 50,
    marginTop: SIZES.medium,
    width: SIZES.screenWidth - SIZES.padding * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.medium,
    overflow: 'hidden',
    width: SIZES.screenWidth - SIZES.padding * 2,
    height: SIZES.screenHeight * 0.6,
    borderRadius: SIZES.radius * 0.5,
  },
  HeaderText: {
    fontFamily: FONTS.InterBold,
    fontSize: SIZES.extraLarge,
    marginTop: 12,
    color: COLORS.black,
  },
  bodyText: {
    fontFamily: FONTS.InterLight,
    fontSize: SIZES.font,
    lineHeight: 20,
    color: COLORS.black,
  },
  joinButton: {
    backgroundColor: COLORS.background.primary,
    borderRadius: SIZES.padding * 1.5,
    height: 56,
    width: "40%"
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
