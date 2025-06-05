import React, {useContext, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import {ThemeContext} from '../../src/context/ThemeContext';
import CompTextInput from '../../components/CompTextInput';
import CmpCheckBox from '../../components/CmpCheckBox';
import {Bottomsheet} from '../../components';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import Loader from '../../components/Loader';
import PageLayout from './PageLayout';
import {
  registerNewStudent,
  raiseStudentInfoRequest,
} from '../../src/api/userOnboardingAPIs';
import useUserStore from '../../src/store/useUserStore';
import DropdownSelector from '../../components/DropDownSelector';
import CalendarSelector from '../../components/CalendarSelector';

const BRANCH_OPTIONS = [
  {key: 1, value: 'Computer Science'},
  {key: 2, value: 'Electronics And Communication Engineering'},
  {key: 3, value: 'Electrical And Electronics Engineering'},
  {key: 4, value: 'Information Technology'},
];

const InfoCheck = ({navigation, route}) => {
  // Read studentInfo from route.params
  const studentInfo = route?.params?.studentInfo || {};
  const [field, setField] = useState({
    name: {
      initial: studentInfo.name || studentInfo.studentName || '',
      value: studentInfo.name || studentInfo.studentName || '',
    },
    phone: {
      initial: studentInfo.phone ? String(studentInfo.phone) : '',
      value: studentInfo.phone ? String(studentInfo.phone) : '',
    },
    email: {
      initial: studentInfo.email || '',
      value: studentInfo.email || '',
    },
    branch: {
      initial: studentInfo.branchName || '',
      value: studentInfo.branchName || '',
    },
    startDate: {
      initial: studentInfo.startDate || '',
      value: studentInfo.startDate || '',
    },
    endDate: {
      initial: studentInfo.endDate || '',
      value: studentInfo.endDate || '',
    },
  });

  const [loading, setLoading] = useState(false);

  const [bottomSheetField, setBottomSheetField] = useState(() => ({
    name: field.name.value,
    phone: field.phone.value,
    email: field.email.value,
    branch: field.branch.value,
    startDate: field.startDate.value,
    endDate: field.endDate.value,
  }));
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetDirty, setBottomSheetDirty] = useState(false);
  const [bottomSheetLoading, setBottomSheetLoading] = useState(false);

  const setTokens = useUserStore(state => state.setTokens);

  const {isDark} = useContext(ThemeContext);

  const BottomsheetRef = useRef(null);

  // Get orgCode and studentId from route.params
  const orgCode = route?.params?.orgCode;
  const studentId = route?.params?.studentId;
  const ongoingRequestDetails = route?.params?.ongoingRequestDetails || [];

  if (ongoingRequestDetails.length > 0) {
    return navigation.reset({
      index: 0,
      routes: [
        {
          name: 'RequestStatus',
          params: {
            ...route.params,
          },
        },
      ],
    });
  }

  const handleSubmit = async () => {
    if (!field?.checkBox) {
      return;
    }
    setLoading(true);
    try {
      const res = await registerNewStudent({orgCode, studentId});
      console.log('Register New Student Response:', res);
      if (res && !res.error && res.authorization && res['x-refresh-token']) {
        setTokens({
          authToken: res.authorization,
          refreshToken: res['x-refresh-token'],
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'UnlockedExp'}],
        });
      } else if (res && res.error?.action === 'Login') {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login', params: {orgCode, studentId}}],
        });
      }
    } catch (e) {
      // handle error (optional: show error message)
      console.error('Error during registration:', e);
    }
    setLoading(false);
  };

  const handleDiscrepancyPress = () => {
    setBottomSheetField({
      name: field.name.value,
      phone: field.phone.value,
      email: field.email.value,
      branch: field.branch.value,
      startDate: field.startDate.value,
      endDate: field.endDate.value,
    });
    setIsBottomSheetOpen(true);
    BottomsheetRef.current?.present();
  };

  // Dirty check for BottomSheet fields
  useEffect(() => {
    setBottomSheetDirty(
      bottomSheetField.name !== field.name.value ||
        bottomSheetField.phone !== field.phone.value ||
        bottomSheetField.email !== field.email.value ||
        bottomSheetField.branch !== field.branch.value ||
        bottomSheetField.startDate !== field.startDate.value,
    );
  }, [bottomSheetField, field]);

  // Handle Android back button to close BottomSheet if open
  useEffect(() => {
    const onBackPress = () => {
      if (isBottomSheetOpen) {
        BottomsheetRef.current?.dismiss();
        setIsBottomSheetOpen(false);
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => subscription.remove();
  }, [isBottomSheetOpen]);

  return (
    <PageLayout
      heading="Quick info check ✅"
      description="If this looks like you, let's lock it in!!">
      <View style={styles.cardWrapper}>
        <ImageBackground
          source={images.INFOCHECKCARD}
          style={styles.card}
          imageStyle={styles.cardImage}>
          <ScrollView contentContainerStyle={styles.cardContent}>
            <CompTextInput
              label="Name"
              value={field.name.value}
              labelstyle={styles.label}
              inputstyle={styles.input(isDark)}
              editable={false}
              opacity={0.75}
            />
            <CompTextInput
              label="Phone Number"
              value={field.phone.value}
              labelstyle={styles.label}
              inputstyle={styles.input(isDark)}
              editable={false}
              opacity={0.75}
            />
            <CompTextInput
              label="Email"
              value={field.email.value}
              labelstyle={styles.label}
              inputstyle={styles.input(isDark)}
              editable={false}
              opacity={0.75}
            />
            <CompTextInput
              label="Branch"
              value={field.branch.value}
              labelstyle={styles.label}
              inputstyle={styles.input(isDark)}
              editable={false}
              opacity={0.75}
            />
            <View style={styles.row}>
              <CompTextInput
                label="Start Date"
                value={field.startDate.value}
                labelstyle={styles.label}
                inputstyle={styles.inputSmall(isDark)}
                editable={false}
                opacity={0.75}
              />
              <CompTextInput
                label="End Date"
                value={field.endDate.value}
                labelstyle={styles.label}
                inputstyle={styles.inputSmall(isDark)}
                editable={false}
                opacity={0.75}
              />
            </View>

            <TouchableOpacity
              onPress={handleDiscrepancyPress}
              style={styles.discrepancyButton(isDark)}>
              <Text style={styles.discrepancyText}>
                Does something feels wrong?
              </Text>

              <Text style={styles.discrepancyYes(isDark)}>Yes</Text>
            </TouchableOpacity>
            <View style={styles.checkboxWrapper}>
              <CmpCheckBox
                value={field?.checkBox}
                onSelect={() =>
                  setField(prev => ({...prev, checkBox: !prev.checkBox}))
                }
                text="I acknowledge the information above belongs to me and correct."
              />
            </View>
          </ScrollView>
          {/* <Loader /> */}
          {(bottomSheetLoading || loading) && <Loader />}
        </ImageBackground>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.submitButton(isDark, !field?.checkBox)}
        disabled={!field?.checkBox}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      <Bottomsheet
        ref={BottomsheetRef}
        enableHeader={true}
        headerText={'Edit your info'}
        footer={'Submit'}
        onSubmit={async () => {
          if (!bottomSheetDirty) {
            return;
          }
          setBottomSheetLoading(true);
          try {
            // Only send changed fields in the correct format
            const dataToUpdate = [];
            if (bottomSheetField.name !== field.name.value) {
              dataToUpdate.push({
                fieldName: 'name',
                oldValue: field.name.value,
                newValue: bottomSheetField.name,
              });
            }
            if (bottomSheetField.phone !== field.phone.value) {
              dataToUpdate.push({
                fieldName: 'phone',
                oldValue: field.phone.value,
                newValue: bottomSheetField.phone,
              });
            }
            if (bottomSheetField.email !== field.email.value) {
              dataToUpdate.push({
                fieldName: 'email',
                oldValue: field.email.value,
                newValue: bottomSheetField.email,
              });
            }
            if (bottomSheetField.branch !== field.branch.value) {
              dataToUpdate.push({
                fieldName: 'branch',
                oldValue: field.branch.value,
                newValue: bottomSheetField.branch,
              });
            }
            if (bottomSheetField.startDate !== field.startDate.value) {
              dataToUpdate.push({
                fieldName: 'startDate',
                oldValue: field.startDate.value,
                newValue: bottomSheetField.startDate,
              });
            }
            // orgCode and studentId from route.params
            // use orgCode from upper scope
            const res = await raiseStudentInfoRequest({
              orgCode,
              studentId,
              dataToUpdate,
            });
            console.log('Raise Student Info Request Response:', res);
            if (res && !res.error) {
              BottomsheetRef.current?.dismiss();
              setIsBottomSheetOpen(false);
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'RequestStatus',
                    params: {status: 'submitted', dataToUpdate},
                  },
                ],
              });
            } else {
              // handle error (optional: show error message)
            }
          } catch (e) {
            // handle error (optional: show error message)
          }
          setBottomSheetLoading(false);
        }}
        onDismiss={() => setIsBottomSheetOpen(false)}
        isSubmitButtonActive={bottomSheetDirty}
        submitButtonDisabled={!bottomSheetDirty}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.bottomSheetScrollView}>
          <CompTextInput
            label="Name"
            type="name"
            value={bottomSheetField.name}
            onChangeText={text =>
              setBottomSheetField(prev => ({...prev, name: text}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
          <CompTextInput
            label="Phone Number"
            type="phone"
            value={bottomSheetField.phone}
            onChangeText={text =>
              setBottomSheetField(prev => ({...prev, phone: text}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
          <CompTextInput
            label="Email"
            type="email"
            value={bottomSheetField.email}
            onChangeText={text =>
              setBottomSheetField(prev => ({...prev, email: text}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
          <DropdownSelector
            label="Branch"
            options={BRANCH_OPTIONS}
            onSelectOption={d => {
              setBottomSheetField(prev => ({...prev, branch: d.value}));
            }}
            selectedOption={BRANCH_OPTIONS.find(
              option => option.value === bottomSheetField.branch,
            )}
          />
          <CalendarSelector
            label="Start Date"
            onSelect={date =>
              setBottomSheetField(prev => ({
                ...prev,
                startDate: date,
              }))
            }
            startYear={2024}
            endYear={2025}
            selectedDate={bottomSheetField.startDate}
          />
        </ScrollView>
      </Bottomsheet>
    </PageLayout>
  );
};

export default InfoCheck;

const styles = StyleSheet.create({
  root: {flex: 1},
  gradient: {flex: 1},
  sidePattern: {position: 'absolute', top: 0, left: 0, resizeMode: 'contain'},
  header: {
    marginTop: normalizeHeight(55),
    marginHorizontal: normalizeWidth(24),
  },
  backIcon: {height: 24, width: 24, resizeMode: 'contain'},
  title: {fontSize: 32, fontWeight: '900', marginTop: 12},
  subtitle: {fontSize: 14, fontWeight: '500', marginTop: 4},
  cardWrapper: {alignItems: 'center', marginTop: 22},
  card: {height: normalizeHeight(552), width: normalizeWidth(303)},
  cardImage: {borderRadius: 20},
  cardContent: {padding: 20},
  label: {color: '#D6C0FD'},
  input: isDark => ({
    color: isDark ? '#FFF' : 'rgba(0,0,0,0.6)',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#FFF' : 'rgba(0,0,0,0.4)',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  }),
  inputSmall: isDark => ({
    width: normalizeWidth(110),
    fontSize: 16,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#FFF' : 'rgba(0,0,0,0.4)',
    color: isDark ? '#FFF' : 'rgba(0,0,0,0.4)',
  }),
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  discrepancyButton: isDark => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: isDark ? '#1C0743' : '#EEE7F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  }),
  discrepancyText: {color: '#FFF', fontSize: 12, fontWeight: '600'},
  discrepancyYes: isDark => ({
    color: isDark ? '#B095E3' : '#5013C0',
    fontSize: 12,
    fontWeight: '600',
  }),
  checkboxWrapper: {marginTop: 16},
  submitButton: (isDark, disabled) => ({
    width: normalizeWidth(308),
    backgroundColor:
      isDark && !disabled ? '#815FC4' : disabled ? '#232127' : '#5013C0',
    position: 'absolute',
    bottom: 40,
    left: 10,
    borderRadius: 12,
    paddingVertical: normalizeHeight(12),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  submitText: {color: 'white', fontSize: 14, fontWeight: '800'},
  bottomSheetScrollView: {
    backgroundColor: '#1C0743',
    flex: 1,
    paddingHorizontal: 42,
    paddingVertical: 32,
  },
});
