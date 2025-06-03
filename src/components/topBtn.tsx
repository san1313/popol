'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { usePageDataStore } from '@/stores/PageDataStore';

export default function TopBtn() {
  const {setCurrentIndex} = usePageDataStore((state) => state);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setCurrentIndex(0);
  }
  return <button className='w-[50px] h-[50px] fixed text-center leading-[45px] right-[15px] bottom-[15px] z-10 border-2 rounded-[50%] bg-white/40 hover:bg-[#e7e7e7] cursor-pointer' onClick={scrollToTop}><FontAwesomeIcon icon={faArrowUp} size={'2xl'}/></button>
}
