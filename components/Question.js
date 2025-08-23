import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';

const Question = ({
  question,
  options,
  multiSelect = false,
  numberOfOptionsToSelect,
  minSelections = 1,
  maxSelections,
  onSubmit,
  initialSelected = [],
}) => {
  const [selected, setSelected] = useState(initialSelected);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const handleSelect = optionId => {
    console.log(optionId, 'the option selected is this');
    Vibration.vibrate(15); // Vibrate on option select
    if (multiSelect) {
      if (selected.includes(optionId)) {
        setSelected(selected.filter(i => i !== optionId));
      } else {
        const max = maxSelections || numberOfOptionsToSelect;
        if (selected.length < max) {
          setSelected([...selected, optionId]);
        }
        // If already at max, do nothing (no more can be selected)
      }
    } else {
      setSelected([optionId]);
    }
  };

  useEffect(() => {
    // For multiSelect, require at least minSelections; for single, require 1
    if (!multiSelect) {
      setIsSubmitDisabled(selected.length === 0);
    } else {
      setIsSubmitDisabled(selected.length >= minSelections ? false : true);
    }
  }, [selected, multiSelect, minSelections]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {multiSelect ? (
        <View style={styles.multiOptionsWrap}>
          {options.map(item => {
            const isSelected = selected.includes(item.optionId);
            console.log(item, selected, 'the selected and items when rendered');
            return (
              <TouchableOpacity
                key={item.optionId}
                style={[
                  styles.multiOption,
                  isSelected && styles.selectedMultiOption,
                ]}
                onPress={() => handleSelect(item.optionId)}
                activeOpacity={0.8}>
                <Text
                  style={[
                    styles.multiOptionText,
                    isSelected && styles.selectedMultiOptionText,
                  ]}>
                  {item.optionText}
                </Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.singleOptionsWrap}>
          {options.map(item => {
            console.log(item, selected, 'the selected and items when rendered');
            const isSelected = selected.includes(item.optionId);
            return (
              <TouchableOpacity
                key={item.optionId}
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => handleSelect(item)}
                activeOpacity={0.8}>
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.selectedText,
                  ]}>
                  {item.optionText}
                </Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <View style={styles.bottomButtonWrap}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitDisabled && styles.disabledSubmitButton,
          ]}
          onPress={() => onSubmit(selected)}
          disabled={isSubmitDisabled}
          activeOpacity={isSubmitDisabled ? 1 : 0.8}>
          <Text
            style={[
              styles.submitText,
              isSubmitDisabled && styles.disabledSubmitText,
            ]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  question: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    marginTop: 8,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  // Multi-select pills
  multiOptionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 12,
    marginTop: 8,
    alignItems: 'flex-start',
  },
  multiOption: {
    borderColor: '#7A59C6',
    borderWidth: 1,
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 7,
    backgroundColor: 'rgba(255,255,255,0.04)',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
  },
  selectedMultiOption: {
    backgroundColor: '#7A59C6',
    borderColor: 'transparent',
    shadowColor: 'rgba(176, 149, 227, 0.60)',
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 6,
  },
  multiOptionText: {
    color: '#B6A7CC',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  selectedMultiOptionText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  // Single select
  singleOptionsWrap: {
    marginTop: 8,
    marginBottom: 24,
  },
  option: {
    borderColor: '#7A59C6',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  selectedOption: {
    backgroundColor: '#7A59C6',
    borderColor: 'transparent',
    shadowColor: '#B88AF3',
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 6,
  },
  optionText: {
    color: '#B6A7CC',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  selectedText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#A46BF5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  disabledSubmitButton: {
    backgroundColor: '#5A4B7D',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledSubmitText: {
    color: '#B6A7CC',
  },
  bottomButtonWrap: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 36,
  },
});

export default Question;
