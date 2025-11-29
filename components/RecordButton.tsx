import { TouchableOpacity, View, Text } from 'react-native'

export const RecordButton = () => {
  const handlePress = () => {
    // TODO: Handle record button press
    console.log('Record button pressed')
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View 
        className="items-center justify-center rounded-full"
        style={{ 
          width: 150, 
          height: 150, 
          backgroundColor: '#FF4444' 
        }}
      >
        <Text 
          className="text-white font-medium"
          style={{ fontSize: 20 }}
        >
          Record
        </Text>
      </View>
    </TouchableOpacity>
  )
}