import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CodeField} from '../../components';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import PageLayout from './PageLayout';
import {ThemeContext} from '../../src/context/ThemeContext';
import {resendOTP, verifyOTP} from '../../src/api/userOnboardingAPIs';
import CommonButton from '../../components/CommonButton';
import Loader from '../../components/Loader';

const RESEND_OTP_TIME = 5;

const VerifyOTP = ({route, navigation}) => {
  const [otpval, setotpval] = useState('');
  const [otpStatus, setOtpStatus] = useState('normal');
  const [timer, setTimer] = useState(RESEND_OTP_TIME);
  const [resending, setResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpId, setOtpId] = useState('');
  const {isDark} = useContext(ThemeContext);
  const otpRef = useRef();

  const {orgCode, studentId, loginData} = route.params;

  console.log('VerifyOTP screen params:', {
    orgCode,
    studentId,
    loginData,
  });

  useEffect(() => {
    if (loginData?.data?.otpId) {
      setOtpId(loginData.data.otpId);
    }
  }, [loginData?.data?.otpId]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleOtpSubmit = async () => {
    navigation.navigate('InfoCheck');
    return
    setIsLoading(true);
    setOtpStatus('normal');
    try {
      const payload = {
        orgCode,
        studentId,
        otp: otpval,
        otpId: otpId,
      };
      const res = await verifyOTP(payload);
      console.log(res, 'OTP Verification Response');
      if (res && !res.error) {
        setOtpStatus('success');
        // navigation.navigate('InfoCheck'); // Uncomment if you want to navigate
        console.log('OTP Verification Response:', res);
        if (res?.data?.isNewUser) {
          setTimeout(
            () =>
              navigation.reset({
                index: 1,
                routes: [
                  {
                    name:
                      res?.data?.ongoingRequestDetails?.length > 0
                        ? 'RequestStatus'
                        : 'InfoCheck',
                    params: {
                      orgCode,
                      studentId,
                      studentInfo: res?.data?.studentDetails,
                      ongoingRequestDetails: res?.data?.ongoingRequestDetails,
                      branchDetailsOptions: res?.data?.orgBranchDetails.map(
                        option => ({
                          key: option.branchId,
                          value: option.branchName,
                        }),
                      ),
                    },
                  },
                ],
              }),
            700,
          );
        } else {
          setTimeout(
            () =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'UnlockedExp',
                    params: {
                      authToken: res.authorization,
                      refreshToken: res['x-refresh-token'],
                    },
                  },
                ],
              }),
            700,
          );
        }
      } else {
        setOtpStatus('error');
      }
    } catch (err) {
      setOtpStatus('error');
      console.log('OTP Verification Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer === 0 && !resending) {
      setResending(true);
      try {
        // Call the resend OTP API (loginWithOrgAndStudentId)
        const resendRes = await resendOTP({
          orgCode,
          studentId,
        });

        console.log(resendRes, 'Resend OTP Response');
        // Read the new otpId and generatedOtp from the response and update state
        if (resendRes?.data?.otpId) {
          setOtpId(resendRes.data.otpId);
        }
        if (resendRes?.data?.generatedOtp) {
          loginData.data.generatedOtp = resendRes.data.generatedOtp; // Update the loginData directly
        }
      } catch (err) {
        console.log('Resend OTP Error:', err);
      } finally {
        setTimer(RESEND_OTP_TIME);
        setResending(false);
      }
    }
  };

  return (
    <PageLayout
      heading="Verify it's you 🔐"
      description="Just an OTP verification"
      hasBackButton
      onBackButton={() => navigation.goBack()}>
      <View
        style={{
          marginVertical: normalizeHeight(46),
          marginLeft: normalizeWidth(4),
        }}>
        <Text style={[styles.shared, {color: isDark ? '#EEE7F9' : '#3C0E90'}]}>
          We've just shared a high security 4 digit code with you on +91
          {loginData?.data?.maskedPhone}
        </Text>
      </View>

      <CodeField
        verifyOtp={true}
        otpData={val => setotpval(val)}
        ref={otpRef}
        status={otpStatus}
        value={loginData?.data.generatedOtp || ''}
      />

      <View style={{marginTop: normalizeHeight(24)}}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: isDark ? 'white' : '#300B73',
          }}>
          Didn't Receive the code yet ?{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalizeHeight(4),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            disabled={timer > 0 || resending}
            onPress={handleResendOtp}
            activeOpacity={timer === 0 && !resending ? 0.7 : 1}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color:
                  timer === 0 && !resending
                    ? isDark
                      ? '#EEE7F9'
                      : '#5013C0'
                    : isDark
                    ? 'white'
                    : 'rgba(0, 0, 0, 0.12)',
                textDecorationLine:
                  timer === 0 && !resending ? 'underline' : 'none',
              }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: isDark ? 'white' : '#5013C0',
            }}>
            {timer > 0 ? ` in 00:${timer.toString().padStart(2, '0')}` : ''}
          </Text>
        </View>
      </View>

      <CommonButton
        name="Submit"
        onPress={handleOtpSubmit}
        disabled={isLoading}
        style={{
          width: normalizeWidth(308),
          marginTop: normalizeHeight(40),
          alignSelf: 'center',
        }}
        textStyle={{
          fontSize: 14,
          fontWeight: '800',
        }}
      />
      {isLoading && <Loader />}
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  shared: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default VerifyOTP;
