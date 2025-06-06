import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import CompTextInput from '../../components/CompTextInput';
import React, {useCallback, useState} from 'react';
import PageLayout from './PageLayout';
import {
  findOrgWithOrgCode,
  loginWithOrgAndStudentId,
} from '../../src/api/userOnboardingAPIs';
import Loader from '../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import CommonButton from '../../components/CommonButton';

const Login = ({navigation}) => {
  const [field, setField] = useState({orgCode: '', studentId: ''});
  const [orgError, setOrgError] = useState('');
  const [studentIdError, setStudentIdError] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = field.orgCode.length >= 4 && field.studentId.length >= 4;

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, []),
  );

  const handleSubmit = async () => {
    // return navigation.navigate('RoadMap');

    setOrgError('');
    setStudentIdError('');
    setLoading(true);
    try {
      // 1. Verify Org
      const orgData = await findOrgWithOrgCode(field.orgCode);

      if (orgData?.error) {
        setOrgError(orgData.error);
        setLoading(false);
        return;
      }
      // 2. Login
      const loginData = await loginWithOrgAndStudentId({
        orgCode: field.orgCode,
        studentId: field.studentId,
      });

      if (loginData?.error?.error) {
        setStudentIdError(loginData?.error?.error);
        setLoading(false);
        return;
      }

      return navigation.navigate('VerifyOTP', {
        orgCode: field.orgCode,
        studentId: field.studentId,
        loginData,
      });
      // 3. Navigate if both succeed
      // navigation.navigate('VerifyOTP');
    } catch (err) {
      // Error handling for each API
      if (err?.response?.data?.error || err?.error) {
        const errorMsg = err.response?.data?.error || err.error;
        if (errorMsg.toLowerCase().includes('org')) {
          setOrgError(errorMsg);
        } else {
          setStudentIdError(errorMsg);
        }
      } else {
        setStudentIdError('Something went wrong. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <PageLayout
      heading="Let's Go 🚀"
      description="The grind starts here !!"
      hasBackButton
      onBackButton={() => navigation.goBack()}>
      <View style={{marginTop: normalizeHeight(60)}}>
        <CompTextInput
          label="Organization Code *"
          placeholder="Enter Organization code"
          infoText
          fieldDesc="Enter your organization code (8 digit)"
          value={field.orgCode}
          onChangeText={text => {
            setField(prev => ({...prev, orgCode: text}));
            setOrgError('');
          }}
          errorMessage={orgError}
        />
      </View>

      <View style={{marginTop: normalizeHeight(35)}}>
        <CompTextInput
          label="Student ID *"
          placeholder="Enter Student ID"
          infoText
          value={field.studentId}
          onChangeText={text => {
            setField(prev => ({...prev, studentId: text}));
            setStudentIdError('');
          }}
          errorMessage={studentIdError}
        />
      </View>

      <CommonButton
        name="Submit"
        onPress={handleSubmit}
        disabled={!isFormValid || loading}
        loading={loading}
      />
      {loading && <Loader />}
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    marginTop: normalizeHeight(55),
    marginHorizontal: normalizeWidth(24),
  },
  sidePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
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
  submitButton: {
    paddingVertical: normalizeHeight(12),
    borderRadius: normalizeWidth(12),
    marginTop: normalizeHeight(260),
    alignItems: 'center',
  },
  submitText: {
    color: '#EADDFF',
    fontSize: normalizeWidth(16),
    fontWeight: '700',
  },
});

export default Login;
