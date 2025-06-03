import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FooterBtn} from '../../components';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import PersistentBottomSheet from '../../components/PersistentBottomSheet';
import CompTextInput from '../../components/CompTextInput';
import PageLayout from './PageLayout';

const RequestStatus = ({navigation, route}) => {
  const {isDark} = useContext(ThemeContext);
  const sheetRef = useRef(null);

  // Read from route params
  const {ongoingRequestDetails = []} = route.params || {};
  const requestDetail = ongoingRequestDetails || {};

  // Parse diffDetails
  let parsedDiff = [];
  if (requestDetail.diffDetails) {
    try {
      // Handle both single and multiple JSON objects in diffDetails
      parsedDiff = requestDetail.diffDetails
        .split('},')
        .map((entry, idx, arr) =>
          JSON.parse(idx < arr.length - 1 ? `${entry}}` : entry),
        );
    } catch (e) {
      parsedDiff = [];
    }
  }

  // Build fields state from parsedDiff
  const initialFields = {
    name: {value: '', status: 'pending'},
    phone: {value: '', status: 'pending'},
    email: {value: '', status: 'pending'},
    branch: {value: '', status: 'pending'},
    startDate: {value: '', status: 'pending'},
  };

  parsedDiff.forEach(({fieldName, newValue, fieldStatus}) => {
    if (initialFields[fieldName]) {
      initialFields[fieldName].value = newValue;
      initialFields[fieldName].status =
        fieldStatus === -1
          ? 'rejected'
          : fieldStatus === 1
          ? 'approved'
          : 'pending';
    }
  });

  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState('');

  useEffect(() => {
    console.log('Request Detail:', requestDetail);
    if (requestDetail.status) {
      setStatus(requestDetail.status);
    } else {
      setStatus('in-progress'); // Default status if not provided
    }
  }, [requestDetail.status]);

  useEffect(() => {
    sheetRef.current?.present();
  }, []);

  // Back button handler for PageLayout
  const handleBackButton = () => {
    sheetRef.current?.dismiss();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <PageLayout
      heading="Request Status⏳"
      description={
        ['approved', 'rejected', 'partially-approved'].includes(status)
          ? 'We have an update on your request'
          : 'We are working on your request'
      }
      hasBackButton
      onBackButton={handleBackButton}>
      <View style={styles.container}>
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

          {['approved', 'rejected', 'partially-approved'].includes(status) && (
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
          )}
        </View>
      </View>

      <PersistentBottomSheet
        ref={sheetRef}
        enableHeader={true}
        headerText={`Requested Changes (${
          Object.entries(fields).filter(([, {value}]) => value !== '').length
        })`}>
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
    </PageLayout>
  );
};

export default RequestStatus;

const styles = StyleSheet.create({
  container: {
    marginTop: normalizeHeight(55),
    marginHorizontal: normalizeWidth(24),
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
