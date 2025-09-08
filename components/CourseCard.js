import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import images from '../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from './ProgressBar';
import CourseButton from './CourseButton';
import CourseTag from './CourseTag';

const CourseCard = ({courseDetails}) => {
  const currentCourseStatus = courseDetails?.courseStatus;

  return (
    <LinearGradient
      colors={['#463173', 'rgba(70, 49, 115, 0.30)']}
      locations={[0, 0.59]}
      style={[styles.courseCard]}>
      <View>
        <Image
          source={
            courseDetails?.courseDetails || {
              uri: 'https://placeholder.pagebee.io/api/plain/192/78?text=Some title&bg=ffffff',
            }
          }
          style={styles.courseImg}
        />
        <Text
          style={[styles.courseTitle]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {courseDetails?.courseTitle}
        </Text>
      </View>
      {currentCourseStatus === 'in-progress' ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 4,
              marginTop: 12,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <Image source={images.CHAPTERVIDEO} />
              <Text style={styles.chapterTitle}>
                {courseDetails?.currentChapter?.title}
              </Text>
            </View>
            <View>
              <Text style={styles.moduleDetails}>
                {courseDetails?.completedModules}/{courseDetails?.totalModules}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 4}}>
            <Text style={styles.timeLeftDetails}>15min Remaining</Text>
          </View>
          <View style={{marginTop: 8}}>
            <ProgressBar
              percentage={parseFloat(courseDetails?.progressPercentage) || 0}
            />
          </View>
        </>
      ) : (
        <>
          <View style={{marginTop: 12}}>
            <Text style={styles.authorName}>
              By {courseDetails?.authorName}
            </Text>
            <View style={{marginTop: 8, minHeight: normalizeHeight(20)}}>
              <CourseTag tags={courseDetails?.courseTags} />
            </View>
          </View>
        </>
      )}
      {currentCourseStatus === 'in-progress' ? (
        <CourseButton
          name={'Resume Course'}
          onPress={() => {}}
          disabled={false}
          style={{
            width: '100%',
            marginTop: 12,
            alignSelf: 'center',
          }}
          textStyle={{
            fontSize: 14,
            fontWeight: '800',
          }}
        />
      ) : currentCourseStatus === 'locked' ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'column', marginTop: 12, marginLeft: 4}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <Image
                source={images.RATINGSTAR}
                style={{width: 12, height: 12}}
              />
              <Text style={styles.ratingText}>4.2 Rating</Text>
            </View>
            <Text style={styles.enrollmentText}>4.9k Enrolled</Text>
          </View>
          <CourseButton
            name={'View Details'}
            onPress={() => {}}
            disabled={false}
            style={{
              width: '100%',
              marginTop: 12,
              alignSelf: 'center',
            }}
            textStyle={{
              fontSize: 14,
              fontWeight: '800',
            }}
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'column', marginTop: 12, marginLeft: 4}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <Image
                source={images.RATINGSTAR}
                style={{width: 12, height: 12}}
              />
              <Text style={styles.ratingText}>4.2 Rating</Text>
            </View>
            <Text style={styles.enrollmentText}>4.9k Enrolled</Text>
          </View>
          <CourseButton
            name={'Enroll Now'}
            onPress={() => {}}
            disabled={false}
            style={{
              width: '100%',
              marginTop: 12,
              alignSelf: 'center',
            }}
            textStyle={{
              fontSize: 14,
              fontWeight: '800',
            }}
          />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    width: normalizeWidth(208),
    height: normalizeHeight(250),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.4)',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 12,
    paddingTop: 8,
    marginRight: 20,
  },
  courseImg: {
    width: normalizeWidth(192),
    height: normalizeHeight(78),
    borderRadius: 12,
    marginBottom: 12,
  },
  courseTitle: {
    marginLeft: 4,
    marginRight: 4,
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '700',
    minHeight: normalizeHeight(38),
  },
  chapterTitle: {
    color: '#F6F3FC',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '700',
  },
  moduleDetails: {
    color: 'rgba(238, 231, 249, 0.60)',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  timeLeftDetails: {
    color: 'rgba(238, 231, 249, 0.60)',
    fontSize: 10,
    fontFamily: 'Lato',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  authorName: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Lato',
    marginLeft: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Lato',
    letterSpacing: 0.5,
  },
  enrollmentText: {
    color: 'rgba(238, 231, 249, 0.60)',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Lato',
    marginTop: 4,
  },
});

export default CourseCard;
