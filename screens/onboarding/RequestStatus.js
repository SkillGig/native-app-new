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
import {CodeField, CustomSvg, FooterBtn} from '../../components';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import CompTextInput from '../../components/CompTextInput';
import {ThemeContext} from '../../src/context/ThemeContext';
const RequestStatus = ({navigation}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const otpRef = useRef();
  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF'];

  const patternImage = isDark
    ? images.SIDEPATTERNDARK
    : images.SIDEPATTERNLIGHT;

  // const status = 'submitted';
  // const status='progress';
  // const status='approved';
  // const status = 'rejected';
  const status='partial';

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
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
          Request Status⏳
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: isDark ? 'rgba(255, 255, 255, 0.80)' : '#4F378A'},
          ]}>
          We are working on your request
        </Text>
        {status === 'submitted' ? (
          <View style={{alignItems: 'center', marginTop: normalizeHeight(30)}}>
            <Image
              source={images.REQUESTSUBMITTED}
              style={{
                height: normalizeHeight(170),
                width: normalizeWidth(170),
                resizeMode: 'contain',
              }}
            />
            <Text style={[styles.status, {marginTop: normalizeHeight(34)}]}>
              Request Submitted
            </Text>
            <View style={{marginTop: normalizeHeight(34)}}>
              <Image
                source={images.SUBMITTEDSTATE}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(190),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: normalizeWidth(40),
                marginTop: normalizeHeight(27),
              }}>
              <Text style={[styles.statusText, {textAlign: 'center'}]}>
                Your request for change of phone number and branch has been
                submitted successfully. Please wait while we review your
                details.
              </Text>
            </View>
          </View>
        ) : status === 'progress' ? (
          <View style={{alignItems: 'center', marginTop: normalizeHeight(30)}}>
            <Image
              source={images.REQUESTINPROCESS}
              style={{
                height: normalizeHeight(220),
                width: normalizeWidth(220),
                resizeMode: 'contain',
              }}
            />
            <Text style={styles.status}>In Progress</Text>
            <View style={{marginTop: normalizeHeight(34)}}>
              <Image
                source={images.INPROGRESSSTATE}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(190),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: normalizeWidth(40),
                marginTop: normalizeHeight(27),
              }}>
              <Text style={[styles.statusText, {textAlign: 'center'}]}>
                Your request is currently under review. We’ll notify you once a
                decision is made.
              </Text>
            </View>
          </View>
        ) : status === 'approved' ? (
          <View style={{alignItems: 'center'}}>
            <Image
              source={images.REQUESTAPPROVED}
              style={{
                height: normalizeHeight(200),
                width: normalizeWidth(200),
                resizeMode: 'contain',
              }}
            />
            <Text style={[styles.status]}>Approved</Text>
            <View style={{marginTop: normalizeHeight(34)}}>
              <Image
                source={images.APPROVEDSTATE}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(190),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: normalizeWidth(40),
                marginTop: normalizeHeight(27),
              }}>
              <Text style={[styles.statusText, {textAlign: 'center'}]}>
                Great news! Your request has been approved. You’ll be redirected
                shortly.
              </Text>
            </View>

           <FooterBtn 
           textStyle={{ color: 'white',
           fontSize: normalizeWidth(14),
           fontWeight: '800',}}
           style={{width:normalizeWidth(303)}}
           onPress={()=>{}}
  label="Continue"/>
          </View>
        ) : status === 'rejected' ? (
          <View style={{alignItems: 'center'}}>
            <Image
              source={images.REQUESTREJECTED}
              style={{
                height: normalizeHeight(200),
                width: normalizeWidth(200),
                resizeMode: 'contain',
              }}
            />
            <Text style={[styles.status]}>Rejected</Text>
            <View style={{marginTop: normalizeHeight(34)}}>
              <Image
                source={images.REJECTEDSTATE}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(190),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: normalizeWidth(40),
                marginTop: normalizeHeight(27),
              }}>
              <Text style={[styles.statusText, {textAlign: 'center'}]}>
              Your request has been rejected, please check with the admin or raise a request again.
              </Text>
            </View>
            <FooterBtn 
           textStyle={{ color: 'white',
           fontSize: normalizeWidth(14),
           fontWeight: '800',}}
           style={{width:normalizeWidth(303)}}
           onPress={()=>{}}
  label="Continue"/>
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <Image
              source={images.REQUESTPARTIAL}
              style={{
                height: normalizeHeight(200),
                width: normalizeWidth(200),
                resizeMode: 'contain',
              }}
            />
            <Text style={[styles.status]}>Partially Approved</Text>
            <View style={{marginTop: normalizeHeight(34)}}>
              <Image
                source={images.PARTIALSTATE}
                style={{
                  height: normalizeHeight(24),
                  width: normalizeWidth(190),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: normalizeWidth(40),
                marginTop: normalizeHeight(27),
              }}>
              <Text style={[styles.statusText, {textAlign: 'center'}]}>
              Some of your details have been approved, while others were not. Please check the summary below for more info.
              </Text>
            </View>

            <FooterBtn 
           textStyle={{ color: 'white',
           fontSize: normalizeWidth(14),
           fontWeight: '800',}}
           style={{width:normalizeWidth(303)}}
           onPress={()=>{}}
  label="Continue"/>
          </View>
        )}
      </View>
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
  shared: {
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});
