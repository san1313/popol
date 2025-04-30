'use client'
import style from '@/styles/content.module.css';
import sidebarStyle from '@/styles/sidebar.module.css';
import { useEffect, useRef, WheelEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Content(props: {
  currentIndex: number,
  setCurrentIndex: (idx: (prev: number) => number) => void,
  viewport: number,
  sidebarIsOpen: boolean,
  sidebarWidth: { opened: string, closed: string }
}) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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

    const articles = document.querySelectorAll(`.${style.article}:not([id="title"])`);
    articles.forEach((article) => {
      gsap.fromTo(article,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          delay: 0.3,
          scrollTrigger: {
            trigger: article,
            start: 'top 80%',
            end: 'top 30%',
          }
        }
      )
    })

    const sections = document.querySelectorAll(`.${style.article}:not([data-sub])`);
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
        if (wheelEvent.deltaY > 0 && props.currentIndex < sections.length - 1) {
          props.setCurrentIndex((prev: number) => prev + 1);
        } else if (wheelEvent.deltaY < 0 && props.currentIndex > 0) {
          props.setCurrentIndex((prev: number) => prev - 1);
        }
        handleThrottle = null;
      }, 200)
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    sections[props.currentIndex]?.scrollIntoView({ behavior: "smooth" });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [props, props.currentIndex]);

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
        <div className={`${style.article} ${style.title}`} ref={titleRef} id={'title'} data-idx={0}>
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
        <div className={`${style.article}`} id={'work'} data-idx={1}>
          <article>
            <h1>경력<hr /></h1>
            <div className={style.flexContainer}>
              <div>
                <span><h2>㈜ 아이티아이즈</h2><p>&ensp;(2023. 09. 25 ~ 2024. 05. 03)</p></span>
                <h3 style={{ marginTop: "0.5rem" }}>학점은행제 복수기관 학습자 대출시스템 등 구축(1, 2차) - 한국장학재단</h3>
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
        <div className={`${style.article}`} id={'project'} data-idx={2}>
          <article>
            <h1>프로젝트<hr /></h1>
            <div className={style.flexContainer}>
              <div className={style.flexContainer}>
                <h2>■ <a href={"https://github.com/san1313/PenService"}>PenService - 볼펜공장 MES 시스템</a></h2>
                <h3>개발 기간 : 2023.04.19. ~ 2023.06.14.</h3>
                <h3>개발 환경 : SpringBoot, Oracle, AWS, Ubuntu, Maven, ThymeLeaf</h3>
                <h3>사용 언어 : Java, HTML5, CSS, JavaScript</h3>
                <h3>사용 라이브러리 : Spring Security, Lombok, MyBatis, jQuery, BootStrap, TUI Grid 등</h3>
                <h3>배포 : Docker, Jenkins, Github</h3>
                <div>
                  <h3>역할</h3>
                  <p>- 팀원 보조 및 모듈 통합 등 팀장으로서의 역할과 개발 계획 작성</p>
                  <p>- 데이터 베이스 모델링, AWS를 활용한 Oracle 데이터베이스 구축</p>
                  <p>- MVC2 패턴을 활용한 개발환경 구축, GIT관리</p>
                  <p>- ThymeLeaf를 활용한 레이아웃 구성</p>
                  <p>- Spring Security를 활용한 접속 권한 관리, 공통 관리 기능 및 품질 관리 기능 작성</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} data-idx={3} data-sub={true}>
          <article>
            <h1>프로젝트<hr /></h1>
            <div className={style.flexContainer}>
              <div className={style.flexContainer}>
                <h2>■ <a href={"https://github.com/san1313/Hotel-in-Earth"}>Hotel-in-Earth - 숙소 예약 플랫폼</a></h2>
                <h3>개발 기간 : 2023.03.13. ~ 2023.03.24.</h3>
                <h3>개발 환경 : Oracle, Apache Tomcat, Servlet</h3>
                <h3>사용 언어 : Java, HTML5, CSS, JavaScript</h3>
                <h3>사용 라이브러리 :Lombok, MyBatis, Tiles, jQuery, BootStrap, Google Maps 등</h3>
                <div>
                  <h3>역할</h3>
                  <p>- 팀원 보조 및 모듈 통합 등 팀장으로서의 역할과 개발 계획 작성</p>
                  <p>- 데이터 베이스 모델링, MVC 패턴을 활용한 개발환경 구축</p>
                  <p>- GIT관리, Oracle 데이터베이스와 ajax를 활용한 동적 웹 게시판 구축</p>
                  <p>- Tiles를 활용한 레이아웃 구성</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article} ${style.test}`} id={'education'} data-idx={4}></div>
        <div className={`${style.article} ${style.test2}`} id={'certificate'} data-idx={5}></div>
      </div>
    </>
  )
}