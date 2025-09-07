import React, {useContext, useState, useRef, useEffect} from 'react';
import {Animated, View, Text, TouchableOpacity, Image} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import MyDetails from './MyDetails';
import MyAchievements from './MyAchievements';
import SlideTransition from './SlideTransition';

const ProfileComponent = ({handleHeaderItemsCollapse}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const toggleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: notificationsEnabled ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [notificationsEnabled, toggleAnim]);

  const options = [
    {
      key: 'details',
      label: 'My Details',
      leftIcon: images.PROFILE,
      onPress: () => setShowDetails(true),
      right: (
        <Image
          source={images.PLAINARROWRIGHT}
          style={{
            height: normalizeHeight(24),
            width: normalizeWidth(24),
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'achievements',
      label: 'My Achievements',
      leftIcon: images.PROFILEMEDAL,
      onPress: () => setShowAchievements(true),
      right: (
        <Image
          source={images.PLAINARROWRIGHT}
          style={{
            height: normalizeHeight(24),
            width: normalizeWidth(24),
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      leftIcon: images.FILLEDNOTIFICATION,
      onPress: () => setNotificationsEnabled(v => !v),
      right: (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setNotificationsEnabled(v => !v)}
          style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            backgroundColor: notificationsEnabled ? '#B095E3' : '#2D1B4D',
            justifyContent: 'center',
            padding: 2,
          }}>
          <Animated.View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: notificationsEnabled ? '#fff' : '#6B5A8E',
              position: 'absolute',
              left: 2,
              top: 2,
              transform: [
                {
                  translateX: toggleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 20],
                  }),
                },
              ],
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 2,
              shadowOffset: {width: 0, height: 1},
            }}
          />
        </TouchableOpacity>
      ),
    },
    {
      key: 'logout',
      label: 'Log out',
      leftIcon: images.LOGOUT,
      onPress: () => {},
      right: null,
    },
  ];

  return (
    <View style={{flex: 1}}>
      {/* Profile options always rendered */}
      <View
        style={{
          display: showDetails || showAchievements ? 'none' : 'flex',
          flex: 1,
        }}>
        <View style={{marginHorizontal: normalizeWidth(20)}}>
          <View
            style={{
              marginTop: normalizeHeight(28),
              marginBottom: normalizeHeight(24),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={[fstyles.heavyTwentyFour, {color: '#B095E3'}]}>
              My Profile
            </Text>
            <TouchableOpacity onPress={handleHeaderItemsCollapse}>
              <Image
                source={images.CLOSEICON}
                style={{height: 24, width: 24, marginTop: normalizeHeight(8)}}
              />
            </TouchableOpacity>
          </View>
          {options.map((opt, idx) => (
            <React.Fragment key={opt.key}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: idx === 0 ? 0 : normalizeHeight(24),
                  paddingRight:
                    opt.key === 'notifications' ? normalizeWidth(8) : 0,
                }}
                onPress={opt.onPress}
                activeOpacity={opt.key === 'notifications' ? 1 : 0.7}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={opt.leftIcon}
                    style={{
                      height: normalizeHeight(24),
                      width: normalizeWidth(24),
                      resizeMode: 'contain',
                    }}
                  />
                  <View style={{marginLeft: normalizeWidth(18), flex: 0.9}}>
                    <Text
                      style={[
                        fstyles.regularSixteen,
                        {color: opt.key === 'logout' ? '#B095E3' : '#D3C4EF'},
                      ]}>
                      {opt.label}
                    </Text>
                  </View>
                </View>
                {opt.right}
              </TouchableOpacity>
              {/* Divider except after last item */}
              {idx < options.length - 1 && (
                <View
                  style={{
                    height: normalizeHeight(1),
                    width: '100%',
                    backgroundColor: 'rgba(176, 149, 227, 0.16)',
                    marginTop: normalizeHeight(12),
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
      {/* SlideTransition for MyDetails */}
      <SlideTransition
        visible={showDetails}
        onClose={() => setShowDetails(false)}>
        <MyDetails
          onBack={() => setShowDetails(false)}
          colors={colors}
          isDark={isDark}
        />
      </SlideTransition>
      {/* SlideTransition for MyAchievements */}
      <SlideTransition
        visible={showAchievements}
        onClose={() => setShowAchievements(false)}>
        <MyAchievements
          onBack={() => setShowAchievements(false)}
          colors={colors}
          isDark={isDark}
        />
      </SlideTransition>
    </View>
  );
};

export default ProfileComponent;
