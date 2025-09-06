import React from 'react';
import {View, StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';
import ShimmerPlaceholder from './ShimmerPlaceholder';

const CourseCardSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Course image */}
      <ShimmerPlaceholder
        width={normalizeWidth(150)}
        height={normalizeHeight(100)}
        borderRadius={8}
        style={styles.courseImage}
      />

      {/* Course details */}
      <View style={styles.detailsContainer}>
        {/* Course title */}
        <ShimmerPlaceholder
          width={normalizeWidth(120)}
          height={normalizeHeight(16)}
          borderRadius={4}
          style={styles.courseTitle}
        />

        {/* Course description */}
        <ShimmerPlaceholder
          width={normalizeWidth(100)}
          height={normalizeHeight(12)}
          borderRadius={4}
          style={styles.courseDescription}
        />

        {/* Progress section */}
        <View style={styles.progressContainer}>
          <ShimmerPlaceholder
            width={normalizeWidth(80)}
            height={normalizeHeight(6)}
            borderRadius={3}
            style={styles.progressBar}
          />
          <ShimmerPlaceholder
            width={normalizeWidth(30)}
            height={normalizeHeight(10)}
            borderRadius={4}
            style={styles.progressText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: normalizeWidth(12),
    padding: normalizeWidth(12),
    marginVertical: normalizeHeight(6),
    marginHorizontal: normalizeWidth(4),
    width: normalizeWidth(300),
  },
  courseImage: {
    marginRight: normalizeWidth(12),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  courseTitle: {
    marginBottom: normalizeHeight(8),
  },
  courseDescription: {
    marginBottom: normalizeHeight(8),
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    marginRight: normalizeWidth(8),
  },
  progressText: {},
});

export default CourseCardSkeleton;
