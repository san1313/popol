import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import style from '@/styles/page.module.css';

export default function TopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return <button className={style.topBtn} onClick={scrollToTop}><FontAwesomeIcon icon={faArrowUp} size={'2xl'}/></button>
}
