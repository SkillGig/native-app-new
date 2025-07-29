import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import PageLayout from '../onboarding/PageLayout'

const QuizSummary = () => {
      const circles = [
    { size: 194, color: '#42227D' },       // purple
    { size: 301, color: '#271251' },       // light purple
    { size: 391, color: '#2E165A' },
    { size: 481, color: '#26095A' },
  ];
  return (
     <PageLayout
        hidePattern={true}
      >
  <View style={styles.container}>
      {circles.map((circle, index) => (
        <View
          key={index}
          style={[
            styles.circle,
            {
              width: circle.size,
              height: circle.size,
              backgroundColor: circle.color,
              borderColor: '#5013C0',
              top: -(circle.size / 2) + 100, // adjust top offset to center
              left: (Dimensions.get('window').width - circle.size) / 2,
              zIndex: -index, // make deeper circles go behind
            },
          ]}
        />
      ))}
    </View>
     </PageLayout>
  )
}

export default QuizSummary
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
  },
});