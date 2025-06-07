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
import {PanResponder, Animated} from 'react-native';

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
        <LinearGradient
          colors={['#1C0743', '#090215']}
          locations={[0, 1]}
          style={styles.gradient}>
          {/* Streak Section */}
          <LinearGradient
            colors={['rgba(48, 11, 115, 0)', '#300B73']}
            style={styles.gradientContainer}>
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
                    return (
                      <View key={`day-${index}`} style={styles.cell}>
                        <Text
                          style={[
                            fstyles.mediumTen,
                            {
                              color: isToday
                                ? 'white'
                                : 'rgba(229, 220, 246, 0.40)',
                              marginBottom: normalizeHeight(8),
                            },
                          ]}>
                          {item.day}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.row}>
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
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Ongoing Courses */}
          <LinearGradient
            colors={['rgba(48, 11, 115, 0)', 'rgba(48, 11, 115, 0.5)']}
            style={styles.ongoingCoursesContainer}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Ongoing Courses</Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={courseFilter}
              keyExtractor={(item, index) => `ongoing_${index}`}
              renderItem={({item, index}) => renderCourseCard(item, index)}
              contentContainerStyle={styles.horizontalList}
            />
          </LinearGradient>

          {/* Explore Courses */}
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
          <View style={styles.sectionTitleContainer}>
            <Text style={fstyles.boldSixteen}>Recommended Courses for you</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            keyExtractor={(item, index) => `recommended_${index}`}
            renderItem={({item, index}) => renderCourseCard(item, index)}
            contentContainerStyle={styles.horizontalList}
          />

          {/* All Courses */}
          <View style={styles.sectionTitleContainer}>
            <Text style={fstyles.boldSixteen}>All Courses</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            keyExtractor={(item, index) => `all_${index}`}
            renderItem={({item, index}) => renderCourseCard(item, index)}
            contentContainerStyle={styles.horizontalList}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Learn to Upskill !!</Text>
            <Text style={[fstyles.regularSixteen, {color: '#EEE7F9'}]}>
              Made with Passion in Tirupati, India 🇮🇳
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  gradient: {
    flexGrow: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    minHeight: screenHeight * 0.85,
    paddingTop: normalizeHeight(24),
    paddingBottom: normalizeHeight(24),
  },
  gradientContainer: {
    padding: normalizeWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: '#372258',
    paddingBottom: normalizeHeight(20),
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakButton: {
    alignItems: 'center',
    backgroundColor: 'red',
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
  },
  sectionTitleContainer: {
    marginHorizontal: normalizeWidth(20),
    marginTop: normalizeHeight(20),
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
  horizontalList: {
    marginBottom: normalizeHeight(24),
    marginLeft: normalizeWidth(20),
  },
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
    marginBottom: normalizeHeight(23),
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
    height: normalizeHeight(50),
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
