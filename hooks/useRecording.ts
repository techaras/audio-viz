import { useSharedAudioRecorder, AudioDataEvent } from '@siteed/expo-audio-studio'
import { useEffect, useState, useCallback } from 'react'
import { useAudioProcessor } from './useAudioProcessor'

const RECORDING_CONFIG = {
  sampleRate: 44100,
  numberOfChannels: 1,
  bitDepth: 16,
  outputFormat: 'wav',
  interval: 1000, // Library enforces 1000ms minimum for performance
} as const

export const useRecording = () => {
  const [duration, setDuration] = useState(0)
  const [isStreaming, setIsStreaming] = useState(false)
  const { processAudioChunk } = useAudioProcessor()
  
  const { 
    startRecording, 
    stopRecording, 
    isRecording,
  } = useSharedAudioRecorder()

  // Callback for audio stream data
  const handleAudioStream = useCallback(async (audioEvent: AudioDataEvent) => {
    const eventData = audioEvent.data
    
    if (!eventData) {
      console.warn('Audio stream event received but no data found:', audioEvent)
      return
    }
    
    let audioData: Float32Array | null = null
    
    // Handle both possible data types
    if (typeof eventData === 'string') {
      // Base64 string - decode it
      audioData = processAudioChunk(eventData)
    } else if (eventData instanceof Float32Array) {
      // Already decoded - use directly
      audioData = eventData
      console.log('Received pre-decoded chunk:', {
        samples: audioData.length,
        min: Math.min(...audioData),
        max: Math.max(...audioData),
      })
    }
    
    if (audioData) {
      // Data is ready, verified working
      // Future: Pass to Rust via UniFFI
    }
  }, [processAudioChunk])

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
      console.log('Starting recording with streaming...')
      console.log('Calling startRecording with config:', RECORDING_CONFIG)
      const result = await startRecording({
        ...RECORDING_CONFIG,
        onAudioStream: handleAudioStream,
      })
      console.log('Start recording result:', result)
      setIsStreaming(true)
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }, [startRecording, handleAudioStream])

  const stop = useCallback(async () => {
    try {
      console.log('Stopping recording...')
      setIsStreaming(false)
      const result = await stopRecording()
      console.log('Stop recording result:', result)
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }, [stopRecording])

  return {
    isRecording,
    isStreaming,
    duration,
    start,
    stop,
  }
}