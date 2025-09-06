import React from 'react';
import {View, StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';
import ShimmerPlaceholder from './ShimmerPlaceholder';

const SectionHeaderSkeleton = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        width={normalizeWidth(150)}
        height={normalizeHeight(20)}
        borderRadius={4}
        style={styles.sectionTitle}
      />
      <ShimmerPlaceholder
        width={normalizeWidth(60)}
        height={normalizeHeight(14)}
        borderRadius={4}
        style={styles.seeAllButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalizeHeight(16),
    paddingHorizontal: normalizeWidth(20),
  },
  sectionTitle: {},
  seeAllButton: {},
});

export default SectionHeaderSkeleton;
