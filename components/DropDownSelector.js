import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  TextInput,
} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {ThemeContext} from '../src/context/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import images from '../assets/images';
import {Image} from 'react-native-svg';

const DropdownSelector = ({
  options = [],
  label,
  selectedOption,
  onSelectOption,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({top: 0, isAbove: false});
  const triggerRef = useRef();
  // Always dark theme

  console.log(selectedOption, 'Selected Option in DropdownSelector');

  const toggleDropdown = () => {
    if (!isVisible) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        const screenHeight = Dimensions.get('window').height;
        const spaceBelow = screenHeight - y - height;
        setPosition({
          top: y + (spaceBelow < 150 ? -130 : height),
          isAbove: spaceBelow < 150,
        });
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  };

  const handleSelect = item => {
    onSelectOption(item);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={toggleDropdown}
        ref={triggerRef}>
        <View style={[styles.label, {}]}>
          <Text
            allowFontScaling={false}
            style={{
              color: '#D6C0FD',
              fontSize: 12,
              fontWeight: '600',
            }}>
            {label}
          </Text>
        </View>

        <View style={{position: 'relative', justifyContent: 'center'}}>
          <TextInput
            allowFontScaling={false}
            style={[
              {
                paddingLeft: normalizeWidth(-4),
                fontSize: 16,
                fontWeight: '700',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                color: 'white'
                  ? 'rgba(255, 255, 255, 0.87)'
                  : 'rgba(0, 0, 0, 0.87)',
                paddingRight: 36, // add right padding to not overlap with icon
              },
            ]}
            placeholderTextColor={'rgba(255, 255, 255, 0.28)'}
            returnKeyType="done"
            editable={false}
            value={selectedOption ? selectedOption.value : ''}
          />
          <View style={{position: 'absolute', right: 0, paddingRight: 8}}>
            <Image source={images.DROPDOWN} />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isVisible}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setIsVisible(false)}>
          <View
            style={[
              styles.dropdown,
              {
                top: position.top,
                maxHeight: 120,
              },
            ]}>
            <FlatList
              data={options}
              keyExtractor={item => item.key}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.key === selectedOption?.key && styles.selectedOption,
                    index === options.length - 1 && {
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    },
                    index === 0 && {
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    },
                  ]}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.optionText} allowFontScaling={false}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    paddingBottom: normalizeHeight(16),
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  dropdown: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: '#3d1b77',
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: 'rgba(176, 149, 227, 0.16)',
    borderBottomWidth: 1,
    padding: 8,
  },
  selectedOption: {
    backgroundColor: '#7f51d6',
  },
  optionText: {
    color: '#fff',
  },
});

export default DropdownSelector;
