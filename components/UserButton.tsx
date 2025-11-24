import { useUser } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import { View, TouchableOpacity, Text } from 'react-native'

export const UserButton = () => {
  const { user } = useUser()

  const handlePress = () => {
    // TODO: Open a menu or navigate to profile page
    console.log('User button pressed')
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="w-12 h-12 rounded-full overflow-hidden bg-accent-ring-light">
        {user?.imageUrl ? (
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 48, height: 48, borderRadius: 100 }}
            contentFit="cover"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-button-primary-bg items-center justify-center">
            {/* Fallback: Show first letter of first name */}
            {user?.firstName && (
              <Text className="text-white text-xl font-bold">
                {user.firstName.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}