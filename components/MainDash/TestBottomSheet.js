import React, {forwardRef, useMemo, useCallback, useEffect} from 'react';
import {Text, StyleSheet, Dimensions, View} from 'react-native'; // Import View
import {
  BottomSheetView,
  BottomSheetModal,
  // Import BottomSheetScrollView for nested scrolling
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

// Custom Handle Component for the BottomSheet
const CustomDragHandle = () => (
  <View style={styles.handleContainer}>
    <View style={styles.handleIndicator} />
  </View>
);

const TestBottomSheet = forwardRef((props, ref) => {
  const {children, onChange, enableHeader, headerText} = props;

  const eightyFivePercentHeight = screenHeight * 0.85;
  const fifteenPercentHeight = screenHeight * 0.15;

  const snapPoints = useMemo(
    () => [fifteenPercentHeight, eightyFivePercentHeight],
    [fifteenPercentHeight, eightyFivePercentHeight],
  );

  const handleSheetChanges = useCallback(
    index => {
      // Index 0 corresponds to '15%', index 1 to '85%'
      if (onChange) onChange(index);
    },
    [onChange],
  );

  // Automatically snap to '85%' when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref && ref.current) {
        ref.current.snapToIndex(1); // Index 1 corresponds to 85% height
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [ref]);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      initialSnapIndex={1}
      enablePanDownToClose={false}
      backdropComponent={() => null}
      // Use the custom handle component
      handleComponent={CustomDragHandle}
      backgroundStyle={styles.sheetBackground}
      onChange={handleSheetChanges}
      android_keyboardInputMode="adjustResize"
      // Remove activeOffsetX/Y here. The handleComponent now controls dragging.
      // Child scroll views will get their gestures directly.
      overshootTop={false}
      overshootBottom={false}>
      {/* Content within BottomSheetView should be scrollable.
          If 'children' contains a FlatList or ScrollView, make sure it's wrapped
          within a component like BottomSheetScrollView or a standard one
          configured with simultaneousHandlers for complex scenarios.
          Here we assume 'children' is the content that needs to be scrollable.
      */}
      <BottomSheetView style={styles.sheetContentContainer}>
        {enableHeader && headerText && (
          <Text style={styles.header}>{headerText}</Text>
        )}
        <LinearGradient
          colors={['#1C0743', '#090215']}
          locations={[0, 1]}
          style={styles.gradient}>
          {/*
            IMPORTANT: Your 'children' prop is where your content is.
            If your content needs scrolling, it must be contained within a ScrollView
            or FlatList *inside* this LinearGradient.
            For best performance and gesture handling, use BottomSheetScrollView
            or BottomSheetFlatList from the library.
          */}
          <BottomSheetScrollView
            style={styles.scrollableContent}
            contentContainerStyle={styles.scrollableContentPadding}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {children}
          </BottomSheetScrollView>
        </LinearGradient>
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
  // New styles for the custom drag handle
  handleContainer: {
    paddingVertical: 10, // Give some touchable area
    alignItems: 'center',
    width: '100%', // Make it full width for easier grabbing
    borderTopLeftRadius: 20, // Match sheet border radius
    borderTopRightRadius: 20, // Match sheet border radius
    backgroundColor: '#331E5C', // Match sheet background
  },
  handleIndicator: {
    backgroundColor: '#9F86D3',
    width: 76,
    height: 4,
    borderRadius: 2,
  },
  header: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(176, 149, 227, 0.40)',
  },
  sheetContentContainer: {
    flex: 1, // Allows content to take remaining space
    width: screenWidth,
  },
  gradient: {
    flex: 1, // Ensures gradient fills available height
  },
  scrollableContent: {
    flex: 1, // Make the ScrollView take up remaining space
  },
  scrollableContentPadding: {
    paddingHorizontal: 20, // Example padding for your content
    paddingBottom: 20, // Example padding to ensure last content is visible
  },
});

export default TestBottomSheet;
