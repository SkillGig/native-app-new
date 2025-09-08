import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const CourseTag = ({
  tags = [],
  style,
  tagStyle,
  tagTextStyle,
  showsHorizontalScrollIndicator = false,
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      contentContainerStyle={styles.container}
      style={[styles.scrollView, style]}>
      {tags.map((tag, index) => (
        <View
          key={index}
          style={[
            styles.tag,
            tagStyle,
            index === tags.length - 1 && styles.lastTag,
          ]}>
          <Text style={[styles.tagText, tagTextStyle]}>
            {typeof tag === 'string' ? tag : tag.title || tag.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(4),
  },
  tag: {
    backgroundColor: 'rgba(176, 149, 227, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    borderRadius: 16,
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(2),
    marginRight: normalizeWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: normalizeHeight(20),
  },
  lastTag: {
    marginRight: 0,
  },
  tagText: {
    color: '#D3C4EF',
    fontSize: 10,
    fontFamily: 'Lato',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CourseTag;
