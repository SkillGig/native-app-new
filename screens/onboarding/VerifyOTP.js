import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CodeField, CustomSvg} from '../../components';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import CompTextInput from '../../components/CompTextInput';
import {ThemeContext} from '../../src/context/ThemeContext';
const VerifyOTP = ({navigation}) => {
  const [otpval, setotpval] = useState('');
  const [otpStatus, setOtpStatus] = useState('normal');
  const {isDark, colors} = useContext(ThemeContext);
  const otpRef = useRef();
  console.log(otpval, 'otpppp');
  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF']; // adjust light mode gradient

  const patternImage = isDark
    ? images.SIDEPATTERNDARK
    : images.SIDEPATTERNLIGHT;

    const handleOtpSubmit = () => {
     if (otpval === '1234') {
       setOtpStatus('success');
       navigation.navigate('InfoCheck');
     } else {
       setOtpStatus('error');
     }
   };

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <Image source={patternImage} style={styles.sidePattern} />
      <View style={styles.container}>
      {isDark? <Image source={images.BACKICON} style={styles.backIcon} />:
       <Image source={images.BLACKBACKICON} style={styles.backIcon} />}
        <Text
          style={[
            styles.title,
            {color: isDark ? 'rgba(255, 255, 255, 0.60)' : '#2A0D54'},
          ]}>
          Verify it’s you 🔐
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: isDark ? 'rgba(255, 255, 255, 0.80)' : '#4F378A'},
          ]}>
          Just an OTP verification
        </Text>
        <View
          style={{
            marginVertical: normalizeHeight(46),
            marginLeft: normalizeWidth(4),
          }}>
          <Text
            style={[styles.shared, {color: isDark ? '#EEE7F9' : '#3C0E90'}]}>
            We’ve just shared a high security 4 digit code with you on +91
            xxxxxxxx99
          </Text>
        </View>

        <CodeField
          verifyOtp={true}
          otpData={val => {
            setotpval(val);
          }}
          ref={otpRef}
          status={otpStatus} 
        />
        <View style={{marginTop: normalizeHeight(24)}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: isDark ? 'white' : '#300B73',
            }}>
            Didn’t Receive the code yet ?{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalizeHeight(4),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: isDark ? 'white' : 'rgba(0, 0, 0, 0.12)',
              }}>
              Resend OTP
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: isDark ? 'white' : '#5013C0',
              }}>
              {' '}
              in 00:56
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate('UnlockedExp');
        // }}
        onPress={handleOtpSubmit}
        style={{
          width: normalizeWidth(308),
          backgroundColor: '#5013C0',
          position: 'absolute',
          bottom: 90,
          marginHorizontal: normalizeWidth(32),
          borderRadius: 12,
          paddingVertical: normalizeHeight(12),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: '800'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default VerifyOTP;
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
  shared: {
    fontSize: 16,
    fontWeight: '700',
  },
});
