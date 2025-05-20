import React, { forwardRef, useMemo, useCallback } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

const Bottomsheet = forwardRef((props, ref) => {
  const { height, children, backdrop, onChange } = props;
  const snapPoints = useMemo(() => height, []);

  const handleSheetChanges = useCallback(index => {
    if (onChange) {
      onChange(index);
    }
  }, [onChange]);

  const StyledBackdrop = data => (
    <BottomSheetBackdrop
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.9}
      enableTouchThrough
      style={{
        ...data.style,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      {...data}
    />
  );

  return (
    <BottomSheetModal
      overDragResistanceFactor={backdrop ? 0 : 2.5}
      enablePanDownToClose={!backdrop}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{
        width: 0,
        height: 0,
      }}
      backgroundStyle={{
        backgroundColor: 'red',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      onChange={handleSheetChanges}
      backdropComponent={StyledBackdrop}
      ref={ref}
      snapPoints={snapPoints}>
      {children}
    </BottomSheetModal>
  );
});

export default Bottomsheet;
