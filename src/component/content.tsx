'use client'
import style from '@/styles/content.module.css';
import sidebarStyle from '@/styles/sidebar.module.css';
import { useEffect, useRef, useState, WheelEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Content(props: {
  viewport: number,
  sidebarIsOpen: boolean,
  sidebarWidth: {opened: string, closed: string}
}) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (titleRef.current) {
      const elements = titleRef.current.querySelector('article')!.children;
      const textNodes = [...elements].filter((ele) => ele.tagName !== 'DIV');
      textNodes.forEach((node, idx) => {
        gsap.from(node, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          delay: idx * 0.3,
        })
      })
    }

    const sections = document.querySelectorAll(`.${style.article}`);
    sections.forEach((section, idx) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 10%',
        end: 'bottom top',
        scrub: true,
        onEnter: () => updateActive(idx),
        onEnterBack: () => updateActive(idx)
      })
    })

    function updateActive(idx: number) {
      document.querySelectorAll(`.${sidebarStyle.sidebar} li`).forEach((ele, i) => {
        if (ele instanceof HTMLLIElement) {
          gsap.to(ele, { color: i === idx ? 'yellow' : 'white', duration: 0.5 })
        }
      })
    }

    function preventDefaultWheel(event: unknown) {
      const wheelEvent = event as WheelEvent;
      wheelEvent.preventDefault();
    }

    window.addEventListener("wheel", preventDefaultWheel, { passive: false });
    return () => window.removeEventListener("wheel", preventDefaultWheel);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(`.${style.article}`);
    let handleThrottle: NodeJS.Timeout | null = null;
    function handleWheel(event: unknown) {
      if (handleThrottle) return;
      const wheelEvent = event as WheelEvent;
      handleThrottle = setTimeout(() => {
        if (wheelEvent.deltaY > 0 && currentIndex < sections.length - 1) {
          setCurrentIndex((prev:number) => prev + 1);
        } else if (wheelEvent.deltaY < 0 && currentIndex > 0) {
          setCurrentIndex((prev:number) => prev - 1);
        }
        handleThrottle = null;
      }, 200)
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    sections[currentIndex]?.scrollIntoView({ behavior: "smooth" });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex]);

  useEffect(() => {
    if(contentsRef.current) {
      if (props.sidebarIsOpen) {
        contentsRef.current.classList.remove(style.close)
      }else {
        contentsRef.current.classList.add(style.close)
      }
    }
  }, [props.sidebarIsOpen]);

  return (
    <>
      <div className={style.content} ref={contentsRef}>
        <div className={`${style.article} ${style.title}`} ref={titleRef} id={'title'}>
            <article>
              <h2>개발을 좋아하고 호기심이 넘치는</h2>
              <span><h1 className={style.gradientTxt}>배창우</h1><h2>입니다.</h2></span>
              <p>새로운 기술을 배우고 적용해 보는 것을 즐깁니다.</p>
              <p>더 나은 코드, 더 나은 성능을 위해 항상 고민합니다.</p>
              <p>배운 것을 다른 사람과 이야기하는 것을 좋아합니다.</p>
              <div className={style.arrow}>
                <div className={style.scrollArrow}></div>
                <div className={style.scrollArrow}></div>
                <div className={style.scrollArrow}></div>
              </div>
            </article>
        </div>
        <div className={`${style.article}`} id={'work'}>
          <article>
            내용
          </article>
        </div>
        <div className={`${style.article} ${style.test2}`} id={'project'}></div>
        <div className={`${style.article} ${style.test}`} id={'education'}></div>
        <div className={`${style.article} ${style.test2}`}></div>
        </div>
    </>
  )
}