import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AutoScrollCarousel = ({steps}) => {
  const [openIndices, setOpenIndices] = useState([]); // ✅ Allow multiple open
  const {colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(false, colors);
  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndices(
      prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index) // Collapse
          : [...prev, index], // Expand
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {steps.map((item, index) => {
        const isOpen = openIndices.includes(index); // ✅ Multiple open check

        return (
          <View key={index} style={styles.row}>
            <View style={styles.progressContainer}>
              {index !== 0 && <View style={styles.lineTop} />}
              <View
                style={[
                  styles.circle,
                  item.completed && styles.completedCircle,
                ]}>
                {item.completed && (
                  <Image
                    source={images.RIGHTCIRCLE}
                    style={{
                      height: normalizeHeight(24),
                      width: normalizeWidth(24),
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </View>
              {index !== steps.length - 1 && <View style={styles.lineBottom} />}
            </View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#300B73', '#090215']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={{...StyleSheet.absoluteFillObject, borderRadius: 12}}
              />
              <View style={fstyles.flexAlignJustify}>
                <Text style={fstyles.semiTwelwe}>{item.title}</Text>
                <Image
                  source={images.HEADERBACKICON}
                  style={{
                    height: normalizeHeight(20),
                    width: normalizeWidth(20),
                    resizeMode: 'contain',
                    transform: [{rotate: isOpen ? '90deg' : '-90deg'}],
                  }}
                />
              </View>
              <Text
                style={[
                  fstyles.twelweRegular,
                  {marginVertical: normalizeHeight(4)},
                ]}>
                {item.description}
              </Text>
              {!isOpen && (
                <View
                  style={[fstyles.flexAlign, {marginTop: normalizeHeight(10)}]}>
                  <Image
                    source={images.COURSEVIDEO}
                    style={{
                      height: normalizeHeight(12),
                      width: normalizeWidth(12),
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      fstyles.mediumTen,
                      {color: '#B095E3', marginLeft: normalizeWidth(4)},
                    ]}>
                    2 Courses{' '}
                  </Text>
                  <Text
                    style={[
                      fstyles.mediumTen,
                      {marginHorizontal: normalizeWidth(4)},
                    ]}>
                    |
                  </Text>
                  <Image
                    source={images.COURSEVIDEO}
                    style={{
                      height: normalizeHeight(12),
                      width: normalizeWidth(12),
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      fstyles.mediumTen,
                      {color: '#B095E3', marginLeft: normalizeWidth(4)},
                    ]}>
                    2 Courses{' '}
                  </Text>
                </View>
              )}
              {isOpen && (
                <>
                  <View
                    style={[fstyles.line, {marginVertical: normalizeHeight(8)}]}
                  />

                  <>
                    <View style={fstyles.flexAlignJustify}>
                      <View>
                        <Text style={fstyles.semiTwelwe}>Course Name A</Text>
                        <Text
                          style={[
                            fstyles.mediumTen,
                            {color: '#D3C4EF', marginTop: normalizeHeight(4)},
                          ]}>
                          HTML | CSS | Javascript
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#815FC44D',
                          paddingVertical: normalizeHeight(4),
                          paddingHorizontal: normalizeWidth(6),
                          borderRadius: 4,
                        }}>
                        <Text
                          style={[
                            fstyles.mediumTen,
                            {textDecorationLine: 'underline'},
                          ]}>
                          View Course
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginTop: normalizeHeight(4),
                        marginBottom: normalizeHeight(6),
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={images.CLOCK}
                        style={{
                          height: normalizeHeight(12),
                          width: normalizeWidth(12),
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={[
                          fstyles.mediumTen,
                          {color: '#B095E3', marginLeft: normalizeWidth(7)},
                        ]}>
                        58 mins
                      </Text>
                    </View>
                  </>

                  <>
                    <View style={fstyles.flexAlignJustify}>
                      <View>
                        <Text style={fstyles.semiTwelwe}>Course Name B</Text>
                        <Text
                          style={[
                            fstyles.mediumTen,
                            {color: '#D3C4EF', marginTop: normalizeHeight(4)},
                          ]}>
                          HTML | CSS | Javascript
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#815FC44D',
                          paddingVertical: normalizeHeight(4),
                          paddingHorizontal: normalizeWidth(6),
                          borderRadius: 4,
                        }}>
                        <Text
                          style={[
                            fstyles.mediumTen,
                            {textDecorationLine: 'underline'},
                          ]}>
                          View Course
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginTop: normalizeHeight(4),
                        marginBottom: normalizeHeight(6),
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={images.CLOCK}
                        style={{
                          height: normalizeHeight(12),
                          width: normalizeWidth(12),
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={[
                          fstyles.mediumTen,
                          {color: '#B095E3', marginLeft: normalizeWidth(7)},
                        ]}>
                        58 mins
                      </Text>
                    </View>
                  </>
                </>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default AutoScrollCarousel;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  progressContainer: {
    alignItems: 'center',
    width: 40,
    minHeight: 40,
  },
  lineTop: {
    height: 10,
    borderLeftWidth: 1,
    borderColor: '#B095E3',
  },
  lineBottom: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: 'white',
    width: 1,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    // borderColor: 'white',
    borderColor: 'rgba(255,255,255, 0.3)',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  completedCircle: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  card: {
    flex: 1,
    // backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginTop: 8,
    color: '#555',
    fontSize: 14,
  },
});
