import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import {
  AchievementBadges,
  AchievementProgress,
  MyTitles,
} from '../../components';
import images from '../../assets/images';

const MyAchievements = ({onBack, colors, isDark}) => {
  const fstyles = getFontStyles(isDark, colors);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}>
          <Image source={images.PLAINARROWLEFT} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[fstyles.heavyTwentyFour, styles.headerTitle]}>
          My Achievements
        </Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Main Achievement Badge */}
        <AchievementBadges
          colors={colors}
          isDark={isDark}
          badgeTitle="Gold I"
          animateOnMount={true}
        />

        {/* Progress Section */}
        <AchievementProgress
          colors={colors}
          isDark={isDark}
          basePoints={0}
          finalPoints={3000}
          currentPoints={1200} // This will show "You need 1800 XP points unlock new badge"
          userAvatar={
            <Image
              source={images.FEMALEAVATAR}
              style={{
                width: normalizeWidth(48),
                height: normalizeHeight(48),
                borderRadius: normalizeWidth(24),
                borderWidth: 3,
                borderColor: '#FFFFFF',
              }}
              resizeMode="cover"
            />
          }
          animateOnMount={true}
        />

        {/* My Titles Section */}
        <MyTitles colors={colors} isDark={isDark} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#090215',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: normalizeWidth(20),
    paddingTop: normalizeHeight(28),
    marginBottom: normalizeHeight(28),
  },
  backButton: {},
  backIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
    tintColor: '#D3C4EF',
    marginRight: normalizeWidth(12),
  },
  headerTitle: {
    color: '#D3C4EF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontWeight: '900',
    fontSize: normalizeWidth(20),
    letterSpacing: 0.5,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: normalizeWidth(20),
  },
});

export default MyAchievements;
