'use client'
import style from '@/styles/content.module.css';
import sidebarStyle from '@/styles/sidebar.module.css';
import { useEffect, useRef, WheelEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  faCakeCandles,
  faEnvelope,
  faLocationDot,
  faUser, faUserGraduate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function Content(props: {
  currentIndex: number,
  setCurrentIndex: (idx: (prev: number) => number) => void,
  sidebarIsOpen: boolean,
}) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { currentIndex, setCurrentIndex, sidebarIsOpen } = props;
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
          duration: 1.5,
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
        if (wheelEvent.deltaY > 0 && currentIndex < sections.length - 1) {
          setCurrentIndex((prev: number) => prev + 1);
        } else if (wheelEvent.deltaY < 0 && currentIndex > 0) {
          setCurrentIndex((prev: number) => prev - 1);
        }
        handleThrottle = null;
      }, 200)
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    sections[currentIndex]?.scrollIntoView({ behavior: "smooth" });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, setCurrentIndex]);

  useEffect(() => {
    if (contentsRef.current) {
      if (sidebarIsOpen) {
        contentsRef.current.classList.remove(style.close)
      } else {
        contentsRef.current.classList.add(style.close)
      }
    }
  }, [sidebarIsOpen])

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
        <div className={`${style.article}`} id={'about'} data-idx={1}>
          <article>
            <h1>저는요<hr /></h1>
            <div className={style.flexContainer} style={{gap: "2rem"}}>
              <div>
                <h2><span><FontAwesomeIcon icon={faUser} />이름</span></h2>
                <h3>- 배창우</h3>
              </div>
              <div>
                <h2><span><FontAwesomeIcon icon={faCakeCandles} />생년월일</span></h2>
                <h3>- 1997.08.11</h3>
              </div>
              <div>
                <h2><span><FontAwesomeIcon icon={faLocationDot} />위치</span></h2>
                <h3>- 대구광역시 북구 구암동</h3>
              </div>
              <div>
                <h2><span><FontAwesomeIcon icon={faEnvelope} />이메일</span></h2>
                <h3>- <a href={"mailto:skan134679@gmail.com"}>skan134679@gmail.com</a></h3>
              </div>
              <div>
                <h2><span><FontAwesomeIcon icon={faUserGraduate} />학력</span></h2>
                <h3>- 계명대학교 (일본학과) 학사</h3>
              </div>
              <div><span><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 98 96"><path fillRule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                                        fill="#24292f" /></svg><h2><a
                href={"https://github.com/san1313"}>Github</a></h2></span>
                </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'work'} data-idx={2}>
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
                <p>- 부하테스트 진행 시 인력 및 기간 상의 문제가 발생하였으나, 고객과 원만한 합의를 이끌어내어 테스트를 성공적으로 진행시켰습니다.</p>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'project'} data-idx={3}>
          <article>
            <h1>프로젝트<hr /></h1>
            <div className={style.flexContainer}>
              <div className={style.flexContainer}>
                <h2>■ <a
                  href={"https://github.com/san1313/PenService"}>PenService - 볼펜공장 MES 시스템</a></h2>
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
        <div className={`${style.article}`} data-idx={4} data-sub={true}>
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
        <div className={`${style.article}`} id={'education'} data-idx={5}>
          <article>
            <h1>학력 및 교육<hr /></h1>
            <div className={style.flexContainer}>
              <div className={style.flexContainer}>
                <h2><big>■ 학력</big></h2>
                <div>
                  <h2>대구 강북고등학교 (졸업)</h2>
                  <h3>2014.03. ~ 2016.02.</h3>
                </div>
                <div>
                  <h2>계명대학교 일본학과 (학사 졸업)</h2>
                  <h3>2016.03. ~ 2022.02.</h3>
                </div>
              </div>
              <div className={style.flexContainer}>
                <h2><big>■ 교육</big></h2>
                <div>
                  <h2>㈜예담직업전문학교 (수료)</h2>
                  <h3>2022.12. ~ 2023.06.</h3>
                  <p className={"mt0"}>클라우드 기반 Java 개발자 양성과정</p>
                </div>
                <div>
                  <h2>우아한테크코스 7기 프리코스</h2>
                  <h3>2024.10.15 ~ 2024.11.12</h3>
                  <p className={"mt0"}>최종심사 불합으로 프리코스만 진행</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'certificate'} data-idx={5}>
          <article>
            <h1>자격증<hr /></h1>
            <div className={style.flexContainer}>
              <div className={style.flexContainer}>
                <h2><big>■ 어학</big></h2>
                <div>
                  <h2>일본어 JLPT 2급</h2>
                  <h3>2017.01.</h3>
                  <p className={"mt0"}>일본국제교류기금</p>
                </div>
              </div>
              <div className={style.flexContainer}>
                <h2><big>■ 자격증</big></h2>
                <div>
                  <h2>운전면허 1종 보통</h2>
                  <h3>2016. 01.</h3>
                  <p className={"mt0"}>도로교통공단</p>
                </div>
                <div>
                  <h2>ITQ 아래한글 (A)</h2>
                  <h3>2008. 09.</h3>
                  <p className={"mt0"}>한국생산성본부</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}