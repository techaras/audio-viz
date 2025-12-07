import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useRecording } from '@/hooks/useRecording'

export interface RecordingSheetRef {
  open: () => void
  close: () => void
}

const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const RecordingSheet = forwardRef<RecordingSheetRef>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const wasRecordingRef = useRef(false)
  const { isRecording, duration, start, stop } = useRecording()
  
  const snapPoints = useMemo(() => ['90%'], [])

  useImperativeHandle(ref, () => ({
    open: () => {
      console.log('RecordingSheet: open() called')
      bottomSheetRef.current?.expand()
    },
    close: () => {
      console.log('RecordingSheet: close() called')
      bottomSheetRef.current?.close()
    }
  }))

  const handleSheetChange = async (index: number) => {
    console.log('RecordingSheet: handleSheetChange called with index:', index)
    console.log('RecordingSheet: isRecording:', isRecording)
    
    // When sheet opens (index becomes 1 for our single snap point), start recording
    if (index >= 0 && !isRecording) {
      console.log('RecordingSheet: Conditions met, calling start()')
      await start()
    } else {
      console.log('RecordingSheet: Conditions NOT met. index:', index, 'isRecording:', isRecording)
    }
  }

  const handleStopPress = async () => {
    console.log('RecordingSheet: Stop button pressed')
    await stop()
  }

  // Auto-close sheet when recording stops
  useEffect(() => {
    if (wasRecordingRef.current && !isRecording) {
      // Recording just stopped, close the sheet
      console.log('RecordingSheet: Recording stopped, closing sheet')
      bottomSheetRef.current?.close()
    }
    wasRecordingRef.current = isRecording
  }, [isRecording])

  console.log('RecordingSheet: Rendering. isRecording:', isRecording, 'duration:', duration)

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChange}
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
            New Recording
          </Text>

          {/* Timer */}
          <Text 
            className="text-text-secondary-dark mb-8"
            style={{ fontSize: 20, fontFamily: 'OpenSans_400Regular' }}
          >
            {formatDuration(duration)}
          </Text>

          {/* Stop Button with Stroke - Always visible */}
          <View 
            className="border-2 rounded-full border-text-muted-dark items-center justify-center"
            style={{ width: 96, height: 96 }}
          >
            <TouchableOpacity 
              onPress={handleStopPress}
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