import React, {useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import CultFitBottomSheet from '../Global/HomeSlider';

const HomeScreen = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useRef(['12%', '88%']).current;

  const handleProfilePress = () => {
    bottomSheetRef.current?.snapTo(0); // 25% → reveal profile
  };

  const handleNotificationsPress = () => {
    bottomSheetRef.current?.snapTo(0); // 25% → reveal notifications
  };

  const handleTimerPress = () => {
    bottomSheetRef.current?.snapTo(0); // 25% → reveal timer
  };

  const horizontalData = [
    'Design',
    'Coding',
    'Fullstack',
    'UI/UX',
    'AI',
    'ML',
    'Backend',
  ];

  return (
    <View style={styles.container}>
      {/* Background View (Profile / Notifications / Timer) */}
      <View style={styles.backgroundView}>
        <Text style={styles.backgroundText}>
          Profile / Notifications / Timer View
        </Text>
      </View>

      {/* CultFit BottomSheet */}
      <CultFitBottomSheet
        ref={bottomSheetRef}
        initialIndex={2} // Full open
        snapPoints={snapPoints}>
        {/* Ongoing Courses */}
        <Text style={styles.sectionTitle}>Ongoing Courses</Text>
        <View style={styles.courseCard}>
          <Text style={styles.cardText}>Adobe XD Unlocked</Text>
        </View>
        <View style={styles.courseCard}>
          <Text style={styles.cardText}>Figma Basics</Text>
        </View>

        {/* Explore Courses → Horizontal Scroll */}
        <Text style={styles.sectionTitle}>Explore Courses</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={true}>
          {horizontalData.map((item, index) => (
            <View key={index} style={styles.exploreChip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Simulate Large Vertical Scroll */}
        <Text style={styles.sectionTitle}>Recommended Courses</Text>
        {Array.from({length: 10}).map((_, index) => (
          <View key={index} style={styles.courseCard}>
            <Text style={styles.cardText}>Recommended Course {index + 1}</Text>
          </View>
        ))}
      </CultFitBottomSheet>

      {/* Dummy buttons to test slide */}
      <View style={styles.buttonContainer}>
        <Button title="Profile" onPress={handleProfilePress} />
        <Button title="Notifications" onPress={handleNotificationsPress} />
        <Button title="Timer" onPress={handleTimerPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#090215'},
  backgroundView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#090215',
  },
  backgroundText: {color: '#fff', fontSize: 24},
  sectionTitle: {color: '#fff', fontSize: 18, fontWeight: 'bold', margin: 16},
  courseCard: {
    backgroundColor: '#2a0a66',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  cardText: {color: '#fff'},
  exploreChip: {
    backgroundColor: '#4c2a85',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  chipText: {color: '#fff'},
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
