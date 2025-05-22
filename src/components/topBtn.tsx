import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import style from '@/styles/page.module.css';
import { usePageDataStore } from '@/providers/PageDataProvider';

export default function TopBtn() {
  const {setCurrentIndex} = usePageDataStore((state) => state);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setCurrentIndex(0);
  }
  return <button className={style.topBtn} onClick={scrollToTop}><FontAwesomeIcon icon={faArrowUp} size={'2xl'}/></button>
}
