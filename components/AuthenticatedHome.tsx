import { Text, View, useWindowDimensions } from 'react-native'
import { useUser, useClerk } from '@clerk/clerk-expo'
import { UserButton } from '@/components/UserButton'
import { RecordButton } from '@/components/RecordButton'
import { UserProfilePopup } from '@/components/UserProfilePopup'
import Popover, { Rect } from 'react-native-popover-view'
import { useRef, useState } from 'react'
import * as Linking from 'expo-linking'

interface AuthenticatedHomeProps {
  onRecordPress: () => void
}

export const AuthenticatedHome = ({ onRecordPress }: AuthenticatedHomeProps) => {
  const { isSignedIn, user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [showPopover, setShowPopover] = useState(false)
  const userButtonRef = useRef<View>(null)
  const { width } = useWindowDimensions()

  const handleSignOut = async () => {
    try {
      setShowPopover(false)
      await signOut()
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

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
        
        {/* User Button with Popover */}
        <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={new Rect(width / 2, 70, 0, 0)}
          arrowSize={{ width: 0, height: 0 }}
          popoverStyle={{
            borderRadius: 24,
            backgroundColor: '#14171F',
          }}
          backgroundStyle={{ backgroundColor: 'transparent' }}
        >
          <UserProfilePopup onSignOut={handleSignOut} />
        </Popover>

        <UserButton 
          ref={userButtonRef}
          onPress={() => setShowPopover(true)} 
        />
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
        <RecordButton onPress={onRecordPress} />
      </View>
    </View>
  )
}