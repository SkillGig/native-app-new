import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

/**
 * Component to test and display available fonts
 * Use this to verify that Lato fonts are properly loaded
 */
const FontTester = () => {
  const [fontTest, setFontTest] = useState([]);

  useEffect(() => {
    // Test different Lato font families
    const latoFonts = [
      'Lato-Thin',
      'Lato-Light',
      'Lato-Regular',
      'Lato-Medium',
      'Lato-SemiBold',
      'Lato-Bold',
      'Lato-ExtraBold',
      'Lato-Black',
    ];

    setFontTest(latoFonts);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lato Font Test</Text>

      {fontTest.map((fontFamily, index) => (
        <View key={index} style={styles.fontRow}>
          <Text style={styles.fontLabel}>{fontFamily}:</Text>
          <Text style={[styles.fontSample, {fontFamily}]}>
            The quick brown fox jumps over the lazy dog 123
          </Text>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Default:</Text>
        <Text style={styles.fontSample}>
          The quick brown fox jumps over the lazy dog 123
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0743',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B095E3',
    marginBottom: 5,
  },
  fontRow: {
    marginBottom: 15,
  },
  fontLabel: {
    fontSize: 14,
    color: '#B095E3',
    marginBottom: 2,
  },
  fontSample: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
});

export default FontTester;
