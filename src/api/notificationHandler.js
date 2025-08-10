// Handles FCM events for foreground, background, and killed states
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

// Foreground: Show local notification using Notifee
export function registerForegroundNotificationHandler() {
  messaging().onMessage(async remoteMessage => {
    console.log('Received in foreground:', remoteMessage);
    if (remoteMessage.notification && remoteMessage.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title || 'Notification',
        body: remoteMessage.notification.body || 'You have a new message.',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher', // Ensure you have this icon in your res/mipmap
        },
      });
    }
  });
}

// Background/killed: Set background handler
export function registerBackgroundNotificationHandler() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Received in background:', remoteMessage);
    // Only show with Notifee if there is NO notification payload (i.e., data-only message)
    if (!remoteMessage.notification && remoteMessage.sentTime) {
      await notifee.displayNotification({
        title: remoteMessage.data?.title || 'Notification',
        body: remoteMessage.data?.body || 'You have a new message.',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
        },
      });
    }
    // If there is a notification payload, Android will show it automatically in background/killed
  });
}

// Create notification channel on app start (Android requirement)
export async function createAndroidNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}

// Notification tap (background)
export function registerNotificationOpenedHandler(onOpen) {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (onOpen) {
      onOpen(remoteMessage);
    }
  });
}

// Notification tap (killed)
export function checkInitialNotification(onOpen) {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage && onOpen) {
        onOpen(remoteMessage);
      }
    });
}
