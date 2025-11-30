import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react'
import { View } from 'react-native'

export interface RecordingSheetRef {
  open: () => void
  close: () => void
}

export const RecordingSheet = forwardRef<RecordingSheetRef>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  
  const snapPoints = useMemo(() => ['90%'], [])

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.snapToIndex(0)
    },
    close: () => {
      bottomSheetRef.current?.close()
    }
  }))

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // Start closed
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: '#14171F', // slider-bg
        borderRadius: 24,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#4B4B5F', // slider-indicator
        width: 150,
      }}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: '#14171F' }}>
        <View className="flex-1">
          {/* Content will go here */}
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
})

RecordingSheet.displayName = 'RecordingSheet'