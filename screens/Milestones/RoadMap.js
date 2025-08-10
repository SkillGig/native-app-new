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
  TouchableOpacity,
} from 'react-native';

import {ThemeContext} from '../../src/context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import {getFontStyles} from '../../styles/FontStyles';
import { normalizeHeight,normalizeWidth } from '../../components/Responsivescreen';
import images from '../../assets/images';
const RoadMap = () => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

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
      id: 3,
      name: 'asdfvb',
    },
    {
      id: 9,
      name: 'asdfvb',
    },
  ];

  const courseFilter = [
    {
      id: '1',
      title: 'All',
    },
    {
      id: '12',
      title: 'Design',
    },
    {
      id: '7',
      title: 'Coding',
    },
    {
      id: '5',
      title: 'Animation',
    },
    {
      id: '3',
      title: 'All',
    },
    {
      id: '22',
      title: 'Design',
    },
    {
      id: '75',
      title: 'Coding',
    },
    {
      id: '18',
      title: 'Animation',
    },
  ];
  const courseType = [
    {
      id: '1',
      title: 'All',
    },
    {
      id: '12',
      title: 'Design',
    },
    {
      id: '7',
      title: 'Animation',
    },
  ];
  return (
    <LinearGradient
      colors={gradientColors}
      locations={[0, 0.7]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{backgroundColor: '#300B73', flex: 1}}>
      <View style={styles.headerWrapper}>
        <Text style={fstyles.heavyTwenty}>Milestones</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContainer}>
          <Text style={[fstyles.heavyTwenty, styles.roadmapTitle]}>
            Roadmap for career path
          </Text>

          <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.cardContainer,
                  {marginRight: index === 2 ? normalizeWidth(16) : 0},
                ]}>
                <View style={styles.cardHeader}>
                  <Text style={fstyles.boldSixteen}>Frontend Developer</Text>
                  <Image source={images.EXPORT} style={styles.icon24} />
                </View>

                <ImageBackground
                  source={images.ROADMAPLINES}
                  style={styles.roadmapBackground}>
                  <Image
                    source={images.ROADMAPLEFTBOX}
                    style={styles.roadmapLeftBox}
                  />
                  <Image
                    source={images.ROADMAPCENTERBOX}
                    style={styles.roadmapCenterBox}
                  />
                </ImageBackground>
              </View>
            )}
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

          <View style={styles.confusedImageWrapper}>
            <Image source={images.CONFUSED} style={styles.confusedImage} />
          </View>
        </View>

        <View style={styles.confusedImageWrapper}>
          <Image source={images.FEMALEAVATAR} style={styles.avatar} />
          <View style={styles.leaderboardTitleWrapper}>
            <Text style={[fstyles.heavyTwenty, {color: '#B095E3'}]}>
              Leaderboard
            </Text>
            <Text style={[fstyles.boldTwelwe, {color: '#D3C4EF'}]}>
              Indian Institute of Technology
            </Text>
          </View>
          <View style={styles.leaderboardDivider} />
        </View>

        {leaderboardRanks.map((_, index) => (
          <View key={index} style={styles.leaderboardCardWrapper}>
            <View style={styles.leaderboardCard}>
              <LinearGradient
                colors={['rgba(129, 95, 196, 0.6)', '#090215']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.leaderboardCardGradient}>
                <View style={fstyles.flexAlignJustify}>
                  <View style={styles.avatarNameWrapper}>
                    <Image
                      source={images.FEMALEAVATARYELLOW}
                      style={styles.avatar}
                    />
                    <Text style={[fstyles.heavyTwenty, styles.nameText]}>
                      Tanvi
                    </Text>
                  </View>
                  <Text style={fstyles.boldSixteen}>
                    1503<Text style={fstyles.mediumTen}> XP</Text>
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.rankOverlay}>
              <Text style={styles.rankText}>#1</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.viewLeaderboardBtn}>
          <Text style={styles.viewLeaderboardText}>View Leaderboard</Text>
          <Image source={images.BACKICON} style={styles.viewLeaderboardIcon} />
        </TouchableOpacity>

        <View style={styles.shadowWrapper}>
          <View style={styles.baseBackground}>
            <LinearGradient
              colors={['rgba(48, 11, 115, 0.50)', 'rgba(9, 2, 21, 0.50)']}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.gradientLayer}>
              <Text style={[fstyles.heavyTwenty, styles.analyticsTitle]}>
                Analytics
              </Text>
              <View style={styles.analyticsDivider} />

              <LinearGradient
                colors={[
                  'rgba(129, 95, 196, 0.26)',
                  'rgba(129, 95, 196, 0.26)',
                ]}
                style={styles.cardOne}>
                <View style={styles.innerOverlay}>
                  <Text style={styles.metricValue}>10</Text>
                  <Text style={fstyles.semiFourteen}>Problems Solved</Text>
                </View>
              </LinearGradient>

              <View style={styles.analyticsStatsRow}>
                <View style={styles.analyticsBox}>
                  <Text style={styles.metricValue}>5</Text>
                  <Text style={fstyles.semiFourteen}>Hours Spent</Text>
                </View>
                <View style={styles.analyticsBox}>
                  <Text style={styles.metricValue}>5</Text>
                  <Text style={fstyles.semiFourteen}>Quiz Completed</Text>
                </View>
              </View>

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.viewAnalyticsBtn}>
                  <Text style={styles.viewAnalyticsText}>View Analytics</Text>
                  <Image
                    source={images.BACKICON}
                    style={styles.viewLeaderboardIcon}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.completedCoursesHeader}>
          <Text
            style={[fstyles.boldSixteen, {color: 'rgba(238, 231, 249, 0.60)'}]}>
            Completed Courses
          </Text>
        </View>
        <View
              style={{
                marginBottom: normalizeHeight(24),
                // marginLeft: normalizeWidth(20),
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={courseFilter}
                horizontal
                keyExtractor={(item, index) => `_${index}`}
                renderItem={({item, index}) => {
                  console.log(item, 'item.lengthhhh');
                  return (
                    <View
                      style={{
                        width: normalizeWidth(208),
                        marginTop: normalizeHeight(16),
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: 'rgba(176, 149, 227, 0.4)',
                        overflow: 'hidden',
                        marginLeft: item.length - 1 ? 0 : normalizeWidth(20),
                      }}>
                      <LinearGradient
                        colors={[
                          'rgba(70, 49, 115, 0.3)',
                          '#463173',
                          '#463173',
                          'rgba(70, 49, 115, 0.3)',
                        ]}
                        locations={[0, 0.49, 0.59, 1]}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        style={{
                          paddingVertical: normalizeHeight(8),
                          paddingHorizontal: normalizeWidth(8),
                          borderRadius: 12,
                          width: '100%',
                        }}>
                        <View>
                          <Image
                            source={images.TESTONGOING}
                            style={{
                              height: normalizeHeight(78),
                              width: normalizeWidth(192),
                              resizeMode: 'contain',
                            }}
                          />
                          <View
                            style={{
                              marginTop: normalizeHeight(12),
                              marginHorizontal: normalizeWidth(4),
                            }}>
                            <Text style={fstyles.boldFourteen}>
                              Figma Basics
                            </Text>
                            <Text
                              style={[
                                fstyles.twelweRegular,
                                {
                                  fontStyle: 'italic',
                                  color: 'rgba(255, 255, 255, 0.60)',
                                },
                              ]}>
                              By Anshika Gupta
                            </Text>
                            <View style={{marginTop: normalizeHeight(8)}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flexWrap: 'nowrap',
                                }}>
                                {courseType.map((item, index) => (
                                  <TouchableOpacity
                                    key={`_${index}`}
                                    style={{
                                      borderWidth: 1,
                                      borderColor: 'rgba(176, 149, 227, 0.40)',
                                      borderRadius: 20,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      paddingHorizontal: normalizeWidth(8),
                                      height: normalizeHeight(19),
                                      marginRight: normalizeWidth(5),
                                    }}
                                    onPress={() => {
                                      console.log(item.title, 'titleeee');
                                    }}>
                                    <Text
                                      style={[
                                        fstyles.mediumTen,
                                        {color: '#D3C4EF'},
                                      ]}>
                                      {item.title}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              marginLeft: normalizeWidth(4),
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: normalizeHeight(20),
                            }}>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={images.COURSEREADING}
                                  style={{
                                    height: normalizeHeight(12),
                                    width: normalizeWidth(12),
                                    resizeMode: 'contain',
                                  }}
                                />
                                <Text
                                  style={[
                                    fstyles.mediumTen,
                                    {marginLeft: normalizeWidth(2)},
                                  ]}>
                                  4.2 Rating
                                </Text>
                              </View>
                              <Text
                                style={[
                                  fstyles.mediumTen,
                                  {color: 'rgba(238, 231, 249, 0.60)'},
                                ]}>
                                4.9k Enrolled
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={{
                                height: normalizeHeight(33),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 12,
                                width: normalizeWidth(90),
                                backgroundColor: '#815FC4',
                              }}>
                              <Text style={fstyles.semiTwelwe}>
                                View Details
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  );
                }}
              />
            </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  rootGradient: {flex: 1},
  headerWrapper: {
    marginTop: normalizeHeight(40),
    marginLeft: normalizeWidth(24),
    marginBottom: normalizeHeight(29),
  },
  scrollContainer: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: normalizeHeight(24),
    backgroundColor: 'black',
  },
  roadmapTitle: {letterSpacing: 0.5, marginLeft: normalizeWidth(20)},
  cardContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'rgba(229, 220, 246, 0.40)',
    marginTop: normalizeHeight(23),
    paddingTop: normalizeHeight(24),
    height: normalizeHeight(331),
    width: normalizeWidth(318),
    marginLeft: normalizeWidth(16),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(16),
  },
  icon24: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  roadmapBackground: {height: normalizeHeight(184), width: '100%'},
  roadmapLeftBox: {
    height: normalizeHeight(48),
    width: normalizeWidth(62),
    resizeMode: 'contain',
    position: 'absolute',
    top: -10,
    left: 10,
  },
  roadmapCenterBox: {
    height: normalizeHeight(116),
    width: normalizeWidth(226),
    resizeMode: 'contain',
    position: 'absolute',
    top: 30,
    left: 40,
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
  indicatorFill: {height: 4, backgroundColor: '#B095E3', borderRadius: 4},
  confusedImageWrapper: {
    alignItems: 'center',
    marginBottom: normalizeHeight(30),
  },
  confusedImage: {
    resizeMode: 'contain',
    height: normalizeHeight(146),
    width: normalizeWidth(334),
  },
  leaderboardHeader: {alignItems: 'center', marginTop: normalizeHeight(30)},
  avatar: {
    height: normalizeHeight(72),
    width: normalizeWidth(72),
    resizeMode: 'contain',
  },
  leaderboardTitleWrapper: {
    marginTop: normalizeHeight(8),
    alignItems: 'center',
  },
  leaderboardDivider: {
    height: normalizeHeight(1),
    width: normalizeWidth(300),
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(24),
  },
  leaderboardCardWrapper: {
    marginLeft: normalizeWidth(20),
    marginRight: normalizeWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: normalizeHeight(12),
  },
  leaderboardCard: {
    borderWidth: 1,
    borderColor: 'rgba(242, 223, 161, 0.50)',
    borderRadius: 50,
    height: normalizeHeight(68),
    justifyContent: 'center',
    width: normalizeWidth(285),
    zIndex: 1,
  },
  leaderboardCardGradient: {
    height: normalizeHeight(60),
    justifyContent: 'center',
    borderRadius: 73,
    paddingRight: normalizeWidth(20),
  },
  leaderboardCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarNameWrapper: {flexDirection: 'row', alignItems: 'center'},
  nameText: {marginLeft: normalizeWidth(14)},
  rankOverlay: {
    position: 'absolute',
    right: 0,
    zIndex: 0,
    justifyContent: 'center',
    width: '100%',
  },
  rankText: {
    fontSize: 64,
    fontWeight: '900',
    color: 'rgba(242, 223, 161, 0.50)',
    textAlign: 'right',
    paddingRight: normalizeWidth(4),
  },
  viewLeaderboardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(8),
    width: normalizeWidth(171),
    justifyContent: 'center',
    marginHorizontal: normalizeWidth(106),
    backgroundColor: '#815FC4',
    borderRadius: 12,
    marginTop: normalizeHeight(26),
    marginBottom: normalizeHeight(48),
  },
  viewLeaderboardText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginRight: normalizeWidth(8),
  },
  viewLeaderboardIcon: {
    height: normalizeHeight(16),
    width: normalizeWidth(16),
    resizeMode: 'contain',
    transform: [{scaleX: -1}],
  },
  shadowWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {elevation: 6},
    }),
    marginHorizontal: normalizeWidth(18),
    borderRadius: 12,
  },
  baseBackground: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientLayer: {padding: 16},
  analyticsTitle: {color: '#B095E3', textAlign: 'center'},
  analyticsDivider: {
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    height: normalizeHeight(1),
    width: '100%',
    marginVertical: normalizeHeight(12),
  },
  cardOne: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5013C0',
    overflow: 'hidden',
  },
  innerOverlay: {
    backgroundColor: 'rgba(10, 10, 10, 0.30)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricValue: {
    color: '#E5DCF6',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: normalizeHeight(12),
  },
  analyticsStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeHeight(16),
    justifyContent: 'space-between',
  },
  analyticsBox: {
    flex: 1,
    borderColor: '#5013C0',
    borderWidth: 1,
    backgroundColor: 'rgba(129, 95, 196, 0.26)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: normalizeWidth(16),
  },
  viewAnalyticsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalizeHeight(8),
    justifyContent: 'center',
    backgroundColor: '#815FC4',
    borderRadius: 12,
    marginTop: normalizeHeight(26),
    marginBottom: normalizeHeight(23),
    paddingHorizontal: normalizeWidth(12),
  },
  viewAnalyticsText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginRight: normalizeWidth(8),
  },
  completedCoursesHeader: {
    marginTop: normalizeHeight(57),
    paddingHorizontal: normalizeWidth(20),
  },
});
export default RoadMap;
