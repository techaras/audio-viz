import { Text, View } from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { UserButton } from '@/components/UserButton'
import { RecordButton } from '@/components/RecordButton'

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

      {/* Record Button - Centered */}
      <View className="flex-1 items-center justify-center mb-10">
        <RecordButton />
      </View>
    </View>
  )
}