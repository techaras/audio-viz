import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
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

          {/* Title */}
          <View className="mb-6">
            <Text className="text-text-title-light mb-2" style={{ fontSize: 24, fontFamily: 'OpenSans_700Bold' }}>
              Verify your email
            </Text>
          </View>

          {/* Verification Code */}
          <View className="mb-8">
            <Text className="text-text-label mb-2" style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}>
              Verification Code
            </Text>
            <TextInput
              value={code}
              placeholder="Enter your verification code"
              placeholderTextColor="#777873"
              onChangeText={(code) => setCode(code)}
              className="bg-input-unprotected-bg px-4 py-4 rounded-2xl"
              style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}
              keyboardType="number-pad"
            />
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={onVerifyPress}
            className="bg-button-primary-bg py-4 rounded-full"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
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
            onChangeText={(email) => setEmailAddress(email)}
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

        {/* Continue Button */}
        <TouchableOpacity
          onPress={onSignUpPress}
          className="bg-button-primary-bg py-4 rounded-full mb-6"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </TouchableOpacity>

        {/* Sign in link */}
        <View className="flex-row justify-center gap-2">
          <Text className="text-text-label" style={{ fontSize: 16, fontFamily: 'OpenSans_400Regular' }}>
            Already have an account?
          </Text>
          <Link href="/sign-in">
            <Text className="text-black" style={{ fontSize: 16, fontFamily: 'OpenSans_600SemiBold' }}>
              Sign in
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}