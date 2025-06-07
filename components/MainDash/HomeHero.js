import React, {useContext, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions, // Import Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import {Animated} from 'react-native';

const {height: screenHeight} = Dimensions.get('window'); // Get screen height

const HomeHero = ({
  weekStatus,
  currentDay,
  statusMap,
  courseFilter,
  exploreCoursesFilter,
  courseType,
  gradientColors,
  activeCurrentView,
  setActiveCurrentView,
}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  const renderCourseCard = (item, index) => {
    return (
      <View
        style={[
          styles.courseCard,
          {
            marginRight:
              index === courseFilter.length - 1 ? 0 : normalizeWidth(20),
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
          <Image source={images.TESTONGOING} style={styles.courseImage} />
          <View style={styles.courseTextContainer}>
            <Text style={fstyles.boldFourteen}>Figma Basics</Text>
            <Text style={styles.courseAuthor}>By Anshika Gupta</Text>
            <View style={styles.courseTypeContainer}>
              {courseType.map(type => (
                <TouchableOpacity key={type.id} style={styles.courseTypeButton}>
                  <Text style={styles.courseTypeText}>{type.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#1C0743',
      }}>
      {activeCurrentView !== null && (
        <Animated.View style={styles.dragOverlay}>
          <View style={styles.dragOverlayContent}>
            <TouchableOpacity
              onPress={() => setActiveCurrentView(null)}
              activeOpacity={0.8}
              style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      <ScrollView
        scrollEnabled={activeCurrentView === null}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContentContainer}>
        {/* Streak Section */}

        <LinearGradient
          colors={['rgba(48, 11, 115, 0)', '#300B73']}
          style={styles.streakContainer}>
          <View style={styles.streakRow}>
            <View style={styles.streakLeft}>
              <TouchableOpacity style={styles.streakButton}>
                <Image source={images.STREAKICON} style={styles.streakIcon} />
                <Text style={styles.streakText}>2 Days</Text>
              </TouchableOpacity>
              <View style={styles.streakDivider} />
            </View>
            <View style={styles.streakRight}>
              <View style={styles.row}>
                {weekStatus.map((item, index) => {
                  const isToday = item.day === currentDay;
                  const {icon} = statusMap[item.status] || {};
                  return (
                    <View key={`day-${index}`} style={styles.streakDatesColumn}>
                      <Text
                        style={[
                          fstyles.mediumTen,
                          {
                            color: isToday
                              ? 'white'
                              : 'rgba(229, 220, 246, 0.40)',
                          },
                        ]}>
                        {item.day}
                      </Text>
                      {item.status === 'completed' ? (
                        <LinearGradient
                          colors={['#FFEDC3', '#FFC29C']}
                          start={{x: 0, y: 0}}
                          end={{x: 0, y: 1}}
                          style={styles.streakImageGradientContainer}>
                          <Image source={icon} style={styles.streakIconSmall} />
                        </LinearGradient>
                      ) : (
                        <Image source={icon} style={styles.streakIconSmall} />
                      )}
                    </View>
                  );
                })}
                {/* <View style={styles.row}>
                {weekStatus.map((item, index) => {
                  const isToday = item.day === currentDay;
                  const {icon} = statusMap[item.status] || {};
                  return (
                    <View
                      key={`icon-${index}`}
                      style={[
                        styles.cell,
                        isToday && {
                          borderWidth: 1,
                          borderColor: 'white',
                          borderRadius: 15,
                        },
                      ]}>
                      <Image source={icon} style={styles.streakIconSmall} />
                    </View>
                  );
                })}
              </View> */}
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.ongoingCoursesContainer}>
          <Text style={styles.sectionTitle}>Ongoing Courses</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            keyExtractor={(item, index) => `ongoing_${index}`}
            renderItem={({item, index}) => renderCourseCard(item, index)}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Explore Courses */}
        <View style={{backgroundColor: '#090215'}}>
          <View style={styles.sectionTitleContainer}>
            <Text style={fstyles.heavyTwenty}>Explore Courses</Text>
          </View>
          <View style={styles.filterContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={exploreCoursesFilter}
              keyExtractor={(item, index) => `explore_${index}`}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.filterButton}>
                  <Text style={fstyles.thirteenMedium}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Recommended Courses */}
          <View style={styles.otherRoadmapCoursesContainer}>
            <Text style={fstyles.boldSixteen}>Recommended Courses for you</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={courseFilter}
              keyExtractor={(item, index) => `recommended_${index}`}
              renderItem={({item, index}) => renderCourseCard(item, index)}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          {/* All Courses */}
          <View style={styles.otherRoadmapCoursesContainer}>
            <Text style={fstyles.boldSixteen}>All Courses</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={courseFilter}
              keyExtractor={(item, index) => `all_${index}`}
              renderItem={({item, index}) => renderCourseCard(item, index)}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Learn to Upskill !!</Text>
            <Text style={[fstyles.regularSixteen, {color: '#EEE7F9'}]}>
              Made with Passion in Tirupati, India 🇮🇳
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
    marginVertical: normalizeHeight(24),
  },
  streakContainer: {
    padding: normalizeWidth(16),
    borderWidth: 1,
    borderColor: '#372258',
    borderRadius: 20,
    marginHorizontal: normalizeWidth(20),
  },
  streakRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakImageGradientContainer: {
    borderRadius: 20,
    padding: normalizeWidth(0),
  },
  streakButton: {
    alignItems: 'center',
  },
  streakIcon: {
    height: normalizeHeight(40),
    width: normalizeWidth(40),
    resizeMode: 'contain',
  },
  streakText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: normalizeHeight(2),
    textAlign: 'center',
  },
  streakDivider: {
    width: normalizeWidth(1),
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'stretch',
    marginLeft: normalizeWidth(12),
  },
  streakRight: {
    flex: 1,
    marginLeft: normalizeWidth(12),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  streakDatesColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalizeHeight(8),
  },
  cell: {
    alignItems: 'center',
  },
  streakIconSmall: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  ongoingCoursesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#372258',
    paddingBottom: normalizeHeight(20),
    marginTop: normalizeHeight(48),
    display: 'flex',
    flexDirection: 'column',
    gap: normalizeHeight(16),
    paddingLeft: normalizeWidth(20),
  },
  sectionTitleContainer: {
    marginHorizontal: normalizeWidth(20),
    marginTop: normalizeHeight(20),
  },
  otherRoadmapCoursesContainer: {
    paddingBottom: normalizeHeight(20),
    display: 'flex',
    flexDirection: 'column',
    gap: normalizeHeight(16),
    paddingLeft: normalizeWidth(20),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(238, 231, 249, 0.60)',
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
  horizontalList: {},
  courseCard: {
    width: normalizeWidth(208),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.4)',
    overflow: 'hidden',
  },
  courseCardInner: {
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
    marginTop: normalizeHeight(12),
    marginHorizontal: normalizeWidth(4),
  },
  courseAuthor: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.60)',
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
  footer: {
    marginLeft: normalizeWidth(20),
    marginBottom: normalizeHeight(120),
    marginTop: normalizeHeight(24),
  },
  footerTitle: {
    fontSize: 64,
    fontWeight: '900',
    color: '#EEE7F9',
  },
  dragOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0)',
    pointerEvents: 'auto',
  },
  dragOverlayContent: {
    flex: 1,
  },
  dragHandleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalizeHeight(25),
    width: '100%',
  },
  dragHandle: {
    width: normalizeWidth(75),
    height: normalizeHeight(4),
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});

export default HomeHero;
