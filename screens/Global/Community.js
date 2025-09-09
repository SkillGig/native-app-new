import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageWrapper from '../../components/PageWrapper';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import useUserStore from '../../src/store/useUserStore';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Community member data with chat bubbles
const communityMembers = [
  {
    id: 1,
    name: 'Maya',
    message: 'Building something special',
    position: {top: 0.08, left: 0.12},
    rotation: 8,
    translate: 0,
    delay: 0,
  },
  {
    id: 2,
    name: 'Maya',
    message: 'Building something special',
    position: {top: 0.1, left: 0.52},
    rotation: -6,
    delay: 200,
  },
  {
    id: 3,
    name: 'Maya',
    message: 'Building something special',
    position: {top: 0.2, left: 0.004},
    rotation: 18,
    delay: 400,
  },
  {
    id: 4,
    name: 'Maya',
    message: 'Building something special',
    position: {top: 0.22, left: 0.32},
    rotation: -12,
    delay: 600,
  },
  {
    id: 5,
    name: 'Maya',
    message: 'Building something special',
    position: {top: 0.38, left: -0.04},
    rotation: 10,
    delay: 800,
  },
  {
    id: 6,
    name: 'Maya',
    message: 'Building something special',
    position: {top: 0.29, left: 0.6},
    rotation: -24,
    delay: 1000,
  },
];

const Community = () => {
  const isDark = true;
  const colors = {primary: '#B095E3'};
  const fstyles = getFontStyles(isDark, colors);
  const communityNotifyClicked = useUserStore(
    state => state.user.communityNotifyClicked,
  );
  const setCommunityNotifyClicked = useUserStore(
    state => state.setCommunityNotifyClicked,
  );

  // setCommunityNotifyClicked(false);

  // Animation values for floating bubbles
  const animatedValues = useRef(
    communityMembers.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
      scale: new Animated.Value(0.8),
    })),
  ).current;

  // Animation for notify button
  const notifyButtonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate community bubbles with staggered effect
    const animations = animatedValues.map((animValue, index) => {
      return Animated.sequence([
        Animated.delay(communityMembers[index].delay),
        Animated.parallel([
          Animated.timing(animValue.opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animValue.translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animValue.scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    // Animate notify button after all bubbles
    const notifyAnimation = Animated.sequence([
      Animated.delay(1500),
      Animated.spring(notifyButtonAnim, {
        toValue: 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
    ]);

    Animated.parallel([...animations, notifyAnimation]).start();
  }, [animatedValues, notifyButtonAnim]);

  const renderCommunityBubble = (member, index) => {
    const animValue = animatedValues[index];
    const {position, rotation} = member;

    return (
      <Animated.View
        key={member.id}
        style={[
          styles.bubbleContainer,
          {
            position: 'absolute',
            top: position.top ? SCREEN_HEIGHT * position.top : undefined,
            left: position.left ? SCREEN_WIDTH * position.left : undefined,
            right: position.right ? SCREEN_WIDTH * position.right : undefined,
            opacity: animValue.opacity,
            transform: [{scale: animValue.scale}, {rotate: `${rotation}deg`}],
          },
        ]}>
        <View style={styles.bubble}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
            </View>
            {/* Online indicator */}
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberMessage}>{member.message}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <PageWrapper
      gradientColors={['#391976', '#000000']}
      gradientLocations={[0, 1]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, fstyles.heavyTwentyFour]}>
          Community
        </Text>
      </View>
      <LinearGradient
        colors={['#1A0244', '#000000']}
        locations={[0, 0.4]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.container}>
        {/* Header */}

        {/* Floating community bubbles */}
        <View style={styles.bubblesContainer}>
          {communityMembers.map((member, index) =>
            renderCommunityBubble(member, index),
          )}
        </View>

        {/* Bottom content */}
        <View style={styles.bottomContent}>
          {/* Coming soon section */}
          <View style={styles.comingSoonContainer}>
            <Text style={styles.comingSoonTitle}>Coming soon 👋</Text>
            {communityNotifyClicked ? (
              <View>
                <Text style={styles.comingSoonDescription}>
                  We're building something special- a space to connect, share
                  and grow with fellow professionals. Stay tuned!
                </Text>

                {/* Notify Me button */}
                <View style={{alignItems: 'center', maxWidth: '100%'}}>
                  <TouchableOpacity
                    style={styles.notifyButton}
                    activeOpacity={0.8}
                    onPress={() =>
                      setCommunityNotifyClicked(!communityNotifyClicked)
                    }>
                    <Text style={styles.notifyButtonText}>Notify Me →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.listIndicatorContainer}>
                  <View style={styles.listIndicator}>
                    <Text style={styles.listText}>You're on the list</Text>
                    <View style={styles.checkIcon}>
                      <Text style={styles.checkIconText}>✓</Text>
                    </View>
                  </View>
                </View>
                <LinearGradient
                  colors={[
                    'rgba(214, 195, 242, 0.50)',
                    'rgba(214, 195, 242, 0.10)',
                    'rgba(53, 7, 120, 0.40)',
                  ]}
                  locations={[0, 0.01, 1]}
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0}}
                  style={styles.bottomPanel}>
                  <Text style={styles.bottomPanelText}>
                    We'll notify you as soon as the community launches. Get
                    ready to connect with amazing professionals!
                  </Text>
                </LinearGradient>
              </>
            )}
          </View>

          {/* You're on the list indicator */}

          {/* Bottom notification panel */}
        </View>
      </LinearGradient>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: normalizeWidth(32),
    borderTopRightRadius: normalizeWidth(32),
    borderTopLeftWidth: 2,
    borderTopRightWidth: 2,
    borderColor: '#311E55',
  },
  header: {
    paddingTop: normalizeHeight(20),
    paddingHorizontal: normalizeWidth(20),
    alignItems: 'flex-start',
    marginBottom: normalizeHeight(18),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(24),
    fontWeight: '700',
    textAlign: 'center',
  },
  bubblesContainer: {
    flex: 1,
    position: 'relative',
  },
  bubbleContainer: {
    zIndex: 1,
    width: '100%',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A1458',
    borderRadius: normalizeWidth(16),
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(6),
    borderWidth: 1,
    borderColor: '#4A3070',
    shadowColor: '#B095E3',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    maxWidth: normalizeWidth(160),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: normalizeWidth(6),
  },
  avatar: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    borderRadius: normalizeWidth(10),
    backgroundColor: '#8B7AB8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(10),
    fontWeight: '700',
  },
  onlineIndicator: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: normalizeWidth(8),
    height: normalizeHeight(8),
    borderRadius: normalizeWidth(4),
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: '#391976',
  },
  messageContainer: {
    flex: 1,
  },
  memberName: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(10),
    fontWeight: '600',
    marginBottom: normalizeHeight(1),
  },
  memberMessage: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: normalizeWidth(9),
    fontWeight: '400',
    lineHeight: normalizeHeight(12),
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: normalizeWidth(20),
    paddingBottom: normalizeHeight(100), // Account for bottom nav
  },
  comingSoonContainer: {
    alignItems: 'center',
    marginBottom: normalizeHeight(30),
  },
  comingSoonTitle: {
    color: '#F8F3FE',
    fontSize: normalizeWidth(32),
    fontWeight: '900',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: normalizeHeight(38),
    marginBottom: normalizeHeight(16),
  },
  comingSoonDescription: {
    color: '#E9DCFA',
    fontSize: normalizeWidth(16),
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Lato',
    letterSpacing: 0.1,
    lineHeight: normalizeHeight(19),
    marginBottom: normalizeHeight(32),
    paddingHorizontal: normalizeWidth(10),
  },
  notifyButton: {
    borderRadius: normalizeWidth(12),
    overflow: 'hidden',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyButtonText: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(14),
    fontWeight: '600',
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(8),
    borderWidth: 1,
    borderColor: '#875DCA',
    backgroundColor: '#875DCA',
  },
  listIndicatorContainer: {
    alignItems: 'center',
    marginBottom: normalizeHeight(20),
  },
  listIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderRadius: normalizeWidth(20),
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(8),
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  listText: {
    color: '#4CAF50',
    fontSize: normalizeWidth(14),
    fontWeight: '500',
    marginRight: normalizeWidth(8),
  },
  checkIcon: {
    width: normalizeWidth(16),
    height: normalizeHeight(16),
    borderRadius: normalizeWidth(8),
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIconText: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(10),
    fontWeight: '700',
  },
  userAvatarContainer: {
    position: 'absolute',
    right: normalizeWidth(20),
    top: normalizeHeight(-10),
  },
  userAvatar: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    borderRadius: normalizeWidth(20),
    backgroundColor: '#B095E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#090215',
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(18),
    fontWeight: '700',
  },
  bottomPanel: {
    backgroundColor: 'rgba(176, 149, 227, 0.1)',
    borderRadius: normalizeWidth(16),
    padding: normalizeWidth(20),
    borderWidth: 1,
    borderColor: 'rgba(176, 149, 227, 0.2)',
  },
  bottomPanelText: {
    color: '#F2E7FD',
    fontSize: normalizeWidth(12),
    fontWeight: '400',
    textAlign: 'left',
    lineHeight: normalizeHeight(20),
  },
});

export default Community;
