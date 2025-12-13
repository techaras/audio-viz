import { useSharedAudioRecorder } from '@siteed/expo-audio-studio'
import { useEffect, useState, useCallback } from 'react'

const RECORDING_CONFIG = {
  sampleRate: 44100,
  numberOfChannels: 1,
  bitDepth: 16,
  outputFormat: 'wav',
} as const

export const useRecording = () => {
  const [duration, setDuration] = useState(0)
  
  const { 
    startRecording, 
    stopRecording, 
    isRecording,
  } = useSharedAudioRecorder()

  // Timer for duration tracking
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    
    if (isRecording) {
      console.log('Recording started, timer running')
      interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    } else {
      console.log('Recording not active, resetting timer')
      setDuration(0)
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRecording])

  const start = useCallback(async () => {
    try {
      console.log('Starting recording...')
      console.log('Calling startRecording with config:', RECORDING_CONFIG)
      const result = await startRecording(RECORDING_CONFIG)
      console.log('Start recording result:', result)
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }, [startRecording])

  const stop = useCallback(async () => {
    try {
      console.log('Stopping recording...')
      const result = await stopRecording()
      console.log('Stop recording result:', result)
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }, [stopRecording])

  return {
    isRecording,
    duration,
    start,
    stop,
  }
}