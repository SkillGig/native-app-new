import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

const InfoCheck = ({navigation}) => {
  const [field, setField] = useState({
    name: {initial: 'Shubhangi Sharma', value: 'Shubhangi Sharma'},
    phone: {initial: '9876543210', value: '9876543210'},
    email: {
      initial: 'shubhangisharma@gmail.com',
      value: 'shubhangisharma@gmail.com',
    },
    batch: {
      initial: 'B tech in computer Science',
      value: 'B tech in computer Science',
    },
    startDate: {initial: 'June 2021', value: 'June 2021'},
    endDate: {initial: 'July 2025', value: 'July 2025'},
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

  const {isDark, colors} = useContext(ThemeContext);

  const BottomsheetRef = useRef(null);
  const patternImage = isDark
    ? images.SIDEPATTERNDARK
    : images.SIDEPATTERNLIGHT;
  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF'];

  const handleSubmit = () => navigation.navigate('UnlockedExp');

  const handleDiscrepancyPress = () => BottomsheetRef.current?.present();

  useEffect(
    () =>
      setIsFormDirty(
        Object.values(field).some(
          fieldData => fieldData.value !== fieldData.initial,
        ),
      ),
    [field],
  );

  return (
    <View style={styles.root}>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <Image source={patternImage} style={styles.sidePattern} />
        <View style={styles.header}>
          <Image
            source={isDark ? images.BACKICON : images.BLACKBACKICON}
            style={styles.backIcon}
          />
          <Text style={[styles.title, {color: isDark ? '#FFF' : '#2A0D54'}]}>
            Quick info check ✅
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: isDark ? 'rgba(255,255,255,0.8)' : '#4F378A'},
            ]}>
            If this looks like you, let's lock it in!!
          </Text>
        </View>

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
                value={field.batch.value}
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
          </ImageBackground>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitButton(isDark, !field?.checkBox)}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Bottomsheet
        ref={BottomsheetRef}
        enableHeader={true}
        headerText={'Edit your info'}
        footer={'Submit'}
        // isSubmitButtonActive={yestoupdate}
        onSubmit={() => {
          BottomsheetRef.current?.dismiss();
          navigation.navigate('RequestStatus');
        }}
        isSubmitButtonActive={isFormDirty}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.bottomSheetScrollView}>
          <CompTextInput
            label="Name"
            type="name"
            value={field.name.value}
            initialValue={field.name.initial}
            onChangeText={text =>
              setField(prev => ({...prev, name: {...prev.name, value: text}}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
          <CompTextInput
            label="Phone Number"
            type="phone"
            value={field.phone.value}
            initialValue={field.name.initial}
            onChangeText={text =>
              setField(prev => ({...prev, phone: {...prev.phone, value: text}}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
          <CompTextInput
            label="Email"
            type="email"
            value={field.email.value}
            initialValue={field.name.initial}
            onChangeText={text =>
              setField(prev => ({...prev, email: {...prev.email, value: text}}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
          <CompTextInput
            label="Branch"
            type="text"
            value={field.batch.value}
            initialValue={field.name.initial}
            onChangeText={text =>
              setField(prev => ({...prev, batch: {...prev.batch, value: text}}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
          <CompTextInput
            label="Start Date"
            type=""
            value={field.startDate.value}
            initialValue={field.name.initial}
            onChangeText={text =>
              setField(prev => ({...prev, startDate: text}))
            }
            labelstyle={styles.label}
            inputstyle={styles.input(isDark)}
            editable={true}
          />
        </ScrollView>
      </Bottomsheet>
    </View>
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
    marginHorizontal: normalizeWidth(32),
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
