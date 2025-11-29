import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useMemo } from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'

export const RecordingsSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  
  // Define snap points as percentages of screen height
  // 25% gives us approximately 250-300px on most phones
  const snapPoints = useMemo(() => ['25%'], [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={{
        backgroundColor: '#14171F', // button-primary-bg
      }}
      handleIndicatorStyle={{
        backgroundColor: '#4B4B5F', // slider-indicator
      }}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: '#14171F' }}>
        <View className="flex-1 items-center justify-center">
          {/* Image */}
          <Image
            source={require('@/assets/images/undraw_stars_5pgw 2.png')}
            style={{ width: 200, height: 200 }}
            contentFit="contain"
          />
          
          {/* Text */}
          <Text className="text-white font-medium mt-4" style={{ fontSize: 18 }}>
            Such Empty
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}