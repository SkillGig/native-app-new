import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useContext,
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

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const HomeSlider = forwardRef(
  (
    {
      snapPoints = ['13%', '87%'],
      onSheetChange,
      courseFilter = [],
      exploreCoursesFilter = [],
      courseType = [],
      weekStatus = [],
      currentDay = '',
      statusMap = {},
    },
    ref,
  ) => {
    const sheetRef = useRef(null);
    const {isDark, colors} = useContext(ThemeContext);
    const fstyles = getFontStyles(isDark, colors);
    // Defensive: ensure snapPoints is always a valid array with at least 1 element
    const safeSnapPoints =
      Array.isArray(snapPoints) && snapPoints.length > 0 ? snapPoints : ['87%'];
    // Defensive: ensure index is always in range
    const initialIndex = safeSnapPoints.length > 1 ? 1 : 0;
    const [currentSnapIndex, setCurrentSnapIndex] =
      React.useState(initialIndex);

    const handleSheetChanges = useCallback(
      index => {
        if (onSheetChange) {
          onSheetChange(index);
        }
        setCurrentSnapIndex(index);
        // Vibrate when sheet is opened or closed
        if (index === 0 || index === 1) {
          Vibration.vibrate(50);
        }
        // Prevent dragging above max snap: if index is not 1 (max), snap back to 1
        if (index !== 1 && index !== 0) {
          if (sheetRef.current) {
            sheetRef.current.snapToIndex(initialIndex);
          }
        }
      },
      [onSheetChange, initialIndex],
    );

    useImperativeHandle(ref, () => ({
      snapTo: index => {
        if (sheetRef.current && index >= 0 && index < safeSnapPoints.length) {
          sheetRef.current.snapToIndex(index);
        }
      },
      close: () => {
        sheetRef.current?.close();
      },
    }));

    // On mount, always snap to initialIndex
    React.useEffect(() => {
      if (sheetRef.current) {
        sheetRef.current.snapToIndex(initialIndex);
      }
    }, [initialIndex]);

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
                  <TouchableOpacity
                    key={type.id}
                    style={styles.courseTypeButton}>
                    <Text style={styles.courseTypeText}>{type.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>
      );
    };

    const renderHeader = () => (
      <View>
        <DailyStreak
          weekStatus={weekStatus}
          currentDay={currentDay}
          statusMap={statusMap}
        />
        {/* Ongoing Courses */}
        <Text style={styles.sectionTitle}>Ongoing Courses</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={courseFilter}
          keyExtractor={item => `explore_${item.id}`}
          renderItem={({item, index}) => renderCourseCard(item, index)}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 8}}
        />
        <View style={{backgroundColor: '#090215'}}>
          <View style={styles.sectionTitleContainer}>
            <Text style={fstyles.heavyTwenty}>Explore Courses</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={exploreCoursesFilter}
            keyExtractor={(item, index) => `explore_${index}`}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 8,
              marginTop: 10,
            }}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.filterButton}>
                <Text style={fstyles.thirteenMedium}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
          <Text style={styles.sectionTitle}>Ongoing Courses</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            keyExtractor={item => `explore_${item.id}`}
            renderItem={({item, index}) => renderCourseCard(item, index)}
            contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 8}}
          />
          <Text style={styles.sectionTitle}>Ongoing Courses</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            keyExtractor={item => `explore_${item.id}`}
            renderItem={({item, index}) => renderCourseCard(item, index)}
            contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 8}}
          />
          <Text style={styles.sectionTitle}>Ongoing Courses</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            keyExtractor={item => `explore_${item.id}`}
            renderItem={({item, index}) => renderCourseCard(item, index)}
            contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 8}}
          />
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Learn to Upskill !!</Text>
            <Text style={[fstyles.regularSixteen, {color: '#EEE7F9'}]}>
              Made with Passion in Tirupati, India 🇮🇳
            </Text>
          </View>
        </View>
      </View>
    );

    return (
      <BottomSheet
        ref={sheetRef}
        index={initialIndex}
        snapPoints={safeSnapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={currentSnapIndex === 0}
        enableHandlePanningGesture={currentSnapIndex === 0}
        enableOverDrag={false}
        animateOnMount={true}
        onChange={handleSheetChanges}
        handleIndicatorStyle={
          currentSnapIndex === 1
            ? {opacity: 0, height: 0}
            : styles.handleIndicator
        }
        style={styles.bottomSheetContainer}
        detached={false}
        backgroundStyle={styles.sheetBackground}
        android_keyboardInputMode="adjustResize"
        keyboardBehavior="interactive">
        <BottomSheetFlatList
          data={[]}
          keyExtractor={() => ''}
          renderItem={null}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{
            minHeight: SCREEN_HEIGHT * 0.85,
            paddingBottom: 90,
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  sheetBackground: {
    backgroundColor: '#1C0743',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
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
  sectionTitleContainer: {
    marginHorizontal: normalizeWidth(20),
    marginTop: normalizeHeight(20),
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
});

export default HomeSlider;
