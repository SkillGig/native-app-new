import React, {useContext, useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PageLayout from '../onboarding/PageLayout';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import useUserStore from '../../src/store/useUserStore';
import PageWrapper from '../../components/PageWrapper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LeaderBoard = props => {
  const {isDark, colors} = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const {navigation, route} = props;
  const gradientColors = useMemo(() => ['#391976', '#150237'], []);
  const fstyles = getFontStyles(isDark, colors);
  const organizationName = useUserStore(
    state => state.userConfig.organizationName,
  );

  const leaderboardRanks = (route &&
    route.params &&
    route.params.leaderboardData) || [
    {
      userId: 29,
      name: 'Gagan Vasanth 4',
      totalXP: '10',
      rankOfUser: 1,
      currentUser: 1,
    },
  ];

  const calculatedMarginTop = Math.max(0, normalizeHeight(32) - insets.top);

  return (
    <PageWrapper
      gradientColors={['#391976', '#000000']}
      gradientLocations={[0, 1]}
      gradientEnd={{x: 1, y: 1}}
      gradientStart={{x: 0, y: 0}}>
      <View
        style={{flex: 1, position: 'relative'}}
        styles={{marginTop: calculatedMarginTop}}>
        <LinearGradient
          colors={gradientColors}
          locations={[0, 0.46]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={[
            fstyles.flexAlign,
            {
              marginTop: normalizeHeight(24),
              marginHorizontal: normalizeWidth(20),
              marginBottom: normalizeHeight(24),
            },
          ]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image
              source={images.HEADERBACKICON}
              style={{
                height: normalizeHeight(20),
                width: normalizeWidth(20),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          <Text style={[fstyles.boldSixteen, {marginLeft: normalizeWidth(8)}]}>
            Leaderboard
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: calculatedMarginTop + 3,
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
          <Text style={fstyles.boldSixteen}>{organizationName}</Text>
        </View>
        {/*  */}
        <ScrollView
          style={styles.shadowWrapper}
          showsVerticalScrollIndicator={false}>
          {leaderboardRanks.map((item, index) => (
            <View key={index} style={styles.leaderboardCardWrapper}>
              <View style={styles.leaderboardCard}>
                <LinearGradient
                  colors={
                    item.currentUser
                      ? ['#342551', 'rgba(213, 174, 40, 0.75)']
                      : ['rgba(129, 95, 196, 0.6)', '#090215']
                  }
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
                        {item.currentUser ? 'You' : item.name}
                      </Text>
                    </View>
                    <Text style={fstyles.semiFourteen}>
                      {item.totalXP ||
                        item.points ||
                        item.totalXp ||
                        item.xp ||
                        '0'}
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
              <View
                style={[
                  styles.rankOverlay,
                  {left: item.rankOfUser > 9 ? normalizeWidth(10) : -10},
                ]}>
                <Text
                  style={[
                    styles.rankText,
                    {
                      fontSize: 38,
                      color:
                        item.rankOfUser > 3
                          ? '#815FC4'
                          : 'rgba(242, 223, 161, 0.50)',
                      opacity: item.currentUser ? 1 : 0.8,
                    },
                  ]}>
                  #{item.rankOfUser}
                </Text>
              </View>
            </View>
          ))}
          <View style={{marginBottom: normalizeHeight(100)}} />
          {/* </LinearGradient> */}
        </ScrollView>
      </View>
    </PageWrapper>
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
