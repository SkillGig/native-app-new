import React, {useContext, useMemo} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PageLayout from '../onboarding/PageLayout';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import LinearGradient from 'react-native-linear-gradient';
import {CircularProgress} from '../Global/DesignComponents';
import images from '../../assets/images';

const QuizSummary = props => {
  const {colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(false, colors);
  const gradientColors = useMemo(() => ['#300B73', '#090215'], []);
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('OngoingCourses');
          console.log('ertyuio');
        }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 26,
          zIndex: 999,
          elevation: 10,
        }}>
        <Image
          source={images.CLOSEICON}
          style={{
            height: normalizeHeight(24),
            width: normalizeWidth(24),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
          top: -80,
        }}>
        <Image
          source={images.QUIZTROPHY}
          style={{height: normalizeHeight(580), width: normalizeWidth(580)}}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: normalizeHeight(310)}}>
        <Text style={fstyles.heavyTwentyFour}>Quiz Summary</Text>
        <View style={{width: normalizeWidth(242)}}>
          <Text
            style={[
              fstyles.semiTwelwe,
              {
                color: 'rgba(255, 255, 255, 0.60)',
                marginTop: normalizeHeight(4),
                textAlign: 'center',
              },
            ]}>
            You got all 10 questions correct of the 10 questions you attempted
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.11)',
            marginTop: normalizeHeight(52),
            alignItems: 'center',
            paddingTop: normalizeHeight(12),
            borderRadius: 20,
          }}>
          <Text
            style={[
              fstyles.heavyTwentyFour,
              {marginBottom: normalizeHeight(12)},
            ]}>
            Well Done!
          </Text>
          <LinearGradient
            colors={['rgba(129, 95, 196, 0)', 'rgba(129, 95, 196, 0.2)']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.containerTwo}>
            <View style={styles.innerBox}>
              <View style={fstyles.flexAlignJustify}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CircularProgress
                    textStyle={{
                      fontSize: 10,
                      fontWeight: '500',
                      color: '#EEE7F9',
                    }}
                    strokeWidth={8}
                    size={60}
                    value={50}
                    maxProgress={100}
                  />
                  <View style={{marginLeft: normalizeWidth(16)}}>
                    <Text
                      style={[
                        fstyles.mediumTen,
                        {color: 'rgba(238, 231, 249, 0.60)'},
                      ]}>
                      Your Score
                    </Text>

                    <Text style={fstyles.extraBoldFourteen}>40%</Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.10)',
                    borderRadius: 8,
                    paddingHorizontal: normalizeWidth(24),
                    paddingVertical: normalizeHeight(8),
                  }}>
                  <Text
                    style={[
                      fstyles.mediumTen,
                      {color: 'rgba(238, 231, 249, 0.60)'},
                    ]}>
                    Total XP
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: normalizeHeight(8),
                    }}>
                    <Image
                      source={images.RATINGSTAR}
                      style={{
                        width: normalizeWidth(16),
                        height: normalizeHeight(16),
                        resizeMode: 'contain',
                        marginRight: normalizeWidth(4),
                      }}
                    />
                    <Text style={fstyles.extraBoldFourteen}>20</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: normalizeHeight(1),
                  backgroundColor: 'rgba(238, 231, 249, 0.60)',
                  marginTop: normalizeHeight(12),
                  marginBottom: normalizeHeight(16),
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <LinearGradient
                  colors={[
                    'rgba(16, 104, 79, 0.30)',
                    'rgba(16, 104, 79, 0.10)',
                  ]}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.containerThree}>
                  <View style={styles.innerBoxTwo}>
                    <Text
                      style={[
                        fstyles.semiTwelwe,
                        {
                          color: '#93D8B4',
                          textAlign: 'center',
                          marginBottom: normalizeHeight(4),
                        },
                      ]}>
                      Correct
                    </Text>
                    <LinearGradient
                      colors={['#090215', '#300B73']}
                      start={{x: 0.1, y: 0.1}} // approximate 112° direction
                      end={{x: 1, y: 1}}
                      style={styles.containerFour}>
                      <View
                        style={{
                          borderRadius: 8,
                          backgroundColor: 'transparent',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={images.TICKGREENCIRCLE}
                          style={{
                            height: normalizeHeight(16),
                            width: normalizeWidth(16),
                            marginRight: normalizeWidth(8),
                          }}
                        />
                        <Text style={fstyles.boldSixteen}>13</Text>
                      </View>
                    </LinearGradient>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={[
                    'rgba(122, 13, 18, 0.30)',
                    'rgba(122, 13, 18, 0.10)',
                  ]}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.containerThree}>
                  <View style={styles.innerBoxTwo}>
                    <Text
                      style={[
                        fstyles.semiTwelwe,
                        {
                          color: '#FFA59C',
                          textAlign: 'center',
                          marginBottom: normalizeHeight(4),
                        },
                      ]}>
                      Incorrect
                    </Text>
                    <LinearGradient
                      colors={['#090215', '#300B73']}
                      start={{x: 0.1, y: 0.1}} // approximate 112° direction
                      end={{x: 1, y: 1}}
                      style={[styles.containerFour, {borderColor: '#CB3A3A'}]}>
                      <View
                        style={{
                          borderRadius: 8,
                          backgroundColor: 'transparent',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={images.WRONGCIRCLE}
                          style={{
                            height: normalizeHeight(16),
                            width: normalizeWidth(16),
                            marginRight: normalizeWidth(8),
                          }}
                        />
                        <Text style={fstyles.boldSixteen}>13</Text>
                      </View>
                    </LinearGradient>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default QuizSummary;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
  },
  containerTwo: {
    borderRadius: 16,
    backgroundColor: '#0F0323',
    borderWidth: 1,
    borderColor: 'rgba(129, 95, 196, 0.3)',
    width: '100%',
  },
  innerBox: {
    paddingHorizontal: normalizeWidth(24),
    paddingVertical: normalizeHeight(24),
    borderRadius: 16,
    width: '100%',
    backgroundColor: '#0F0323',
    shadowColor: '#FFF193',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15.1,
    elevation: 4,
  },
  containerThree: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    marginRight: normalizeWidth(16),
  },
  innerBoxTwo: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    paddingHorizontal: normalizeWidth(4),
    paddingVertical: normalizeHeight(6),
  },
  containerFour: {
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: 'rgba(0, 158, 76, 0)',
    borderWidth: 1,
    borderColor: '#93D8B4',
    // width: normalizeWidth(124),
    height: normalizeHeight(48),
    paddingHorizontal: normalizeWidth(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBoxThree: {
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});
