
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

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
    inputstyle,
  } = props;
  const textInRef = useRef(null);
  return (
    <View pointerEvents={!onPress && editable === false ? 'none' : 'auto'}>
      {label ? (
        <View style={[styles.label, {}]}>
          {label ? (
            <>
              <Text
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
                <Text style={styles.label2}>{label2}</Text>
              </Text>
            </>
          ) : null}
          <Text style={styles.note}>{noteRight ? noteRight : noteLeft}</Text>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => (onPress ? onPress() : textInRef.current.focus())}
        accessible={false}>
        <TextInput
          ref={textInRef}
          style={[
            inputstyle
              ? inputstyle
              : {
                paddingLeft:normalizeWidth(-4),
                  fontSize: 16,
                  fontWeight: '700',
                  borderBottomWidth: 1,
                  borderBottomColor: 'white',
                  color: 'rgba(255, 255, 255, 0.87)',
                },
          ]}
          placeholderTextColor={'rgba(255, 255, 255, 0.28)'}
          color={'white'}
          returnKeyType={'done'}
          {...props}
        />
      </TouchableOpacity>

      <Text
        style={[
          {
            color: 'red',
            textAlign: 'right',
            fontSize: 12,
            zIndex: 2,
            marginTop:normalizeHeight(2),
            lineHeight:normalizeHeight(18),
          },
          {
            paddingLeft: infoText ? normalizeWidth(0) : normalizeWidth(0),
            paddingBottom: normalizeHeight(8),
            color:
              infoText ?'rgba(255, 255, 255, 0.54)'
                : 'red',
            textAlign: infoText  ? 'left' : 'right',
          },
        ]}>
        {errorMessage ? errorMessage : '  '}
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
  },
  note: {
    color: 'rgba(255, 255, 255, 0.42)',
    fontSize: 11,
  },
});