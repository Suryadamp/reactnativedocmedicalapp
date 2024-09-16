/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AbstractButton, AppContainer, Box } from '../../components';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import InCallManager from 'react-native-incall-manager';
import StreamVideo from './StreamVideo';
import WebRTCSocketImpl, { CreateRoomResponse, LogLevel, ResponseType, print } from './webrtc_socket';
import { Avatar } from 'react-native-paper';
import { useBackHandler } from '@react-native-community/hooks';
import { isHpTablet } from '../../hooks/useDeviceCheck';

interface NavigateProps {
  navigation: any;
  route: any
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const VideoCallRoomScreen = ({ navigation, route }: Props) => {

  // const { userId = 1, userName = "Temp" } = useSelector(
  //   (state: RootState) => state.users,
  // );

  const { appointmentId, doctorId, userId, userName, sharedRoomId, video, audio } = route.params;

  // change people count to check different UI
  const [toggleRemoteStream, setToggleRemoteStream] = useState<boolean>(false);
  const [muteVideo, setMuteVideo] = useState<boolean>(true);
  const [muteAudio, setMuteAudio] = useState<boolean>(true);
  const [waiting, setWaiting] = useState<boolean>(false);

  const { isHost, isHostAlive, remoteStream, localStream, iceCandidateGathering, iceCandidateState,
    muteLocalVideo, muteLocalAudio, createNewRoom, disconnectAllClients,
    setPreSharedRoomId, meetingCompleted } = WebRTCSocketImpl();

  useEffect(() => {
    print(`🔉${audio} => 📺 ${video}`, LogLevel.info);
    createNewRoom({ appointmentId, roomId: sharedRoomId, doctorId, userId, userName }, (res: CreateRoomResponse) => {
      console.log(res);
      if (res.success && res.type != ResponseType.error) {
        setPreSharedRoomId(sharedRoomId, res.type);
        if (res.type == ResponseType.waiting) {
          setWaiting(true);
          return;
        }
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    });

    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);
    InCallManager.setSpeakerphoneOn(true);
    InCallManager.setMicrophoneMute(false);
    if (audio) {
      setMuteAudio(!audio);
    } else {
      muteLocalAudio();
    }
    if (video) {
      setMuteVideo(!video);
    } else {
      muteLocalVideo();
    }
  }, []);

  useEffect(() => {
    if (isHostAlive != null && isHostAlive == false) {
      navigation.goBack();
    }
  }, [isHostAlive]);

  useBackHandler(() => true);

  const RenderVideoMute = () => {
    return (
      <Box
        style={[{ flex: 1, width: "100%", justifyContent: 'center', alignItems: "center", backgroundColor: "grey" }]}
      >
        <Avatar.Icon size={toggleRemoteStream ? 100 : 40} icon="account" />
      </Box>
    );
  };

  const RenderLocalStream = () => {
    return (
      <Box style={[styles.fullScreenBox]}>
        <Box style={[styles.videoBox, styles.fullScreenVideo]}>
          {muteVideo && toggleRemoteStream ? <RenderVideoMute /> : <StreamVideo stream={toggleRemoteStream ? localStream : remoteStream} isHost={isHost} />}
          <NameCard name={`State: ${iceCandidateState} [${iceCandidateGathering}]`} />
        </Box>
      </Box>
    );
  };

  const RenderRemoteStream = () => {
    return (
      <Box style={[styles.miniScreenBox]}>
        <TouchableOpacity onPress={() => setToggleRemoteStream(!toggleRemoteStream)}>
          <Box style={[styles.videoBox, styles.miniScreenVideo]}>
            {muteVideo && !toggleRemoteStream ? <RenderVideoMute /> : <StreamVideo stream={toggleRemoteStream ? remoteStream : localStream} isHost={isHost} />}
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  const NameCard = ({ name }: { name: string }) => {
    return (
      <View
        style={{
          padding: SIZES.padding,
          backgroundColor: COLORS.black,
          position: 'absolute',
          bottom: 15,
          left: 10,
          borderRadius: SIZES.radius * 0.5,
        }}
      >
        <Text style={styles.bodyText}> {name}</Text>
      </View>
    );
  };

  const handleMuteVideo = () => {
    muteLocalVideo();
    setMuteVideo(!muteVideo);
  };

  const toggleMicInput = () => {
    muteLocalAudio();
    InCallManager.setMicrophoneMute(!muteAudio);
    setMuteAudio(!muteAudio);
  };


  const SingleUser = () => {
    return (
      <Box
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <RenderLocalStream />
        <RenderRemoteStream />
      </Box>
    );
  }

  const MultiUser = () => {

  }

  return (
    <AppContainer
      statusBarBgColor={COLORS.black}
      statusBarStyle={'light-content'}
      style={styles.rootContainer}
    >
      {isHost &&
        <View
          style={{
            padding: 8,
            backgroundColor: COLORS.black,
            position: 'absolute',
            top: 50,
            right: 50,
            borderRadius: 10,
            zIndex: 2
          }}
        >
          <Text style={styles.bodyText} onPress={() => {
            ToastAndroid.show(`roomId: ${sharedRoomId} [${userId}]`, ToastAndroid.SHORT);
          }}>Host</Text>
        </View>}
      {/* <Box style={styles.rowContainer}>
        <AbstractButton buttonStyle={[styles.joinButton, { flex: 1 }]} onPress={() => {
          disconnectSocket();
          navigation.goBack();
        }}>
          End
        </AbstractButton>
        <View style={{ flex: 1 }} />
        <Box style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box style={styles.borderIconContainer}>
            <MaterialIcon name="hand-back-right-outline" size={30} color={COLORS.white} onPress={disconnectAllClients} />
          </Box>
          <Box style={styles.borderIconContainer}>
            <Image source={assets.BRB} style={styles.icon} />
          </Box>
          <Box
            style={[
              styles.borderIconContainer,
              {
                width: styles.borderIconContainer.width * 2,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              },
            ]}
          >
            <Image source={assets.People} style={styles.icon} />
            <Text style={styles.bodyText}> {isHost ? "Host" : peopleCount}</Text>
          </Box>
        </Box>
      </Box> */}
      {/* middle container */}
      <SingleUser />
      {/* bottom container */}
      <Box style={[styles.rowContainer, { marginBottom: 10 }]}>
        {/* <Box style={styles.borderIconContainer}>
          <Image source={assets.RemoveBG} style={styles.icon} />
        </Box> */}
        <AbstractButton buttonStyle={[styles.joinButton]}
          onLongPress={() => {
            disconnectAllClients();
            navigation.goBack();
          }}
          onPress={() => {
            meetingCompleted();
          }}>
          End
        </AbstractButton>
        {/* <Box style={styles.borderIconContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
          }}>
            <Ionicons name="share-outline" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </Box> */}
        <Box
          style={[
            styles.borderIconContainer,
            {
              backgroundColor: muteAudio ? COLORS.white : COLORS.teleConsultation.icon_bg,
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={toggleMicInput}>
            <MaterialIcon
              name={muteAudio ? 'microphone-off' : 'microphone-outline'}
              size={30}
              color={muteAudio ? COLORS.black : COLORS.white}
            />
          </TouchableOpacity>
        </Box>
        <Box
          style={[
            styles.borderIconContainer,
            {
              backgroundColor: muteVideo ? COLORS.white : COLORS.teleConsultation.icon_bg,
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={handleMuteVideo}>
            <MaterialIcon
              name={muteVideo ? 'video-off-outline' : 'video-outline'}
              size={30}
              color={muteVideo ? COLORS.black : COLORS.white}
            />
          </TouchableOpacity>
        </Box>
        {/* <Box style={styles.borderIconContainer}>
          <MaterialIcon name="dots-vertical" size={30} color={COLORS.white} />
        </Box>
        <Box style={styles.borderIconContainer}>
          <Ionicons name="chatbox-outline" size={30} color={COLORS.white} />
        </Box> */}
      </Box>
    </AppContainer>
  );
};

export default VideoCallRoomScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  borderIconContainer: {
    borderWidth: 2,
    borderRadius: SIZES.radius * 0.4,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderColor: COLORS.teleConsultation.icon_bg,
  },
  rowContainer: {
    height: 50,
    marginTop: SIZES.medium,
    width: SIZES.screenWidth - SIZES.padding * 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  videoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  largeVidoBox: {
    width: SIZES.screenWidth - SIZES.padding * 2,
    height: SIZES.screenHeight * 0.45,
  },
  extraSmallVidoBox: {
    width: SIZES.screenWidth * 0.5 - SIZES.padding * 2,
    height: SIZES.screenHeight * 0.2,
  },
  smallVideoBox: {
    width: SIZES.screenWidth * 0.5 - SIZES.padding * 2,
    height: SIZES.screenHeight * 0.35,
  },
  mediumVidoBox: {
    width: SIZES.screenWidth - SIZES.padding * 2,
    height: SIZES.screenHeight * 0.35,
  },
  fullScreenBox: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0
    // width: SIZES.screenWidth * 0.8
  },
  miniScreenBox: {
    position: 'absolute',
    bottom: '2%',
    right: '5%',
    width: SIZES.screenWidth / 4,
    zIndex: 1
  },
  miniScreenVideo: {
    borderRadius: SIZES.radius * 0.5,
    aspectRatio: 3 / 4
  },
  fullScreenVideo: {
    aspectRatio: isHpTablet(1 / 1.9)
  },
  bodyText: {
    fontFamily: FONTS.InterLight,
    fontSize: SIZES.font,
    lineHeight: 20,
    color: COLORS.teleConsultation.body,
  },
  joinButton: {
    width: SIZES.screenWidth * 0.2,
    backgroundColor: COLORS.teleConsultation.alert,
    borderRadius: SIZES.padding * 1.5,
    height: 50,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  icon: {
    height: 20,
    width: 20,
  },
});
