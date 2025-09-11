import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {getFontStyles} from '../styles/FontStyles';

const KnowMoreAboutBadge = ({
  visible = false,
  onClose = () => {},
  badge = {},
  colors = {primary: '#391976'},
  isDark = true,
}) => {
  const fstyles = getFontStyles(isDark, colors);

  const renderOverlay = () => {
    // Simulate a frosted/blurred backdrop using layered translucent views
    // and a subtle gradient instead of a native blur package.
    return (
      <>
        <View style={styles.fallbackOverlay} />
        <LinearGradient
          colors={['rgba(255,255,255,0.02)', 'rgba(0,0,0,0.18)']}
          style={styles.gradientOverlay}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          pointerEvents="none"
        />
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      hardwareAccelerated
      onRequestClose={onClose}>
      {/* Make the entire modal background touchable to close */}
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}>
        {renderOverlay()}

        <View style={styles.centerWrapper}>
          {/* Prevent the card from closing modal when touched */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}} // Prevent event bubbling to parent
            style={{alignItems: 'center'}}>
            <LinearGradient
              colors={['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.02)']}
              style={styles.cardOuter}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={onClose}
                activeOpacity={0.8}>
                <Text style={styles.backText}>{'<'} </Text>
              </TouchableOpacity>

              <View style={styles.iconHolderShadow}>
                <View style={styles.iconHolderInner}>
                  {badge.iconUrl ? (
                    <Image
                      source={{uri: badge.iconUrl}}
                      style={styles.iconImage}
                    />
                  ) : (
                    <View style={styles.iconFallback} />
                  )}
                </View>
              </View>

              <Text style={[fstyles.regularTwelve, styles.levelText]}>
                {badge.level || 'Lv 1'}
              </Text>
              <Text style={[fstyles.heavyTwentyFour, styles.titleText]}>
                {badge.title || 'Title'}
              </Text>

              <Text
                style={[fstyles.regularTwelve, styles.descText]}
                numberOfLines={4}>
                {badge.description || ''}
              </Text>

              <TouchableOpacity
                style={styles.gotItBtn}
                onPress={onClose}
                activeOpacity={0.8}>
                <Text style={styles.gotItText}>Got it</Text>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fallbackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 2, 6, 0.75)',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(20),
  },
  cardOuter: {
    width: '88%',
    borderRadius: 18,
    paddingVertical: normalizeHeight(28),
    paddingHorizontal: normalizeWidth(24),
    alignItems: 'center',
    backgroundColor: 'rgba(18,8,30,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  backButton: {
    position: 'absolute',
    left: 14,
    top: Platform.OS === 'ios' ? 14 : 10,
    zIndex: 20,
    padding: 8,
  },
  backText: {
    color: '#EDE7F6',
    fontSize: 20,
    fontWeight: '700',
  },
  iconHolderShadow: {
    width: normalizeWidth(120),
    height: normalizeHeight(120),
    borderRadius: 20,
    marginBottom: normalizeHeight(14),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8AE39A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 10,
  },
  iconHolderInner: {
    width: normalizeWidth(110),
    height: normalizeHeight(110),
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconImage: {
    width: '74%',
    height: '74%',
    resizeMode: 'contain',
  },
  iconFallback: {
    width: normalizeWidth(56),
    height: normalizeHeight(56),
    borderRadius: 12,
    backgroundColor: '#4ECDC4',
  },
  levelText: {
    color: '#CFC0E9',
    fontSize: 12,
    marginTop: normalizeHeight(6),
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 22,
    marginTop: normalizeHeight(6),
    textAlign: 'center',
  },
  descText: {
    color: 'rgba(238,231,249,0.72)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: normalizeHeight(12),
    lineHeight: 18,
  },
  gotItBtn: {
    marginTop: normalizeHeight(20),
    paddingVertical: normalizeHeight(10),
    paddingHorizontal: normalizeWidth(34),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'transparent',
  },
  gotItText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default KnowMoreAboutBadge;
