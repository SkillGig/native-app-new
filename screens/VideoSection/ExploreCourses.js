import React, {useContext, useMemo} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
const ExploreCourses = props => {
  console.log('im preiyankaa');

  const {colors} = useContext(ThemeContext);
  const gradientColors = useMemo(() => ['#300B73', '#090215'], []);
  const fstyles = getFontStyles(false, colors);

  const exploreCourses = [
    {
      id: 'a1',
      coursename: 'bvdsa',
    },
    {
      id: 'a3',
      coursename: 'uytrew',
    },
    {
      id: 'a31',
      coursename: 'nbvcxz',
    },
    {
      id: 'a23',
      coursename: 'bvdsa',
    },
    {
      id: 'a2',
      coursename: '65tres',
    },
    {
      id: 'a79',
      coursename: 'nbvcxz',
    },
  ];

  const RenderFPList = ({item}) => {
    console.log(item, 'itemmmmm');
    return (
      <View
        style={{
          paddingVertical: normalizeHeight(8),
          paddingHorizontal: normalizeWidth(12),
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(176, 149, 227, 0.40)',
          marginRight: normalizeWidth(5),
        }}>
        <Text style={[fstyles.thirteenMedium, {color: 'white'}]}>
          All courses
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          marginTop: normalizeHeight(55),
          marginLeft: normalizeWidth(23),
        }}>
        <Image
          source={images.BACKICON}
          style={{
            height: normalizeHeight(24),
            width: normalizeWidth(24),
            resizeMode: 'contain',
          }}
        />

        <View>
          <Text
            style={[
              fstyles.heavyTwentyFour,
              {marginVertical: normalizeHeight(16)},
            ]}>
            Explore Couses
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          keyExtractor={(item, index) => `_${index}`}
          horizontal
          data={exploreCourses}
          renderItem={RenderFPList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: normalizeWidth(23),
            marginBottom: normalizeHeight(16),
          }}
        />
      </View>
    </View>
  );
};

export default ExploreCourses;
