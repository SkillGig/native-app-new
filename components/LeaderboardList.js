import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import images from '../assets/images';
import LeaderboardSkeleton from './Skeletons/LeaderboardSkeleton';
import {useNavigation} from '@react-navigation/native';

const LeaderboardList = ({data = [], fontStyles = {}, loading = false}) => {
  const navigation = useNavigation();
  if (loading) {
    return <LeaderboardSkeleton />;
  }
  const renderItem = ({item}) => (
    <View style={styles.leaderboardCardWrapper}>
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
          <View style={styles.leaderboardCardContentRow}>
            <View style={styles.avatarNameWrapper}>
              <Image source={images.FEMALEAVATARYELLOW} style={styles.avatar} />
              <Text style={[fontStyles.heavyTwenty, styles.nameText]}>
                {item.currentUser ? 'You' : item.name}
              </Text>
            </View>
            <Text style={fontStyles.boldSixteen}>
              {item.totalXP}
              <Text style={fontStyles.mediumTen}> XP</Text>
            </Text>
          </View>
        </LinearGradient>
      </View>
      <View
        style={[
          styles.rankOverlay,
          {left: item.rankOfUser > 9 ? normalizeWidth(10) : -10},
        ]}
        pointerEvents="none">
        <Text
          style={[
            styles.rankText,
            {
              color:
                item.rankOfUser > 3
                  ? '#815FC4'
                  : item.currentUser
                  ? '#D5AE28'
                  : 'rgba(242, 223, 161, 0.50)',
              opacity: item.currentUser ? 1 : 0.8,
            },
          ]}>
          #{item.rankOfUser}
        </Text>
      </View>
    </View>
  );

  const currentDataInNextSet =
    data.slice(0).find(item => item.currentUser) || [];
  const leaderboardData = data.length > 3 ? data.slice(0, 3) : data;
  if (currentDataInNextSet.length) {
    leaderboardData.push(currentDataInNextSet);
  }

  return (
    <>
      <FlatList
        data={leaderboardData}
        keyExtractor={(it, idx) => `${it.id}_${idx}`}
        renderItem={renderItem}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.viewLeaderboardBtn}
        onPress={() => {
          navigation.navigate('LeaderBoard', {
            leaderboardData: data,
          });
        }}>
        <Text style={styles.viewLeaderboardText}>View Leaderboard</Text>
        <Image source={images.BACKICON} style={styles.viewLeaderboardIcon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
  leaderboardCardGradient: {
    height: normalizeHeight(60),
    justifyContent: 'center',
    borderRadius: 73,
    paddingRight: normalizeWidth(20),
    width: '100%',
  },
  leaderboardCardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(12),
  },
  avatarNameWrapper: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    height: normalizeHeight(40),
    width: normalizeWidth(40),
    resizeMode: 'contain',
    borderRadius: normalizeWidth(20),
  },
  nameText: {marginLeft: normalizeWidth(14)},
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
  viewLeaderboardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(8),
    width: normalizeWidth(171),
    justifyContent: 'center',
    marginHorizontal: normalizeWidth(106),
    backgroundColor: '#815FC4',
    borderRadius: 12,
    marginTop: normalizeHeight(26),
    marginBottom: normalizeHeight(48),
  },
  viewLeaderboardText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginRight: normalizeWidth(8),
  },
  viewLeaderboardIcon: {
    height: normalizeHeight(16),
    width: normalizeWidth(16),
    resizeMode: 'contain',
    transform: [{scaleX: -1}],
  },
});

export default LeaderboardList;
