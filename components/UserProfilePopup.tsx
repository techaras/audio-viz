import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useUser } from '@clerk/clerk-expo'

interface UserProfilePopupProps {
  onSignOut: () => void
}

export const UserProfilePopup = ({ onSignOut }: UserProfilePopupProps) => {
  const { user } = useUser()

  return (
    <View className="bg-slider-bg rounded-3xl p-4" style={{ width: 280 }}>
      {/* User Info Section */}
      <View className="flex-row items-center mb-4">
        {/* Avatar */}
        <View className="w-14 h-14 rounded-full overflow-hidden items-center justify-center mr-3">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={{ width: 56, height: 56 }}
              contentFit="cover"
            />
          ) : (
            <View className="w-14 h-14 rounded-full bg-button-primary-bg items-center justify-center">
              {user?.firstName && (
                <Text className="text-white text-2xl font-bold">
                  {user.firstName.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Name and Email */}
        <View className="flex-1">
          <Text 
            className="text-text-title-dark mb-1" 
            style={{ fontSize: 18, fontFamily: 'OpenSans_600SemiBold' }}
          >
            {user?.firstName} {user?.lastName}
          </Text>
          <Text 
            className="text-text-secondary-dark" 
            style={{ fontSize: 14, fontFamily: 'OpenSans_400Regular' }}
          >
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity
        onPress={onSignOut}
        className="py-3 rounded-full"
        style={{ backgroundColor: '#2A2D3A' }}
      >
        <Text 
          className="text-center" 
          style={{ 
            fontSize: 16, 
            fontFamily: 'OpenSans_600SemiBold',
            color: '#FF6363'
          }}
        >
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  )
}