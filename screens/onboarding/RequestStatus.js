import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FooterBtn} from '../../components';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import PersistentBottomSheet from '../../components/PersistentBottomSheet';
import CompTextInput from '../../components/CompTextInput';

const RequestStatus = ({navigation}) => {
  const {isDark} = useContext(ThemeContext);
  const sheetRef = useRef(null);

  const [field, setField] = useState({
    name: 'Shubhangi Sharma',
    phone: '9876543210',
    email: 'shubhangisharma@gmail.com',
    batch: 'B tech in computer Science',
    startDate: 'June 2021',
    endDate: 'July 2025',
  });

  useEffect(() => {
    // Automatically present the persistent bottom sheet when component mounts
    sheetRef.current?.present();
  }, []);

  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF'];

  const patternImage = isDark
    ? images.SIDEPATTERNDARK
    : images.SIDEPATTERNLIGHT;

  const status = 'partial';

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <Image source={patternImage} style={styles.sidePattern} />
      <View style={styles.container}>
        <Image
          source={isDark ? images.BACKICON : images.BLACKBACKICON}
          style={styles.backIcon}
        />
        <Text
          style={[
            styles.title,
            {color: isDark ? 'rgba(255, 255, 255, 0.60)' : '#2A0D54'},
          ]}>
          Request Status⏳
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: isDark ? 'rgba(255, 255, 255, 0.80)' : '#4F378A'},
          ]}>
          We are working on your request
        </Text>

        {status === 'partial' && (
          <View style={{alignItems: 'center'}}>
            <Image
              source={images.REQUESTPARTIAL}
              style={{
                height: normalizeHeight(200),
                width: normalizeWidth(200),
                resizeMode: 'contain',
              }}
            />
            <Text style={styles.status}>Partially Approved</Text>
            <Image
              source={images.PARTIALSTATE}
              style={{
                height: normalizeHeight(24),
                width: normalizeWidth(190),
                resizeMode: 'contain',
                marginTop: normalizeHeight(34),
              }}
            />
            <View
              style={{
                marginHorizontal: normalizeWidth(40),
                marginTop: normalizeHeight(27),
              }}>
              <Text style={[styles.statusText, {textAlign: 'center'}]}>
                Some of your details have been approved, while others were not.
                Please check the summary below for more info.
              </Text>
            </View>
            <FooterBtn
              textStyle={{
                color: 'white',
                fontSize: normalizeWidth(14),
                fontWeight: '800',
              }}
              style={{width: normalizeWidth(303)}}
              onPress={() => {}}
              label="Continue"
            />
          </View>
        )}
      </View>

      {/* Persistent Bottom Sheet */}
      <PersistentBottomSheet
        ref={sheetRef}
        enableHeader={true}
        headerText={'Requested Changes(2)'}>
        <View style={styles.bottomSheetDataContainer}>
          <CompTextInput
            label="Name"
            value={field.name}
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={false}
            opacity={0.75}
            type={'status'}
            status="approved"
          />
          <CompTextInput
            label="Phone Number"
            value={field.phone}
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={false}
            opacity={0.75}
            type={'status'}
            status="rejected"
          />
        </View>
      </PersistentBottomSheet>
    </LinearGradient>
  );
};

export default RequestStatus;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  sidePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
  },
  container: {
    marginTop: normalizeHeight(55),
    marginHorizontal: normalizeWidth(24),
  },
  backIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  status: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    marginTop: normalizeHeight(20),
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  bottomSheetDataContainer: {
    backgroundColor: '#1C0743',
    paddingHorizontal: 42,
    paddingVertical: 32,
    paddingBottom: 58,
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
  },
  input: isDark => ({
    color: isDark ? '#FFF' : 'rgba(0,0,0,0.6)',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#FFF' : 'rgba(0,0,0,0.4)',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  }),
});
