import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions, // Import Dimensions for potential future use
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window'); // Keep width for potential responsive calculations

const INTERESTS = [
  'Frontend Developer',
  'UI/UX Designer',
  'Backend Developer',
  'DevOps',
  'Business Analyst',
  'Data Analyst',
  'Cyber Security Engineer',
  'IoT Developer',
  'Application Tester',
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Designer',
  'IoT Developer',
  'Data Analyst',
  'UI/UX Designer',
  'DevOps',
  'Application Tester',
  'Business Analyst',
  'Cyber Security Engineer',
];

const RoadmapQuestion = () => {
  const [selected, setSelected] = useState([]);
  const navigation = useNavigation();

  const toggleSelect = item => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleSkip = () => {
    // TODO: Implement skip navigation logic
    console.log('Skip button pressed');
  };

  const handleSubmit = () => {
    // TODO: Implement submission logic (e.g., navigate, save selection)
    console.log('Submitted interests:', selected);
  };

  return (
    <LinearGradient colors={['#180037', '#260964']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <View style={styles.progressBarContainer}>
              {/* Progress bar will be handled externally based on screen progress */}
              <View style={styles.progressBarFill} />
            </View>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip ➤</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>
            Let's help you in finding direction
          </Text>
          <Text style={styles.title}>What are you most interested in?</Text>

          <ScrollView
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}>
            {INTERESTS.map((item, index) => (
              <TouchableOpacity
                key={index} // Using index as key is acceptable here as the list is static
                style={[
                  styles.option,
                  selected.includes(item) && styles.optionSelected,
                ]}
                onPress={() => toggleSelect(item)}
                activeOpacity={0.8}>
                <Text
                  style={[
                    styles.optionText,
                    selected.includes(item) && styles.optionTextSelected,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => navigation.navigate('OnBoardingThree')}
            activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24, // Matching horizontal padding from CareerGoalScreen
    paddingTop: 20, // Matching top padding
    paddingBottom: 20, // Matching bottom padding
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  progressBarContainer: {
    width: '100%', // Percentage width makes it responsive
    height: 4,
    backgroundColor: '#4E2D8E',
    borderRadius: 2,
    overflow: 'hidden', // Ensure the filled part stays within bounds
  },
  progressBarFill: {
    // This width will be controlled externally based on screen progress
    width: '45%', // Example: Shows 25% progress
    height: '100%',
    backgroundColor: '#9C7BFF',
    borderRadius: 2,
  },
  //   skipButtonText: {
  //     color: '#A29AC6',
  //     fontSize: 14,
  //     marginRight: 20,
  //   },
  subTitle: {
    textAlign: 'center',
    color: '#A29AC6',
    marginTop: 40,
    fontSize: 14,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10, // Use gap for spacing between items (more modern)
    paddingBottom: 100, // Increased padding to ensure space for the fixed button
  },
  option: {
    borderColor: '#7E5CC9',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    // Removed margin as gap is used in optionsContainer
  },
  optionSelected: {
    backgroundColor: '#7E5CC9',
    shadowColor: '#ffffff', // Increased shadow opacity and slightly adjusted color
    shadowOffset: {width: 0, height: 3}, // Adjusted shadow offset
    shadowOpacity: 0.5, // Slightly increased opacity
    shadowRadius: 8, // Increased radius for a softer shadow
    elevation: 8, // Increased elevation for Android shadow
    borderColor: 'transparent', // Remove border when selected
  },
  optionText: {
    color: 'white',
    fontSize: 14,
  },
  optionTextSelected: {
    fontWeight: 'bold', // Make text bold when selected
  },
  submitButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#A585FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RoadmapQuestion;
