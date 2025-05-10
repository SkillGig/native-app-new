import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomSvg} from '../../components';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import CompTextInput from '../../components/CompTextInput';

const Login = () => {
  console.log('loginnnnnn');
  const [field, setField] = useState({});
  const handleSubmit = () => {
    console.log('Submit');
  };
  return (
    <LinearGradient
      colors={['#381874', '#150534']}
      style={{
        flex: 1,
      }}>
      <Image source={images.SIDEPATTERN} style={styles.sidePattern} />
      <View
        style={{
          marginTop: normalizeHeight(55),
          marginHorizontal: normalizeWidth(24),
        }}>
        <Image
          source={images.BACKICON}
          style={{
            height: normalizeHeight(24),
            width: normalizeWidth(24),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.60)',
            fontWeight: '900',
          }}>
          Let’s Go 🚀
        </Text>
        <Text style={{fontSize: 14, color: '#EADDFF', fontWeight: '500'}}>
          The grind starts here !!
        </Text>
        <View style={{marginTop: normalizeHeight(60)}}>
          <CompTextInput
            label={'Org Code *'}
            placeholder="Enter Organisation code"
            infoText={true}
            errorMessage={'Enter your organisation code (8 digit)'}
            value={field.orgcode}
          />
        </View>

        <View style={{marginTop: normalizeHeight(35)}}>
          <CompTextInput
            label={'Student ID *'}
            placeholder="Enter Student ID"
            infoText={true}
            value={field.orgcode}
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

export default Login;
const styles = StyleSheet.create({
  sidePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
  },
});
