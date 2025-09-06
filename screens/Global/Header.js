import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import useUserStore from '../../src/store/useUserStore';

const Header = ({
  activeCurrentView,
  setActiveCurrentView,
  unreadNotifications,
}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);
  const userConfig = useUserStore(state => state.userConfig);

  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    const morningStart = 5 * 60; // 5:00 AM
    const morningEnd = 11 * 60 + 59; // 11:59 AM

    const afternoonStart = 12 * 60; // 12:00 PM
    const afternoonEnd = 16 * 60 + 30; // 4:30 PM

    if (totalMinutes >= morningStart && totalMinutes <= morningEnd) {
      return 'Good Morning 🌞';
    } else if (totalMinutes >= afternoonStart && totalMinutes <= afternoonEnd) {
      return 'Good Afternoon ☀️';
    } else {
      return 'Good Evening 🌝 ';
    }
  };
  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          styles.profileContainer,
          activeCurrentView === 'profile' && styles.profileActive,
        ]}>
        <TouchableOpacity
          onPress={() => {
            setActiveCurrentView('profile');
          }}>
          <Image source={images.FEMALEAVATAR} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.profileTextContainer}>
          <Text style={[fstyles.thirteenMedium, {color: 'white'}]}>
            {getGreeting()}
          </Text>
          <Text style={[fstyles.twentyBold, {color: '#EEE7F9'}]}>
            {userConfig.userName}
          </Text>
        </View>
      </View>

      <View style={styles.iconsContainer}>
        {/* Only show focus timer if enabled in userConfig */}
        {userConfig?.showFocusTimer === 1 && (
          <TouchableOpacity
            onPress={() => {
              setActiveCurrentView('focus-timer');
            }}>
            <Image source={images.STOPWATCH} style={styles.icon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.notificationContainer,
            {marginLeft: normalizeWidth(12)},
          ]}
          onPress={() => {
            setActiveCurrentView('notifications');
          }}>
          <Image source={images.NOTIFICATION} style={styles.icon} />
          {unreadNotifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText} allowFontScaling={false}>
                {unreadNotifications > 9
                  ? '9+'
                  : unreadNotifications.toString()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalizeHeight(16),
    marginHorizontal: normalizeWidth(20),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    width: normalizeWidth(202),
  },
  profileActive: {
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    borderRadius: 32,
  },
  avatar: {
    height: normalizeHeight(64),
    width: normalizeWidth(64),
    resizeMode: 'contain',
  },
  profileTextContainer: {
    marginLeft: normalizeWidth(10),
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
  },
  icon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#B095E3',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
