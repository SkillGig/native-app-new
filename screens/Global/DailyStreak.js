import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';

const DailyStreak = ({weekStatus, currentDay, statusMap}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);
  return (
    <LinearGradient
      colors={['rgba(48, 11, 115, 0)', '#300B73']}
      style={styles.streakContainer}>
      <View style={styles.streakRow}>
        <View style={styles.streakLeft}>
          <View style={styles.streakButton}>
            <Image source={images.STREAKICON} style={styles.streakIcon} />
            <Text style={styles.streakText}>2 Days</Text>
          </View>
          <View style={styles.streakDivider} />
        </View>
        <View style={styles.streakRight}>
          <View style={styles.row}>
            {weekStatus.map((item, index) => {
              const isToday = item.day === currentDay;
              const {icon} = statusMap[item.status] || {};
              return (
                <View key={`day-${index}`} style={styles.streakDatesColumn}>
                  <Text
                    style={[
                      fstyles.mediumTen,
                      {
                        color: isToday ? 'white' : 'rgba(229, 220, 246, 0.40)',
                      },
                    ]}>
                    {item.day}
                  </Text>
                  {item.status === 'completed' ? (
                    <LinearGradient
                      colors={['#FFEDC3', '#FFC29C']}
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      style={styles.streakImageGradientContainer}>
                      <Image source={icon} style={styles.streakIconSmall} />
                    </LinearGradient>
                  ) : (
                    <Image source={icon} style={styles.streakIconSmall} />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DailyStreak;

const styles = StyleSheet.create({
  streakContainer: {
    padding: normalizeWidth(16),
    borderWidth: 1,
    borderColor: '#372258',
    borderRadius: 20,
    marginHorizontal: normalizeWidth(20),
  },
  streakRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakImageGradientContainer: {
    borderRadius: 20,
    padding: normalizeWidth(0),
  },
  streakButton: {
    alignItems: 'center',
  },
  streakIcon: {
    height: normalizeHeight(40),
    width: normalizeWidth(40),
    resizeMode: 'contain',
  },
  streakText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: normalizeHeight(2),
    textAlign: 'center',
  },
  streakDivider: {
    width: normalizeWidth(1),
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'stretch',
    marginLeft: normalizeWidth(12),
  },
  streakRight: {
    flex: 1,
    marginLeft: normalizeWidth(12),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  streakDatesColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalizeHeight(8),
  },
  streakIconSmall: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  footer: {
    marginLeft: normalizeWidth(20),
    marginBottom: normalizeHeight(120),
    marginTop: normalizeHeight(24),
  },
  footerTitle: {
    fontSize: 64,
    fontWeight: '900',
    color: '#EEE7F9',
  },
});
