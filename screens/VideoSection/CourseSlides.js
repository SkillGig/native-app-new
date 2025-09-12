import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {normalizeWidth} from '../../components/Responsivescreen';

const CourseSlides = ({selectedTab, setSelectedTab}) => {
  const courseOptions = [
    {
      id: 'a1',
      title: 'Overview',
    },
    {
      id: 'a2',
      title: 'Course content',
    },
    {
      id: 'a3',
      title: 'Tutor Info',
    },
    {
      id: 'a5',
      title: 'Reviews and QA',
    },
  ];

  return (
    <View>
      <FlatList
        data={courseOptions}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.flatListContent}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isSelected = selectedTab === item.title;

          return (
            <TouchableOpacity
              onPress={() => setSelectedTab(item.title)}
              style={styles.tabButton}>
              <Text
                style={[styles.tabText, isSelected && styles.selectedTabText]}>
                {item.title}
              </Text>

              <View
                style={[
                  styles.tabIndicator,
                  isSelected && styles.selectedTabIndicator,
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CourseSlides;

const styles = StyleSheet.create({
  flatListContent: {
    // Add any needed content styles here if required
  },
  tabButton: {
    // Container for each tab
  },
  tabText: {
    color: 'rgba(238, 231, 249, 0.60)',
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: normalizeWidth(12),
  },
  selectedTabText: {
    color: 'white',
    fontWeight: '800',
  },
  tabIndicator: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(238, 231, 249, 0.60)',
    marginTop: 4,
  },
  selectedTabIndicator: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#B095E3',
  },
});
