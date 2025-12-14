import { useCallback } from 'react'

export const useAudioProcessor = () => {
  const processAudioChunk = useCallback((base64Data: string) => {
    try {
      // Step 1: Decode base64 to binary string
      const binaryString = atob(base64Data)
      
      // Step 2: Create ArrayBuffer
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      
      // Step 3: Create Float32Array from PCM data
      const int16Array = new Int16Array(bytes.buffer)
      const float32Array = new Float32Array(int16Array.length)
      
      // Convert int16 to float32 (-1.0 to 1.0 range)
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0
      }
      
      // Step 4: Log stats for verification
      console.log('Processed chunk:', {
        samples: float32Array.length,
        min: Math.min(...float32Array),
        max: Math.max(...float32Array),
      })
      
      // TODO: Later pass to Rust
      return float32Array
      
    } catch (error) {
      console.error('Failed to process audio chunk:', error)
      return null
    }
  }, [])
  
  return { processAudioChunk }
}