import React, {useContext, useMemo} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import PageLayout from '../onboarding/PageLayout';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';

const LeaderBoard = props => {
  const {isDark, colors} = useContext(ThemeContext);
  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );
  const fstyles = getFontStyles(isDark, colors);

  const leaderboardRanks = [
   { id: 1, name: 'asdfvb', points: 413, myrank: 0 },
   { id: 2, name: 'asdfvb', points: 762, myrank: 0 },
   { id: 3, name: 'asdfvb', points: 188, myrank: 1 },
   { id: 4, name: 'asdfvb', points: 950, myrank: 0 },
   { id: 5, name: 'asdfvb', points: 576, myrank: 0 },
   { id: 6, name: 'asdfvb', points: 329, myrank: 0 },
   { id: 7, name: 'asdfvb', points: 887, myrank: 0 },
   { id: 8, name: 'asdfvb', points: 74, myrank: 0 },
   { id: 9, name: 'asdfvb', points: 655, myrank: 0 },
   { id: 10, name: 'asdfvb', points: 999, myrank: 0 },
 ];
 
 
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
          Leaderboard
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          top: 64,
          left: 0,
          right: 0,
        }}>
        <Image
          source={images.TROPHY}
          style={{
            height: normalizeHeight(201),
            width: normalizeWidth(290),
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{marginTop: normalizeHeight(120), alignItems: 'center'}}>
        <Text style={fstyles.boldSixteen}>Indian Institute of Technology</Text>
      </View>

      <ScrollView style={styles.shadowWrapper} showsVerticalScrollIndicator={false}>
       
        {leaderboardRanks.map((item, index) => (
          <View key={index} style={styles.leaderboardCardWrapper}>
            <View style={styles.leaderboardCard}>
              <LinearGradient
                colors={['rgba(129, 95, 196, 0.6)', '#090215']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.leaderboardCardGradient}>
                <View style={fstyles.flexAlignJustify}>
                  <View style={styles.avatarNameWrapper}>
                    <Image
                      source={images.FEMALEAVATARYELLOW}
                      style={styles.avatar}
                    />
                    <Text style={[fstyles.semiFourteen, {color: '#F6F3FC'}]}>
                     {item.name}
                    </Text>
                  </View>
                  <Text style={fstyles.semiFourteen}>
                   {item.points}
                    <Text
                      style={[
                        fstyles.mediumTen,
                        {
                          color: 'rgba(238, 231, 249, 0.60)',
                          marginLeft: normalizeWidth(2),
                        },
                      ]}>
                      {' '}
                      XP
                    </Text>
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.rankOverlay}>
              <Text style={[styles.rankText,{color:item.id>4?'#815FC4':'rgba(242, 223, 161, 0.50)'}]}>#{item.id}</Text>
            </View>
          </View>
        ))}
        <View style={{marginBottom:normalizeHeight(100)}}/>
        {/* </LinearGradient> */}
      </ScrollView>
    </View>
  );
};

export default LeaderBoard;
const styles = StyleSheet.create({
  leaderboardCardGradient: {
    height: normalizeHeight(60),
    justifyContent: 'center',
    borderRadius: 73,
    paddingRight: normalizeWidth(20),
    marginHorizontal: normalizeWidth(4),
  },
  leaderboardCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarNameWrapper: {flexDirection: 'row', alignItems: 'center'},
  shadowWrapper: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    backgroundColor: '#000000',
    overflow: 'hidden',
    borderBottomWidth: 0,
    flex: 1,
    paddingTop: normalizeHeight(42),
    marginTop: normalizeHeight(13),
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: -2 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 12,
    //   },
    //   android: {
    //     elevation: 8, // approximate to match 12px blur
    //   },
    // }),
  },
  avatar: {
    height: normalizeHeight(72),
    width: normalizeWidth(72),
    resizeMode: 'contain',
    marginTop: normalizeHeight(4),
  },
  rankOverlay: {
    position: 'absolute',
    right: 0,
    zIndex: 0,
    justifyContent: 'center',
    width: '100%',
  },
  rankText: {
    fontSize: 64,
    fontWeight: '900',
    color: 'rgba(242, 223, 161, 0.50)',
    textAlign: 'right',
    paddingRight: normalizeWidth(4),
  },
  leaderboardCardWrapper: {
    marginLeft: normalizeWidth(20),
    marginRight: normalizeWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: normalizeHeight(12),
  },
  leaderboardCard: {
    borderWidth: 1,
    borderColor: 'rgba(242, 223, 161, 0.50)',
    borderRadius: 50,
    height: normalizeHeight(68),
    justifyContent: 'center',
    width: normalizeWidth(285),
    zIndex: 1,
  },
});
