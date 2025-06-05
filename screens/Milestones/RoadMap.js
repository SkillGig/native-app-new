import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {ThemeContext} from '../../src/context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import {fstyles} from '../../styles/FontStyles';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
const RoadMap = () => {
  const {isDark} = useContext(ThemeContext);
  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );

  const width = useMemo(() => Dimensions.get('window').width, []);
  const AUTO_SCROLL_INTERVAL = 4000;

  const data = [
    {id: '1', title: 'Card 1', color: '#FF6B6B'},
    {id: '2', title: 'Card 2', color: '#6BCB77'},
    {id: '3', title: 'Card 3', color: '#4D96FF'},
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const progressAnims = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animateIndicator(currentIndex);

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const animateIndicator = index => {
    progressAnims.forEach((anim, i) => {
      anim.stopAnimation();
      anim.setValue(i < index ? 1 : 0); // completed ones filled, reset others
    });

    Animated.timing(progressAnims[index], {
      toValue: 1,
      duration: AUTO_SCROLL_INTERVAL,
      useNativeDriver: false,
    }).start();
  };

  const onScrollEnd = e => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const leaderboardRanks = [
    {
      id: 1,
      name: 'asdfvb',
    },
    {
      id: 1,
      name: 'asdfvb',
    },
    {
      id: 1,
      name: 'asdfvb',
    },
  ];
  return (
    <LinearGradient
      colors={gradientColors}
      locations={[0, 0.7]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{backgroundColor: '#300B73', flex: 1}}>
      <View
        style={{
          marginTop: normalizeHeight(40),
          marginLeft: normalizeWidth(24),
          marginBottom: normalizeHeight(29),
        }}>
        <Text style={fstyles.heavyTwenty}>Milestones</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <LinearGradient */}
        {/* colors={['#1A0244', '#1A0244']}
          // start={{x: 0.5, y: -0.0706}} // equivalent to -7.06%
          // end={{x: 0.5, y: 0.3676}} // equivalent to 36.76%
          style={{
            flex: 1,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingTop: normalizeHeight(24),
            backgroundColor:"#1A0244"
          }}> */}

        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingTop: normalizeHeight(24),
            backgroundColor: 'black',
          }}>
          <Text
            style={[
              fstyles.heavyTwenty,
              {letterSpacing: 0.5, marginLeft: normalizeWidth(20)},
            ]}>
            Roadmap for career path
          </Text>

          <>
            <FlatList
              ref={flatListRef}
              data={data}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                console.log(item.length, 'lengthh', index, 'indexsxx');
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 12,
                      borderColor: 'rgba(229, 220, 246, 0.40)',
                      marginTop: normalizeHeight(23),
                      paddingTop: normalizeHeight(24),
                      height: normalizeHeight(331),
                      width: normalizeWidth(318),
                      marginLeft: normalizeWidth(16),
                      marginRight: index === 2 ? normalizeWidth(16) : 0,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: normalizeWidth(16),
                      }}>
                      <Text style={fstyles.boldSixteen}>
                        Frontend Developer
                      </Text>
                      <Image
                        source={images.EXPORT}
                        style={{
                          height: normalizeHeight(24),
                          width: normalizeWidth(24),
                          resizeMode: 'contain',
                        }}
                      />
                    </View>

                    <ImageBackground
                      source={images.ROADMAPLINES}
                      style={{
                        height: normalizeHeight(184),
                        width: '100%',

                        // marginTop:normalizeHeight(8)
                      }}>
                      <Image
                        source={images.ROADMAPLEFTBOX}
                        style={{
                          height: normalizeHeight(48),
                          width: normalizeWidth(62),
                          resizeMode: 'contain',
                          position: 'absolute',
                          top: -10,
                          left: 10,
                        }}
                      />

                      <Image
                        source={images.ROADMAPCENTERBOX}
                        style={{
                          height: normalizeHeight(116),
                          width: normalizeWidth(226),
                          resizeMode: 'contain',
                          position: 'absolute',
                          top: 30,
                          left: 40,
                        }}
                      />
                    </ImageBackground>
                  </View>
                );
              }}
              onMomentumScrollEnd={onScrollEnd}
            />

            <View style={styles.indicatorContainer}>
              {progressAnims.map((anim, i) => (
                <View key={i} style={styles.indicatorBackground}>
                  <Animated.View
                    style={[
                      styles.indicatorFill,
                      {
                        width: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
          </>

          <View
            style={{alignItems: 'center', marginBottom: normalizeHeight(30)}}>
            <Image
              source={images.CONFUSED}
              style={{
                resizeMode: 'contain',
                height: normalizeHeight(146),
                width: normalizeWidth(334),
              }}
            />
          </View>
        </View>
        {/* </LinearGradient> */}
        <View style={{alignItems: 'center', marginTop: normalizeHeight(30)}}>
          <Image
            source={images.FEMALEAVATAR}
            style={{
              height: normalizeHeight(72),
              width: normalizeWidth(72),
              resizeMode: 'contain',
            }}
          />
          <View style={{marginTop: normalizeHeight(8), alignItems: 'center'}}>
            <Text style={[fstyles.heavyTwenty, {color: '#B095E3'}]}>
              Leaderboard
            </Text>
            <Text style={[fstyles.boldTwelwe, {color: '#D3C4EF'}]}>
              Indian Institute of Technology
            </Text>
          </View>
          <View
            style={{
              height: normalizeHeight(1),
              width: normalizeWidth(300),
              backgroundColor: 'rgba(129, 95, 196, 0.30)',
              marginTop: normalizeHeight(12),
              marginBottom: normalizeHeight(24),
            }}
          />
        </View>

        {leaderboardRanks.map(() => {
          return (
            <View
              style={{
                marginLeft: normalizeWidth(20),
                marginRight: normalizeWidth(16),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: normalizeHeight(12),
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(242, 223, 161, 0.50)',
                  borderRadius: 50,
                  height: normalizeHeight(68),
                  justifyContent: 'center',
                  width: normalizeWidth(285),
                  zIndex: 1, // Important: on top of text
                }}>
                <LinearGradient
                  colors={['rgba(129, 95, 196, 0.6)', '#090215']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{
                    height: normalizeHeight(60),
                    justifyContent: 'center',
                    borderRadius: 73,
                    // paddingLeft: normalizeWidth(8),
                    paddingRight: normalizeWidth(20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={images.FEMALEAVATARYELLOW}
                        style={{
                          height: normalizeHeight(68),
                          width: normalizeWidth(68),
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={[
                          fstyles.heavyTwenty,
                          {marginLeft: normalizeWidth(14)},
                        ]}>
                        Tanvi
                      </Text>
                    </View>
                    <Text style={fstyles.boldSixteen}>
                      1503<Text style={fstyles.mediumTen}> XP</Text>
                    </Text>
                  </View>
                </LinearGradient>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 0,
                  justifyContent: 'center',
                  overflow: 'hidden',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 64,
                    fontWeight: '900',
                    color: 'rgba(242, 223, 161, 0.50)',
                    textAlign: 'right',
                    paddingRight: normalizeWidth(4),
                  }}>
                  #1
                </Text>
              </View>
            </View>
          );
        })}

        <View style={{}}>
          <Text style={fstyles.semiFourteen}>View Leaderboard</Text>
          <Image
            source={images.BACKICON}
            style={{
              height: normalizeHeight(16),
              width: normalizeWidth(16),
              resizeMode: 'contain',
              transform: [{ scaleX: -1 }], 
            }}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {},
  card: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  indicatorBackground: {
    height: 4,
    width: 40,
    backgroundColor: '#300B73',
    borderRadius: 4,
    overflow: 'hidden',
  },
  indicatorFill: {
    height: 4,
    backgroundColor: '#B095E3',
    borderRadius: 4,
  },
});
export default RoadMap;
