import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import images from '../../assets/images';
import useUserStore from '../../src/store/useUserStore';

const MyDetails = ({onBack, colors, isDark}) => {
  const fstyles = getFontStyles(isDark, colors);
  const userConfig = useUserStore(state => state.userConfig);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'transparent'}}
      contentContainerStyle={{padding: normalizeWidth(20)}}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={images.PLAINARROWLEFT} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[fstyles.heavyTwentyFour, styles.headerText]}>
          My Details
        </Text>
      </View>
      <LinearGradient
        colors={['rgba(176, 149, 227, 0.05)', 'rgba(176, 149, 227, 0.12)']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.detailsBox}>
        <DetailRow label="Name" value={userConfig.userName} />
        <DetailRow label="Phone Number" value={userConfig.phone} />
        <DetailRow label="Email" value={userConfig.email} />
        <DetailRow label="College" value={userConfig.organizationName} />
        {/* <DetailRow label="Ongoing Sem" value={userConfig.sem} /> */}
        <DetailRow label="Branch" value={userConfig.branchName} />
        <View style={styles.rowBetween}>
          <View style={{flex: 1, marginRight: normalizeWidth(8)}}>
            <DetailRow
              label="Start Date"
              value={userConfig.userStartDate.split(' ')[0]}
              hideDivider
            />
          </View>
          <View style={{flex: 1, marginLeft: normalizeWidth(8)}}>
            <DetailRow
              label="End Date"
              value={userConfig.userEndDate.split(' ')[0]}
              hideDivider
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const DetailRow = ({label, value, hideDivider}) => (
  <View style={{marginBottom: normalizeHeight(16)}}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    {!hideDivider && <View style={styles.divider} />}
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalizeHeight(28),
  },
  backButton: {
    padding: normalizeWidth(4),
  },
  backIcon: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
    tintColor: '#B095E3',
  },
  detailsBox: {
    borderRadius: 16,
    padding: normalizeWidth(20),
  },
  label: {
    color: '#B095E3',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 4,
    opacity: 0.8,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(176, 149, 227, 0.2)',
    marginTop: 8,
    marginBottom: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalizeHeight(0),
  },
  headerText: {
    color: '#B095E3',
    marginLeft: normalizeWidth(8),
    fontSize: normalizeWidth(20),
    fontWeight: 900,
    fontFamily: 'Lato',
    letterSpacing: 0.5,
    lineHeight: normalizeWidth(24),
  },
});

export default MyDetails;
