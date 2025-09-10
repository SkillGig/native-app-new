import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  heightFromScreenPercent,
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {ThemeContext} from '../../src/context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import MilestonesSkeleton from '../../components/Skeletons/MilestonesSkeleton';
import MilestoneCard from '../../components/MilestoneCard';
import LeaderboardList from '../../components/LeaderboardList';
import MilestoneAnalytics from '../../components/MilestoneAnalytics';
import PageWrapper from '../../components/PageWrapper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CourseCard} from '../../components';
import useUserStore from '../../src/store/useUserStore';
import OngoingCoursesSkeleton from '../../components/Skeletons/OngoingCoursesSkeleton';
import {getMilestoneDetails} from '../../src/api/userOnboardingAPIs';
const Milestones = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [milestonesData, setMilestonesData] = useState(null);
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  const gradientColors = useMemo(
    () => ['rgba(48, 11, 115, 0.50)', 'rgba(48, 11, 115, 0.00)'],
    [],
  );

  const fetchMilestones = async () => {
    setIsLoading(true);
    try {
      const response = await getMilestoneDetails();
      console.log(response, 'milestones response');
      setMilestonesData(response.data);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const width = useMemo(() => Dimensions.get('window').width, []);
  const AUTO_SCROLL_INTERVAL = 4000;

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScrollEnd = e => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const headerHeightAnim = useRef(
    new Animated.Value(heightFromScreenPercent(100)),
  ).current;

  const calculatedMarginTop = Math.max(0, normalizeHeight(32) - insets.top);

  const organizationName = useUserStore(
    state => state.userConfig.organizationName,
  );

  return (
    <View style={{flex: 1}}>
      <PageWrapper
        gradientColors={['#391976', '#150237']}
        gradientLocations={[0, 1]}
        gradientStart={{x: 0, y: 0}}
        gradientEnd={{x: 1, y: 1}}>
        <Animated.View
          style={{
            marginTop: calculatedMarginTop,
            height: headerHeightAnim,
          }}>
          <LinearGradient
            colors={['#391976', '#150237']}
            locations={[0, 0.4]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View
              style={[styles.headerWrapper, {marginTop: normalizeHeight(10)}]}>
              <Text style={fstyles.heavyTwenty}>Milestones</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <LinearGradient
                colors={gradientColors}
                locations={[0, 0.2]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.scrollContainer}>
                <Text style={[fstyles.heavyTwenty, styles.roadmapTitle]}>
                  Roadmap for career path
                </Text>

                {isLoading ? (
                  <MilestonesSkeleton />
                ) : (
                  <>
                    <FlatList
                      ref={flatListRef}
                      data={milestonesData?.currentRoadmapDetails || []}
                      keyExtractor={item => item.id}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <MilestoneCard
                          roadmapDetails={item}
                          roleTitle={item?.roadmapName}
                          courseName={item?.currentCourseTitle}
                          modules={item?.totalModules}
                          style={{
                            marginRight: index === 2 ? normalizeWidth(16) : 0,
                            width:
                              milestonesData?.currentRoadmapDetails?.length ===
                              1
                                ? width - 32
                                : width - 64,
                          }}
                        />
                      )}
                      onMomentumScrollEnd={onScrollEnd}
                    />
                  </>
                )}
              </LinearGradient>

              <LinearGradient
                colors={['#1A0244', '#000000']}
                locations={[0, 0.2]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{paddingBottom: normalizeHeight(200)}}>
                <View style={styles.confusedImageWrapper}>
                  <Image source={images.TROPHY} style={styles.trophyImage} />
                  <View style={styles.leaderboardTitleWrapper}>
                    <Text style={[fstyles.heavyTwenty, {color: '#B095E3'}]}>
                      Leaderboard
                    </Text>
                    <Text style={[fstyles.boldTwelwe, {color: '#D3C4EF'}]}>
                      {organizationName}
                    </Text>
                  </View>
                  <View style={styles.leaderboardDivider} />
                </View>

                <LeaderboardList
                  data={milestonesData?.leaderboard || []}
                  fontStyles={fstyles}
                  loading={isLoading}
                />

                <MilestoneAnalytics
                  data={milestonesData?.analytics || {}}
                  fontStyles={fstyles}
                  onViewAnalytics={() => {}}
                  loading={isLoading}
                />

                <View style={styles.completedCoursesHeader}>
                  <Text
                    style={[
                      fstyles.boldSixteen,
                      {color: 'rgba(238, 231, 249, 0.60)'},
                    ]}>
                    Completed Courses
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: normalizeHeight(24),
                    paddingBottom: 8,
                    marginTop: normalizeHeight(16),
                  }}>
                  {isLoading ? (
                    <OngoingCoursesSkeleton />
                  ) : (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      data={
                        milestonesData?.userCompletedCourseCertificates || []
                      }
                      horizontal
                      keyExtractor={(item, index) => `_${index}`}
                      renderItem={({item, index}) => {
                        return <CourseCard courseDetails={item} key={index} />;
                      }}
                      contentContainerStyle={{
                        paddingHorizontal: 16,
                      }}
                    />
                  )}
                </View>
              </LinearGradient>
            </ScrollView>
          </LinearGradient>
        </Animated.View>
      </PageWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  rootGradient: {flex: 1, marginBottom: normalizeHeight(100)},
  headerWrapper: {
    marginLeft: normalizeWidth(24),
    marginBottom: normalizeHeight(29),
  },
  scrollContainer: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: normalizeHeight(24),
    backgroundColor: 'black',
    paddingBottom: normalizeHeight(60),
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
    top: 80,
    left: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  trophyImage: {
    width: normalizeWidth(290),
    marginTop: normalizeHeight(-40),
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
    overflow: 'hidden',
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
    marginTop: normalizeHeight(-48),
    alignItems: 'center',
  },
  leaderboardDivider: {
    height: normalizeHeight(1),
    width: normalizeWidth(300),
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    marginTop: normalizeHeight(12),
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
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: {width: 0, height: 4},
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //   },
    //   android: {elevation: 6},
    // }),
    marginHorizontal: normalizeWidth(18),
    borderRadius: 24,
  },
  baseBackground: {
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
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
    marginTop: normalizeHeight(42),
    paddingHorizontal: normalizeWidth(20),
  },
});
export default Milestones;
