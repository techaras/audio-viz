import { useEffect } from 'react'
import { useRecording } from '@/hooks/useRecording'

interface RecordingPreparerProps {
  children: React.ReactNode
}

export const RecordingPreparer = ({ children }: RecordingPreparerProps) => {
  const { prepare } = useRecording()

  // Prepare recording as soon as this component mounts
  useEffect(() => {
    const initRecording = async () => {
      await prepare()
    }
    initRecording()
  }, [prepare])

  return <>{children}</>
}