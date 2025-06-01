import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
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

  const [status, setStatus] = useState('');

  const [fields, setFields] = useState({
    name: {
      value: '',
      status: 'pending',
    },
    phone: {
      value: '',
      status: 'pending',
    },
    email: {
      value: '',
      status: 'pending',
    },
    branch: {
      value: '',
      status: 'pending',
    },
    startDate: {
      value: '',
      status: 'pending',
    },
  });

  useEffect(() => {
    sheetRef.current?.present();

    // Mock API response handling
    const response = {
      message: 'success',
      data: {
        isNewUser: true,
        studentDetails: {
          studentOrgId: 20,
          email: 'newstudent@gmail.com',
          phone: 7894561230,
          studentId: '12345',
          gender: 'male',
          branchCode: 'CSE',
          branchName: 'Computer Science',
          organisationId: 1,
          startDate: '00-00-0000',
          endDate: '00-00-0000',
        },
        ongoingRequestDetails: [
          {
            requestId: 9,
            status: 'approved',
            requestCreatedAt: '2025-05-18T00:57:57.000Z',
            diffDetails:
              '{"newValue": "ga", "oldValue": "gagan", "fieldName": "name", "fieldStatus": 0},{"newValue": "ga", "oldValue": "7993559974", "fieldName": "phone", "fieldStatus": 0}',
          },
        ],
      },
    };

    // Parse and update field data
    const rawDiff = response.data.ongoingRequestDetails[0]?.diffDetails || '';
    setStatus(response.data.ongoingRequestDetails[0]?.status);
    const parsed = rawDiff
      .split('},')
      .map((entry, idx, arr) =>
        JSON.parse(idx < arr.length - 1 ? `${entry}}` : entry),
      );

    const updatedFields = fields;

    parsed.forEach(({fieldName, newValue, fieldStatus}) => {
      updatedFields[fieldName].value = newValue;
      updatedFields[fieldName].status =
        fieldStatus === -1
          ? 'rejected'
          : fieldStatus === 1
          ? 'approved'
          : 'pending';
    });

    setFields(prev => ({...prev, ...updatedFields}));
  }, []);

  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF'];

  const patternImage = isDark
    ? images.SIDEPATTERNDARK
    : images.SIDEPATTERNLIGHT;

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <Image source={patternImage} style={styles.sidePattern} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            sheetRef.current?.dismiss();
            navigation.navigate('Login');
          }}>
          <Image
            source={isDark ? images.BACKICON : images.BLACKBACKICON}
            style={styles.backIcon}
          />
        </TouchableOpacity>
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
          {['approved', 'rejected', 'partially-approved'].includes(status)
            ? 'We have an update on your request'
            : 'We are working on your request'}
        </Text>

        <View style={{alignItems: 'center'}}>
          <Image
            source={
              status === 'approved'
                ? images.REQUESTAPPROVED
                : status === 'rejected'
                ? images.REQUESTREJECTED
                : status === 'partially-approved'
                ? images.REQUESTPARTIAL
                : status === 'submitted'
                ? images.REQUESTSUBMITTED
                : images.REQUESTINPROCESS
            }
            style={{
              height: normalizeHeight(200),
              width: normalizeWidth(200),
              resizeMode: 'contain',
            }}
          />

          <Text style={styles.status}>
            {status === 'approved'
              ? 'Approved'
              : status === 'rejected'
              ? 'Rejected'
              : status === 'partially-approved'
              ? 'Partially Approved'
              : status === 'submitted'
              ? 'Review Submitted'
              : 'In Progress'}
          </Text>

          <Image
            source={
              status === 'approved'
                ? images.APPROVEDSTATE
                : status === 'rejected'
                ? images.REJECTEDSTATE
                : status === 'partially-approved'
                ? images.PARTIALSTATE
                : status === 'submitted'
                ? images.SUBMITTEDSTATE
                : images.INPROGRESSSTATE
            }
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
      </View>

      <PersistentBottomSheet
        ref={sheetRef}
        enableHeader={true}
        headerText={`Requested Changes ${status}`}>
        <View style={styles.bottomSheetDataContainer}>
          {Object.entries(fields)
            .filter(([, {value}]) => value !== '')
            .map(([fieldName, {value, status}]) => (
              <CompTextInput
                key={fieldName}
                label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                value={value}
                labelstyle={styles.label}
                inputstyle={styles.input(isDark)}
                editable={false}
                opacity={0.75}
                type={'status'}
                status={status}
              />
            ))}
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
