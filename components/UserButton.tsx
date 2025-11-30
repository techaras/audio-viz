import { useUser } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import { View, TouchableOpacity, Text } from 'react-native'
import { forwardRef } from 'react'

interface UserButtonProps {
  onPress: () => void
}

export const UserButton = forwardRef<View, UserButtonProps>(({ onPress }, ref) => {
  const { user } = useUser()

  return (
    <TouchableOpacity onPress={onPress}>
      <View 
        ref={ref}
        className="w-12 h-12 rounded-full overflow-hidden items-center justify-center"
      >
        {user?.imageUrl ? (
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 48, height: 48 }}
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
})

UserButton.displayName = 'UserButton'