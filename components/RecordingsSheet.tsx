import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useMemo } from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'

export const RecordingsSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  
  // Increased to give more space
  const snapPoints = useMemo(() => ['40%'], [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      backgroundStyle={{
        backgroundColor: '#14171F', // button-primary-bg
        borderRadius: 24,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#4B4B5F', // slider-indicator
        width: 150,
      }}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: '#14171F' }}>
        <View className="flex-1 items-center justify-center">
          {/* Image with top margin */}
          <Image
            source={require('@/assets/images/undraw_stars_5pgw 2.png')}
            style={{ width: 200, height: 150, marginTop: 16 }}
            contentFit="contain"
          />
          
          {/* Text with bottom margin */}
          <Text className="text-white font-medium mt-6 mb-6" style={{ fontSize: 22 }}>
            Such Empty
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}