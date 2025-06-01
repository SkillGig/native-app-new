import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import images from '../../assets/images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {fstyles} from '../../styles/FontStyles';
import LinearGradient from 'react-native-linear-gradient';
import { Bottomsheet } from '../../components';

const MainDash = ({navigation}) => {


  const BottomsheetRef = useRef(null);

  const handleStreakPress = () => BottomsheetRef.current?.present();
  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    const morningStart = 5 * 60; // 5:00 AM
    const morningEnd = 11 * 60 + 59; // 11:59 AM

    const afternoonStart = 12 * 60; // 12:00 PM
    const afternoonEnd = 16 * 60 + 30; // 4:30 PM

    // Evening: from 4:30 PM to next day 5:00 AM
    if (totalMinutes >= morningStart && totalMinutes <= morningEnd) {
      return 'Good Morning 🌞';
    } else if (totalMinutes >= afternoonStart && totalMinutes <= afternoonEnd) {
      return 'Good Afternoon ☀️';
    } else {
      return 'Good Evening 🌝 ';
    }
  };
  const gradientColors = ['#1C0743', '#090215'];

  const weekStatus = [
    {day: 'Mon', status: 'completed'},
    {day: 'Tue', status: 'yet_to_start'},
    {day: 'Wed', status: 'not_done'},
    {day: 'Thu', status: 'not_done'},
    {day: 'Fri', status: 'completed'},
    {day: 'Sat', status: 'yet_to_start'},
    {day: 'Sun', status: 'completed'},
  ];

  const statusMap = {
    completed: {
      icon: images.STREAKICON,
      color: '#4CAF50',
    },
    yet_to_start: {
      icon: images.YETTOSTARTSTREAK,
      color: '#2196F3',
    },
    not_done: {
      icon: images.STREAKFAILED,
      color: '#F44336',
    },
  };
  const today = new Date();
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = dayMap[today.getDay()]; // E.g., 'Wed'

  const courseFilter = [
    {
      id: '1',
      title: 'All',
    },
    {
      id: '12',
      title: 'Design',
    },
    {
      id: '7',
      title: 'Coding',
    },
    {
      id: '5',
      title: 'Animation',
    },
  ];

  const courseType = [
    {
      id: '1',
      title: 'All',
    },
    {
      id: '12',
      title: 'Design',
    },
    {
      id: '7',
      title: 'Animation',
    },
  ];

  return (
    <>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#300B73', flex: 1}}>
      <View
        style={{
          marginHorizontal: normalizeWidth(20),
          marginTop: normalizeHeight(32),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={images.FEMALEAVATAR}
                style={{
                  height: normalizeHeight(64),
                  width: normalizeWidth(64),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <View style={{marginLeft: normalizeWidth(10)}}>
              <Text
                style={[
                  fstyles.thirteenMedium,
                  {marginRight: normalizeWidth(4)},
                ]}>
                {getGreeting()}
              </Text>
              <Text style={[fstyles.twentyBold, {color: '#EEE7F9'}]}>
                Shravani
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={images.STOPWATCH}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(24),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft: normalizeWidth(12)}}>
              <Image
                source={images.NOTIFICATION}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(24),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <LinearGradient
          colors={['rgba(48, 11, 115, 0)', '#300B73']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.gradientContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{alignItems: 'center',backgroundColor:"red"}}
              onPress={handleStreakPress}
              >
                <Image
                  source={images.STREAKICON}
                  style={{
                    height: normalizeHeight(40),
                    width: normalizeWidth(40),
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={[
                    fstyles.twentyBold,
                    {
                      marginTop: normalizeHeight(2),
                      textAlign: 'center',
                    },
                  ]}>
                  2 Days
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: normalizeWidth(1),
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  alignSelf: 'stretch',
                  marginLeft: normalizeWidth(12),
                }}
              />
            </View>
            <View style={{flex: 1, marginLeft: normalizeWidth(12)}}>
              {/* Row 1: Weekday Labels */}
              <View style={styles.row}>
                {weekStatus.map((item, index) => {
                  const isToday = item.day === currentDay;
                  return (
                    <View key={`day-${index}`} style={styles.cell}>
                      <Text
                        style={[
                          fstyles.mediumTen,
                          {
                            color: isToday
                              ? 'white'
                              : 'rgba(229, 220, 246, 0.40)',
                            marginBottom: normalizeHeight(8),
                          },
                        ]}>
                        {item.day}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Row 2: Icons with today's icon highlighted */}
              <View style={styles.row}>
                {weekStatus.map((item, index) => {
                  const isToday = item.day === currentDay;
                  const {icon} = statusMap[item.status] || {};
                  return (
                    <View
                      key={`icon-${index}`}
                      style={[
                        styles.cell,
                        isToday && {
                          borderWidth: 1,
                          borderColor: 'white',
                          borderRadius: 15,
                          // padding: normalizeWidth(2),
                        },
                      ]}>
                      <Image
                        source={icon}
                        style={{
                          height: normalizeHeight(24),
                          width: normalizeWidth(24),
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(48, 11, 115, 0)', 'rgba(48, 11, 115, 0.5)']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#372258',
            paddingBottom: normalizeHeight(20),
          }}>
          <View
            style={{
              marginTop: normalizeHeight(48),
              marginLeft: normalizeWidth(20),
            }}>
            <Text
              style={[
                fstyles.boldSixteen,
                {
                  color: 'rgba(238, 231, 249, 0.60)',
                },
              ]}>
              Ongoing Courses
            </Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={courseFilter}
              horizontal
              keyExtractor={(item, index) => `_${index}`}
              renderItem={({item, index}) => {
                console.log(item, 'item.lengthhhh');
                return (
                  <View
                    style={{
                      width: normalizeWidth(208),
                      marginTop: normalizeHeight(16),
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(176, 149, 227, 0.4)',
                      overflow: 'hidden',
                      marginRight: item.length - 1 ? 0 : normalizeWidth(20),
                    }}>
                    <LinearGradient
                      colors={[
                        'rgba(70, 49, 115, 0.3)',
                        '#463173',
                        '#463173',
                        'rgba(70, 49, 115, 0.3)',
                      ]}
                      locations={[0, 0.49, 0.59, 1]}
                      start={{x: 0.5, y: 0}}
                      end={{x: 0.5, y: 1}}
                      style={{
                        paddingVertical: normalizeHeight(8),
                        paddingHorizontal: normalizeWidth(8),
                        borderRadius: 12,
                        width: '100%',
                      }}>
                      <View>
                        <Image
                          source={images.TESTONGOING}
                          style={{
                            height: normalizeHeight(78),
                            width: normalizeWidth(192),
                            resizeMode: 'contain',
                          }}
                        />
                        <View
                          style={{
                            marginTop: normalizeHeight(12),
                            marginHorizontal: normalizeWidth(4),
                          }}>
                          <Text style={fstyles.boldFourteen}>
                            Adobe Xd unlocked{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginTop: normalizeHeight(14),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: normalizeWidth(4),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={images.COURSEVIDEO}
                              style={{
                                height: normalizeHeight(14),
                                width: normalizeWidth(14),
                                resizeMode: 'contain',
                              }}
                            />
                            <Text
                              style={[
                                fstyles.boldTwelwe,
                                {marginLeft: normalizeWidth(4)},
                              ]}>
                              What is UI/UX?
                            </Text>
                          </View>
                          <Text
                            style={[
                              fstyles.semiTwelwe,
                              {
                                marginLeft: normalizeWidth(4),
                                color: 'rgba(238, 231, 249, 0.60)',
                              },
                            ]}>
                            2/8
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={[
                              fstyles.mediumTen,
                              {
                                color: 'rgba(238, 231, 249, 0.60)',
                                marginHorizontal: normalizeWidth(4),
                              },
                            ]}>
                            12min Remaining
                          </Text>
                        </View>

                        <View
                          style={{
                            width: normalizeWidth(184),
                            height: normalizeHeight(6),
                            backgroundColor: 'rgba(176, 149, 227, 0.16)',
                            borderRadius: 6,
                            overflow: 'hidden',
                            marginTop: normalizeHeight(4),
                          }}>
                          <LinearGradient
                            colors={['#300B73', '#815FC4']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{
                              width: `${Math.abs(59)}%`,
                              height: '100%',
                              borderRadius: 3,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            height: normalizeHeight(1),
                            width: '100%',
                            backgroundColor: '#B095E366',
                            marginTop: normalizeHeight(12),
                          }}
                        />
                        <Text
                          style={[
                            fstyles.semiTwelwe,
                            {
                              color: '#815FC4',
                              marginVertical: normalizeHeight(8),
                              textAlign: 'center',
                            },
                          ]}>
                          Resume Course
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                );
              }}
            />
          </View>
        </LinearGradient>

        <View
          style={{
            marginHorizontal: normalizeWidth(20),
            marginTop: normalizeHeight(20),
          }}>
          <Text style={fstyles.heavyTwenty}>Explore Courses</Text>
        </View>

        <View
          style={{
            marginHorizontal: normalizeWidth(20),
            marginTop: normalizeHeight(20),
            marginBottom: normalizeHeight(24),
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            horizontal
            keyExtractor={(item, index) => `_${index}`}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(176, 149, 227, 0.40)',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: normalizeWidth(12),
                    // paddingVertical: normalizeHeight(8),
                    height: normalizeHeight(33),
                    marginRight: normalizeWidth(5),
                  }}
                  onPress={() => {
                    // props.navigation.navigate(item?.nav, item?.params);
                    console.log(item.title, 'titleeee');
                  }}>
                  <Text style={fstyles.thirteenMedium}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Text
          style={[fstyles.boldSixteen, {marginHorizontal: normalizeWidth(20)}]}>
          Recommended Courses for you
        </Text>
        <View
          style={{
            marginBottom: normalizeHeight(24),
            marginLeft: normalizeWidth(20),
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            horizontal
            keyExtractor={(item, index) => `_${index}`}
            renderItem={({item, index}) => {
              console.log(item, 'item.lengthhhh');
              return (
                <View
                  style={{
                    width: normalizeWidth(208),
                    marginTop: normalizeHeight(16),
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(176, 149, 227, 0.4)',
                    overflow: 'hidden',
                    marginRight: item.length - 1 ? 0 : normalizeWidth(20),
                  }}>
                  <LinearGradient
                    colors={[
                      'rgba(70, 49, 115, 0.3)',
                      '#463173',
                      '#463173',
                      'rgba(70, 49, 115, 0.3)',
                    ]}
                    locations={[0, 0.49, 0.59, 1]}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    style={{
                      paddingVertical: normalizeHeight(8),
                      paddingHorizontal: normalizeWidth(8),
                      borderRadius: 12,
                      width: '100%',
                    }}>
                    <View>
                      <Image
                        source={images.TESTONGOING}
                        style={{
                          height: normalizeHeight(78),
                          width: normalizeWidth(192),
                          resizeMode: 'contain',
                        }}
                      />
                      <View
                        style={{
                          marginTop: normalizeHeight(12),
                          marginHorizontal: normalizeWidth(4),
                        }}>
                        <Text style={fstyles.boldFourteen}>Figma Basics</Text>
                        <Text
                          style={[
                            fstyles.twelweRegular,
                            {
                              fontStyle: 'italic',
                              color: 'rgba(255, 255, 255, 0.60)',
                            },
                          ]}>
                          By Anshika Gupta
                        </Text>
                        <View style={{marginTop: normalizeHeight(8)}}>
                          <View
                            style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
                            {courseType.map((item, index) => (
                              <TouchableOpacity
                                key={`_${index}`}
                                style={{
                                  borderWidth: 1,
                                  borderColor: 'rgba(176, 149, 227, 0.40)',
                                  borderRadius: 20,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingHorizontal: normalizeWidth(8),
                                  height: normalizeHeight(19),
                                  marginRight: normalizeWidth(5),
                                }}
                                onPress={() => {
                                  console.log(item.title, 'titleeee');
                                }}>
                                <Text
                                  style={[
                                    fstyles.mediumTen,
                                    {color: '#D3C4EF'},
                                  ]}>
                                  {item.title}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: normalizeWidth(4),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: normalizeHeight(20),
                        }}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={images.COURSEREADING}
                              style={{
                                height: normalizeHeight(12),
                                width: normalizeWidth(12),
                                resizeMode: 'contain',
                              }}
                            />
                            <Text
                              style={[
                                fstyles.mediumTen,
                                {marginLeft: normalizeWidth(2)},
                              ]}>
                              4.2 Rating
                            </Text>
                          </View>
                          <Text
                            style={[
                              fstyles.mediumTen,
                              {color: 'rgba(238, 231, 249, 0.60)'},
                            ]}>
                            4.9k Enrolled
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            height: normalizeHeight(33),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 12,
                            width: normalizeWidth(90),
                            backgroundColor: '#815FC4',
                          }}>
                          <Text style={fstyles.semiTwelwe}>View Details</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              );
            }}
          />
        </View>

        <View style={{marginLeft: normalizeWidth(20)}}>
          <Text
            style={[fstyles.boldSixteen, {color: 'rgba(238, 231, 249, 0.60)'}]}>
            Recommended Courses for you
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            horizontal
            keyExtractor={(item, index) => `_${index}`}
            renderItem={({item, index}) => {
              console.log(item, 'item.lengthhhh');
              return (
                <View
                  style={{
                    width: normalizeWidth(208),
                    marginTop: normalizeHeight(16),
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(176, 149, 227, 0.4)',
                    overflow: 'hidden',
                    marginRight: item.length - 1 ? 0 : normalizeWidth(20),
                  }}>
                  <LinearGradient
                    colors={[
                      'rgba(70, 49, 115, 0.3)',
                      '#463173',
                      '#463173',
                      'rgba(70, 49, 115, 0.3)',
                    ]}
                    locations={[0, 0.49, 0.59, 1]}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    style={{
                      paddingVertical: normalizeHeight(8),
                      paddingHorizontal: normalizeWidth(8),
                      borderRadius: 12,
                      width: '100%',
                    }}>
                    <View>
                      <Image
                        source={images.TESTONGOING}
                        style={{
                          height: normalizeHeight(78),
                          width: normalizeWidth(192),
                          resizeMode: 'contain',
                        }}
                      />
                      <View
                        style={{
                          marginTop: normalizeHeight(12),
                          marginHorizontal: normalizeWidth(4),
                        }}>
                        <Text style={fstyles.boldFourteen}>Figma Basics</Text>
                        <Text
                          style={[
                            fstyles.twelweRegular,
                            {
                              fontStyle: 'italic',
                              color: 'rgba(255, 255, 255, 0.60)',
                            },
                          ]}>
                          By Anshika Gupta
                        </Text>
                        <View style={{marginTop: normalizeHeight(8)}}>
                          <View
                            style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
                            {courseType.map((item, index) => (
                              <TouchableOpacity
                                key={`_${index}`}
                                style={{
                                  borderWidth: 1,
                                  borderColor: 'rgba(176, 149, 227, 0.40)',
                                  borderRadius: 20,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingHorizontal: normalizeWidth(8),
                                  height: normalizeHeight(19),
                                  marginRight: normalizeWidth(5),
                                }}
                                onPress={() => {
                                  console.log(item.title, 'titleeee');
                                }}>
                                <Text
                                  style={[
                                    fstyles.mediumTen,
                                    {color: '#D3C4EF'},
                                  ]}>
                                  {item.title}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: normalizeWidth(4),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: normalizeHeight(20),
                        }}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={images.COURSEREADING}
                              style={{
                                height: normalizeHeight(12),
                                width: normalizeWidth(12),
                                resizeMode: 'contain',
                              }}
                            />
                            <Text
                              style={[
                                fstyles.mediumTen,
                                {marginLeft: normalizeWidth(2)},
                              ]}>
                              4.2 Rating
                            </Text>
                          </View>
                          <Text
                            style={[
                              fstyles.mediumTen,
                              {color: 'rgba(238, 231, 249, 0.60)'},
                            ]}>
                            4.9k Enrolled
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            height: normalizeHeight(33),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 12,
                            width: normalizeWidth(90),
                            backgroundColor: '#815FC4',
                          }}>
                          <Text style={fstyles.semiTwelwe}>Enroll</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            marginLeft: normalizeWidth(20),
            marginTop: normalizeHeight(24),
          }}>
          <Text
            style={[fstyles.boldSixteen, {color: 'rgba(238, 231, 249, 0.60)'}]}>
            All Courses
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={courseFilter}
            horizontal
            keyExtractor={(item, index) => `_${index}`}
            renderItem={({item, index}) => {
              console.log(item, 'item.lengthhhh');
              return (
                <View
                  style={{
                    width: normalizeWidth(208),
                    marginTop: normalizeHeight(16),
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(176, 149, 227, 0.4)',
                    overflow: 'hidden',
                    marginRight: item.length - 1 ? 0 : normalizeWidth(20),
                  }}>
                  <LinearGradient
                    colors={[
                      'rgba(70, 49, 115, 0.3)',
                      '#463173',
                      '#463173',
                      'rgba(70, 49, 115, 0.3)',
                    ]}
                    locations={[0, 0.49, 0.59, 1]}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    style={{
                      paddingVertical: normalizeHeight(8),
                      paddingHorizontal: normalizeWidth(8),
                      borderRadius: 12,
                      width: '100%',
                    }}>
                    <View>
                      <Image
                        source={images.TESTONGOING}
                        style={{
                          height: normalizeHeight(78),
                          width: normalizeWidth(192),
                          resizeMode: 'contain',
                        }}
                      />
                      <View
                        style={{
                          marginTop: normalizeHeight(12),
                          marginHorizontal: normalizeWidth(4),
                        }}>
                        <Text style={fstyles.boldFourteen}>Figma Basics</Text>
                        <Text
                          style={[
                            fstyles.twelweRegular,
                            {
                              fontStyle: 'italic',
                              color: 'rgba(255, 255, 255, 0.60)',
                            },
                          ]}>
                          By Anshika Gupta
                        </Text>
                        <View style={{marginTop: normalizeHeight(8)}}>
                          <View
                            style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
                            {courseType.map((item, index) => (
                              <TouchableOpacity
                                key={`_${index}`}
                                style={{
                                  borderWidth: 1,
                                  borderColor: 'rgba(176, 149, 227, 0.40)',
                                  borderRadius: 20,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingHorizontal: normalizeWidth(8),
                                  height: normalizeHeight(19),
                                  marginRight: normalizeWidth(5),
                                }}
                                onPress={() => {
                                  console.log(item.title, 'titleeee');
                                }}>
                                <Text
                                  style={[
                                    fstyles.mediumTen,
                                    {color: '#D3C4EF'},
                                  ]}>
                                  {item.title}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginLeft: normalizeWidth(4),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: normalizeHeight(20),
                        }}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={images.COURSEREADING}
                              style={{
                                height: normalizeHeight(12),
                                width: normalizeWidth(12),
                                resizeMode: 'contain',
                              }}
                            />
                            <Text
                              style={[
                                fstyles.mediumTen,
                                {marginLeft: normalizeWidth(2)},
                              ]}>
                              4.2 Rating
                            </Text>
                          </View>
                          <Text
                            style={[
                              fstyles.mediumTen,
                              {color: 'rgba(238, 231, 249, 0.60)'},
                            ]}>
                            4.9k Enrolled
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            height: normalizeHeight(33),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 12,
                            width: normalizeWidth(90),
                            backgroundColor: '#815FC4',
                          }}>
                          <Text style={fstyles.semiTwelwe}>Enroll</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            height: normalizeHeight(1),
            backgroundColor: '#815FC4',
            width: '100%',
            marginTop: normalizeHeight(16),
            marginBottom: normalizeHeight(58),
          }}
        />
        <View style={{marginLeft: normalizeWidth(20),marginBottom:normalizeHeight(23)}}>
          <Text style={{fontSize: 64, fontWeight: '900', color: '#EEE7F9'}}>
            Learn to Upskill !!
          </Text>
          <Text style={[fstyles.regularSixteen, {color: '#EEE7F9'}]}>
            Made with Passion in Tirupati, India 🇮🇳
          </Text>
        </View>
        {/* <LinearGradient
        colors={['rgba(28, 7, 67, 0.00)', '#1C0743']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{padding:20,}}
        locations={[0.0157, 0.5876]}
      >
        <View style={{}}>
      <Text style={fstyles.regularSixteen}>footerrrr</Text>
      </View>
      </LinearGradient> */}
      </LinearGradient>
    </ScrollView>
    <Bottomsheet
        ref={BottomsheetRef}
        height={['60%']}
        enableHeader={true}
        headerText={'Edit your info'}
        footer={'Submit'}
        onSubmit={() => console.log('Something')}>
        <ScrollView>
          <View
            style={{
              padding: 32,
              backgroundColor: '#1C0743',
            }}>
            <Text style={{color: '#fff'}}>Sample Content</Text>
          </View>
          <View
            style={{
              padding: 32,
              backgroundColor: '#1C0743',
            }}>
            <Text style={{color: '#fff'}}>Sample Content</Text>
          </View>
          <View
            style={{
              padding: 32,
              backgroundColor: '#1C0743',
            }}>
            <Text style={{color: '#fff'}}>Sample Content</Text>
          </View>
          <View
            style={{
              padding: 32,
              backgroundColor: '#1C0743',
            }}>
            <Text style={{color: '#fff'}}>Sample Content</Text>
          </View>
          <View
            style={{
              padding: 32,
              backgroundColor: '#1C0743',
            }}>
            <Text style={{color: '#fff'}}>Sample Content</Text>
          </View>
          <View
            style={{
              padding: 32,
              backgroundColor: '#1C0743',
            }}>
            <Text style={{color: '#fff'}}>Sample Content</Text>
          </View>
        </ScrollView>
      </Bottomsheet>
</>
  );
};

export default MainDash;

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%',
    marginTop: normalizeHeight(16),
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  gradientContainer: {
    marginHorizontal: normalizeWidth(20),
    marginTop: normalizeHeight(24),
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
    borderWidth: 1,
    borderColor: 'rgba(129, 95, 196, 0.30)',
    padding: 16,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    alignItems: 'center',
    // flex: 1,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
