import { Text, View, TouchableOpacity } from 'react-native'
import { AudioRecorderProvider } from '@siteed/expo-audio-studio'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { AuthenticatedHome } from '@/components/AuthenticatedHome'
import { RecordingsSheet } from '@/components/RecordingsSheet'
import { RecordingSheet, RecordingSheetRef } from '@/components/RecordingSheet'
import { RecordingPreparer } from '@/components/RecordingPreparer'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { useRouter } from 'expo-router'
import { useRef } from 'react'

export default function Page() {
  const router = useRouter()
  const recordingSheetRef = useRef<RecordingSheetRef>(null)

  const handleRecordPress = () => {
    recordingSheetRef.current?.open()
  }

  return (
    <AudioRecorderProvider>
      <SafeAreaView className="flex-1 bg-unprotected-bg">
        <AuthLoading>
          <Text>Loading...</Text>
        </AuthLoading>
        
        <Authenticated>
          <RecordingPreparer>
            <AuthenticatedHome onRecordPress={handleRecordPress} />
          </RecordingPreparer>
        </Authenticated>
        
        <Unauthenticated>
          <View className="flex-1 px-8 justify-between pb-12">
            {/* Title */}
            <View className="mt-16">
              <Text className="text-text-title-light leading-tight" style={{ fontSize: 46, fontFamily: 'OpenSans_800ExtraBold' }}>
                Give someone{'\n'}the Gift of{'\n'}Sound
              </Text>
            </View>

            {/* Image */}
            <View className="flex-1 justify-center items-center">
              <Image
                source={require('@/assets/images/app-drawing-unauthorised.png')}
                style={{ width: 348, height: 348 }}
                contentFit="contain"
              />
            </View>

            {/* Buttons */}
            <View className="gap-4">
              <TouchableOpacity
                onPress={() => router.push('/(auth)/sign-in')}
                className="bg-button-primary-bg py-4 rounded-full"
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Log in
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/(auth)/sign-up')}
                className="py-4"
              >
                <Text className="text-black text-center text-lg font-semibold">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Unauthenticated>
      </SafeAreaView>

      {/* Render sheets outside SafeAreaView so they extend to screen edges */}
      <Authenticated>
        <RecordingsSheet />
        <RecordingSheet ref={recordingSheetRef} />
      </Authenticated>
    </AudioRecorderProvider>
  )
}