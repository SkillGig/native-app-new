package com.skillgig;

import android.util.Log;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        Log.d("FCM", "New token: " + token);
        // Store token in SharedPreferences
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        prefs.edit().putString("fcm_token", token).apply();
        // Optionally: send token to JS via a native module (not shown here)
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d("FCM", "Message received: " + remoteMessage.getData());
        // Forward the message to JS (React Native) so notificationHandler.js can handle it
        // By default, React Native Firebase will deliver notification/data messages to JS if you do NOT handle them natively here.
        // So, do NOT show a notification here. Just log and let JS handle it.
        // If you want to force delivery to JS, do NOT call any notification code here.
    }
}
