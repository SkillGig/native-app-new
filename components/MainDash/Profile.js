// components/MainDash/ProfileComponent.js
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import {useContext} from 'react';
import {ThemeContext} from '../../src/context/ThemeContext';

const ProfileComponent = ({profileData, setActiveCurrentView}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  return (
    <>
      <View
        style={{
          marginTop: normalizeHeight(28),
          marginBottom: normalizeHeight(24),
          marginHorizontal: normalizeWidth(8),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[fstyles.heavyTwentyFour, {color: '#B095E3'}]}>
          My Profile
        </Text>
        <TouchableOpacity onPress={() => setActiveCurrentView(null)}>
          <Image
            source={images.CLOSEICON}
            style={{
              height: 24,
              width: 24,
              marginTop: normalizeHeight(8),
            }}
          />
        </TouchableOpacity>
      </View>

      {profileData.map((each, index) => {
        return (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: normalizeHeight(24),
                paddingHorizontal: normalizeWidth(8),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={each.leftIcon}
                  style={{
                    height: normalizeHeight(24),
                    width: normalizeWidth(24),
                    resizeMode: 'contain',
                  }}
                />
                <View style={{marginLeft: normalizeWidth(18), flex: 0.9}}>
                  <Text style={[fstyles.regularSixteen, {color: '#D3C4EF'}]}>
                    {each.option}
                  </Text>
                </View>
              </View>
              <Image
                source={images.NOTIFICATIONRIGHTARROW}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(24),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                height: normalizeHeight(1),
                width: '100%',
                backgroundColor: 'rgba(176, 149, 227, 0.16)',
                marginTop: normalizeHeight(12),
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ProfileComponent;
