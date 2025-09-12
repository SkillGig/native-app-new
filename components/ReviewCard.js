import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import images from '../assets/images';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {getFontStyles} from '../styles/FontStyles';
import {useContext} from 'react';
import {ThemeContext} from '../src/context/ThemeContext';

const ReviewCard = ({text, author = 'Student 1'}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  return (
    <View style={styles.card}>
      <Text
        style={[
          fstyles.twelweRegular,
          {color: '#F6F3FC', fontStyle: 'italic'},
        ]}>
        "{text}"
      </Text>
      <View style={styles.row}>
        <View style={styles.avatarBg}>
          <Image source={images.FEMALEAVATAR} style={styles.avatar} />
        </View>
        <View style={{marginLeft: normalizeWidth(8)}}>
          <Text style={[fstyles.boldTwelwe, {color: '#F6F3FC'}]}>
            Shravani |{' '}
            <Text
              style={[fstyles.mediumTen, {color: 'rgba(229, 220, 246, 0.40)'}]}>
              {author}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(176, 149, 227, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    marginRight: normalizeWidth(12),
    borderRadius: 12,
    width: normalizeWidth(290),
    paddingHorizontal: normalizeWidth(14),
    paddingVertical: normalizeHeight(18),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeHeight(12),
  },
  avatarBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.20) ',
  },
  avatar: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
});
