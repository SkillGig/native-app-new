import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
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
import {getUserAchievements} from '../../src/api/userOnboardingAPIs';

const MyAchievements = ({onBack, colors, isDark, showAnimation}) => {
  const fstyles = getFontStyles(isDark, colors);
  const [animationKey, setAnimationKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userAchievements, setUserAchievements] = useState([]);

  const fetchUserAchievements = async () => {
    try {
      setIsLoading(true);
      // Replace with actual API call to fetch user achievements
      const response = await getUserAchievements();
      if (response && response.data) {
        setUserAchievements(response.data);
      }
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserAchievements();
  }, []);

  console.log(userAchievements, 'userAchievements');

  // Force component remount when showAnimation becomes true
  useEffect(() => {
    if (showAnimation) {
      setAnimationKey(prev => prev + 1);
    }
  }, [showAnimation]);

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

      {isLoading ? (
        <View style={styles.loadingMore}>
          <ActivityIndicator size="small" color="#B095E3" />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* Main Achievement Badge */}
          <AchievementBadges
            key={`achievement-badges-${animationKey}`}
            colors={colors}
            isDark={isDark}
            badgeTitle={
              userAchievements?.currentLevel?.tier +
              ' ' +
              userAchievements?.currentLevel?.tierLevel
            }
            animateOnMount={showAnimation}
          />

          {/* Progress Section */}
          <AchievementProgress
            key={`achievement-progress-${animationKey}`}
            colors={colors}
            isDark={isDark}
            basePoints={userAchievements?.currentLevel?.minXpRequired || 0}
            finalPoints={
              userAchievements?.progressToNextLevel?.nextLevelXP || 0
            }
            currentPoints={
              userAchievements?.progressToNextLevel?.currentXP || 0
            } // This will show "You need 1800 XP points unlock new badge"
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
            animateOnMount={showAnimation}
          />

          {/* My Titles Section */}
          <MyTitles
            colors={colors}
            isDark={isDark}
            titles={userAchievements?.badges || []}
            availableBadges={
              userAchievements?.availableBadges || [
                {
                  id: 1,
                  level: 'Lvl 1',
                  title: 'Streakster',
                  description: 'Know More',
                  iconPlaceholder: true, // Fire icon placeholder
                  locked: true,
                },
                {
                  id: 2,
                  level: 'Lvl 1',
                  title: 'Helper Hat',
                  description: 'Know More',
                  iconPlaceholder: true, // Hat icon placeholder
                  locked: true,
                },
                {
                  id: 3,
                  level: 'Lvl 1',
                  title: 'Lucky Clover',
                  description: 'Know More',
                  iconPlaceholder: true, // Clover icon placeholder
                  locked: true,
                },
              ]
            }
          />
        </ScrollView>
      )}
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
  loadingMore: {
    padding: normalizeHeight(16),
    alignItems: 'center',
  },
});

export default MyAchievements;
