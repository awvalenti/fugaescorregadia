import { useRef } from 'react'
import Position from '../../domain/Position'

const usePrevious = (currentValue: Position) => {
  const previousRef = useRef(currentValue)
  const previousValue = previousRef.current
  previousRef.current = currentValue
  return previousValue
}

export default usePrevious
