'use client'
import style from '@/styles/sidebar.module.css';
import ArrowBtn from '@/components/ArrowBtn';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import COMMON from '@/constants/common';
import { usePageDataStore } from '@/stores/PageDataStore';

export default function SideBar() {
  const {
    viewport,
    sidebarIsOpen,
    toggleSidebarIsOpen,
    setCurrentIndex,
  } = usePageDataStore(state => state);
  const linkRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewport >= COMMON.MAX_VIEWPORT_MOBILE) {
      gsap.to([tagRef.current, linkRef.current], {
        opacity: 1,
        duration: 1.0,
        delay: 0.3,
        overwrite: 'auto'
      })
    }}, [viewport]);

  const handleArrowClick = () => {
    arrowRef.current = !arrowRef.current;
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle(style.close);
      if (sidebarIsOpen) {
        gsap.to([tagRef.current, linkRef.current], { opacity: 0, duration: 0.4})
        gsap.to([tagRef.current, linkRef.current],
          { visibility: 'hidden', delay: 0.3 })
      } else {
        gsap.to([tagRef.current, linkRef.current], { opacity: 1, duration: 0.5 })
        gsap.to([tagRef.current, linkRef.current], { visibility: 'visible' })
      }
    }
    toggleSidebarIsOpen();
  }

  const fixAnchorEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const hash = (e.target as HTMLAnchorElement).hash
    const targetSection = document.querySelector(hash);
    if (targetSection instanceof HTMLDivElement) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      setCurrentIndex(Number(targetSection.dataset.idx));
    }
  }

  const index = [
    { id: 'title', txt: '홈' },
    { id: 'about', txt: '저는요' },
    { id: 'skill', txt: '활용 기술'},
    { id: 'work', txt: '경력' },
    { id: 'project', txt: '프로젝트' },
    { id: 'education', txt: '학력 및 교육' },
    { id: 'certificate', txt: '자격증'},
  ];
  return (
    <>
    <div ref={sidebarRef} className={style.sidebar}>
      {viewport <= COMMON.MAX_VIEWPORT_MOBILE
        ?
        <></>
        :
        <>
            <ArrowBtn onClick={handleArrowClick}></ArrowBtn>
            <div className={style.idxContainer} ref={tagRef}>
            <ul>
              {index.map((item, idx) =>
                <li key={idx}><a href={`#${item.id}`} onClick={fixAnchorEvent}>{item.txt}</a></li>
              )}
            </ul>
          </div>
        </>
      }
      <div className={style.linkContainer} ref={linkRef}>
        <a href={'mailto:skan143679@gmail.com'}><span>skan134679@gmail.com</span></a>
        <a href={'https://github.com/san1313'}>Github</a>
      </div>
    </div>
  </>
  )
}