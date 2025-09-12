import React, {useContext, useMemo, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import LinearGradient from 'react-native-linear-gradient';
import PageWrapper from '../../components/PageWrapper';
import CourseHeader from './CourseHeader';
import CourseOverview from './CourseOverviewAndModule';
import CourseSlides from './CourseSlides';
import VideoSectionSkeleton from '../../components/Skeletons/VideoSectionSkeleton';

const CourseScreening = ({navigation, route}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );
  const {courseDetails} = route.params;
  console.log('courseDetails', courseDetails);
  const fstyles = getFontStyles(isDark, colors);

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // Add state for tab management
  const [selectedTab, setSelectedTab] = useState('Overview');

  // ScrollView ref and section positions
  const scrollViewRef = useRef(null);
  const sectionPositions = useRef({});
  const courseSlidesHeight = useRef(0);
  const courseHeaderHeight = useRef(0);
  const isInitialRender = useRef(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Scroll to section when tab changes (skip on initial render)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (selectedTab && scrollViewRef.current) {
      console.log('selectedTab', selectedTab);
      setTimeout(() => {
        let yPosition = 0;
        const stickyOffset = 60;

        if (selectedTab === 'Overview') {
          if (sectionPositions.current.Overview !== undefined) {
            yPosition = Math.max(
              0,
              sectionPositions.current.Overview - stickyOffset,
            );
          } else {
            yPosition = courseHeaderHeight.current || 0;
          }
        } else if (sectionPositions.current[selectedTab] !== undefined) {
          yPosition = Math.max(
            0,
            sectionPositions.current[selectedTab] - stickyOffset,
          );
        } else {
          return;
        }

        scrollViewRef.current?.scrollTo({
          y: yPosition,
          animated: true,
        });
      }, 100);
    }
  }, [selectedTab]);

  // Show skeleton while loading
  if (isLoading) {
    return <VideoSectionSkeleton />;
  }

  return (
    <PageWrapper
      gradientColors={['#1C0743', 'rgba(28, 7, 67, 0.00)']}
      gradientLocations={[0, 0.1]}
      gradientEnd={{x: 1, y: 1}}
      gradientStart={{x: 0, y: 0}}>
      <View style={{flex: 1, position: 'relative'}}>
        <LinearGradient
          colors={gradientColors}
          locations={[0, 0.7]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerContent}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Image source={images.HEADERBACKICON} style={styles.backIcon} />
            <Text style={[fstyles.boldSixteen, styles.headerText]}>
              UI/UX Design Course
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backgroundImageContainer}
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}>
          <ImageBackground
            source={images.COURSEBACKGROUND}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
        </TouchableOpacity>{' '}
        {/* Container for content with sticky tabs */}
        <View style={styles.contentContainer}>
          <LinearGradient
            colors={['#1C0743', '#090215']}
            locations={[0, 0.4]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientContainer}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[1]}>
              {/* Course Header */}
              <View
                onLayout={event => {
                  const {height} = event.nativeEvent.layout;
                  courseHeaderHeight.current = height;
                }}>
                <CourseHeader fstyles={fstyles} />
              </View>

              {/* Sticky Course Slides */}
              <View
                style={styles.stickyTabsContainer}
                onLayout={event => {
                  const {height} = event.nativeEvent.layout;
                  courseSlidesHeight.current = height;
                }}>
                <CourseSlides
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </View>

              {/* Scrollable Content */}
              <CourseOverview
                fstyles={fstyles}
                selectedTab={selectedTab}
                sectionPositions={sectionPositions}
                courseHeaderHeight={courseHeaderHeight}
              />
            </ScrollView>
          </LinearGradient>
        </View>
        {/* <RoadmapCourseButton
          title="Enroll Now"
          onPress={() => {
            navigation.navigate('OngoingCourses');
          }}
        /> */}
      </View>
    </PageWrapper>
  );
};

export default CourseScreening;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: normalizeWidth(20),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    top: 20,
  },
  backIcon: {
    height: normalizeHeight(20),
    width: normalizeWidth(20),
    resizeMode: 'contain',
  },
  headerText: {
    marginLeft: normalizeWidth(8),
    lineHeight: 20,
  },
  backgroundImageContainer: {
    alignItems: 'center',
  },
  backgroundImage: {
    height: normalizeHeight(260),
    width: '100%',
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: normalizeHeight(-12),
  },
  contentContainer: {
    flex: 1,
    marginTop: normalizeHeight(-64),
    zIndex: 20,
    position: 'relative',
    elevation: 6,
    overflow: 'hidden',
  },
  gradientContainer: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    paddingTop: normalizeHeight(16),
  },
  stickyTabsContainer: {
    paddingTop: normalizeHeight(12),
    zIndex: 100,
    backgroundColor: '#0b011cff',
  },
  container: {
    flexDirection: 'row',
    marginRight: normalizeWidth(8),
    position: 'relative',
  },
  star: {
    width: 12,
    height: 12,
    position: 'relative',
    marginRight: normalizeWidth(2),
  },
  partialOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    height: 12,
  },
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: normalizeWidth(12),
    marginBottom: normalizeHeight(12),
  },
  gradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    marginTop: normalizeHeight(4),
  },
  containerTwo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftSection: {
    width: 20,
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B095E3',
    zIndex: 1,
  },
  verticalLine: {
    position: 'absolute',
    top: 8,
    width: 2,
    height: '160%',
    backgroundColor: '#B095E3',
  },
  rightSection: {
    flex: 1,
    paddingLeft: normalizeWidth(12),
  },
});
