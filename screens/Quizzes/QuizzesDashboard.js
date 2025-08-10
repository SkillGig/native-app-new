import React, { useContext, useMemo } from 'react'
import PageLayout from '../onboarding/PageLayout'
import Loader from '../../components/Loader'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import images from '../../assets/images'
import { normalizeHeight, normalizeWidth } from '../../components/Responsivescreen'
import { getFontStyles } from '../../styles/FontStyles'
import { ThemeContext } from '../../src/context/ThemeContext'
import LinearGradient from 'react-native-linear-gradient'

const QuizzesDashboard = (props) => {
  const { isDark, colors } = useContext(ThemeContext);
  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );
  const fstyles = getFontStyles(isDark, colors);
  const points = [
    'You must complete the quiz within the given time.',
    'Minimum 80% score required to pass.',
    'Do not switch apps or minimise, the quiz will auto submit.',
    'Closing the app will end the quiz immediately.',
  ];
  return (
    <View style={{ flex: 1 }}>
      <PageLayout hidePattern={true}
        hasBackButton={true} onBackButton={() => {
          props.navigation.navigate('OnboardingScreen')
        }}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-start', position: "absolute", top: -20, left: 0, flexDirection: "row", alignItems: "center" }}
          activeOpacity={0.7}>
          <Image
            source={images.BACKICON}
            style={{ height: normalizeHeight(20), width: normalizeWidth(20), resizeMode: "contain" }}
          />
          <Text style={[fstyles.boldSixteen, { marginLeft: normalizeWidth(8) }]}>Quiz</Text>
        </TouchableOpacity>
        <Text style={[fstyles.mediumTen, { color: 'rgba(255, 255, 255, 0.60)' }]}>UI/UX Fundamentals</Text>
        <View style={{ marginTop: normalizeHeight(2) }}>
          <Text style={fstyles.semiFourteen}>Test your Knowledge on UI/UX Fundamentals</Text>
        </View>
        <View style={styles.container}>
          <LinearGradient
            colors={['rgba(129, 95, 196, 0.30)', 'rgba(129, 95, 196, 0.00)']}
            start={{ x: 0.5, y: -0.408 }}  // corresponds to -40.8%
            end={{ x: 0.5, y: 0.7931 }}    // corresponds to 79.31%
            style={styles.gradientBackground}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Image source={images.TIMER} style={{ height: normalizeHeight(24), width: normalizeWidth(24), resizeMode: "contain" }} />
                <Text style={[fstyles.heavyTwenty, { color: "#D3C4EF", marginTop: normalizeHeight(8) }]}>30 Minutes</Text>
                <Text style={[fstyles.mediumTen, { color: '#EEE7F9', lineHeight: normalizeHeight(15) }]}>Total duration of the quiz</Text>
              </View>
              <View style={{ width: 1, height: '80%', backgroundColor: '#D3C4EF', marginHorizontal: normalizeWidth(16), opacity: 0.2 }} />
              <View>
                <Image source={images.MESSAGEICON} style={{ height: normalizeHeight(24), width: normalizeWidth(24), resizeMode: "contain" }} />
                <Text style={[fstyles.heavyTwenty, { color: "#D3C4EF", marginTop: normalizeHeight(8) }]}>10 Questions</Text>
                <Text style={[fstyles.mediumTen, { color: '#EEE7F9', lineHeight: normalizeHeight(15) }]}>10 XP points for correct answer</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ alignItems: "center", marginTop: normalizeHeight(16) }}>
          <Image source={images.QUIZZES} style={{ height: normalizeHeight(180), width: normalizeWidth(180), resizeMode: "contain" }} />
        </View>
        <Text style={fstyles.heavyTwenty}>Rules:</Text>

        {points.map((point, index) => (
          <View style={{ marginVertical: normalizeHeight(12), flexDirection: "row", alignItems: "center" }}>
            <Text
              key={index}
              style={[fstyles.heavyTwentyFour, { color: '#EEE7F9', }]}
            >
              {`${index + 1}.`}
            </Text>
            <Text style={[fstyles.semiFourteen, { color: '#EEE7F9', marginLeft: normalizeWidth(16), lineHeight: normalizeHeight(18) }]}>{point}</Text>
          </View>
        ))}
        <TouchableOpacity 
        onPress={()=>{
          props.navigation.navigate('QuizQuestions')
        }}
        style={{ alignItems: "center", position: "absolute", bottom: 40, left: 0, right: 0 }}>
          <View style={{
            backgroundColor: "#815FC4",
            height: normalizeHeight(42), width: normalizeWidth(120),
            justifyContent: "center", alignItems: "center", borderRadius: 12
          }}>
            <Text style={fstyles.boldFourteen}>Take Test</Text>
          </View>
        </TouchableOpacity>
      </PageLayout>
    </View>
  )
}

export default QuizzesDashboard
const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    overflow: 'hidden', // ensure borderRadius is respected
    marginTop: normalizeHeight(20)
  },
  gradientBackground: {
    borderRadius: 8,
    paddingVertical: normalizeHeight(16), // optional
    paddingHorizontal: normalizeWidth(16)
    // width / height as needed
  },
})