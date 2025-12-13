import { useEffect } from 'react'
import { useSharedAudioRecorder } from '@siteed/expo-audio-studio'

interface RecordingPreparerProps {
  children: React.ReactNode
}

const RECORDING_CONFIG = {
  sampleRate: 44100,
  numberOfChannels: 1,
  bitDepth: 16,
  outputFormat: 'wav',
} as const

export const RecordingPreparer = ({ children }: RecordingPreparerProps) => {
  const { prepareRecording } = useSharedAudioRecorder()

  useEffect(() => {
    const initRecording = async () => {
      try {
        console.log('Preparing recording...')
        await prepareRecording(RECORDING_CONFIG)
        console.log('Recording prepared successfully')
      } catch (error) {
        console.error('Failed to prepare recording:', error)
      }
    }
    initRecording()
  }, [prepareRecording])

  return <>{children}</>
}