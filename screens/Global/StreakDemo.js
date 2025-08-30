import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import StreakComponent from './StreakComponent';
import images from '../../assets/images';
import {
  normalizeWidth,
  normalizeHeight,
} from '../../components/Responsivescreen';

const StreakDemo = ({userConfig}) => {
  const [streakModalVisible, setStreakModalVisible] = useState(false);

  // Status map for streak icons (same as used in MainDash)
  const statusMap = {
    completed: {
      icon: images.STREAKICON,
      color: '#4CAF50',
    },
    'yet-to-do': {
      icon: images.YETTOSTARTSTREAK,
      color: '#2196F3',
    },
    'not-done': {
      icon: images.STREAKFAILED,
      color: '#F44336',
    },
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.demoButton}
        onPress={() => setStreakModalVisible(true)}>
        <Text style={styles.buttonText}>Open Streak Details</Text>
      </TouchableOpacity>

      <StreakComponent
        visible={streakModalVisible}
        onClose={() => setStreakModalVisible(false)}
        statusMap={statusMap}
        userConfig={userConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: normalizeWidth(20),
  },
  demoButton: {
    backgroundColor: '#7B68EE',
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(24),
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StreakDemo;
