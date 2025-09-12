import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import images from '../assets/images';
import {normalizeWidth} from './Responsivescreen';

const CourseStars = ({rating = 0}) => {
  // static star renderer — style only

  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Image key={i} source={images.RATINGSTAR} style={styles.star} />,
      );
    } else if (i === fullStars && partialStar > 0) {
      stars.push(
        <View key={i} style={styles.star}>
          <Image source={images.RATINGSTAR} style={styles.star} />
          <View
            style={[styles.partialOverlay, {width: `${partialStar * 100}%`}]}>
            <Image source={images.RATINGSTAR} style={styles.star} />
          </View>
        </View>,
      );
    } else {
      stars.push(
        <Image
          key={i}
          source={images.RATINGSTAR}
          style={[styles.star, {tintColor: '#ccc'}]}
        />,
      );
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

export default CourseStars;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: normalizeWidth(8),
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
});
