'use client'
import { usePageDataStore } from '@/stores/PageDataStore';

export default function Page() {
  const {currentIndex, sidebarIsOpen, incrementCurrentIndex} = usePageDataStore((state) => state);
  return (
    <>
      <div>currentIndex : {currentIndex}</div>
      <div>sidebarIsOpen : {`${sidebarIsOpen}`}</div>
      <button onClick={incrementCurrentIndex}>엄준동</button>
    </>
  )
}