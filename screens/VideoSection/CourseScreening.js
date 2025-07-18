import React, {use, useContext, useMemo, useState} from 'react';
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
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import LinearGradient from 'react-native-linear-gradient';

const CourseScreening = props => {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expanded, setExpanded] = useState({});
  const {isDark, colors} = useContext(ThemeContext);
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
            style={[styles.partialOverlay, {width: `${partialStar * 100}%`}]}>
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
          style={[styles.star, {tintColor: '#ccc'}]}
        />,
      );
    }
  }
  const toggleExpandedDetails = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      subtitle: 'UI Vs UX fundamentals',
      info: '3 Sections | 09 Videos | 03 Readings',
      duration: '6 Hours to complete',
      points: ['Intro to UI/UX', 'User Research', 'Wireframing'],
    },
    {
      id: 2,
      title: 'Module 2',
      subtitle: 'Design Principles',
      info: '4 Sections | 12 Videos | 04 Readings',
      duration: '5 Hours to complete',
      points: ['Color Theory', 'Typography', 'Spacing', 'Hierarchy'],
    },
    {
      id: 3,
      title: 'Module 3',
      subtitle: 'Interaction Design',
      info: '2 Sections | 06 Videos | 02 Readings',
      duration: '4 Hours to complete',
      points: ['Motion', 'Microinteractions'],
    },
    {
      id: 4,
      title: 'Module 4',
      subtitle: 'Usability Testing',
      info: '3 Sections | 07 Videos | 02 Readings',
      duration: '3.5 Hours to complete',
      points: ['User Testing', 'Heuristic Evaluation', 'A/B Testing'],
    },
  ];

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
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <TouchableOpacity style={styles.header}>
          <Text
            style={{
              color: '#E5DCF6',
              fontSize: 14,
              fontWeight: '400',
              lineHeight: normalizeHeight(18),
            }}>
            {item.title}
          </Text>
          <Image
            source={images.HEADERBACKICON}
            style={{
              height: normalizeHeight(16),
              width: normalizeWidth(16),
              resizeMode: 'contain',
              transform: [{rotate: isOpen ? '90deg' : '-90deg'}],
              color: '#B095E3',
            }}
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.content}>
            <Text
              style={[
                fstyles.mediumTen,
                {color: 'rgba(255, 255, 255, 0.60)', letterSpacing: 0.5},
              ]}>
              {item.content}
            </Text>
          </View>
        )}
        <View
          style={{
            height: normalizeHeight(1),
            backgroundColor: 'rgba(129, 95, 196, 0.30)',
            width: '100%',
            marginVertical: normalizeHeight(12),
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderItemDetails = ({item}) => {
    const isExpanded = expandedItems[item.id];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => toggleExpandedDetails(item.id)}>
        <LinearGradient
          colors={[
            'rgba(129, 95, 196, 0)',
            'rgba(129, 95, 196, 0.3)',
            'rgba(129, 95, 196, 0)',
          ]}
          locations={[0.2245, 0.9286, 1.2406]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(211, 196, 239, 0.2)',
            paddingHorizontal: normalizeWidth(16),
            paddingTop: normalizeHeight(12),
            paddingBottom: normalizeHeight(16),
            marginHorizontal: normalizeWidth(16),
            marginVertical: normalizeHeight(8),
          }}>
          <Text style={[fstyles.mediumTen, {color: '#D3C4EF'}]}>
            {item.title}
          </Text>
          <Text
            style={[
              fstyles.extraBoldFourteen,
              {marginTop: normalizeHeight(4)},
            ]}>
            {item.subtitle}
          </Text>

          <View
            style={{
              height: normalizeHeight(1),
              backgroundColor: 'rgba(129, 95, 196, 0.30)',
              width: '100%',
              marginVertical: normalizeHeight(8),
            }}
          />

          <View style={fstyles.flexAlignJustify}>
            <Text style={fstyles.boldTwelwe}>{item.info}</Text>

            {/* Arrow Icon - Static Rotate */}
            <Image
              source={images.HEADERBACKICON}
              style={{
                height: normalizeHeight(16),
                width: normalizeWidth(16),
                resizeMode: 'contain',
                transform: [{rotate: isExpanded ? '90deg' : '-90deg'}],
                tintColor: '#B095E3',
              }}
            />
          </View>

          {/* Detail Expand Section */}
          {isExpanded && (
            <View
              style={{
                backgroundColor: 'rgba(176, 149, 227, 0.13)',
                borderRadius: 20,
                marginTop: normalizeHeight(8),
                paddingVertical: normalizeHeight(12),
                paddingHorizontal: normalizeWidth(8),
              }}>
              {item.points.map((point, index) => (
                <View style={styles.containerTwo} key={index}>
                  <View style={styles.leftSection}>
                    <View style={styles.dot} />
                    {index !== item.points.length - 1 && (
                      <View style={styles.verticalLine} />
                    )}
                  </View>
                  <View style={styles.rightSection}>
                    <Text style={fstyles.mediumTen}>{point}</Text>
                  </View>
                </View>
              ))}

              <View style={fstyles.flexAlign}>
                <Image
                  source={images.STOPWATCH}
                  style={{
                    height: normalizeHeight(12),
                    width: normalizeWidth(12),
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={[
                    fstyles.semiTwelwe,
                    {color: '#B095E3', marginLeft: normalizeWidth(4)},
                  ]}>
                  {item.duration}
                </Text>
              </View>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
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
      <View
        style={{
          backgroundColor: 'rgba(176, 149, 227, 0.16)',
          marginRight: normalizeWidth(12),
          borderRadius: 12,
          width: normalizeWidth(290),
          paddingHorizontal: normalizeWidth(14),
          paddingVertical: normalizeHeight(18),
        }}>
        <Text
          style={[
            fstyles.twelweRegular,
            {color: '#F6F3FC', fontStyle: 'italic'},
          ]}>
          "This course made UI/UX so easy to understand. The hands-on projects
          really boosted my confidence!"
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: normalizeHeight(12),
          }}>
          <View style={{backgroundColor: 'rgba(0, 0, 0, 0.20) '}}>
            <Image
              source={images.FEMALEAVATAR}
              style={{
                height: normalizeHeight(24),
                width: normalizeWidth(24),
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{marginLeft: normalizeWidth(8)}}>
            <Text style={[fstyles.boldTwelwe, {color: '#F6F3FC'}]}>
              Shravani |{' '}
              <Text
                style={[
                  fstyles.mediumTen,
                  {color: 'rgba(229, 220, 246, 0.40)'},
                ]}>
                Student 1
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: normalizeHeight(48),
          marginHorizontal: normalizeWidth(20),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={images.HEADERBACKICON}
            style={{
              height: normalizeHeight(20),
              width: normalizeWidth(20),
              resizeMode: 'contain',
            }}
          />
          <Text style={[fstyles.boldSixteen, {marginLeft: normalizeWidth(8)}]}>
            UI/UX Design Course
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Image
              source={images.SHAREICON}
              style={{
                height: normalizeHeight(16),
                width: normalizeWidth(16),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={images.FAVOURITES}
              style={{
                height: normalizeHeight(16),
                width: normalizeWidth(16),
                resizeMode: 'contain',
                marginLeft: normalizeWidth(20),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: normalizeHeight(24)}}>
        <ImageBackground
          source={images.COURSEBACKGROUND}
          style={{height: normalizeHeight(260), width: '100%'}}
          resizeMode="stretch"
        />
      </View>
      <ScrollView>
        <LinearGradient
          colors={['#1C0743', '#090215']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={{flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32}}>
          {/* <LinearGradient
        colors={['#1C0743', '#090215']}
        start={{x: 0.5, y: -0.0706}}
        end={{x: 0.5, y: 0.3676}}
        style={{flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32}}> */}
          <View>
            <View style={{}}>
              <View
                style={{
                  marginTop: normalizeHeight(31),
                  marginHorizontal: normalizeWidth(24),
                }}>
                <Text style={fstyles.heavyTwentyFour}>UIUX Design Course</Text>
                <Text
                  style={[
                    fstyles.twelweRegular,
                    {fontStyle: 'italic', marginTop: 4},
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
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={courseDesign}
              numColumns={2}
              contentContainerStyle={{
                marginLeft: normalizeWidth(24),
                marginTop: normalizeHeight(28),
                marginBottom: normalizeHeight(16),
              }}
              keyExtractor={(item, index) => `_${index}`}
              renderItem={({item}) => {
                return (
                  <>
                    <View style={styles.wrapper}>
                      <LinearGradient
                        colors={[
                          'rgba(28, 7, 67, 0.5)',
                          'rgba(80, 19, 192, 0.5)',
                          'rgba(28, 7, 67, 0.5)',
                        ]}
                        locations={[0.0866, 0.5201, 0.8421]}
                        start={{x: 0, y: 0}}
                        end={{
                          x: Math.cos((112 * Math.PI) / 180),
                          y: Math.sin((112 * Math.PI) / 180),
                        }}
                        style={styles.gradient}>
                        <View style={styles.overlay} />
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={images.STOPWATCH}
                            style={{
                              height: normalizeHeight(12),
                              width: normalizeWidth(12),
                              resizeMode: 'contain',
                              marginRight: normalizeWidth(8),
                            }}
                          />
                          <Text style={fstyles.semiTwelwe}>{item.title}</Text>
                        </View>
                      </LinearGradient>
                    </View>
                  </>
                );
              }}
            />
            <FlatList
              data={courseOptions}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={{}}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                const isSelected = selectedIndex === index;

                return (
                  <TouchableOpacity
                    onPress={() => setSelectedIndex(index)}
                    style={{}}>
                    <Text
                      style={{
                        color: isSelected
                          ? 'white'
                          : 'rgba(238, 231, 249, 0.60)',
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
            <View
              style={{
                marginHorizontal: normalizeWidth(16),
                marginTop: normalizeHeight(24),
              }}>
              <Text style={[fstyles.boldSixteen, {color: '#815FC4'}]}>
                Overview
              </Text>
              <Text
                style={[
                  fstyles.twelweRegular,
                  {
                    marginTop: normalizeHeight(8),
                    fontStyle: 'italic',
                    color: '#D3C4EF',
                  },
                ]}>
                Master the fundamentals of UI/UX design and build stunning,
                user-friendly digital experiences.Master the fundamentals of
                UI/UX design and build stunning, user-friendly digital
                experiences.
              </Text>
              <Text
                style={[
                  fstyles.semiTwelwe,
                  {color: '#B095E3', paddingTop: normalizeHeight(4)},
                ]}>
                Read More..
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: normalizeWidth(16),
                marginTop: normalizeHeight(28),
              }}>
              <Text
                style={[
                  fstyles.boldFourteen,
                  {color: '#B095E3', fontStyle: 'italic'},
                ]}>
                Here’s What you’ll learn
              </Text>
            </View>

            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingHorizontal: normalizeWidth(16),
                paddingVertical: normalizeHeight(16),
              }}
            />

            <View style={{marginHorizontal: normalizeWidth(16)}}>
              <Text
                style={[
                  fstyles.semiFourteen,
                  {color: '#B095E3', fontStyle: 'italic'},
                ]}>
                Skills you’ll gain
              </Text>

              <FlatList
                showsHorizontalScrollIndicator={false}
                data={gainingSkills}
                numColumns={3}
                contentContainerStyle={{
                  marginTop: normalizeHeight(12),
                  marginBottom: normalizeHeight(20),
                }}
                keyExtractor={(item, index) => `_${index}`}
                renderItem={({item}) => {
                  return (
                    <>
                      <View
                        style={{
                          marginRight: normalizeWidth(8),
                          marginBottom: normalizeHeight(12),
                          borderRadius: normalizeWidth(12),
                        }}>
                        <LinearGradient
                          colors={[
                            'rgba(28, 7, 67, 0.5)',
                            'rgba(80, 19, 192, 0.5)',
                            'rgba(28, 7, 67, 0.5)',
                          ]}
                          locations={[0.0866, 0.5201, 0.8421]}
                          start={{x: 0, y: 0}}
                          end={{
                            x: Math.cos((112 * Math.PI) / 180),
                            y: Math.sin((112 * Math.PI) / 180),
                          }}
                          style={{
                            paddingHorizontal: normalizeWidth(8),
                            paddingVertical: normalizeHeight(4),
                            borderRadius: normalizeWidth(12),
                          }}>
                          <View style={styles.overlay} />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={images.STOPWATCH}
                              style={{
                                height: normalizeHeight(10),
                                width: normalizeWidth(10),
                                resizeMode: 'contain',
                                marginRight: normalizeWidth(8),
                              }}
                            />
                            <Text
                              style={[fstyles.mediumTen, {color: '#D3C4EF'}]}>
                              {item.title}
                            </Text>
                          </View>
                        </LinearGradient>
                      </View>
                    </>
                  );
                }}
              />

              <View
                style={{
                  height: normalizeHeight(1),
                  width: '100%',
                  backgroundColor: 'rgba(238, 231, 249, 0.40)',
                  marginBottom: normalizeHeight(20),
                }}
              />
            </View>
            <View style={{marginHorizontal: normalizeWidth(16)}}>
              <Text style={[fstyles.boldSixteen, {color: '#815FC4'}]}>
                Course Content
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowDetails(!showDetails)}>
              <LinearGradient
                colors={[
                  'rgba(129, 95, 196, 0)',
                  'rgba(129, 95, 196, 0.3)',
                  'rgba(129, 95, 196, 0)',
                ]}
                locations={[0.2245, 0.9286, 1.2406]}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(211, 196, 239, 0.2)',
                  paddingHorizontal: normalizeWidth(16),
                  paddingTop: normalizeHeight(12),
                  paddingBottom: normalizeHeight(16),
                  marginHorizontal: normalizeWidth(16),
                  marginVertical: normalizeHeight(16),
                }}>
                {/* Static Top Section */}
                <>
                  <Text style={[fstyles.mediumTen, {color: '#D3C4EF'}]}>
                    Module 1
                  </Text>
                  <Text
                    style={[
                      fstyles.extraBoldFourteen,
                      {marginTop: normalizeHeight(4)},
                    ]}>
                    UI Vs UX fundamentals
                  </Text>

                  <View
                    style={{
                      height: normalizeHeight(1),
                      backgroundColor: 'rgba(129, 95, 196, 0.30)',
                      width: '100%',
                      marginVertical: normalizeHeight(8),
                    }}
                  />

                  <View style={fstyles.flexAlignJustify}>
                    <Text style={fstyles.boldTwelwe}>
                      3 Sections
                      <Text
                        style={[
                          fstyles.mediumTen,
                          {
                            color: 'rgba(238, 231, 249, 0.60)',
                            letterSpacing: 0.5,
                          },
                        ]}>
                        {' '}
                        | 09 Videos | 03 Readings
                      </Text>
                    </Text>

                    {/* Arrow (rotated if open) */}
                    <Image
                      source={images.HEADERBACKICON}
                      style={{
                        height: normalizeHeight(16),
                        width: normalizeWidth(16),
                        resizeMode: 'contain',
                        transform: [{rotate: showDetails ? '90deg' : '-90deg'}],
                        tintColor: '#B095E3',
                      }}
                    />
                  </View>
                </>
                {/* Expandable Details */}
                {showDetails && (
                  <View
                    style={{
                      backgroundColor: 'rgba(176, 149, 227, 0.13)',
                      borderRadius: 20,
                      marginTop: normalizeHeight(8),
                      paddingVertical: normalizeHeight(12),
                      paddingHorizontal: normalizeWidth(8),
                    }}>
                    <FlatList
                      data={points}
                      keyExtractor={(item, index) => index.toString()}
                      scrollEnabled={false}
                      renderItem={({item, index}) => (
                        <View style={styles.containerTwo}>
                          <View style={styles.leftSection}>
                            <View style={styles.dot} />
                            {index !== points.length - 1 && (
                              <View style={styles.verticalLine} />
                            )}
                          </View>
                          <View style={styles.rightSection}>
                            <Text style={fstyles.mediumTen}>{item}</Text>
                          </View>
                        </View>
                      )}
                    />
                    <View style={fstyles.flexAlign}>
                      <Image
                        source={images.STOPWATCH}
                        style={{
                          height: normalizeHeight(12),
                          width: normalizeWidth(12),
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={[
                          fstyles.semiTwelwe,
                          {color: '#B095E3', marginLeft: normalizeWidth(4)},
                        ]}>
                        6 Hours to complete
                      </Text>
                    </View>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <FlatList
              data={modules}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItemDetails}
              contentContainerStyle={{paddingBottom: normalizeHeight(24)}}
            />
            <View
              style={{
                height: normalizeHeight(1),
                backgroundColor: 'rgba(129, 95, 196, 0.30)',
                width: '90%',
                marginVertical: normalizeHeight(20),
                marginHorizontal: normalizeWidth(20),
              }}
            />
            <Text
              style={[
                fstyles.boldSixteen,
                {color: '#815FC4', marginHorizontal: normalizeWidth(16)},
              ]}>
              Tutor Details
            </Text>
            <LinearGradient
              colors={[
                'rgba(48, 11, 115, 0.5)', // Primary-Dark-Hover fallback
                'rgba(9, 2, 21, 0.5)', // Primary-Dark-Active fallback
              ]}
              locations={[0.2977, 0.9462]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                borderRadius: 12,
                marginHorizontal: normalizeWidth(16),

                marginTop: normalizeHeight(52),
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(211, 196, 239, 0.20)',
                  borderRadius: 12,
                  paddingHorizontal: normalizeWidth(16),
                }}>
                {/* Your content here */}
                <View style={{position: 'absolute', top: -40}}>
                  <Image
                    source={images.TUTORIMAGE}
                    style={{
                      height: normalizeHeight(153),
                      width: normalizeWidth(103),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: normalizeWidth(116),
                    paddingTop: normalizeHeight(24),
                    paddingBottom: normalizeHeight(32),
                    borderRadius: 12,
                  }}>
                  <Text style={fstyles.boldSixteen}>Ritika Sharma</Text>
                  <Text style={[fstyles.twelweRegular, {color: '#D3C4EF'}]}>
                    12yr experience | ALLENS Staff
                  </Text>
                  <Text
                    style={[
                      fstyles.mediumTen,
                      {color: 'rgba(255, 255, 255, 0.50)'},
                    ]}>
                    An experienced educator with a passion for simplifying
                    complex concepts.
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <View
              style={{
                height: normalizeHeight(1),
                backgroundColor: 'rgba(129, 95, 196, 0.30)',
                width: '90%',
                marginVertical: normalizeHeight(20),
                marginHorizontal: normalizeWidth(20),
              }}
            />
            <View style={{marginHorizontal: normalizeWidth(16)}}>
              <Text style={[fstyles.boldFourteen, {color: '#815FC4'}]}>
                Reviews
              </Text>
            </View>

            <FlatList
              data={renderReview}
              keyExtractor={item => item.id}
              renderItem={renderReviewDetail}
              horizontal
              contentContainerStyle={{
                paddingHorizontal: normalizeWidth(16),
                paddingBottom: normalizeHeight(16),
                paddingTop: normalizeHeight(8),
              }}
            />

            <View style={{marginHorizontal: normalizeWidth(16)}}>
              <Text style={[fstyles.boldFourteen, {color: '#815FC4'}]}>
                FAQ’s
              </Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingHorizontal: normalizeWidth(16),
                paddingVertical: normalizeHeight(16),
              }}
            />
          </View>
          <View style={{marginBottom: normalizeHeight(100)}} />
        </LinearGradient>
      </ScrollView>

    <View style={{paddingBottom:normalizeHeight(23),paddingHorizontal:normalizeHeight(34),
      backgroundColor:"transparent",paddingTop:normalizeHeight(27)}}>
      <View style={{
        paddingHorizontal:normalizeHeight(12),
        // marginHorizontal:normalizeWidth(34),
        // marginBottom:normalizeHeight(23),
        paddingVertical:normalizeHeight(12),alignItems:"center",justifyContent:"center",
        backgroundColor:"#815FC4",borderRadius:12}}>
        <Text style={fstyles.boldFourteen}>Enroll Now</Text>
      </View>
      </View>
    </View>
  );
};

export default CourseScreening;

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
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: normalizeWidth(12),
    marginBottom: normalizeHeight(12),
  },
  gradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // 5% white overlay
    borderRadius: 12,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: normalizeHeight(12),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    marginTop: normalizeHeight(4),
  },

  containerTwo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftSection: {
    width: 20,
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B095E3',
    zIndex: 1,
  },
  verticalLine: {
    position: 'absolute',
    top: 8,
    width: 2,
    height: '160%',
    backgroundColor: '#B095E3',
  },
  rightSection: {
    flex: 1,
    paddingLeft: normalizeWidth(12),
  },
});
