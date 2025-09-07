import React, {
  useRef,
  useCallback,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Easing} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import DailyStreak from './DailyStreak';
import useUserStore from '../../src/store/useUserStore';
import StreakSkeleton from '../../components/Skeletons/StreakSkeleton';
import OngoingCoursesSkeleton from '../../components/Skeletons/OngoingCoursesSkeleton';
import FilterTabsSkeleton from '../../components/Skeletons/FilterTabsSkeleton';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

// Custom animation configuration to match popular apps like Swiggy/CULT
const customAnimationConfigs = {
  damping: 50, // Higher damping for smoother, less bouncy feel
  stiffness: 150, // Moderate stiffness for natural responsiveness
  duration: 600, // Optimal duration - not too fast, not too slow
  easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // iOS-like smooth curve
};

// Custom background component for the bottom sheet
const GradientBackground = () => (
  <LinearGradient
    colors={['#090215', '#300B73']}
    locations={[0, 1]}
    start={{x: 0, y: 0}}
    end={{x: 0, y: 1}}
    style={StyleSheet.absoluteFillObject}
  />
);

const HomeSlider = forwardRef(
  (
    {
      onSheetChange,
      courseFilter = [],
      courseType = [],
      weekStatus = [],
      currentDay = '',
      statusMap = {},
      activeCurrentView,
      onStreakPress,
      // New props for granular loading
      isStreakLoading = false,
      isOngoingCoursesLoading = false,
      ongoingCoursesData = null,
    },
    ref,
  ) => {
    const sheetRef = useRef(null);
    const {isDark, colors} = useContext(ThemeContext);
    const fstyles = getFontStyles(isDark, colors);

    const snapPoints = useMemo(() => {
      const screenHeight = SCREEN_HEIGHT;

      const closedHeightFromBottom = normalizeHeight(100);
      const closedPercentage = (
        (closedHeightFromBottom / screenHeight) *
        100
      ).toFixed(1);
      const headerHeight = normalizeHeight(80);
      const spacing = normalizeHeight(32 + 16);

      const totalTopContent = headerHeight + spacing;
      const remainingHeight = screenHeight - totalTopContent;
      const openPercentage = ((remainingHeight / screenHeight) * 100).toFixed(
        1,
      );

      return [`${closedPercentage}%`, `${openPercentage}%`];
    }, []);

    let safeSnapPoints = snapPoints;

    // Debug log for snap points
    console.log('Calculated snap points:', safeSnapPoints, {
      screenHeight: SCREEN_HEIGHT,
      closedHeight: normalizeHeight(100),
    });

    const [initialIndex, setInitialIndex] = React.useState(0);

    const userConfig = useUserStore(state => state.userConfig);

    const availableRoadmaps = useUserStore(
      state => state.userConfig.availableRoadmaps,
    );

    const [activeRoadmap, setActiveRoadmap] = React.useState(
      availableRoadmaps?.[0] ?? null,
    );

    console.log(availableRoadmaps, 'the available roadmaps');

    // Expose ref methods to parent components
    useImperativeHandle(ref, () => ({
      snapToIndex: index => sheetRef.current?.snapToIndex(index),
      close: () => sheetRef.current?.close(),
      expand: () => sheetRef.current?.expand(),
      collapse: () => sheetRef.current?.collapse(),
    }));

    const handleSheetChanges = useCallback(
      index => {
        if (onSheetChange) {
          onSheetChange(index);
        }

        // Vibrate only for valid indexes
        if (index >= 0 && index < safeSnapPoints.length) {
          Vibration.vibrate(10);
        }

        // Prevent dragging above max snap
        if (index > 1) {
          sheetRef.current?.snapToIndex(1);
          return setInitialIndex(1);
        }
        setInitialIndex(index);
      },
      [onSheetChange, safeSnapPoints.length],
    );

    const gradientColors = useMemo(() => ['#090215', '#300B73'], []);

    useEffect(() => {
      console.log(activeCurrentView, 'the active current view');
      if (activeCurrentView !== null) {
        sheetRef.current?.snapToIndex(0);
      } else if (activeCurrentView === null) {
        sheetRef.current?.snapToIndex(1);
      }
    }, [activeCurrentView]);

    // On mount, always snap to initialIndex
    React.useEffect(() => {
      if (sheetRef.current) {
        sheetRef.current.snapToIndex(initialIndex);
      }
    }, [initialIndex]);

    const handleOnClickRoadmap = roadmap => {
      setActiveRoadmap(roadmap);
    };
    const renderCourseCard = (
      item,
      index,
      isRealData = false,
      totalItems = 0,
    ) => {
      // Use real data if available, otherwise fallback to dummy data
      const courseData = isRealData
        ? {
            title: item.courseTitle,
            author: item.courseAuthor || 'By Anshika Gupta',
            thumbnail: item.courseThumbnailUrl,
            progress: item.progressPercent,
            currentChapter: item.currentChapter?.title,
            totalModules: item.totalModules,
            completedModules: item.completedModules,
            courseStatus: item.courseStatus,
            isInProgress: item.courseStatus === 'in-progress',
            isUpcoming: !item.courseStatus, // If no courseStatus, it's upcoming
          }
        : {
            title: 'Figma Basics',
            author: 'By Anshika Gupta',
            thumbnail: images.TESTONGOING,
            isInProgress: false,
            isUpcoming: true,
          };

      return (
        <View
          style={[
            styles.courseCard,
            {
              marginRight: index === totalItems - 1 ? 0 : normalizeWidth(20),
            },
          ]}>
          <LinearGradient
            colors={[
              'rgba(70, 49, 115, 0.3)',
              '#463173',
              '#463173',
              'rgba(70, 49, 115, 0.3)',
            ]}
            locations={[0, 0.49, 0.59, 1]}
            style={styles.courseCardInner}>
            <Image
              source={
                isRealData && courseData.thumbnail
                  ? {uri: courseData.thumbnail}
                  : courseData.thumbnail || images.TESTONGOING
              }
              style={styles.courseImage}
            />
            <View style={styles.courseTextContainer}>
              <Text style={fstyles.boldFourteen}>{courseData.title}</Text>
              <Text style={styles.courseAuthor}>{courseData.author}</Text>

              {/* Progress section for in-progress courses */}
              {courseData.isInProgress && courseData.progress !== undefined && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>
                    {courseData.completedModules}/{courseData.totalModules}{' '}
                    modules • {courseData.progress}%
                  </Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {width: `${courseData.progress}%`},
                      ]}
                    />
                  </View>
                </View>
              )}

              {/* Course tags */}
              <View style={styles.courseTypeContainer}>
                {courseType.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.courseTypeButton}>
                    <Text style={styles.courseTypeText}>{type.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Action button */}
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  courseData.isInProgress
                    ? styles.resumeButton
                    : styles.viewDetailsButton,
                ]}>
                <Text
                  style={[
                    styles.actionButtonText,
                    courseData.isInProgress
                      ? styles.resumeButtonText
                      : styles.viewDetailsButtonText,
                  ]}>
                  {courseData.isInProgress ? 'Resume Course' : 'View Details'}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
    };

    const renderHeader = () => (
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.4]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <>
          {isStreakLoading ? (
            <StreakSkeleton />
          ) : (
            <>
              {userConfig.showUserStreaks && (
                <DailyStreak
                  weekStatus={weekStatus}
                  currentDay={currentDay}
                  statusMap={statusMap}
                  onStreakPress={onStreakPress}
                />
              )}
            </>
          )}
        </>

        {/* Ongoing Courses Section */}

        <Text style={styles.sectionTitle}>
          {ongoingCoursesData?.roadmapName
            ? `${ongoingCoursesData.roadmapName} - Ongoing`
            : 'Ongoing Roadmap'}
        </Text>
        {isOngoingCoursesLoading ? (
          <OngoingCoursesSkeleton />
        ) : (
          <>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={
                [
                  ...(ongoingCoursesData?.currentOngoingCourses || []),
                  ...(ongoingCoursesData?.upcomingCourses || []),
                ].length > 0
                  ? [
                      ...(ongoingCoursesData?.currentOngoingCourses || []),
                      ...(ongoingCoursesData?.upcomingCourses || []),
                    ]
                  : courseFilter
              }
              keyExtractor={(item, index) =>
                ongoingCoursesData?.currentOngoingCourses ||
                ongoingCoursesData?.upcomingCourses
                  ? `course_${item.courseId || item.id}_${index}`
                  : `explore_${item.id}`
              }
              renderItem={({item, index}) => {
                const totalItems =
                  [
                    ...(ongoingCoursesData?.currentOngoingCourses || []),
                    ...(ongoingCoursesData?.upcomingCourses || []),
                  ].length > 0
                    ? [
                        ...(ongoingCoursesData?.currentOngoingCourses || []),
                        ...(ongoingCoursesData?.upcomingCourses || []),
                      ].length
                    : courseFilter.length;

                return renderCourseCard(
                  item,
                  index,
                  !!(
                    ongoingCoursesData?.currentOngoingCourses ||
                    ongoingCoursesData?.upcomingCourses
                  ),
                  totalItems,
                );
              }}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 8,
                marginBottom: 20,
              }}
            />
          </>
        )}
        <View style={{backgroundColor: '#090215'}}>
          <View style={styles.sectionTitleContainer}>
            <Text style={fstyles.heavyTwenty}>Explore Roadmaps</Text>
          </View>
          {isOngoingCoursesLoading ? (
            <FilterTabsSkeleton />
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={availableRoadmaps}
              keyExtractor={(item, index) => `explore_${index}`}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 8,
                marginTop: 10,
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeRoadmap?.roadmapId === item.roadmapId &&
                      styles.filledRoadmapButton,
                  ]}
                  onPress={() => handleOnClickRoadmap(item)}>
                  <Text
                    style={[
                      styles.roadmapButtonText,
                      activeRoadmap?.roadmapId === item.roadmapId &&
                        styles.filledRoadmapButtonText,
                    ]}>
                    {item.roadmapName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
          <Text style={styles.sectionTitle}>Starter Kit</Text>
          {isOngoingCoursesLoading ? (
            <OngoingCoursesSkeleton />
          ) : (
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={courseFilter}
                keyExtractor={item => `explore_${item.id}`}
                renderItem={({item, index}) =>
                  renderCourseCard(item, index, false, courseFilter.length)
                }
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 8,
                }}
              />
            </>
          )}
          <Text style={styles.sectionTitle}>Levels</Text>
          {isOngoingCoursesLoading ? (
            <OngoingCoursesSkeleton />
          ) : (
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={courseFilter}
                keyExtractor={item => `explore_${item.id}`}
                renderItem={({item, index}) =>
                  renderCourseCard(item, index, false, courseFilter.length)
                }
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 8,
                }}
              />
            </>
          )}
          <Text style={styles.sectionTitle}>Add Ons</Text>
          {isOngoingCoursesLoading ? (
            <OngoingCoursesSkeleton />
          ) : (
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={courseFilter}
                keyExtractor={item => `explore_${item.id}`}
                renderItem={({item, index}) =>
                  renderCourseCard(item, index, false, courseFilter.length)
                }
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 8,
                }}
              />
            </>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerTitle}>
              {userConfig.brandingTitle ?? 'Learn to UpSkill !!'}
            </Text>
            <Text style={[styles.footerDescription]}>
              {userConfig.brandingMessage ??
                'Made with Passion in Tirupati, India 🇮🇳'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );

    useEffect(() => {
      if (sheetRef?.current) {
        setTimeout(() => {
          setInitialIndex(1);
        }, 1000);
      }
    }, []);

    return (
      <BottomSheet
        ref={sheetRef}
        index={initialIndex}
        snapPoints={safeSnapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={initialIndex === 0}
        enableHandlePanningGesture={initialIndex === 0}
        enableOverDrag={false}
        animateOnMount={true}
        animationConfigs={customAnimationConfigs}
        onChange={handleSheetChanges}
        handleIndicatorStyle={
          initialIndex === 1
            ? {opacity: 0, height: 0}
            : {
                ...styles.handleIndicator,
                width: 76, // Increased width to 76px when at 14% snap point
              }
        }
        style={[
          styles.bottomSheetContainer,
          initialIndex === 0 && {
            borderTopWidth: 1,
            borderLeftWidth: 0.3,
            borderRightWidth: 0.3,
            borderColor: 'rgba(176, 149, 227, 0.3)',
          },
        ]}
        detached={false}
        backgroundComponent={GradientBackground}
        android_keyboardInputMode="adjustResize"
        keyboardBehavior="interactive">
        <BottomSheetFlatList
          data={[]}
          keyExtractor={() => ''}
          renderItem={null}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: SCREEN_HEIGHT * 0.85,
            paddingBottom: 90,
            paddingTop: -24,
          }}
        />
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: '#888',
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  sheetBackground: {
    backgroundColor: '#090215',
  },
  sectionTitle: {
    color: 'rgba(238, 231, 249, 0.60)',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 700,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  exploreChip: {
    backgroundColor: '#4c2a85',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipText: {
    color: '#fff',
  },
  verticalItem: {
    backgroundColor: '#2a0a66',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  verticalItemText: {
    color: '#fff',
  },
  courseCard: {
    width: normalizeWidth(208),
    height: normalizeHeight(250), // Increased height to accommodate button
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.4)',
    overflow: 'hidden',
  },
  courseCardInner: {
    flex: 1,
    paddingVertical: normalizeHeight(8),
    paddingHorizontal: normalizeWidth(8),
    borderRadius: 12,
    width: '100%',
  },
  courseImage: {
    height: normalizeHeight(78),
    width: normalizeWidth(192),
    resizeMode: 'contain',
  },
  courseTextContainer: {
    flex: 1,
    marginTop: normalizeHeight(12),
    marginHorizontal: normalizeWidth(4),
  },
  courseAuthor: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.60)',
  },
  progressContainer: {
    marginTop: normalizeHeight(8),
    marginBottom: normalizeHeight(4),
  },
  progressText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.80)',
    marginBottom: normalizeHeight(4),
  },
  progressBar: {
    height: normalizeHeight(4),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: normalizeHeight(2),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: normalizeHeight(2),
  },
  courseTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: normalizeHeight(8),
  },
  courseTypeButton: {
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.40)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(8),
    height: normalizeHeight(19),
    marginRight: normalizeWidth(5),
  },
  courseTypeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#D3C4EF',
  },
  actionButton: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(16),
    height: normalizeHeight(32),
    marginTop: normalizeHeight(8),
  },
  resumeButton: {
    backgroundColor: '#B095E3',
  },
  viewDetailsButton: {
    borderWidth: 1,
    borderColor: '#B095E3',
    backgroundColor: 'transparent',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Lato',
  },
  resumeButtonText: {
    color: '#090215',
  },
  viewDetailsButtonText: {
    color: '#B095E3',
  },
  sectionTitleContainer: {
    marginHorizontal: normalizeWidth(20),
    marginTop: normalizeHeight(20),
    marginBottom: normalizeHeight(10),
  },
  filterContainer: {
    marginHorizontal: normalizeWidth(20),
    marginTop: normalizeHeight(10),
    marginBottom: normalizeHeight(24),
  },
  filterButton: {
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.40)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(12),
    height: normalizeHeight(33),
    marginRight: normalizeWidth(5),
  },
  roadmapButtonText: {
    color: '#B095E3',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Lato',
  },
  footer: {
    marginLeft: normalizeWidth(20),
    marginBottom: normalizeHeight(120),
    marginTop: normalizeHeight(24),
    opacity: 0.6,
  },
  footerTitle: {
    fontSize: 64,
    fontWeight: '700',
    color: '#EEE7F9',
    letterSpacing: 1,
  },
  footerDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#EEE7F9',
    lineHeight: 19.2,
  },
  filledRoadmapButton: {
    backgroundColor: '#B095E3',
    borderColor: '#B095E3',
  },
  filledRoadmapButtonText: {
    color: '#090215',
  },
});

export default HomeSlider;
