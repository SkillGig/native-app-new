import React, { useContext, useMemo } from 'react'
import PageLayout from '../onboarding/PageLayout'
import Loader from '../../components/Loader'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import images from '../../assets/images'
import { normalizeHeight, normalizeWidth } from '../../components/Responsivescreen'
import { getFontStyles } from '../../styles/FontStyles'
import { ThemeContext } from '../../src/context/ThemeContext'
import LinearGradient from 'react-native-linear-gradient'

const QuizQuestions = (props) => {
     const { isDark, colors } = useContext(ThemeContext);
      const gradientColors = useMemo(
        () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
        [isDark],
      );
      const fstyles = getFontStyles(isDark, colors);
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
          <Text style={[fstyles.boldSixteen, { marginLeft: normalizeWidth(8) }]}>UI/UX Design Course</Text>
        </TouchableOpacity>

         <Text style={[fstyles.mediumTen, { color: 'rgba(255, 255, 255, 0.60)' }]}>UI/UX Fundamentals</Text>
         <Text style={[fstyles.boldSixteen,{marginTop:normalizeHeight(4)}]}>Question 2/10</Text>
           </PageLayout>

           </View>
  )
}

export default QuizQuestions