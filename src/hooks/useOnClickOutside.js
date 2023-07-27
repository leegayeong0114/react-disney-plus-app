import { useEffect } from 'react'

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if(!ref.current || ref.current.contains(event.target)) return null // 클릭한 영역이 모달이면
      handler() // 클릭한 영역이 모달이 아니면 handler 호출하여 모달 닫기
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
  
}