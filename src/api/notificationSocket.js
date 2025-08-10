import {io} from 'socket.io-client';
import useUserStore from '../../src/store/useUserStore';
import useSnackbarStore from '../../src/store/useSnackbarStore';
import backendKeys from '../../src/config/backendKeys';

let socket = null;

export function connectNotificationSocket() {
  console.log('Connecting to notification socket...');
  const userConfig = useUserStore.getState().userConfig;
  const userId = userConfig?.userId;
  if (!userId) {
    return;
  }
  if (socket && socket.connected) {
    return;
  }

  socket = io(backendKeys.webSocketService, {
    transports: ['websocket'],
    path: '/socket.io',
    autoConnect: true,
    forceNew: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
    socket.emit('join-room', `user-${userId}`);
    console.log('Connected to notification socket for user:', userId);
  });

  socket.on('new-notification', data => {
    console.log('New notification received:', data);
    if (data && data.title) {
      useSnackbarStore
        .getState()
        .showSnackbar({message: data.title, type: 'success'});
    }
    console.log('Received notification:', data);
  });
}

export function disconnectNotificationSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
