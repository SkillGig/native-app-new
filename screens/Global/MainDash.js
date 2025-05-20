import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {fstyles} from '../../styles/FontStyles';
const MainDash = () => {
  return (
    <View style={{backgroundColor: '#300B73', flex: 1}}>
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
                Good Morning 🌞
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
    </View>
  );
};

export default MainDash;
