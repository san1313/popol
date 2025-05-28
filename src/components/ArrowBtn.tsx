import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import gsap from 'gsap';
import { usePageDataStore } from '@/stores/PageDataStore';

export default function ArrowBtn({onClick}: {onClick: () => void}) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const {sidebarIsOpen} = usePageDataStore((state) => state);
  const handleClick = () => {
    if(arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: sidebarIsOpen ? -180 : 0,
        ease: 'sine.inOut',
        duration: 0.4,
      })
      onClick()
    }
  }
  return (
    <>
  <div ref={arrowRef} className='absolute top-[10px] right-[10px] cursor-pointer' onClick={handleClick}><FontAwesomeIcon icon={faArrowLeft} size={'2xl'}/></div>
    </>
  )
}