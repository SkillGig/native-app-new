import React, {useState, useContext, useRef, useEffect, useMemo} from 'react';
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
  const {
    ongoingRequestDetails = [],
    dataToUpdate = null,
    branchDetailsOptions,
  } = route.params || {};
  const requestDetail = useMemo(
    () => ongoingRequestDetails[0] || {},
    [ongoingRequestDetails],
  );

  const initialFields = {
    name: {value: '', status: 'pending'},
    phone: {value: '', status: 'pending'},
    email: {value: '', status: 'pending'},
    branch: {value: '', status: 'pending'},
    startDate: {value: '', status: 'pending'},
  };

  console.log(dataToUpdate, branchDetailsOptions, 'Data to Update');

  // Use dataToUpdate if available
  if (dataToUpdate?.length) {
    dataToUpdate.forEach(({fieldName, newValue}) => {
      console.log(fieldName, 'Initial Field Value');
      if (fieldName === 'branch') {
        console.log(
          branchDetailsOptions.find(option => option.key === newValue).value,
          'Branch Details',
        );
        initialFields[fieldName] = {
          value: branchDetailsOptions.find(option => option.key === newValue)
            .value,
          status: 'pending',
        };
        console.log(initialFields, 'Initial Fields after Branch Update');
      } else if (initialFields[fieldName]) {
        initialFields[fieldName] = {
          value: newValue,
          status: 'pending',
        };
      }
    });
  } else if (requestDetail.diffDetails) {
    try {
      const entries = requestDetail.diffDetails
        .split('},')
        .map((entry, idx, arr) =>
          JSON.parse(idx < arr.length - 1 ? `${entry}}` : entry),
        );

      console.log(entries, branchDetailsOptions, 'Parsed Diff Details');

      entries.forEach(({fieldName, newValue, fieldStatus}) => {
        console.log(fieldName === 'branch', 'Initial Field Value');
        if (fieldName === 'branch') {
          console.log(
            branchDetailsOptions.find(
              option => option.key === parseInt(newValue, 10),
            ),
            'Branch Details',
          );
          initialFields[fieldName] = {
            value: branchDetailsOptions.find(
              option => option.key === parseInt(newValue, 10),
            )?.value,
            status:
              fieldStatus === -1
                ? 'rejected'
                : fieldStatus === 1
                ? 'approved'
                : fieldStatus || 'pending',
          };
          console.log(initialFields, 'Initial Fields after Branch Update');
        } else if (initialFields[fieldName]) {
          initialFields[fieldName] = {
            value: newValue,
            status:
              fieldStatus === -1
                ? 'rejected'
                : fieldStatus === 1
                ? 'approved'
                : fieldStatus || 'pending',
          };
        }
      });
    } catch (e) {}
  }

  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState('');

  // Accept status from route.params for submitted view
  const statusFromParams = route?.params?.status;

  useEffect(() => {
    if (requestDetail.status && !statusFromParams) {
      setStatus(requestDetail.status);
    } else if (statusFromParams) {
      setStatus(statusFromParams);
    } else {
      setStatus('in-progress'); // Default status if not provided
    }
  }, [requestDetail, statusFromParams]);

  useEffect(() => {
    sheetRef.current?.present();
  }, []);

  // Back button handler for PageLayout
  const handleBackButton = () => {
    sheetRef.current?.dismiss();
    if (status === 'submitted') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  console.log(fields, 'Parsed Diff Details');

  return (
    <PageLayout
      heading="Request Status⏳"
      description={
        ['approved', 'rejected', 'partially-approved', 'submitted'].includes(
          status,
        )
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
              {status === 'submitted'
                ? 'Your request has been submitted and is under review. You will be notified once it is processed.'
                : 'Some of your details have been approved, while others were not. Please check the summary below for more info.'}
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
              onPress={() => {
                sheetRef.current?.dismiss();
                return navigation.navigate('InfoCheck', {
                  ...route.params,
                  ongoingRequestDetails: null,
                  dataToUpdate: null,
                });
              }}
              label="Continue"
            />
          )}
        </View>
      </View>
      {/* Hide bottom sheet for submitted view */}
      <PersistentBottomSheet
        ref={sheetRef}
        enableHeader={true}
        headerText={`Requested Changes (${
          Object.entries(fields).filter(([, {value}]) => value !== '').length
        })`}>
        <View style={styles.bottomSheetDataContainer}>
          {Object.entries(fields)
            .filter(([, {value}]) => value !== '')
            .map(([fieldName, {value, status: fieldStatus}]) => (
              <CompTextInput
                key={fieldName}
                label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                value={value}
                labelstyle={styles.label}
                inputstyle={styles.input(isDark)}
                editable={false}
                opacity={0.75}
                type={'status'}
                status={fieldStatus}
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
