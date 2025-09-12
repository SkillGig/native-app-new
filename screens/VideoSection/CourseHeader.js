import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import CourseStars from '../../components/CourseStars';
import {FlatList} from 'react-native-gesture-handler';
import GradientChip from '../../components/GradientChip';
import images from '../../assets/images';

const CourseHeader = ({fstyles}) => {
  const courseDesign = [
    {
      id: 'a1',
      title: '36 hours of learning ',
    },
    {
      id: 'a2',
      title: '8 Modules',
    },
    {
      id: 'a3',
      title: 'Beginner Friendly',
    },
    {
      id: 'a5',
      title: 'Certification ',
    },
  ];
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={fstyles.heavyTwentyFour}>UIUX Design Course</Text>
        <Text style={[fstyles.twelweRegular, styles.descriptionText]}>
          Master the fundamentals of UI/UX design and build stunning,
          user-friendly digital experiences.
        </Text>
      </View>
      <View style={styles.ratingContainer}>
        <CourseStars rating={'4.2'} />
        <Text style={fstyles.semiFourteen}>4.2 (4.2k reviews)</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={courseDesign}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item, index) => `_${index}`}
        renderItem={({item}) => (
          <GradientChip title={item.title} icon={images.STOPWATCH} />
        )}
      />
    </View>
  );
};

export default CourseHeader;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: normalizeHeight(12),
    marginHorizontal: normalizeWidth(24),
  },
  descriptionText: {
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 18,
    color: '#B095E3',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginHorizontal: normalizeWidth(24),
    marginTop: normalizeHeight(28),
    alignItems: 'center',
  },
  flatListContent: {
    marginLeft: normalizeWidth(24),
    marginTop: normalizeHeight(28),
  },
});
