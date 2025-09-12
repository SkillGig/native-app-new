import React, {useContext, useMemo, useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import ExploreCoursesSkeletonLoader from '../../components/Skeletons/ExploreCoursesSkeletonLoader';

const ExploreCourses = props => {
  console.log('im preiyankaa');

  const {colors} = useContext(ThemeContext);
  const gradientColors = useMemo(() => ['#300B73', '#090215'], []);
  const fstyles = getFontStyles(false, colors);

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const exploreCourses = [
    {
      id: 'a1',
      coursename: 'bvdsa',
    },
    {
      id: 'a3',
      coursename: 'uytrew',
    },
    {
      id: 'a31',
      coursename: 'nbvcxz',
    },
    {
      id: 'a23',
      coursename: 'bvdsa',
    },
    {
      id: 'a2',
      coursename: '65tres',
    },
    {
      id: 'a79',
      coursename: 'nbvcxz',
    },
  ];

  const RenderFPList = ({item}) => {
    console.log(item, 'itemmmmm');
    return (
      <View style={styles.categoryItem}>
        <Text style={[fstyles.thirteenMedium, styles.categoryText]}>
          All courses
        </Text>
      </View>
    );
  };

  // Show skeleton while loading
  if (isLoading) {
    return <ExploreCoursesSkeletonLoader />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.headerContainer}>
        <Image source={images.BACKICON} style={styles.backIcon} />

        <View>
          <Text style={[fstyles.heavyTwentyFour, styles.headerTitle]}>
            Explore Couses
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          keyExtractor={(item, index) => `_${index}`}
          horizontal
          data={exploreCourses}
          renderItem={RenderFPList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

export default ExploreCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    marginTop: normalizeHeight(55),
    marginLeft: normalizeWidth(23),
  },
  backIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  headerTitle: {
    marginVertical: normalizeHeight(16),
  },
  categoryItem: {
    paddingVertical: normalizeHeight(8),
    paddingHorizontal: normalizeWidth(12),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.40)',
    marginRight: normalizeWidth(5),
  },
  categoryText: {
    color: 'white',
  },
  flatListContent: {
    paddingHorizontal: normalizeWidth(23),
    marginBottom: normalizeHeight(16),
  },
});
