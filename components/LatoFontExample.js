import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LatoStyles, createLatoStyle} from '../src/utils/fontUtils';

/**
 * Example component showing how to use Lato fonts
 */
const LatoFontExample = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, LatoStyles.bold]}>Lato Font Examples</Text>

      <Text style={[styles.text, LatoStyles.thin]}>
        This is Lato Thin (100)
      </Text>

      <Text style={[styles.text, LatoStyles.light]}>
        This is Lato Light (300)
      </Text>

      <Text style={[styles.text, LatoStyles.regular]}>
        This is Lato Regular (400)
      </Text>

      <Text style={[styles.text, LatoStyles.medium]}>
        This is Lato Medium (500)
      </Text>

      <Text style={[styles.text, LatoStyles.semiBold]}>
        This is Lato SemiBold (600)
      </Text>

      <Text style={[styles.text, LatoStyles.bold]}>
        This is Lato Bold (700)
      </Text>

      <Text style={[styles.text, LatoStyles.extraBold]}>
        This is Lato ExtraBold (800)
      </Text>

      <Text style={[styles.text, LatoStyles.black]}>
        This is Lato Black (900)
      </Text>

      <Text style={[styles.text, LatoStyles.italic]}>
        This is Lato Regular Italic
      </Text>

      <Text style={[styles.text, LatoStyles.boldItalic]}>
        This is Lato Bold Italic
      </Text>

      {/* Example using createLatoStyle function */}
      <Text
        style={[
          styles.text,
          createLatoStyle({
            fontWeight: '600',
            fontSize: 18,
            color: '#815FC4',
          }),
        ]}>
        Custom Lato style with SemiBold 18px
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C0743',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default LatoFontExample;
