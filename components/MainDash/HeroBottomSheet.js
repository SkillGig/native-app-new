import React, {
  forwardRef,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const HeroBottomSheet = forwardRef((props, ref) => {
  const {
    children,
    onChange,
    enableHeader,
    headerText,
    providedSnapPoints,
    enableScroll,
    currentSnapIndex,
  } = props;

  const initialSnapIndexRef = useRef(currentSnapIndex || 0);

  useEffect(() => {
    if (ref.current && initialSnapIndexRef.current !== undefined) {
      const timer = setTimeout(() => {
        ref.current?.snapToIndex(initialSnapIndexRef.current);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [ref, initialSnapIndexRef.current]);

  const snapPoints = useMemo(() => {
    return providedSnapPoints?.length ? providedSnapPoints : ['12%'];
  }, [providedSnapPoints]);

  const handleSheetChanges = useCallback(
    index => {
      if (onChange) onChange(index);
    },
    [onChange],
  );

  const ContentWrapper = enableScroll ? BottomSheetScrollView : BottomSheetView;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backdropComponent={null}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.sheetBackground}
      onChange={handleSheetChanges}
      enableDynamicSizing={false}
      // Re-enable over-drag to allow the smooth spring animation
      // Provide a small resistance factor to make it feel like "pulling against a spring"
      enableOverDrag={true}
      overDragResistanceFactor={10} // Adjust this value (e.g., 5 to 20) for desired feel
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore">
      <ContentWrapper
        style={styles.contentWrapperStyle}
        contentContainerStyle={styles.sheetContentContainer}>
        {enableHeader && headerText && (
          <Text style={styles.header}>{headerText}</Text>
        )}
        {children}
      </ContentWrapper>
    </BottomSheet>
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
    fontWeight: '700',
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
  contentWrapperStyle: {
    flex: 1,
  },
  sheetContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default HeroBottomSheet;
