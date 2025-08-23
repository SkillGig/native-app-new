import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FinalRoadmapSelection = ({
  navigation,
  roadmapName,
  centerIcon,
  onAccept,
  onReject,
  enrolling = false,
}) => {
  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    } else {
      // Fallback: Navigate to main dashboard
      navigation.reset({index: 0, routes: [{name: 'MainDash'}]});
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
    } else {
      // Fallback: Navigate back to career selection
      navigation.goBack();
    }
  };

  return (
    <LinearGradient colors={['#180037', '#260964']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Based on your preferences &{'\n'}
              interests We've found a perfect{'\n'}
              Career Path for you!!
            </Text>
          </View>

          {/* Career Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.monitorContainer}>
              <View style={styles.monitor}>
                <View style={styles.screen}>
                  <Text style={styles.codeSymbol}>{'</>'}</Text>
                </View>
              </View>
              <View style={styles.monitorBase} />
              <View style={styles.monitorStand} />
            </View>
          </View>

          {/* Career Info */}
          <View style={styles.careerInfo}>
            <Text style={styles.careerTitle}>{roadmapName}</Text>
            <Text style={styles.careerSubtitle}>
              Would be a great career for you
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              enrolling && styles.disabledPrimaryButton,
            ]}
            onPress={handleAccept}
            disabled={enrolling}
            activeOpacity={enrolling ? 1 : 0.8}>
            {enrolling ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>Yes, Let's Go</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleReject}
            disabled={enrolling}
            activeOpacity={enrolling ? 1 : 0.8}>
            <Text
              style={[
                styles.secondaryButtonText,
                enrolling && styles.disabledSecondaryButtonText,
              ]}>
              No, I'd like to change
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginBottom: 60,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 26,
  },
  illustrationContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  monitorContainer: {
    alignItems: 'center',
  },
  monitor: {
    width: 120,
    height: 80,
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#FF8C42',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 8,
  },
  screen: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeSymbol: {
    color: '#00FF88',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  monitorBase: {
    width: 60,
    height: 12,
    backgroundColor: '#FF8C42',
    borderRadius: 6,
    marginTop: -6,
  },
  monitorStand: {
    width: 40,
    height: 20,
    backgroundColor: '#FF8C42',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -6,
  },
  careerInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  careerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  careerSubtitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.8,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#8B5FBF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#8B5FBF',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledPrimaryButton: {
    backgroundColor: '#5A4B7D',
    opacity: 0.6,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.8,
  },
  disabledSecondaryButtonText: {
    opacity: 0.4,
  },
});

export default FinalRoadmapSelection;
