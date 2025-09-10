import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import images from '../assets/images';

const MilestoneCard = ({
  roadmapDetails,
  roleTitle,
  courseName,
  modules,
  style = {},
}) => {
  return (
    <View style={[styles.cardContainer, style]}>
      <View style={styles.cardHeader}>
        <Text style={styles.roleTitle}>{roleTitle}</Text>
        <Image source={images.EXPORT} style={styles.icon24} />
      </View>

      <ImageBackground
        source={images.ROADMAPLINES}
        style={styles.roadmapBackground}>
        <Image source={images.ROADMAPLEFTBOX} style={styles.roadmapLeftBox} />
        <Image
          source={images.ROADMAPCENTERBOX}
          style={styles.roadmapCenterBox}
        />

        <View style={styles.centerTextWrapper} pointerEvents="none">
          <Text style={styles.courseName}>{courseName}</Text>
          <Text style={styles.modulesText}>{`(${modules} Modules)`}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'rgba(229, 220, 246, 0.40)',
    marginTop: normalizeHeight(23),
    paddingTop: normalizeHeight(24),
    height: normalizeHeight(331),
    width: normalizeWidth(318),
    marginLeft: normalizeWidth(16),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(16),
  },
  roleTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  icon24: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  roadmapBackground: {height: normalizeHeight(184), width: '100%'},
  roadmapLeftBox: {
    height: normalizeHeight(48),
    width: normalizeWidth(62),
    resizeMode: 'contain',
    position: 'absolute',
    top: -10,
    left: 10,
  },
  roadmapCenterBox: {
    height: normalizeHeight(116),
    width: normalizeWidth(226),
    resizeMode: 'contain',
    position: 'absolute',
    top: 80,
    left: 40,
  },
  centerTextWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: normalizeHeight(160),
  },
  courseName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  modulesText: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: normalizeHeight(2),
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
  },
});

export default MilestoneCard;
