import React, {useState,useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomSvg } from '../../components';
import { normalizeHeight, normalizeWidth } from '../../components/Responsivescreen';
import images from '../../assets/images';
import CompTextInput from '../../components/CompTextInput';
import { ThemeContext } from '../../src/context/ThemeContext';

const Login = ({ navigation }) => {
  const [field, setField] = useState({});
  const { isDark, colors } = useContext(ThemeContext);

  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF']; // adjust light mode gradient

    const patternImage = isDark ? images.SIDEPATTERNDARK : images.SIDEPATTERNLIGHT;

    const handleSubmit=()=>{
      console.log('submittt')
      // navigation.navigate('VerifyOTP')
      navigation.navigate('StreakCalender') 
    }
  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}>
      <Image source={patternImage} style={styles.sidePattern} />
      <View style={styles.container}>
      {isDark? <Image source={images.BACKICON} style={styles.backIcon} />:
       <Image source={images.BLACKBACKICON} style={styles.backIcon} />}
        <Text style={[styles.title, { color: isDark ?'rgba(255, 255, 255, 0.60)':'#2A0D54' }]}>
          Let’s Go 🚀
        </Text>
        <Text style={[styles.subtitle, { color: isDark?'#EADDFF':'#4F378A' }]}>
          The grind starts here !!
        </Text>

        <View style={{ marginTop: normalizeHeight(60) }}>
          <CompTextInput
            label={'Organisation Code *'}
            placeholder="Enter Organisation code"
            infoText={true}
            errorMessage={'Enter your organisation code (8 digit)'}
            value={field.orgcode}
          />
        </View>

        <View style={{ marginTop: normalizeHeight(35) }}>
          <CompTextInput
            label={'Student ID *'}
            placeholder="Enter Student ID"
            infoText={true}
            value={field.studentId}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#563593',
            paddingVertical: normalizeHeight(12),
            borderRadius: normalizeWidth(12),
            marginTop: normalizeHeight(260),
            alignItems: 'center',
          }}
          onPress={handleSubmit}>
          <Text
            style={{
              color: '#EADDFF',
              fontSize: normalizeWidth(16),
              fontWeight: '700',
            }}>
            Submit
          </Text>
        </TouchableOpacity>

        <View>
          {/* <TextInput
  onFocus={ () => this.onFocus() }
  style={{
    borderBottomWidth:1,
    color:"rgba(255, 255, 255, 0.54)",
    borderColor:"rgba(255, 255, 255, 0.42)"}}/> */}
        </View>
      </View>
    </LinearGradient>
  );
};

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
});

export default Login;