import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export interface RecordingSheetRef {
  open: () => void
  close: () => void
}

export const RecordingSheet = forwardRef<RecordingSheetRef>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  
  const snapPoints = useMemo(() => ['90%'], [])

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.expand()
    },
    close: () => {
      bottomSheetRef.current?.close()
    }
  }))

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: '#14171F',
        borderRadius: 24,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#4B4B5F',
        width: 150,
      }}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: '#14171F' }}>
        <View className="flex-1 justify-end items-center pb-8">
          {/* Placeholder */}
          <View 
            className="bg-gray-700 mb-8 rounded-3xl"
            style={{ width: 350, height: 520 }}
          />

          {/* Title */}
          <Text 
            className="text-text-title-dark mb-4"
            style={{ fontSize: 24, fontFamily: 'OpenSans_600SemiBold' }}
          >
            New Recording 3
          </Text>

          {/* Timer */}
          <Text 
            className="text-text-secondary-dark mb-8"
            style={{ fontSize: 20, fontFamily: 'OpenSans_400Regular' }}
          >
            02:03:38
          </Text>

          {/* Stop Button with Stroke */}
          <View 
            className="border-2 rounded-full border-text-muted-dark items-center justify-center"
            style={{ width: 96, height: 96 }}
          >
            <TouchableOpacity 
              className="bg-accent-red-dark"
              style={{ width: 48, height: 48, borderRadius: 12 }}
              activeOpacity={0.8}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
})

RecordingSheet.displayName = 'RecordingSheet'