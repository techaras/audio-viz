import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-unprotected-bg">
      <View className="flex-1 px-8">
        {/* Image */}
        <View className="items-center mt-8 mb-12">
          <Image
            source={require('@/assets/images/app-drawing-unauthorised.png')}
            style={{ width: 348, height: 348 }}
            contentFit="contain"
          />
        </View>

        {/* Email */}
        <View className="mb-6">
          <Text className="text-text-label mb-2" style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}>
            Email
          </Text>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Your email address..."
            placeholderTextColor="#777873"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            className="bg-input-unprotected-bg px-4 py-4 rounded-2xl"
            style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}
          />
        </View>

        {/* Password */}
        <View className="mb-8">
          <Text className="text-text-label mb-2" style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}>
            Password
          </Text>
          <TextInput
            value={password}
            placeholder="Your password..."
            placeholderTextColor="#777873"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            className="bg-input-unprotected-bg px-4 py-4 rounded-2xl"
            style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={onSignInPress}
          className="bg-button-primary-bg py-4 rounded-full mb-6"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Log In
          </Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View className="flex-row justify-center gap-2">
          <Text className="text-text-label" style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}>
            Dont have an account?
          </Text>
          <Link href="/sign-up">
            <Text className="text-black" style={{ fontSize: 16, fontFamily: 'OpenSans_600SemiBold' }}>
              Sign up
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}