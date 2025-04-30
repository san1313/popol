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

    const sections = document.querySelectorAll(`.${style.article}:not([data-page])`);
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
    if (contentsRef.current) {
      if (props.sidebarIsOpen) {
        contentsRef.current.classList.remove(style.close)
      } else {
        contentsRef.current.classList.add(style.close)
      }
    }
  }, [props.sidebarIsOpen])

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
            <h1>경력<hr/></h1>
            <div className={style.flexContainer}>
              <div style={{marginTop:"-3rem"}}>
                <span><h2>㈜ 아이티아이즈</h2><p>&ensp;(2023. 09. 25 ~ 2024. 05. 03)</p></span>
                <h3 style={{marginTop:"0.5rem"}}>학점은행제 복수기관 학습자 대출시스템 등 구축(1, 2차) - 한국장학재단</h3>
              </div>
              <div>
                <h3>■ 수행 업무</h3>
                <p>- Spring 및 Samsung Anyframe을 사용한 웹 풀스택 개발</p>
                <p className={style.sub}>- 고도화 작업 및 신규 로직을 위한 DB 쿼리 변경 작업</p>
                <p className={style.sub}>- 신규 API 연결에 따른 데이터 처리 배치 개발</p>
                <p className={style.sub}>- 신규 페이지 작성 및 로직 연결, 검증 로직 개발</p>
                <p>- MIPLATFORM을 사용한 UI개발</p>
                <p>- 개발단 서버 ZEUS 컨테이너 관리</p>
                <p>- Apache Jmeter를 사용한 주요 로직 부하테스트</p>
              </div>
              <div>
                <h3>■ 주요 성과</h3>
                <p>- 고객의 요구사항을 꼼꼼히 확인하여 차후 페이지 구성과 로직을 변경하는 일이 적도록 하였습니다.</p>
                <p>- 신규 API 연결에 문제가 발생하였을 때, 주도적으로 원인을 분석하여 현업과 소통하였고, 프로젝트 진행에 큰 차질이 없도록 하였습니다.</p>
                <p>- Javascript를 이용해 간단한 툴을 제작, 팀원들에게 배포하여 업무의 효율을 증가시켰습니다.</p>
                <p>- 부하테스트 진행 시, 인력 및 기간 상의 문제가 발생하였으나, 고객과 원만한 합의를 이끌어내어 테스트를 성공적으로 진행시켰습니다.</p>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article} ${style.test2}`} id={'project'}></div>
        <div className={`${style.article} ${style.test}`} id={'education'}></div>
        <div className={`${style.article} ${style.test2}`} id={'certificate'}></div>
      </div>
    </>
  )
}