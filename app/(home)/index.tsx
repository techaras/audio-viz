import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignOutButton } from '@/app/components/SignOutButton'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'

export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <AuthLoading>
          <Text>Loading...</Text>
        </AuthLoading>
        
        <Authenticated>
          <Text>Welcome! You are signed in.</Text>
          <SignOutButton />
        </Authenticated>
        
        <Unauthenticated>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </Unauthenticated>
      </View>
    </SafeAreaView>
  )
}