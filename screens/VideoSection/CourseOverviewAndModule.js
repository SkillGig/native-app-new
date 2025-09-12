import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {FlatList} from 'react-native-gesture-handler';
import ReviewCard from '../../components/ReviewCard';
import ModuleDetail from '../../components/ModuleDetail';
import images from '../../assets/images';
import GradientChip from '../../components/GradientChip';
import LinearGradient from 'react-native-linear-gradient';

const CourseOverviewAndModule = ({
  fstyles,
  selectedTab,
  sectionPositions,
  courseHeaderHeight,
}) => {
  const [expanded, setExpanded] = useState({});

  const data = [
    {
      id: '1',
      title: 'Core principles of UI & UX design',
      content:
        'Understand the fundamentals of user interface and user experience design.Learn key principles like hierarchy, consistency, accessibility, and usability.',
    },
    {
      id: '2',
      title: 'User research & Journey mapping',
      content:
        'Understand the fundamentals of user interface and user experience design.Learn key principles like hierarchy, consistency, accessibility, and usability.',
    },
    {
      id: '3',
      title: 'Option 3',
      content:
        'Understand the fundamentals of user interface and user experience design.Learn key principles like hierarchy, consistency, accessibility, and usability.',
    },
  ];

  const toggleExpand = id => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({item}) => {
    const isOpen = expanded[item.id];
    return (
      <>
        <View style={styles.header}>
          <Text style={[styles.headerTitle]}>{item.title}</Text>
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Image
              source={images.HEADERBACKICON}
              style={[
                styles.headerIcon,
                {
                  transform: [{rotate: isOpen ? '90deg' : '-90deg'}],
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        {isOpen && (
          <View style={styles.content}>
            <Text style={[fstyles.mediumTen, styles.contentText]}>
              {item.content}
            </Text>
          </View>
        )}
        <View style={styles.separator} />
      </>
    );
  };

  const renderItemDetails = ({item}) => {
    return <ModuleDetail item={item} />;
  };

  const renderReview = [
    {
      id: 'a1',
      text: 'asdfg',
    },
    {
      id: 'a2',
      text: 'asdfg',
    },
    {
      id: 'a3',
      text: 'asdfg',
    },
    {
      id: 'a4',
      text: 'asdfg',
    },
  ];

  const renderReviewDetail = ({item}) => {
    return (
      <ReviewCard
        text={
          'This course made UI/UX so easy to understand. The hands-on projects really boosted my confidence!'
        }
        author={'Student 1'}
      />
    );
  };

  const gainingSkills = [
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
    {
      id: 'a8',
      title: 'Certification ',
    },
  ];

  const modules = [
    {
      id: 1,
      title: 'Module 1',
      sectionCount: 3,
      videosCount: 9,
      readingsCount: 3,
      subtitle: 'UI Vs UX fundamentals',
      info: '3 Sections | 09 Videos | 03 Readings',
      duration: '6 Hours to complete',
      points: ['Intro to UI/UX', 'User Research', 'Wireframing'],
    },
    {
      id: 2,
      title: 'Module 2',
      sectionCount: 4,
      videosCount: 9,
      readingsCount: 3,
      subtitle: 'Design Principles',
      info: '4 Sections | 12 Videos | 04 Readings',
      duration: '5 Hours to complete',
      points: ['Color Theory', 'Typography', 'Spacing', 'Hierarchy'],
    },
    {
      id: 3,
      title: 'Module 3',
      sectionCount: 2,
      videosCount: 9,
      readingsCount: 3,
      subtitle: 'Interaction Design',
      info: '2 Sections | 06 Videos | 02 Readings',
      duration: '4 Hours to complete',
      points: ['Motion', 'Microinteractions'],
    },
    {
      id: 4,
      title: 'Module 4',
      sectionCount: 3,
      videosCount: 9,
      readingsCount: 3,
      subtitle: 'Usability Testing',
      info: '3 Sections | 07 Videos | 02 Readings',
      duration: '3.5 Hours to complete',
      points: ['User Testing', 'Heuristic Evaluation', 'A/B Testing'],
    },
  ];

  return (
    <LinearGradient
      colors={['#1C0743', '#090215']}
      locations={[0, 0.25]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1, paddingTop: normalizeHeight(24)}}>
      {/* Overview Section */}
      <View
        collapsable={false}
        onLayout={event => {
          const {y} = event.nativeEvent.layout;
          if (sectionPositions?.current && courseHeaderHeight?.current) {
            // Add course header height to get absolute position from scroll view top
            sectionPositions.current.Overview = y + courseHeaderHeight.current;
          }
        }}>
        <View style={styles.overviewContainer}>
          <Text style={[fstyles.boldSixteen, styles.sectionTitle]}>
            Overview
          </Text>
          <Text style={[fstyles.twelweRegular, styles.overviewDescription]}>
            Master the fundamentals of UI/UX design and build stunning,
            user-friendly digital experiences.Master the fundamentals of UI/UX
            design and build stunning, user-friendly digital experiences.
          </Text>
          <Text style={[fstyles.semiTwelwe, styles.readMoreText]}>
            Read More..
          </Text>
        </View>
        <View style={styles.skillsHeaderContainer}>
          <Text style={[fstyles.boldFourteen, styles.skillsHeaderText]}>
            Here's What you'll learn
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContainer}
        />

        <View style={styles.skillsContainer}>
          <Text style={[fstyles.semiFourteen, styles.skillsText]}>
            Skills you'll gain
          </Text>

          <View style={styles.skillsChipsContainer}>
            {gainingSkills.map((item, index) => (
              <GradientChip
                key={`skill_${index}`}
                title={item.title}
                icon={images.STOPWATCH}
              />
            ))}
          </View>

          <View style={styles.skillsSeparator} />
        </View>
      </View>

      {/* Course Content Section */}
      <View
        collapsable={false}
        onLayout={event => {
          const {y} = event.nativeEvent.layout;
          if (sectionPositions?.current && courseHeaderHeight?.current) {
            sectionPositions.current['Course content'] =
              y + courseHeaderHeight.current;
          }
        }}>
        <View style={styles.courseContentContainer}>
          <Text style={[fstyles.boldSixteen, styles.sectionTitle]}>
            Course Content
          </Text>
        </View>
        {/* first module preview uses ModuleDetail component */}
        <FlatList
          data={modules}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItemDetails}
          scrollEnabled={false}
          contentContainerStyle={styles.modulesFlatListContainer}
        />
        <View style={styles.courseSeparator} />
      </View>

      {/* Tutor Info Section */}
      <View
        collapsable={false}
        onLayout={event => {
          const {y} = event.nativeEvent.layout;
          if (sectionPositions?.current && courseHeaderHeight?.current) {
            sectionPositions.current['Tutor Info'] =
              y + courseHeaderHeight.current;
          }
        }}>
        <Text style={[fstyles.boldSixteen, styles.tutorSectionTitle]}>
          Tutor Details
        </Text>
        <LinearGradient
          colors={['rgba(48, 11, 115, 0.5)', 'rgba(9, 2, 21, 0.5)']}
          locations={[0.2977, 0.9462]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.tutorGradientContainer}>
          <View style={styles.tutorContainer}>
            <View style={styles.tutorImageContainer}>
              <Image source={images.TUTORIMAGE} style={styles.tutorImage} />
            </View>
            <View style={styles.tutorInfoContainer}>
              <Text style={fstyles.boldSixteen}>Ritika Sharma</Text>
              <Text style={[fstyles.twelweRegular, styles.tutorExperience]}>
                12yr experience | ALLENS Staff
              </Text>
              <Text style={[fstyles.mediumTen, styles.tutorDescription]}>
                An experienced educator with a passion for simplifying complex
                concepts.
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.tutorSeparator} />
      </View>

      {/* Reviews and QA Section */}
      <View
        collapsable={false}
        onLayout={event => {
          const {y} = event.nativeEvent.layout;
          if (sectionPositions?.current && courseHeaderHeight?.current) {
            sectionPositions.current['Reviews and QA'] =
              y + courseHeaderHeight.current;
          }
        }}>
        <View style={styles.reviewsContainer}>
          <Text style={[fstyles.boldFourteen, styles.reviewsTitle]}>
            Reviews
          </Text>
        </View>
        <FlatList
          data={renderReview}
          keyExtractor={item => item.id}
          renderItem={renderReviewDetail}
          horizontal
          contentContainerStyle={styles.reviewsFlatListContainer}
          showsHorizontalScrollIndicator={false}
        />

        {/* FAQs Section */}
        <View style={styles.faqContainer}>
          <Text style={[fstyles.boldFourteen, styles.faqTitle]}>FAQ's</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={styles.faqFlatListContainer}
        />
      </View>
    </LinearGradient>
  );
};

export default CourseOverviewAndModule;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalizeHeight(4),
  },
  headerTitle: {
    fontSize: 14,
    color: '#D3C4EF',
    lineHeight: 18,
    fontWeight: '400',
  },
  headerIcon: {
    height: normalizeHeight(16),
    width: normalizeWidth(16),
    resizeMode: 'contain',
    color: '#B095E3',
  },
  content: {
    paddingVertical: normalizeHeight(8),
  },
  contentText: {
    color: 'rgba(255, 255, 255, 0.60)',
    letterSpacing: 0.5,
    lineHeight: 15,
  },
  separator: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    width: '100%',
    marginVertical: normalizeHeight(12),
  },
  overviewContainer: {
    marginHorizontal: normalizeWidth(16),
  },
  sectionTitle: {
    color: '#815FC4',
  },
  overviewDescription: {
    marginTop: normalizeHeight(8),
    fontStyle: 'italic',
    color: '#D3C4EF',
    lineHeight: 18,
  },
  readMoreText: {
    color: '#B095E3',
    paddingTop: normalizeHeight(4),
  },
  skillsHeaderContainer: {
    marginHorizontal: normalizeWidth(16),
    marginTop: normalizeHeight(28),
  },
  skillsHeaderText: {
    color: '#B095E3',
    fontStyle: 'italic',
  },
  flatListContainer: {
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
  },
  skillsContainer: {
    marginHorizontal: normalizeWidth(16),
  },
  skillsText: {
    color: '#B095E3',
    fontStyle: 'italic',
  },
  skillsChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(20),
  },
  skillsFlatListContainer: {
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(20),
  },
  skillsSeparator: {
    height: normalizeHeight(1),
    width: '100%',
    backgroundColor: 'rgba(238, 231, 249, 0.40)',
    marginBottom: normalizeHeight(20),
  },
  courseContentContainer: {
    marginHorizontal: normalizeWidth(16),
  },
  modulesFlatListContainer: {
    paddingBottom: normalizeHeight(24),
  },
  courseSeparator: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    width: '90%',
    marginVertical: normalizeHeight(20),
    marginHorizontal: normalizeWidth(20),
  },
  tutorSectionTitle: {
    color: '#815FC4',
    marginHorizontal: normalizeWidth(16),
  },
  tutorGradientContainer: {
    borderRadius: 12,
    marginHorizontal: normalizeWidth(16),
    marginTop: normalizeHeight(52),
  },
  tutorContainer: {
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    borderRadius: 12,
    paddingHorizontal: normalizeWidth(16),
  },
  tutorImageContainer: {
    position: 'absolute',
    top: -40,
  },
  tutorImage: {
    height: normalizeHeight(153),
    width: normalizeWidth(103),
    resizeMode: 'contain',
  },
  tutorInfoContainer: {
    marginLeft: normalizeWidth(116),
    paddingTop: normalizeHeight(24),
    paddingBottom: normalizeHeight(32),
    borderRadius: 12,
  },
  tutorExperience: {
    color: '#D3C4EF',
    marginTop: normalizeHeight(4),
    lineHeight: 18,
  },
  tutorDescription: {
    color: 'rgba(255, 255, 255, 0.50)',
    marginTop: normalizeHeight(4),
    lineHeight: 15,
    letterSpacing: 0.5,
  },
  tutorSeparator: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    width: '90%',
    marginVertical: normalizeHeight(20),
    marginHorizontal: normalizeWidth(20),
  },
  reviewsContainer: {
    marginHorizontal: normalizeWidth(16),
  },
  reviewsTitle: {
    color: '#815FC4',
  },
  reviewsFlatListContainer: {
    paddingHorizontal: normalizeWidth(16),
    paddingBottom: normalizeHeight(16),
    paddingTop: normalizeHeight(8),
  },
  faqContainer: {
    marginHorizontal: normalizeWidth(16),
    marginTop: normalizeHeight(16),
  },
  faqTitle: {
    color: '#815FC4',
    lineHeight: 18,
  },
  faqFlatListContainer: {
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
  },
});
