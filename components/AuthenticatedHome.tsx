import { Text, View } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { UserButton } from '@/components/UserButton'
import { RecordButton } from '@/components/RecordButton'
import { RecordingsSheet } from '@/components/RecordingsSheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export const AuthenticatedHome = () => {
  const { isSignedIn, user, isLoaded } = useUser()

  // Handle loading state
  if (!isLoaded) {
    return (
      <View className="bg-protected-bg flex-1 items-center justify-center">
        <Text className="text-text-label" style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}>
          Loading...
        </Text>
      </View>
    )
  }

  // Handle not signed in state (shouldn't happen due to routing, but safe guard)
  if (!isSignedIn) {
    return (
      <View className="bg-protected-bg flex-1 items-center justify-center">
        <Text className="text-text-label" style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}>
          Please sign in
        </Text>
      </View>
    )
  }

  return (
    <BottomSheetModalProvider>
      <View className="bg-protected-bg flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          {/* Greeting */}
          <Text 
            className="text-text-title-light" 
            style={{ fontSize: 28, fontFamily: 'OpenSans_700Bold' }}
          >
            Hello, {user.firstName} 👋
          </Text>
          
          {/* User Button */}
          <UserButton />
        </View>

        {/* Tagline */}
        <View className="px-6 mt-8">
          <Text 
            style={{ 
              fontSize: 38, 
              fontFamily: 'OpenSans_300Light',
              color: '#010200',
              lineHeight: 42
            }}
          >
            Create amazing art with the sound of your voice
          </Text>
        </View>

        {/* Record Button - Absolutely positioned and centered */}
        <View 
          className="items-center justify-center"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: [{ translateY: -75 }] // Half of button height (150/2) to center it
          }}
        >
          <RecordButton />
        </View>

        {/* Bottom Sheet */}
        <RecordingsSheet />
      </View>
    </BottomSheetModalProvider>
  )
}