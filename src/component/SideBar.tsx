'use client'
import style from '@/styles/sidebar.module.css';
import ArrowBtn from '@/component/ArrowBtn';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import COMMON from '@/constants/common';

export default function SideBar(props: {
  currentIndex: number,
  setCurrentIndex: (idx: number) => void,
  viewport: number,
  sidebarIsOpen: boolean,
  setSidebarIsOpen: (isOpen: (prev: boolean) => boolean) => void
}) {
  const linkRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.viewport >= COMMON.MAX_VIEWPORT_MOBILE) {
      gsap.to([tagRef.current, linkRef.current], {
        opacity: 1,
        duration: 1.0,
        delay: 0.3,
        overwrite: 'auto'
      })
    }}, [props.viewport]);

  const handleArrowClick = () => {
    arrowRef.current = !arrowRef.current;
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle(style.close);
      if (props.sidebarIsOpen) {
        gsap.to([tagRef.current, linkRef.current], { opacity: 0, duration: 0.4, scrub: true })
        gsap.to([tagRef.current, linkRef.current],
          { visibility: 'hidden', delay: 0.3, scrub: true })
      } else {
        gsap.to([tagRef.current, linkRef.current], { opacity: 1, duration: 0.5, scrub: true })
        gsap.to([tagRef.current, linkRef.current], { visibility: 'visible', scrub: true })
      }
    }
    props.setSidebarIsOpen((prev: boolean) => !prev);
  }

  const fixAnchorEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const hash = (e.target as HTMLAnchorElement).hash
    const targetSection = document.querySelector(hash);
    if (targetSection instanceof HTMLDivElement) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      props.setCurrentIndex(Number(targetSection.dataset.idx));
    }
  }

  const index = [
    { id: 'title', txt: '저는요' },
    { id: 'work', txt: '경력' },
    { id: 'project', txt: '프로젝트' },
    { id: 'education', txt: '학력 및 교육' },
    { id: 'certificate', txt: '자격증'},
  ];
  return (
    <>
    <div ref={sidebarRef} className={style.sidebar}>
      {props.viewport <= COMMON.MAX_VIEWPORT_MOBILE
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