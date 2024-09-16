import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MediaStream, RTCView } from "react-native-webrtc";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useEffect } from "react";
import { Box } from "native-base";

interface Props {
    stream: MediaStream | null | undefined;
    isHost: boolean;
}
const StreamVideo = (props: Props) => {

    useEffect(() => {
        return (() => {
            // props.stream?.release();
            // props.stream = null;
        })
    }, []);

    return props.stream ?
        <RTCView
            objectFit={"cover"}
            style={styles.localStream}
            streamURL={props.stream.toURL()}
            mirror
        />
        :
        <Box style={styles.localStream}>
            <ActivityIndicator color={COLORS.background.primary} />
            <Text style={{}}>  Waiting for {props.isHost ? "User" : "Doctor"}</Text>
        </Box>

};

export default StreamVideo;

const styles = StyleSheet.create({
    localStream: {
        flex: 1,
        backgroundColor: COLORS.grey,
        width: '100%',
        flexDirection: "row", justifyContent: 'center', alignItems: 'center'
    }
});