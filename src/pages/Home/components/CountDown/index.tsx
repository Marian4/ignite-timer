import { useContext, useEffect } from 'react'
import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const activeCycleTotalSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0
  const currentSeconds = activeCycleTotalSeconds - amountSecondsPassed

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      console.log('1')
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= activeCycleTotalSeconds) {
          markCycleAsFinished()
          setSecondsPassed(activeCycleTotalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
          console.log('1.2')
        }
      }, 1000)
    }

    return () => {
      console.log('2')
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    activeCycleTotalSeconds,
    markCycleAsFinished,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
