import { useEffect, useState } from 'react'

export const useDebounce = (value, delay) => {

  const [debounceValue, setDebounceValue] = useState(value)
  
  useEffect(() => {

    const handler = setTimeout(() => {
      console.log('In Handler')
      setDebounceValue(value)
    }, delay)
    
    return () => {
      console.log('Destroy')
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debounceValue
}

