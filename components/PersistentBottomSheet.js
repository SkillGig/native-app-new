import React, {forwardRef, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

const screenWidth = Dimensions.get('window').width;

const PersistentBottomSheet = forwardRef((props, ref) => {
  const {children, onChange, enableHeader, headerText, providedSnapPoints} =
    props;

  // const snapPoints = useMemo(() => ['15%'], []);
  const snapPoints = useMemo(() => {
    return providedSnapPoints?.length ? providedSnapPoints : ['15%'];
  }, [providedSnapPoints]);

  const handleSheetChanges = useCallback(
    index => {
      if (onChange) onChange(index);
    },
    [onChange],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={false} // Prevent closing on drag down
      backdropComponent={() => null} // always visible sheet, no overlay
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.sheetBackground}
      onChange={handleSheetChanges}
      android_keyboardInputMode="adjustResize">
      <BottomSheetView style={styles.sheetContainer}>
        {/* <View style={styles.dragLineContainer}>
          <View style={styles.dragLine} />
        </View> */}
        {enableHeader && headerText && (
          <Text style={styles.header}>{headerText}</Text>
        )}
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#331E5C',
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
    width: screenWidth,
  },
});

export default PersistentBottomSheet;
