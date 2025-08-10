import React, {forwardRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Image,
} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {ScrollView} from 'react-native-gesture-handler';
import images from '../assets/images';

const Bottomsheet = forwardRef((props, ref) => {
  const {
    height,
    children,
    onChange,
    enableHeader,
    headerText,
    onSubmit,
    isSubmitButtonActive,
     showIndicator = true,
      headerLayoutType = 'default', 
      handleClose
  } = props;
  const snapPoints = useMemo(() => height, [height]);

  const handleSheetChanges = useCallback(
    index => {
      if (onChange) {
        onChange(index);
      }
      // Vibrate when sheet is opened or closed
      if (index === 0 || index === -1) {
        Vibration.vibrate(50);
      }
    },
    [onChange],
  );

  // Rename inner props to avoid shadowing
  const StyledBackdrop = useCallback(
    backdropProps => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.9}
        enableTouchThrough
        style={{...backdropProps.style, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        {...backdropProps}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={StyledBackdrop}
      // handleIndicatorStyle={styles.handleIndicator}
      handleIndicatorStyle={showIndicator ? styles.handleIndicator : { display: 'none' }}
      backgroundStyle={styles.sheetBackground}
      onChange={handleSheetChanges}
      android_keyboardInputMode="adjustResize">
      <BottomSheetView style={styles.sheetContainer}>
      {enableHeader && (
  <View style={headerLayoutType === 'spaced' ? styles.headerSpaced : styles.headerDefault}>
    <Text style={styles.headerText}>{headerText}</Text>
    {headerLayoutType === 'spaced' && (
      <TouchableOpacity onPress={handleClose}> {/* Add handleClose function */}
        <Image source={images.CLOSEICON} style={styles.crossIcon} />
      </TouchableOpacity>
    )}
  </View>
)}

        <ScrollView>{children}</ScrollView>
        {props.footer && (
        <View style={styles.submitButtonBackground}>
          <TouchableOpacity
            style={styles.footerButton(isSubmitButtonActive)}
            onPress={
              isSubmitButtonActive
                ? onSubmit
                : () => console.log('Update Something')
            }>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )} 
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#331E5C', // updated to match the screenshot background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 700,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(176, 149, 227, 0.40)',
  },
  handleIndicator: {
    backgroundColor: '#9F86D3',
    width: 76,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
  sheetContainer: {
    flex: 1,
  },
  dragLineContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  dragLine: {
    width: 40,
    height: 5,
    backgroundColor: '#D1B3FF',
    borderRadius: 2.5,
  },
  footerButton: isSubmitButtonActive => ({
    backgroundColor: isSubmitButtonActive ? '#563593' : '#232127',
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: 32,
    borderRadius: normalizeWidth(12),
    position: 'absolute',
    left: 0,
    bottom: 32,
    width: '90%',
    alignItems: 'center',
    marginHorizontal: '5%',
  }),
  submitText: {
    color: '#EADDFF',
    fontSize: normalizeWidth(16),
    fontWeight: '700',
  },
  submitButtonBackground: {
    backgroundColor: '#1C0743',
    paddingTop: 20,
    paddingBottom: 80,
    borderTopWidth: 1,
    borderTopColor: 'rgba(176, 149, 227, 0.40)',
  },
  headerDefault: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:normalizeHeight(12),
    paddingHorizontal:normalizeWidth(16),
  },
  headerText: {
    fontSize: 16,
    fontWeight:"700",
    color:"white"
  },
  crossIcon: {
    width:normalizeWidth(20),
    height: normalizeHeight(20),
    resizeMode:"contain"
  },
});

export default Bottomsheet;
