import { TouchableOpacity, View, Text } from 'react-native'

interface RecordButtonProps {
  onPress: () => void
}

export const RecordButton = ({ onPress }: RecordButtonProps) => {
  return (
    <View className="items-center justify-center">
      {/* Decorative stroke circle */}
      <View 
        className="absolute rounded-full border-2 border-accent-ring-light"
        style={{ 
          width: 200, 
          height: 200,
        }}
      />
      
      {/* Record button */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
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
    </View>
  )
}