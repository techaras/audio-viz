import { Text, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'

export const AuthenticatedHome = () => {
  return (
    <View>
      <Text>Welcome! You are signed in.</Text>
      <SignOutButton />
    </View>
  )
}