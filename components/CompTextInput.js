import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {normalizeWidth} from './Responsivescreen';
// ThemeContext import removed, always dark theme
import images from '../assets/images';

const CompTextInput = props => {
  const {
    label,
    label2,
    onPress,
    editable,
    labelstyle,
    noteRight,
    noteLeft,
    infoText = false,
    errorMessage,
    fieldDesc,
    inputstyle,
    opacity = 1,
    type,
    status,
    onChangeText,
  } = props;
  const textInRef = useRef(null);
  // Always dark theme

  return (
    <View
      pointerEvents={!onPress && editable === false ? 'none' : 'auto'}
      style={{opacity: opacity}}>
      {label ? (
        <View style={[styles.label, {}]}>
          {label ? (
            <Text
              allowFontScaling={false}
              style={
                labelstyle
                  ? labelstyle
                  : {
                      color: '#D6C0FD',
                      fontSize: 12,
                      fontWeight: '600',
                    }
              }>
              {label}
              <Text style={styles.label2} allowFontScaling={false}>
                {label2}
              </Text>
            </Text>
          ) : null}
          <Text style={styles.note} allowFontScaling={false}>
            {noteRight ? noteRight : noteLeft}
          </Text>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => (onPress ? onPress() : textInRef.current.focus())}
        accessible={false}>
        <View style={{position: 'relative', justifyContent: 'center'}}>
          <TextInput
            allowFontScaling={false}
            ref={textInRef}
            style={[
              {
                paddingLeft: normalizeWidth(-4),
                fontSize: 16,
                fontWeight: '700',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                color: 'rgba(255, 255, 255, 0.87)',
                paddingRight: 36,
              },
              inputstyle,
            ]}
            placeholderTextColor={'rgba(255, 255, 255, 0.28)'}
            returnKeyType="done"
            onChangeText={onChangeText}
            {...props}
          />

          {/* Icon or trailing content */}
          {type === 'status' ? (
            <View style={{position: 'absolute', right: 0, paddingRight: 8}}>
              {status === 'approved' ? (
                <Image source={images.RIGHTCIRCLE} />
              ) : status === 'rejected' ? (
                <Image source={images.WRONGCIRCLE} />
              ) : null}
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      <Text
        allowFontScaling={false}
        style={[
          {
            color: errorMessage ? 'red' : 'rgba(255, 255, 255, 0.54)',
            textAlign: infoText ? 'left' : 'right',
            fontSize: 12,
            zIndex: 2,
            paddingLeft: normalizeWidth(0),
          },
        ]}>
        {errorMessage ? errorMessage : fieldDesc}
      </Text>
    </View>
  );
};

export default CompTextInput;

const styles = StyleSheet.create({
  label2: {
    color: 'rgba(255, 255, 255, 0.42)',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    //  paddingBottom: normalizeHeight(4),
    fontSize: 12,
    fontWeight: '600',
  },
  note: {
    color: 'rgba(255, 255, 255, 0.42)',
    fontSize: 11,
  },
});
