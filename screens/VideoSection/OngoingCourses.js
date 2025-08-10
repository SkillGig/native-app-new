import React, { use, useContext, useMemo, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import { getFontStyles } from '../../styles/FontStyles';
import { ThemeContext } from '../../src/context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { CircularProgress } from '../Global/DesignComponents';
import Video from 'react-native-video';
const OngoingCourses = props => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isDark, colors } = useContext(ThemeContext);
  const [expandedSectionIds, setExpandedSectionIds] = useState([]);
  const [expandedMap, setExpandedMap] = useState({});

  console.log(selectedIndex, 'selectedIndexssss');
  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );
  const fstyles = getFontStyles(isDark, colors);
  const rating = 2.3;
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <Image
          key={i}
          source={images.RATINGSTAR} // your uploaded image
          style={styles.star}
        />,
      );
    } else if (i === fullStars && partialStar > 0) {
      // Partial star
      stars.push(
        <View key={i} style={styles.star}>
          <Image source={images.RATINGSTAR} style={styles.star} />
          <View
            style={[styles.partialOverlay, { width: `${partialStar * 100}%` }]}>
            <Image source={images.RATINGSTAR} style={styles.star} />
          </View>
        </View>,
      );
    } else {
      // Empty star
      stars.push(
        <Image
          key={i}
          source={images.RATINGSTAR}
          style={[styles.star, { tintColor: '#ccc' }]}
        />,
      );
    }
  }

  const toggleExpand = sectionId => {
    setExpandedSectionIds(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const courseOptions = [
    {
      id: 'a1',
      title: 'Modules',
    },
    {
      id: 'a2',
      title: 'Resources',
    },
    {
      id: 'a3',
      title: 'Notes',
    },
    {
      id: 'a5',
      title: 'Comments',
    },
    {
      id: 'a6',
      title: 'Overview',
    },
  ];

  const exploreCourses = [
    {
      id: 'a1',
      coursename: 'Module 1',
    },
    {
      id: 'a3',
      coursename: 'Module 2',
    },
    {
      id: 'a31',
      coursename: 'Module 3',
    },
    {
      id: 'a23',
      coursename: 'Module 4',
    },
    {
      id: 'a2',
      coursename: 'Module 5',
    },
    {
      id: 'a79',
      coursename: 'Module 6',
    },
  ];

  const RenderFPList = ({ item }) => {
    return (
      <View
        style={{
          paddingVertical: normalizeHeight(8),
          paddingHorizontal: normalizeWidth(12),
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(176, 149, 227, 0.40)',
          marginRight: normalizeWidth(25),
        }}>
        <Text style={[fstyles.thirteenMedium, { color: 'white' }]}>
          {item.coursename}
        </Text>
      </View>
    );
  };

  const modulesData = [
    {
      id: '1',
      title: 'Introduction to UI/UX',
      duration: '1hr 43mins',
      lessonsCount: 3,
      completedLessons: 1,
      lessons: [
        {
          id: 'l1',
          title: 'What is UI vs UX?',
          type: 'video',
          duration: '33 mins',
          completed: true,
          isLocked: false,
          progress: 1,
        },
        {
          id: 'l2',
          title: 'Why Good Design Matters',
          type: 'video',
          duration: '33 mins',
          completed: false,
          isLocked: false,
          progress: 0.7,
          remaining: '10 mins left',
        },
        {
          id: 'l3',
          title: 'UX Design: A Beginner’s Guide (Adobe)',
          type: 'reading',
          duration: '33 mins',
          completed: false,
          isLocked: true,
          progress: 0,
        },
      ],
      test: {
        title: 'Test your learnings',
        type: 'Q/A Test',
        duration: '30 mins',
        points: '20 pts',
        buttonText: 'Start Now',
      },
    },
    {
      id: '2',
      title: 'Wireframes & Prototyping',
      duration: '2hr 10mins',
      lessonsCount: 4,
      completedLessons: 2,
      lessons: [
        {
          id: 'l1',
          title: 'Low vs High Fidelity Wireframes',
          type: 'reading',
          duration: '25 mins',
          completed: true,
          isLocked: false,
          progress: 1,
        },
        {
          id: 'l2',
          title: 'Tools for Prototyping',
          type: 'video',
          duration: '40 mins',
          completed: true,
          isLocked: false,
          progress: 1,
        },
        {
          id: 'l3',
          title: 'Creating Clickable Prototypes',
          type: 'video',
          duration: '35 mins',
          completed: false,
          isLocked: false,
          progress: 0.3,
          remaining: '25 mins left',
        },
        {
          id: 'l4',
          title: 'Prototype Testing Techniques',
          type: 'reading',
          duration: '30 mins',
          completed: false,
          isLocked: true,
          progress: 0,
        },
      ],
      test: {
        title: 'Prototype Evaluation Quiz',
        type: 'MCQ Test',
        duration: '20 mins',
        points: '15 pts',
        buttonText: 'Take Quiz',
      },
    },
    {
      id: '3',
      title: 'Design Systems & Consistency',
      duration: '1hr 30mins',
      lessonsCount: 2,
      completedLessons: 0,
      lessons: [
        {
          id: 'l1',
          title: 'What is a Design System?',
          type: 'video',
          duration: '45 mins',
          completed: false,
          isLocked: false,
          progress: 0.5,
          remaining: '22 mins left',
        },
        {
          id: 'l2',
          title: 'Maintaining Visual Consistency',
          type: 'reading',
          duration: '45 mins',
          completed: false,
          isLocked: true,
          progress: 0,
        },
      ],
      test: {
        title: 'Consistency Case Study',
        type: 'Interactive Test',
        duration: '25 mins',
        points: '25 pts',
        buttonText: 'Start Assessment',
      },
    },
  ];

  const ModulesCard = ({ item }) => {
    const isExpanded = expandedSectionIds.includes(item.id);
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(176, 149, 227, 0.20)',
          marginHorizontal: normalizeWidth(16),
          borderRadius: 12,
          marginBottom: normalizeHeight(14),
          overflow: 'hidden',
        }}>
        {/* Always Visible Header (Clickable) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleExpand(item.id)}
          style={{
            backgroundColor: 'rgba(176, 149, 227, 0.20)',
            paddingHorizontal: normalizeWidth(14),
            paddingTop: normalizeHeight(7),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: normalizeHeight(12),
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <View>
            <Text style={[fstyles.mediumTen, { color: '#B095E3' }]}>
              Section {item.id}
            </Text>
            <Text
              style={[
                fstyles.semiFourteen,
                { marginVertical: normalizeHeight(4) },
              ]}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <Image source={images.CLOCK} style={styles.metaIcon} />
              <Text
                style={[
                  fstyles.twelweRegular,
                  {
                    color: 'rgba(238, 231, 249, 0.60)',
                    fontStyle: 'italic',
                    marginRight: 8,
                  },
                ]}>
                {item.duration} |
              </Text>
              <Image source={images.COURSEREADING} style={styles.metaIcon} />
              <Text
                style={[
                  fstyles.twelweRegular,
                  {
                    color: 'rgba(238, 231, 249, 0.60)',
                    fontStyle: 'italic',
                  },
                ]}>
                {item.lessonsCount} Chapters
              </Text>
            </View>
          </View>
          {isExpanded ? (
            <CircularProgress
              value={item.completedLessons}
              maxProgress={item.lessonsCount}
            />
          ) : (
            <Image
              source={images.HEADERBACKICON}
              style={{
                height: normalizeHeight(16),
                width: normalizeWidth(16),
                resizeMode: 'contain',
                transform: [{ rotate: '-90deg' }],
              }}
            />
          )}
        </TouchableOpacity>
        {isExpanded && (
          <View
            style={{
              paddingTop: normalizeHeight(16),
              paddingHorizontal: normalizeWidth(16),
            }}>
            {item.lessons.map((lesson, index) => (
              <View
                key={lesson.id}
                style={[styles.lessonRow, lesson.isLocked && { opacity: 0.5 }]}>
                <View style={styles.lessonIndex}>
                  <Text style={styles.lessonIndexText}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: lesson.isLocked ? '#888' : 'white',
                    }}>
                    {lesson.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={
                        lesson.type === 'video'
                          ? images.COURSEVIDEO
                          : images.COURSEREADING
                      }
                      style={{
                        height: normalizeHeight(12),
                        width: normalizeWidth(12),
                        resizeMode: 'contain',
                        marginRight: 4,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          fstyles.mediumTen,
                          {
                            color: '#B095E3',
                            marginTop: normalizeHeight(3),
                          },
                        ]}>
                        {lesson.type.charAt(0).toUpperCase() +
                          lesson.type.slice(1)}{' '}
                        |{' '}
                      </Text>
                      <Image
                        source={images.CLOCK}
                        style={{
                          height: normalizeHeight(12),
                          width: normalizeWidth(12),
                          resizeMode: 'contain',
                          marginHorizontal: 4,
                        }}
                      />
                      <Text
                        style={[
                          fstyles.mediumTen,
                          {
                            color: '#B095E3',
                            marginTop: normalizeHeight(3),
                          },
                        ]}>
                        {lesson.duration}
                      </Text>
                    </View>
                  </View>

                  {lesson.progress > 0 && lesson.progress < 1 && (
                    <View style={{ marginTop: normalizeHeight(6) }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flex: 0.6,
                        }}>
                        <View
                          style={{
                            width: normalizeWidth(197),
                            height: normalizeHeight(3),
                            backgroundColor: '#D3C4EF',
                            borderRadius: 3,
                            overflow: 'hidden',
                          }}>
                          <View
                            style={{
                              width: `${Math.abs(Number(60))}%`,
                              height: '100%',
                              backgroundColor:
                                Number(60) < 0 ? 'red' : '#B095E3',
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            style={[
                              fstyles.mediumTen,
                              { color: 'rgba(238, 231, 249, 0.60)' },
                            ]}>
                            {lesson.remaining}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
                <View>
                  {lesson.isLocked ? (
                    <Image
                      source={images.YELLOWLOCK}
                      style={{
                        height: normalizeHeight(18),
                        width: normalizeWidth(18),
                        resizeMode: 'contain',
                      }}
                    />
                  ) : lesson.completed ? (
                    <Image
                      source={images.TICKWHITECIRCLE}
                      style={{
                        height: normalizeHeight(16),
                        width: normalizeWidth(16),
                        resizeMode: 'contain',
                      }}
                    />
                  ) : null}
                </View>
              </View>
            ))}

            <View
              style={[
                fstyles.line,
                { backgroundColor: 'rgba(129, 95, 196, 0.30)' },
              ]}
            />
          </View>
        )}
        <View
          style={{
            backgroundColor: isExpanded
              ? 'transparent'
              : 'rgba(176, 149, 227, 0.20)',
            marginBottom: normalizeHeight(1),
          }}>
          <View
            style={[
              {
                borderTopWidth: isExpanded ? 1 : 0,
                borderTopColor: 'rgba(176, 149, 227, 0.16)',
                backgroundColor: '#170637',
                borderTopLeftRadius: isExpanded ? 12 : 0,
                borderTopRightRadius: isExpanded ? 12 : 0,
                borderRightWidth: isExpanded ? 1 : 0,
                borderLeftWidth: isExpanded ? 1 : 0,
                overflow: 'hidden',
              },
            ]}>
            <LinearGradient
              colors={[
                'rgba(176, 149, 227, 0.20)',
                'rgba(176, 149, 227, 0.09)',
              ]}
              locations={[0.0885, 0.739]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.91, y: 0.41 }}
              style={{
                borderRadius: 12,
                marginHorizontal: normalizeWidth(12),
                marginBottom: normalizeHeight(16),
                marginTop: normalizeHeight(12),
              }}>
              <View style={styles.ctaContainer}>
                <View>
                  <Text style={fstyles.semiTwelwe}>{item.test.title}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      marginTop: normalizeHeight(4),
                    }}>
                    <Image source={images.LINESSTAR} style={styles.metaIcon} />
                    <Text
                      style={[
                        fstyles.mediumTen,
                        { color: 'rgba(238, 231, 249, 0.60)' },
                      ]}>
                      {item.test.type} |{' '}
                    </Text>
                    <Image
                      source={images.COURSEVIDEO}
                      style={styles.metaIcon}
                    />
                    <Text
                      style={[
                        fstyles.mediumTen,
                        { color: 'rgba(238, 231, 249, 0.60)' },
                      ]}>
                      {item.test.duration} |{' '}
                    </Text>
                    <Image source={images.LINESSTAR} style={styles.metaIcon} />
                    <Text
                      style={[
                        fstyles.mediumTen,
                        { color: 'rgba(238, 231, 249, 0.60)' },
                      ]}>
                      {item.test.points}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.ctaButton}>
                  <Text style={[fstyles.semiTwelwe, { color: '#A19AA9' }]}>
                    {item.test.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  };

  const resourcesData = [
    {
      id: '1',
      img: images.PDFICON,
      title: 'UI Basics - Introduction.pdf',
      fileSize: '1.2 MB PDF File',
    },
    {
      id: '2',
      img: images.VIDEOICON,
      title: 'UX Research Explained.mp4',
      fileSize: '15.6 MB Video File',
    },
    {
      id: '3',
      img: images.IMAGEICON,
      title: 'Wireframe Sample.png',
      fileSize: '3.1 MB Image File',
    },
    {
      id: '4',
      img: images.PPTICON,
      title: 'Design Principles.pptx',
      fileSize: '5.4 MB PPT File',
    },
    {
      id: '5',
      img: images.DOCICON,
      title: 'User Persona Template.docx',
      fileSize: '600 KB Document File',
    },
  ];

  const ResourcesCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(129, 95, 196, 0.3)',
          backgroundColor: 'rgba(48, 11, 115, 0.40)',
          overflow: 'hidden',
          marginHorizontal: normalizeWidth(24),
          marginBottom: normalizeHeight(16),
        }}>
        <LinearGradient
          colors={['rgba(211, 196, 239, 0.00)', 'rgba(211, 196, 239, 0.20)']}
          locations={[0.0502, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.4 }}
          style={{
            padding: 16,
            borderRadius: 12,
          }}>
          <View style={fstyles.flexAlign}>
            <Image
              source={images.COURSEREADING}
              style={{
                height: normalizeHeight(24),
                width: normalizeWidth(24),
                resizeMode: 'contain',
              }}
            />
            <View style={{ marginLeft: normalizeWidth(16) }}>
              <Text style={fstyles.semiTwelwe}>{item.title}</Text>
              <Text
                style={[
                  fstyles.mediumTen,
                  {
                    color: 'rgba(238, 231, 249, 0.60)',
                    lineHeight: normalizeHeight(15),
                  },
                ]}>
                {item.fileSize}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const notesData = [
    {
      id: 's1',
      title: 'UI Principles',
      items: [
        {
          id: '1',
          title: 'Consistency in Design',
          content: 'Explanation about design consistency...',
        },
        {
          id: '2',
          title: 'Hierarchy & Typography',
          content: 'Explanation about visual hierarchy...',
        },
      ],
    },
    {
      id: 's2',
      title: 'UX Practices',
      items: [
        {
          id: '1',
          title: 'User Journey Mapping',
          content: 'Explanation about mapping the user journey...',
        },
        {
          id: '2',
          title: 'Personas',
          content: 'Explanation about creating personas...',
        },
      ],
    },
  ];

  const toggleItem = (sectionId, itemId) => {
    setExpandedMap(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [itemId]: !prev[sectionId]?.[itemId],
      },
    }));
  };
  const NotesCard = ({ item: section }) => {
    // const isOpen = expanded[item.id];
    return (
      <View style={{ marginBottom: 16 }}>
        {/* Section Header */}
        <Text style={styles.sectionHeader}>{section.title}</Text>

        {/* Collapsible Items */}
        {section.items.map(item => {
          const isOpen = expandedMap?.[section.id]?.[item.id];

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleItem(section.id, item.id)}
              activeOpacity={0.8}
              style={styles.cardContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.toggleIcon}>{isOpen ? '-' : '+'}</Text>
              </View>

              {isOpen && (
                <View style={styles.contentBox}>
                  <Text style={styles.content}>{item.content}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View>
        {/* <Image
          source={images.COURSEBACKGROUND}
          style={{
            height: normalizeHeight(278),
            width: normalizeWidth(363),
            resizeMode: 'contain',
          }}
        /> */}


         <View style={{}}>
     <Video
    source={{ uri: 'https://lms-courses-uploads.s3.ap-south-1.amazonaws.com/development/4/5/59/videos/Nextjs_Full_stack_course.m3u8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWIJIUODFNDW4SLSP%2F20250806%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250806T145713Z&X-Amz-Expires=10000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCmFwLXNvdXRoLTEiSDBGAiEAzsmxXwBpCrummokG81hBYA8XlDk3GQx2gcKYxEdLk%2FYCIQCZRKIGmLN9WO0xadtPuFnccP%2BgqCqgPI2oYoaAdBL24Cq%2FBQh3EAAaDDQzMDExODgyNjE4NiIM%2F5Ks%2B0nkKzSvJicYKpwFVjB7Vy1c464nbsiB9TbHVH4ixR9OfxRyQqgDponUBVycBJWI7PsmMMPNxYjZAi2AZTA%2FYrWQKH1HUuqtpK%2BSlZheFlzB0RtIg7oNew0yUf4JhopN4Jz9bcfcVTE0m7YmKVEpFmvHUWkEx9S1mplnmRAw9%2FH9uH1K31sJCKX42Hmysj2Dbu1ISu5U5PZ%2BGp6qUIDk80Kl4cvdMEBVWjLyKNq3Z4HR2IWmYjYfXvuTlxggVHhGlooFN1wmVMeqXFTTvKrQWs%2BVn9tzGGwS%2Bhg3pkZuoq5GivGn80SqDDnFkS%2B1dKIHKn7TGFdAH8i351Y%2B44%2FpoL2tIzcWvhol1BXw9lxFvEXRQOR7N1zPBx4m64nXJ4DPPAPMUDOnYcdEJ%2BbuSHW%2Fm0uz4g3AiVsHpv5AXeK2muK1%2FItFn4EtQCAEY3jqLJyE6CnGO%2FmIQCTwHc7Zo3it4yqaQpdKxWKquWVbMH1Vwz%2Bb3MLb4z2kBft0ET4kSPDBOKETjBD9CeHURMecUF74SzpA7vwKs79PFHMy%2BEQXFZAQJHxLBF80J%2B1K9OSldCI7SZTjC3H0DBk98IkOToceOx2r1gjqWt8jklBIZ6ZAGuShd7jWUz6hbnkorpuVMl9WdWYP8yFKFlKL2Uc2wCBOTbOQNj41DYz3ZjPistbKQhClq1cDqD7k0Kd0Z%2FUDBqZ%2FLfIb%2Bf%2B21gcayHQu%2FAg33h74aERiaa2CtyBZdiAY6O4mYi8hYDx3jJ7lO%2B1oBuQK3nZVZJGMetAO1gmKjyIVOM0Irr%2FjIB8oz7EP9%2FyYKxWc%2BeBDbe9CatkGYHV5Iv3ktrATG%2FZl4oHWKfLYkxFkG8u57ofb7xtvTfpBY4tka38vkTuRFCDGFW8jOIm5errsCAKSPf7UGaMwir7NxAY6sAFEDkaURfx4mRjXukcz14ojd2%2F2vwTvUEhUJmUbKarysA65InT3tuXmhA%2F2WSud3dlW6AAOe4Jqvlhrc3hoX%2FPao5uGoOX4J4nmbSQ5OhXV9iWvO2DLsZNiDzJsCYbCFiUq68NZ7OmaL2NL21GFFPABN1Ae%2BaXv5bgiOJTA4jtXz8mfKyo6aCYj2vbc%2BE7K%2F8qd9%2Bd80ys%2BL3xMdMGk0OvHJ3Vkx2uG3BDabYk3p8bsxg%3D%3D&X-Amz-Signature=b74677c0f04324892a1bdbab94dface1e673820b5d73ab7609313e804c7ba624&X-Amz-SignedHeaders=host' }}
    style={{ width: '100%', aspectRatio: 16 / 9 }}
    controls={true}
    fullscreen={true?console.log('fulllsrreee'):console.log('half screeennnn')}
    fullscreenOrientation='landscape'
    hideShutterView
  />
    </View>
      </View>
      <ScrollView>
        <LinearGradient
          colors={['#1C0743', '#090215']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
          <View>
            <View
              style={{
                marginTop: normalizeHeight(31),
                marginHorizontal: normalizeWidth(24),
              }}>
              <Text style={fstyles.heavyTwentyFour}>UIUX Design Course</Text>
              <Text
                style={[
                  fstyles.twelweRegular,
                  { fontStyle: 'italic', marginTop: 4, color: '#F6F3FC' },
                ]}>
                Master the fundamentals of UI/UX design and build stunning,
                user-friendly digital experiences.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: normalizeWidth(24),
                marginTop: normalizeHeight(28),
                alignItems: 'center',
              }}>
              <View style={styles.container}>{stars}</View>
              <Text style={fstyles.semiFourteen}>4.2 (4.2k reviews)</Text>
            </View>
          </View>
          <LinearGradient
            colors={[
              'rgba(129, 95, 196, 0.10)', // start color at 1.52%
              'rgba(129, 95, 196, 0.40)', // end color at 79.34%
            ]}
            locations={[0.0152, 0.7934]} // converted from 1.52%, 79.34%
            start={{ x: 0, y: 0 }}
            end={{ x: 0.9744, y: 0.225 }} // 103deg ≈ (cosθ ≈ 0.9744, sinθ ≈ 0.2250)
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'rgba(211, 196, 239, 0.20)',
              paddingVertical: normalizeHeight(14),
              paddingHorizontal: normalizeWidth(14),
              marginHorizontal: normalizeWidth(24),
              marginVertical: normalizeHeight(24),
            }}>
            {/* content goes here */}
            <Text style={[fstyles.boldFourteen, { color: '#B095E3' }]}>
              My Progress
            </Text>
            <View
              style={{
                marginTop: normalizeHeight(12),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={[fstyles.semiTwelwe, { color: '#F6F3FC' }]}>
                2/8 modules completed
              </Text>
              <LinearGradient
                colors={[
                  'rgba(129, 95, 196, 0.40)', // at 44.03%
                  '#815FC4', // at 101.85%
                ]}
                locations={[0.4403, 1.0185]} // Converted from 44.03%, 101.85%
                start={{ x: 0, y: 0 }}
                end={{ x: 0.559, y: 0.829 }} // 124deg ≈ cos(124°) = 0.559, sin(124°) = 0.829
                style={{
                  borderRadius: 12,
                  paddingVertical: normalizeHeight(4),
                  paddingHorizontal: normalizeWidth(8),
                }}>
                <Text style={[fstyles.mediumTen, { color: '#EEE7F9' }]}>17%</Text>
              </LinearGradient>
            </View>

            <View
              style={{
                width: '100%',
                height: normalizeHeight(6),
                backgroundColor: 'rgba(176, 149, 227, 0.16)',
                borderRadius: 3,
                overflow: 'hidden',
                marginTop: normalizeHeight(8),
                marginBottom: normalizeHeight(12),
              }}>
              <View
                style={{
                  width: `${Math.abs(Number(20))}%`,
                  height: '100%',
                  backgroundColor: '#815FC4',
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: 'rgba(129, 95, 196, 0.20)',
                borderRadius: 8,
                paddingHorizontal: normalizeWidth(12),
                paddingVertical: normalizeHeight(12),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ flex: 3 }}>
                <Text
                  style={[
                    fstyles.mediumTen,
                    {
                      color: 'rgba(238, 231, 249, 0.60)',
                      lineHeight: normalizeHeight(15),
                      letterSpacing: 0.5,
                    },
                  ]}>
                  Videos:
                </Text>
                <Text
                  style={[
                    fstyles.boldTwelwe,
                    { color: '#EEE7F9', marginTop: normalizeHeight(4) },
                  ]}>
                  4
                  <Text
                    style={[
                      fstyles.mediumTen,
                      { color: 'rgba(238, 231, 249, 0.60)' },
                    ]}>
                    /36
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flex: 3.33,
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderRightColor: 'rgba(176, 149, 227, 0.16)',
                  borderLeftWidth: 1,
                  borderLeftColor: 'rgba(176, 149, 227, 0.16)',
                }}>
                <Text
                  style={[
                    fstyles.mediumTen,
                    {
                      color: 'rgba(238, 231, 249, 0.60)',
                      lineHeight: normalizeHeight(15),
                      letterSpacing: 0.5,
                    },
                  ]}>
                  Readings:
                </Text>
                <Text
                  style={[
                    fstyles.boldTwelwe,
                    { color: '#EEE7F9', marginTop: normalizeHeight(4) },
                  ]}>
                  4
                  <Text
                    style={[
                      fstyles.mediumTen,
                      { color: 'rgba(238, 231, 249, 0.60)' },
                    ]}>
                    /36
                  </Text>
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', flex: 3.33 }}>
                <Text
                  style={[
                    fstyles.mediumTen,
                    {
                      color: 'rgba(238, 231, 249, 0.60)',
                      lineHeight: normalizeHeight(15),
                      letterSpacing: 0.5,
                    },
                  ]}>
                  Quizzes:
                </Text>
                <Text
                  style={[
                    fstyles.boldTwelwe,
                    {
                      color: '#EEE7F9',
                      marginTop: normalizeHeight(4),
                      textAlign: 'center',
                    },
                  ]}>
                  4
                  <Text
                    style={[
                      fstyles.mediumTen,
                      { color: 'rgba(238, 231, 249, 0.60)' },
                    ]}>
                    /36
                  </Text>
                </Text>
              </View>
            </View>
          </LinearGradient>
          <FlatList
            data={courseOptions}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={{}}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isSelected = selectedIndex === index;
              return (
                <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                  <Text
                    style={{
                      color: isSelected ? 'white' : 'rgba(238, 231, 249, 0.60)',
                      fontSize: 14,
                      fontWeight: isSelected ? '800' : '400',
                      paddingHorizontal: normalizeWidth(12),
                    }}>
                    {item.title}
                  </Text>

                  <View
                    style={{
                      borderBottomWidth: isSelected ? 1.5 : 1,
                      borderBottomColor: isSelected
                        ? '#B095E3'
                        : 'rgba(238, 231, 249, 0.60)',
                      marginTop: 4,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </LinearGradient>
        {selectedIndex === 0 || selectedIndex === 1 || selectedIndex === 2 && <FlatList
          keyExtractor={(item, index) => `_${index}`}
          horizontal
          data={exploreCourses}
          renderItem={RenderFPList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: normalizeWidth(23),
            marginBottom: normalizeHeight(16),
            marginTop: normalizeHeight(24),
          }}
        />}
        {
          selectedIndex === 0 ? (
            <FlatList
              data={modulesData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={ModulesCard}
            />
          ) : selectedIndex === 1 ? (
            <FlatList
              data={resourcesData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={ResourcesCard}
            />
          ) : selectedIndex === 4 ? (
            //overview section
            <View>
              <Text style={fstyles.heavyTwentyFour}>overview section</Text>
            </View>
          ) :
            (
              <>
                <LinearGradient
                  colors={[
                    'rgba(211, 196, 239, 0)', // 0% transparent
                    'rgba(211, 196, 239, 0.10)', // 100% faded light purple
                  ]}
                  locations={[0.0502, 1]} // 5.02%, 100%
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }} // 98deg ≈ horizontal gradient
                  style={{
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(176, 149, 227, 0.16)', // var(--Primary-Light-16)
                    backgroundColor: 'rgba(48, 11, 115, 0.40)', // fallback background layer
                    padding: 16,
                    marginHorizontal: normalizeWidth(24),
                    // your inner padding if needed
                  }}>
                  {/* Inner content goes here */}
                  {/* implement fonts and check the design for notes */}
                </LinearGradient>
                <FlatList
                  data={notesData}
                  keyExtractor={item => item.id}
                  renderItem={NotesCard}
                  contentContainerStyle={{
                    paddingHorizontal: normalizeWidth(16),
                    paddingVertical: normalizeHeight(16),
                  }}
                />
              </>
            )
          //  implement fonts and check the design for notes
        }
      </ScrollView>
    </View>
  );
};

export default OngoingCourses;

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
  card: {
    backgroundColor: '#1C0743',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#B095E3',
    fontSize: 12,
  },
  sectionSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  metaText: {
    color: '#B095E3',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#815FC4',
    marginVertical: 12,
    opacity: 0.3,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lessonIndex: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    backgroundColor: '#3F2D73',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonIndexText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  lessonTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  lessonMeta: {
    fontSize: 12,
    color: '#B095E3',
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3F2D73',
  },
  remainingText: {
    fontSize: 10,
    color: '#AAA',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  ctaContainer: {
    borderRadius: 10,
    // padding: 12,
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#232127',
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(8),
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ctaMeta: {
    fontSize: 10,
    color: '#B095E3',
  },

  metaIcon: {
    height: normalizeHeight(12),
    width: normalizeWidth(12),
    resizeMode: 'contain',
    marginRight: 4,
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
    color: '#D3C4EF',
  },
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.2)',
    backgroundColor: '#1F144A',
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  toggleIcon: {
    fontSize: 18,
    color: '#B095E3',
  },
  contentBox: {
    marginTop: 8,
  },
  content: {
    fontSize: 12,
    color: '#D3C4EF',
    lineHeight: 18,
  },
});
