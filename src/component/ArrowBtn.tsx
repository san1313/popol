import style from '@/styles/sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

export default function ArrowBtn({onClick}: {onClick: () => void}) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if(arrowRef.current) {
      arrowRef.current.classList.toggle(style.toRight);
      onClick()
    }
  }
  return (
    <>
  <div ref={arrowRef} className={`${style.arrowBtnLeft}`} onClick={handleClick}><FontAwesomeIcon icon={faArrowLeft} size={'2xl'}/></div>
    </>
  )
}