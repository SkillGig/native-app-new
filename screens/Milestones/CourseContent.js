import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../../src/context/ThemeContext';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import AutoScrollCarousel from './AutoScrollCarousel';

const {width} = Dimensions.get('window');
const VISIBLE_CARDS = 3;
const CARD_WIDTH = width / VISIBLE_CARDS;
const SIDE_PADDING = (width - CARD_WIDTH) / 2;
// 🔹 Sample data - replace with your real data and images
const courses = [
  {id: '1', title: 'Algebra', img: images.ROADMAPCENTERBOX, isCurrent: false},
  {id: '2', title: 'Geometry', img: images.ROADMAPCENTERBOX, isCurrent: false},
  {id: '3', title: 'Physics', img: images.ROADMAPCENTERBOX, isCurrent: true},
  {id: '4', title: 'Chemistry', img: images.ROADMAPCENTERBOX, isCurrent: false},
  {id: '5', title: 'Biology', img: images.ROADMAPCENTERBOX, isCurrent: false},
];

const CourseContent = props => {
  const {isDark, colors} = useContext(ThemeContext);
  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );
  const fstyles = getFontStyles(isDark, colors);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const onMomentumScrollEnd = e => {
    const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  const steps = [
    {
      title: 'Module 1: Intro',
      description: 'This module covers basics...',
      completed: true,
    },
    {
      title: 'Module 2: Setup',
      description: 'Installation and configuration guide',
      completed: true,
    },
    {
      title: 'Module 3: Advanced',
      description: 'Deep dive into architecture...',
      completed: false,
    },
    {
      title: 'Module 4: Final Quiz',
      description: 'Test your understanding...',
      completed: false,
    },
  ];

  // Usage in screen

  return (
    <>
      <View style={{flex: 1, position: 'relative'}}>
        <LinearGradient
          colors={gradientColors}
          locations={[0, 0.7]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={[
            fstyles.flexAlign,
            {
              marginTop: normalizeHeight(48),
              marginHorizontal: normalizeWidth(20),
              marginBottom: normalizeHeight(24),
            },
          ]}>
          <Image
            source={images.HEADERBACKICON}
            style={{
              height: normalizeHeight(20),
              width: normalizeWidth(20),
              resizeMode: 'contain',
            }}
          />

          <Text style={[fstyles.boldSixteen, {marginLeft: normalizeWidth(8)}]}>
            Frontend Developer
          </Text>
        </View>
        <View style={{}}>
          <Animated.FlatList
            data={courses}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{
              paddingHorizontal: SIDE_PADDING,
            }}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            renderItem={({item, index}) => {
              /* …scale / opacity interpolation exactly as you have… */
              const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
              ];
              // const isCenter = activeIndex === index; // already computed
              // const showAvatar = isCenter && item.isCurrent;
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [1, 1, 1],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  style={[
                    styles.card,
                    {
                      opacity: item.isCurrent ? opacity : 0.6,
                      transform: [{scale}],
                    },
                  ]}>
                  {item.isCurrent && (
                    <Image source={images.FEMALEAVATAR} style={styles.avatar} />
                  )}
                  {index < courses.length - 1 && (
                    <View style={styles.connector} />
                  )}
                  <Image
                    source={item.img}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </Animated.View>
              );
            }}
            getItemLayout={(_, i) => ({
              length: CARD_WIDTH,
              offset: CARD_WIDTH * i,
              index: i,
            })}
          />
        </View>
        <ScrollView>
          <LinearGradient
            colors={['#1A0244', '#000000']}
            start={{x: 0.5, y: -0.07}}
            end={{x: 0.5, y: 0.37}}
            style={{
              backgroundColor: '#1A0244',
              flex: 1,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              borderWidth: 1,
              borderColor: 'rgba(211, 196, 239, 0.20)',
            }}>
            <View
              style={{
                marginTop: normalizeHeight(26),
                marginLeft: normalizeWidth(27),
                marginRight: normalizeWidth(18),
              }}>
              <Text style={[fstyles.heavyTwenty, {color: '#E5DCF6'}]}>
                DSA Basics
              </Text>
              <Text
                style={[
                  fstyles.semiTwelwe,
                  {color: '#E5DCF6', marginTop: normalizeHeight(8)},
                ]}>
                HTML structures webpage content; CSS styles it, and JavaScript
                makes it interactive.
              </Text>
            </View>

            <AutoScrollCarousel steps={steps} />
          </LinearGradient>
        </ScrollView>
      </View>
      <View
        style={[
          fstyles.flexAlignJustify,
          {
            paddingHorizontal: normalizeWidth(40),
            paddingVertical: normalizeHeight(16),
            backgroundColor: '#000001',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#2F224B',
            width: normalizeWidth(108),
            justifyContent: 'center',
            height: normalizeHeight(36),
            borderRadius: 12,
          }}>
          <Image
            source={images.BACKICON}
            style={{
              height: normalizeHeight(16),
              width: normalizeWidth(16),
              resizeMode: 'contain',
            }}
          />
          <Text
            style={[
              fstyles.semiFourteen,
              {color: '#C4ADD8', marginLeft: normalizeWidth(8)},
            ]}>
            Previous
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#815FC4',
            width: normalizeWidth(108),
            justifyContent: 'center',
            height: normalizeHeight(36),
            borderRadius: 12,
          }}>
          <Text
            style={[fstyles.semiFourteen, {marginRight: normalizeWidth(8)}]}>
            Next
          </Text>
          <Image
            source={images.BACKICON}
            style={{
              height: normalizeHeight(16),
              width: normalizeWidth(16),
              resizeMode: 'contain',
              transform: [{rotate: '180deg'}],
            }}
          />
        </View>
      </View>
    </>
  );
};
export default CourseContent;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    alignItems: 'center',
    paddingVertical: 40,
  },
  image: {
    width: normalizeWidth(96),
    height: normalizeHeight(72),
    resizeMode: 'contain',
  },

  title: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  connector: {
    position: 'absolute',
    right: -CARD_WIDTH / 2,
    top: CARD_WIDTH * 0.5,
    height: 2,
    width: CARD_WIDTH,
    backgroundColor: '#d0d0d0',
  },
  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    resizeMode: 'contain',
  },
});
