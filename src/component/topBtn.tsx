import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import style from '@/styles/page.module.css';

export default function TopBtn(props : {
  currentIndex: number,
  setCurrentIndex: (idx: number) => void,
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    props.setCurrentIndex(0);
  }
  return <button className={style.topBtn} onClick={scrollToTop}><FontAwesomeIcon icon={faArrowUp} size={'2xl'}/></button>
}
