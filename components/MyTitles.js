import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {getFontStyles} from '../styles/FontStyles';
import LinearGradient from 'react-native-linear-gradient';

const MyTitles = ({colors, isDark, titles = []}) => {
  const fstyles = getFontStyles(isDark, colors);

  // Default titles data if none provided
  const defaultTitles = [
    {
      id: 1,
      level: 'Lvl 1',
      title: 'Streakster',
      description: 'Know More',
      iconPlaceholder: true, // Fire icon placeholder
    },
    {
      id: 2,
      level: 'Lvl 1',
      title: 'Helper Hat',
      description: 'Know More',
      iconPlaceholder: true, // Hat icon placeholder
    },
    {
      id: 3,
      level: 'Lvl 1',
      title: 'Lucky Clover',
      description: 'Know More',
      iconPlaceholder: true, // Clover icon placeholder
    },
  ];

  const achievementTitles = titles.length > 0 ? titles : defaultTitles;

  return (
    <LinearGradient
      colors={['rgba(176, 149, 227, 0.05)', 'rgba(176, 149, 227, 0.12)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.titlesSection}>
      <Text style={[fstyles.heavyTwentyFour, styles.sectionTitle]}>
        My Titles
      </Text>

      <View style={styles.titlesGrid}>
        {achievementTitles.map((achievement, index) => (
          <View key={achievement.id} style={styles.titleCard}>
            <View style={styles.titleCardIcon}>
              {/* Different icon placeholders for each achievement */}
              <View
                style={[
                  styles.titleIconPlaceholder,
                  index === 0 && styles.fireIcon, // Fire icon
                  index === 1 && styles.hatIcon, // Hat icon
                  index === 2 && styles.cloverIcon, // Clover icon
                ]}
              />
            </View>
            <View style={styles.titleCardContent}>
              <Text style={[fstyles.regularTwelve, styles.levelText]}>
                {achievement.level}
              </Text>
              <Text style={[fstyles.mediumFourteen, styles.titleText]}>
                {achievement.title}
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={[fstyles.regularTwelve, styles.knowMoreText]}>
                  {achievement.description}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  titlesSection: {
    marginBottom: normalizeHeight(40),
    marginTop: normalizeHeight(24),
    paddingVertical: normalizeHeight(16),
    paddingHorizontal: normalizeWidth(16),
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 140, 0.3)',
    borderRadius: normalizeWidth(20),
  },
  sectionTitle: {
    color: '#FFFFFF',
    marginBottom: normalizeHeight(20),
    textAlign: 'center',
  },
  titlesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  titleCard: {
    width: '30%', // More responsive than fixed width
    backgroundColor: 'rgba(176, 149, 227, 0.15)',
    borderRadius: normalizeWidth(12),
    padding: normalizeWidth(12),
    alignItems: 'center',
    marginBottom: normalizeHeight(16),
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.2)',
    marginHorizontal: '1.5%', // Add some spacing between cards
  },
  titleCardIcon: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    borderRadius: normalizeWidth(10),
    backgroundColor: 'rgba(176, 149, 227, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalizeHeight(8),
  },
  titleIconPlaceholder: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
    borderRadius: normalizeWidth(6),
  },
  fireIcon: {
    backgroundColor: '#FF6B35', // Orange-red for fire
  },
  hatIcon: {
    backgroundColor: '#FFD23F', // Yellow for hat
  },
  cloverIcon: {
    backgroundColor: '#4ECDC4', // Green for clover
  },
  titleCardContent: {
    alignItems: 'center',
  },
  levelText: {
    color: '#B095E3',
    marginBottom: normalizeHeight(2),
    fontSize: 10,
  },
  titleText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: normalizeHeight(4),
    fontSize: 12,
  },
  knowMoreText: {
    color: '#B095E3',
    fontSize: 10,
    textDecorationLine: 'underline',
  },
});

export default MyTitles;
