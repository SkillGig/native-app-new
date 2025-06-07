import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';

const NotificationsPanel = ({notificationData, setActiveCurrentView}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[fstyles.heavyTwentyFour, {color: '#B095E3'}]}>
          Notifications
        </Text>
        <TouchableOpacity onPress={() => setActiveCurrentView(null)}>
          <Image
            source={images.CLOSEICON}
            style={{
              height: 24,
              width: 24,
              marginTop: normalizeHeight(8),
            }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={notificationData}
        keyExtractor={(item, index) => `_${index}`}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity style={styles.notificationItem}>
                <View style={styles.notificationLeft}>
                  <Image source={item.leftIcon} style={styles.leftIcon} />
                  <View style={styles.notificationText}>
                    <Text
                      style={[
                        fstyles.semiTwelwe,
                        {color: 'rgba(229, 220, 246, 0.40)'},
                      ]}>
                      {item.title}
                    </Text>
                    <Text style={[fstyles.regularSixteen, {color: '#F6F3FC'}]}>
                      {item.text}
                    </Text>
                  </View>
                </View>
                <Image
                  source={images.NOTIFICATIONRIGHTARROW}
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
              <View style={styles.divider} />
            </>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: normalizeHeight(28),
    marginBottom: normalizeHeight(24),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(8),
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  notificationText: {
    marginLeft: normalizeWidth(18),
    flex: 0.9,
  },
  rightIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  divider: {
    height: normalizeHeight(1),
    width: '100%',
    backgroundColor: 'rgba(176, 149, 227, 0.40)',
    marginTop: normalizeHeight(12),
  },
});

export default NotificationsPanel;
