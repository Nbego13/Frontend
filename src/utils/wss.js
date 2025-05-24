import io from 'socket.io-client'
import store from '../store/store';
import { setRoomId, setParticipants, setSocketId } from '../store/actions';
import * as webRTCHandler from './webRTCHandler';
import { appendNewMessageToChatHistory } from './directMessages';

const SERVER = 'https://backend-1qa8.onrender.com';

let socket = null;

export const connectWithSocketIOServer = () => {
    socket = io(SERVER, {
        path: "/socket",
        reconnection: true,
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
        console.log("successfully connected with socket io server");
        console.log(socket.id);
        store.dispatch(setSocketId(socket.id));
    });

    socket.on('room-id', (data) => {
        const {roomId} = data;
        store.dispatch(setRoomId(roomId));
    });

    socket.on('room-update', (data) => {
        const { connectedUsers } = data;
        store.dispatch(setParticipants(connectedUsers));
    });

    socket.on('conn-prepare', (data) => {
        const {connUserSocketId} = data;

        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

        // inform the user which just joined the room that we have prepared for incoming connection
        socket.emit('conn-init', {connUserSocketId: connUserSocketId});
    });

    socket.on('conn-signal', (data) => {
        webRTCHandler.handleSignalingData(data);
    });

    socket.on('conn-init', (data) => {
        const { connUserSocketId} = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on('user-disconnected', (data) => {
        webRTCHandler.removePeerConnection(data);
    });

    socket.on('direct-message', (data) => {
        appendNewMessageToChatHistory(data);
    });
};

export const createNewRoom = (identity, onlyAudio) => {
    //emit to server that we create new room
    const data = {
        identity,
        onlyAudio
    };

    socket.emit('create-new-room', data);
}

export const joinRoom = (identity, roomId, onlyAudio)  => {
    //emit an event to server to join a room
    const data = {
        roomId,
        identity,
        onlyAudio
    };

    socket.emit('join-room', data);
};

export const signalPeerData = (data) => {
    socket.emit('conn-signal', data);
};


export const sendDirectMessage = (data) => {
    socket.emit('direct-message', data);
};


