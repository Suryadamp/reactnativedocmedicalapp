import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { MediaStream, RTCPeerConnection, mediaDevices, RTCSessionDescription, RTCIceCandidate, MediaStreamTrack } from "react-native-webrtc";
import { Socket, io } from 'socket.io-client';

export enum ResponseType {
    error = "error",
    waiting = "waiting",
    joined = "joined",
    answer = "answer",
    offer = "offer",
    iceCandidate = "ice_candidates"
}
const socketUrl = "http://103.110.236.177:3002";//"http://192.168.1.134:3000";

var remoteMedia: MediaStream = new MediaStream();
// var roomId: string = "chat";
var peerConnection: RTCPeerConnection | null;

var isHost = false;
var storeIceCandidates: Array<RTCIceCandidate> = [];
var preSharedRoomId = "";
var socket: Socket<DefaultEventsMap, DefaultEventsMap>;
export default function WebRTCSocketImpl() {
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const [roomId, setRoomId] = useState<string>("");
    const [isHostAlive, setIsHostAlive] = useState<boolean | null>(null);
    const [localStream, setlocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
    const [iceCandidateState, setIceCandidateState] = useState<string>("none");
    const [iceCandidateGathering, setIceCandidateGathering] = useState<string>("none");

    const sessionConstraints = {
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
            VoiceActivityDetection: true
        }
    };

    useEffect(() => {
        print("initial useEffect", LogLevel.info);
        socket = io(socketUrl);
        socketUpdateListeners();
        init();
        startLocalStream();
        return () => {
            peerConnection = null;
        }
    }, []);

    const cleanup = () => {
        print("cleanup 🧹", LogLevel.warning);
        // Clean up the peer connection
        cleanUpStream();
        if (peerConnection) {
            print("peerConnection 🧹", LogLevel.info);
            peerConnection.close();
        }

        // Disconnect from the Socket.IO server
        if (socket) {
            socket.disconnect();
        }
        preSharedRoomId = "";
        isHost = false;
        setIsHostAlive(false);
    };

    const meetingCompleted = () => {
        socket.emit("meetingCompleted", roomId, (res: any) => {
            console.log(res);
        });
        // cleanup();
    }

    const getDebugInfo = () => {
        socket.emit("getDebugInfo", roomId, (res: any) => {
            console.log(res);
        });
    }

    const cleanUpStream = () => {
        // Clean up the local stream
        if (localStream) {
            console.log("Release camera . . .");
            localStream.getTracks().forEach((track: MediaStreamTrack) => {
                track.stop();
            });
            localStream.release();
        }

        // Clean up the remote stream
        if (remoteStream) {
            remoteStream.getTracks().forEach((track: MediaStreamTrack) => {
                track.stop();
            });
            remoteStream.release();
        }
    }

    useEffect(() => {
        if (roomId) {
            print(`ice_candidates => ${storeIceCandidates.length} [${roomId}]`, LogLevel.debug);
            for (var candidates in storeIceCandidates) {
                socket.emit('iceCandidates', preSharedRoomId, candidates, (res: any) => {
                    console.log(res);
                });
            }
            storeIceCandidates = [];
        }
    }, [roomId]);

    const init = () => {
        print("`````````````````init````````````````", LogLevel.info);
        remoteMedia = new MediaStream();
        // var roomId: string = "chat";
        peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
                {
                    urls: 'stun:stun1.l.google.com:19302',
                },
                {
                    urls: 'stun:stun2.l.google.com:19302',
                },
            ],
            iceCandidatePoolSize: 10,
        });
        peerListeners();
    }

    const setPreSharedRoomId = (sharedRoomId: string, offerType: ResponseType) => {
        print("setPreSharedRoomId", LogLevel.info);
        preSharedRoomId = sharedRoomId;
        setRoomId(sharedRoomId);

        if (offerType == ResponseType.offer) {
            isHost = true;
            setIsHostAlive(true);
            // createOffer(sharedRoomId);
            // socket.emit("join", sharedRoomId, ResponseType.offer, offerDescription, (res: any) => console.log(res));
        }
    }

    const muteLocalVideo = () => {
        // Muting video
        localStream?.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled; // Mute video
        });
    }

    const muteLocalAudio = () => {
        // Muting video
        localStream?.getAudioTracks().forEach((track) => {
            console.log(!track.enabled);
            track.enabled = !track.enabled; // Mute video
        });
    }

    const startLocalStream = () => {
        print("startLocalStream", LogLevel.info);
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
                    audio: true,
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
                    setlocalStream(stream);
                    stream.getTracks().forEach((track) => {
                        peerConnection?.addTrack(track, stream);
                    });
                })
                .catch((error) => {
                    console.log(error);
                    // Log error
                });
        });
    }

    const createOffer = async (room: string) => {
        try {
            if (peerConnection != null) {
                print("creating Offer", LogLevel.info);
                const offerDescription: RTCSessionDescription = await peerConnection.createOffer(sessionConstraints);
                await peerConnection.setLocalDescription(offerDescription);
                socket.emit("join", room, ResponseType.offer, offerDescription, (res: any) => console.log(res));
            }
        } catch (err) {
            print("err", LogLevel.error);
            // Handle Errors
        };
    }

    const peerListeners = async () => {
        if (peerConnection != null) {
            print("peerConnection", LogLevel.info);
            peerConnection.addEventListener('connectionstatechange', event => { print(event); });
            peerConnection.addEventListener('icecandidateerror', event => { print(event); });
            peerConnection.addEventListener('icecandidate', (event) => {
                print(`peerConnection => icecandidate ${isHost} [${preSharedRoomId}]`, LogLevel.info);
                if (event.candidate) {
                    if (preSharedRoomId) {
                        socket.emit('iceCandidates', preSharedRoomId, event.candidate, (res: any) => {
                            console.log(res);
                        });
                    } else {
                        console.log("No rooms");
                        storeIceCandidates.push(event.candidate);
                    }
                }
            });
            peerConnection.addEventListener('iceconnectionstatechange', (event) => {
                setIceCandidateState(peerConnection?.iceConnectionState ?? "null");
                console.log('\x1b[36m%s\x1b[0m', 'ICE Connection State:' + peerConnection?.iceConnectionState);
            });
            peerConnection.addEventListener('icegatheringstatechange', (event) => {
                console.log('\x1b[36m%s\x1b[0m', 'ICE Gathering State:', peerConnection?.iceGatheringState);
                setIceCandidateGathering(peerConnection?.iceGatheringState ?? "null");
            });
            peerConnection.addEventListener('negotiationneeded', (event) => {
                console.log('negotiationneeded');
                if (isHost && peerConnection) {
                    peerConnection.createOffer(sessionConstraints)
                        .then((offer) => {
                            peerConnection?.setLocalDescription(offer);
                            socket.emit("join", preSharedRoomId, ResponseType.offer, offer, (res: any) => console.log(res));
                        })
                        .catch((err) => {
                            // handle error
                            console.log(err);
                        });
                }
            });
            peerConnection.addEventListener('signalingstatechange', (event) => {
                console.log('signalingstatechange', 'color: blue; font-weight: bold;');
            });
            peerConnection.addEventListener('track', event => {
                console.log('\x1b[31m%s\x1b[0m', 'track:' + event.streams[0].getTracks().length);
                event.streams[0].getTracks().forEach((track) => {
                    remoteMedia.addTrack(track);
                    setRemoteStream(remoteMedia);
                });
            });
        }
    }

    const disposePeerListeners = () => {
        if (peerConnection != null) {
            peerConnection.removeEventListener('connectionstatechange');
            peerConnection.removeEventListener('icecandidateerror');
            peerConnection.removeEventListener('icecandidate');
            peerConnection.removeEventListener('iceconnectionstatechange');
            peerConnection.removeEventListener('icegatheringstatechange');
            peerConnection.removeEventListener('negotiationneeded');
            peerConnection.removeEventListener('signalingstatechange');
            peerConnection.removeEventListener('track');
        }
    }

    const createAnswer = async (payload: RTCSessionDescription, sharedRoomId: string) => {
        try {
            print("createAnswer", LogLevel.info);
            if (peerConnection != null) {
                console.log("********************************");
                console.log(`Setting remote description to ${isHost ? "host" : "client"}`);
                console.log("********************************");
                await peerConnection.setRemoteDescription(payload);
                setRandomNumber(Math.random() * 100);
                if (!isHost) {
                    let answerDescription = await peerConnection.createAnswer();
                    console.log("********Answer***************");
                    await peerConnection.setLocalDescription(answerDescription);
                    socket.emit("join", sharedRoomId, ResponseType.answer, new RTCSessionDescription(answerDescription), (res: any) => console.log(res));
                }
            }
        } catch (err) {
            print(err);
        }
    }

    const createNewRoom = async (userInfo: SocketUserInfo, callback: Function) => {
        try {
            preSharedRoomId = userInfo.roomId;
            socket.emit("create", userInfo.roomId, userInfo, (res: CreateRoomResponse) => {
                callback(res);
            });
            // socket.emit("createRoom", userInfo, (res: any) => {
            //     setRoomId(res['roomId']);
            // });
        } catch (err) {
            print("err");
            print(err, LogLevel.error);
            // Handle Errors
        };
    }

    const stopWaiting = async (userInfo: SocketUserInfo) => {
        try {
            socket.emit("stopWaiting", userInfo, (res: CreateRoomResponse) => {
                console.log(res);
            });
        } catch (err) {
            print("err");
            print(err);
            // Handle Errors
        };
    }

    const socketUpdateListeners = () => {
        print("socketUpdateListeners", LogLevel.info)
        socket.on("remoteOffer", (res: any) => {
            createAnswer(res.payload, res.roomId);
        });
        socket.on("hostJoined", (res: any) => {
            setIsHostAlive(true);
            console.log(res);
        });
        socket.on("addIceCandidates", (res: RTCIceCandidate) => {
            addingIceCandidate(res);
        });
        socket.on("message", (message: string) => {
            console.log(message);
        });
        socket.on("hostDisconnected", (res: { message: string }) => {
            ToastAndroid.show(res['message'] ?? "Host disconnected meetings", ToastAndroid.SHORT);
            cleanup();
        });

    }

    const addingIceCandidate = async (payload: RTCIceCandidate) => {
        if (peerConnection?.remoteDescription != null) {
            peerConnection.addIceCandidate(payload)
                .then(() => {
                })
                .catch((error) => {
                    console.log(error);
                    // console.error('Error adding ICE candidate:', error);
                });
        }
    };

    const disconnectAllClients = () => {
        socket.emit("disconnect_all", (res: any) => {
            console.log(res);
        });
    }

    return {
        // private:
        // socketUpdateListeners,
        // createOffer,
        // startLocalStream,
        // cleanUpStream,
        // cleanup,
        // stopWaiting,

        // public: methods
        init,
        createNewRoom,
        disconnectAllClients,
        meetingCompleted,
        setPreSharedRoomId,
        muteLocalVideo,
        muteLocalAudio,
        getDebugInfo,
        roomId,
        isHostAlive,
        isHost,
        remoteStream,
        localStream,
        iceCandidateState,
        iceCandidateGathering
    }
}

export enum LogLevel {
    default,
    error,
    warning,
    info,
    debug,
    success
}

export function print(obj: any, code: LogLevel = LogLevel.default) {
    var inject: string = "";
    switch (code) {
        case LogLevel.debug:
            inject += "\x1b[45m";
            break;
        case LogLevel.info:
            inject += "\x1b[46m\x1b[30m"
            break;
        case LogLevel.error:
            inject += "\x1b[31m"
            break;
        case LogLevel.warning:
            inject += "\x1b[43m\x1b[30m"
            break;
        case LogLevel.success:
            inject += "\x1b[42m"
            break;
    }
    console.log(inject + "%s\x1b[0m", obj);
}

export interface SocketUserInfo {
    appointmentId: string;
    roomId: string;
    doctorId: string;
    userId: number;
    userName: string;
}

export interface CreateRoomResponse {
    success: boolean;
    message: string;
    type: ResponseType
}