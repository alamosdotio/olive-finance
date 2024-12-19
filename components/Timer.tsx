'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference <= 0) {
        setTimeLeft('Expired')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      const timeString = [
        days > 0 ? `${days}d:` : '',
        `${hours.toString().padStart(2, '0')}:`,
        minutes.toString().padStart(2, '0'),
        `:${seconds.toString().padStart(2, '0')}`
      ].join('')

      setTimeLeft(timeString)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return <span>{timeLeft}</span>
}