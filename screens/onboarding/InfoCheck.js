import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import CompTextInput from '../../components/CompTextInput';
import CmpCheckBox from '../../components/CmpCheckBox';
const InfoCheck = ({navigation}) => {
  const [field, setField] = useState({
    name: 'Priyanka',
    phone: '9876754321',
    email: 'shubhangisharma@gmail.com',
    batch: 'B Tech in computer Science',
    startDate: 'June 2021',
    endDate: 'June 2025',
  });
  const [isSelected, setSelection] = useState(false);
  const {isDark, colors} = useContext(ThemeContext);
  const [error, setError] = useState({});
  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF']; // adjust light mode gradient

  const patternImage = isDark
    ? images.SIDEPATTERNDARK
    : images.SIDEPATTERNLIGHT;

  const handleSubmit = () => {
    navigation.navigate('UnlockedExp');
  };

  function validateCheckBox(checkBox, key = 'checkBox') {
    if (checkBox) {
      setError(prev => ({ ...prev, [key]: null }));
      return true;
    } else {
      setError(prev => ({ ...prev, [key]: 'field required' }));
      return false;
    }
  }

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <ScrollView style={{flex: 1}}>
        <Image source={patternImage} style={styles.sidePattern} />
        <View style={styles.container}>
          {isDark ? (
            <Image source={images.BACKICON} style={styles.backIcon} />
          ) : (
            <Image source={images.BLACKBACKICON} style={styles.backIcon} />
          )}

          <Text
            style={[
              styles.title,
              {color: isDark ? 'rgba(255, 255, 255, 0.60)' : '#2A0D54'},
            ]}>
            Quick Info Check ✔️
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: isDark ? 'rgba(255, 255, 255, 0.80)' : '#4F378A'},
            ]}>
            If this looks like you, let’s lock it in!!
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={images.INFOCHECKCARD}
            style={{
              // width: '100%',
              height: normalizeHeight(552),
              width: normalizeWidth(303),
              marginTop: normalizeHeight(22),
            }}>
            <View
              style={{
                paddingHorizontal: normalizeWidth(26),
                paddingTop: normalizeHeight(24),
              }}>
              <CompTextInput
                label={'Name'}
                placeholder="Enter name"
                value={field.name}
                labelstyle={{color: 'rgba(0, 0, 0, 0.38)'}}
                inputstyle={{
                  color: isDark ? 'white' : 'rgba(0, 0, 0, 0.38)',
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? 'white' : 'rgba(0, 0, 0, 0.40)',
                  fontSize: 16,
                  fontWeight: '700',
                }}
              />

              <CompTextInput
                label={'Phone Number'}
                placeholder="Enter phone number"
                value={field.phone}
                labelstyle={{color: 'rgba(0, 0, 0, 0.38)'}}
                inputstyle={{
                  color: isDark ? 'white' : 'rgba(0, 0, 0, 0.38)',
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? 'white' : 'rgba(0, 0, 0, 0.40)',
                  fontSize: 16,
                  fontWeight: '700',
                }}
              />

              <CompTextInput
                label={'Email'}
                placeholder="Enter Email is"
                value={field.email}
                labelstyle={{color: 'rgba(0, 0, 0, 0.38)'}}
                inputstyle={{
                  color: isDark ? 'white' : 'rgba(0, 0, 0, 0.38)',
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? 'white' : 'rgba(0, 0, 0, 0.40)',
                  fontSize: 16,
                  fontWeight: '700',
                }}
              />

              <CompTextInput
                label={'Batch'}
                placeholder="Enter your batch"
                value={field.batch}
                labelstyle={{color: 'rgba(0, 0, 0, 0.38)'}}
                inputstyle={{
                  color: isDark ? 'white' : 'rgba(0, 0, 0, 0.38)',
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? 'white' : 'rgba(0, 0, 0, 0.40)',
                  fontSize: 16,
                  fontWeight: '700',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CompTextInput
                  inputstyle={{
                    width: normalizeWidth(110),
                    fontSize: 16,
                    fontWeight: '700',
                    borderBottomWidth: 1,
                    borderBottomColor: isDark ? 'white' : 'rgba(0, 0, 0, 0.40)',
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.87)'
                      : 'rgba(0, 0, 0, 0.40)',
                  }}
                  label={'Start Date'}
                  placeholder="Enter your startDate"
                  value={field.startDate}
                  labelstyle={{color: 'rgba(0, 0, 0, 0.38)'}}
                />
                <CompTextInput
                  inputstyle={{
                    width: normalizeWidth(110),
                    fontSize: 16,
                    fontWeight: '700',
                    borderBottomWidth: 1,
                    borderBottomColor: isDark ? 'white' : 'rgba(0, 0, 0, 0.40)',
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.87)'
                      : 'rgba(0, 0, 0, 0.40)',
                  }}
                  label={'End Date'}
                  placeholder="Enter your endDate"
                  value={field.endDate}
                  labelstyle={{color: 'rgba(0, 0, 0, 0.38)'}}
                />
              </View>
              <TouchableOpacity style={{marginTop:normalizeHeight(8)}}>
                <LinearGradient
                  colors={['#D3C4EF', '#EEE7F9']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    // flex: 1,
                    borderRadius: 12,
                    paddingHorizontal: normalizeWidth(12),
                    paddingVertical: normalizeHeight(8),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: '600'}}>
                    Does something feels wrong?
                  </Text>
                  <Text
                    style={{color: '#5013C0', fontSize: 12, fontWeight: '600'}}>
                    Yes
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <CmpCheckBox
                value={field?.checkBox}
                onSelect={() => {
                  setField(prev => {
                    return {
                      ...prev,
                      checkBox: !prev.checkBox,
                    };
                  });
                  validateCheckBox(!field?.checkBox);
                }}
                text={
                  'I acknowledge the information above belongs to me and correct.'
                }
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
      <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate('UnlockedExp');
        // }}
        onPress={handleSubmit}
        style={{
          width: normalizeWidth(308),
          backgroundColor: '#5013C0',
          position: 'absolute',
          bottom: 40,
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

export default InfoCheck;
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
