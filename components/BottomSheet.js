import React, {forwardRef, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {ScrollView} from 'react-native-gesture-handler';

const Bottomsheet = forwardRef((props, ref) => {
  const {
    height,
    children,
    backdrop,
    onChange,
    enableHeader,
    headerText,
    onSubmit,
  } = props;
  const snapPoints = useMemo(() => height, [height]);

  const handleSheetChanges = useCallback(
    index => {
      if (onChange) {
        onChange(index);
      }
    },
    [onChange],
  );

  const StyledBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.9}
        enableTouchThrough
        style={{...props.style, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        {...props}
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
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.sheetBackground}
      onChange={handleSheetChanges}
      android_keyboardInputMode="adjustResize">
      <BottomSheetView style={styles.sheetContainer}>
        {enableHeader && headerText && (
          <Text style={styles.header}>{headerText}</Text>
        )}
        <ScrollView>{children}</ScrollView>
        {/* {props.footer && ( */}
        <View style={styles.submitButtonBackground}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={props.onSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
        {/* )} */}
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
  footerButton: {
    backgroundColor: '#563593',
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: 32,
    borderRadius: normalizeWidth(12),
    position: 'absolute',
    left: 0,
    bottom: 32,
    width: '90%',
    alignItems: 'center',
    marginHorizontal: '5%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(176, 149, 227, 0.40)',
  },
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
});

export default Bottomsheet;
