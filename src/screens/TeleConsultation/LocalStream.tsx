import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { MediaStream, RTCView, mediaDevices } from "react-native-webrtc";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useIsFocused } from "@react-navigation/native";
import { useBackHandler } from "@react-native-community/hooks/lib/useBackHandler";

interface Props {
}

const LocalVideoStream = (props: Props) => {
    const isFocused = useIsFocused();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        return dispose;
    }, []);

    const dispose = () => {
    }

    useBackHandler(() => {
        localStream?.getTracks().forEach(track => track.stop());
        localStream?.release();
        setLocalStream(null);
        return false;
    });

    useEffect(() => {
        if (isFocused) {
            startLocalStream();
        }
    }, [isFocused]);

    const startLocalStream = () => {
        let isFront = true;
        mediaDevices.enumerateDevices().then((sourceInfos: any) => {
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (
                    sourceInfo.kind == 'videoinput' &&
                    sourceInfo.facing == (isFront ? 'front' : 'environment')
                ) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }

            mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        mandatory: {
                            minWidth: 500, // Provide your own width, height and frame rate here
                            minHeight: 300,
                            minFrameRate: 30,
                        },
                        facingMode: isFront ? 'front' : 'environment',
                        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
                    },
                })
                .then((stream: MediaStream) => {
                    setLocalStream(stream);
                })
                .catch((error) => {
                    console.log(error);
                    // Log error
                });
        });
    }

    return localStream ? (
        <RTCView
            objectFit={"cover"}
            style={styles.localStream}
            streamURL={localStream.toURL()}
            mirror
        />
    ) :
        <Text style={{ color: "#fff" }}>No streaming media found!</Text>;

};

export default LocalVideoStream;

const styles = StyleSheet.create({
    localStream: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: SIZES.screenWidth
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
        height: SIZES.screenHeight * 0.35,
        borderRadius: SIZES.radius * 0.5,
    },
    HeaderText: {
        fontFamily: FONTS.InterBold,
        fontSize: SIZES.extraLarge,
        marginTop: 12,
        color: COLORS.teleConsultation.title,
    },
    bodyText: {
        fontFamily: FONTS.InterLight,
        fontSize: SIZES.font,
        lineHeight: 20,
        color: COLORS.teleConsultation.body,
    },
    joinButton: {
        backgroundColor: COLORS.background.primary,
        borderRadius: SIZES.padding * 1.5,
        height: 56,
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
});