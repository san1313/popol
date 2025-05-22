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
  faPhone,
  faUser, faUserGraduate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectSection from '@/components/content/ProjectSection';
import SvgImages from '../components/SvgImages';
import CustomBadge from '../components/CustomBadge';
import { usePageDataStore } from '@/stores/PageDataStore';
import { useThrottleFn } from '@/hooks/useThrottleFn';
import { useEventListener } from '@/hooks/useEventListener';

export default function Content() {
  const {currentIndex, incrementCurrentIndex, decrementCurrentIndex} = usePageDataStore((state) => state);
  const titleRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<NodeListOf<HTMLDivElement> | []>([]);

  const handleWheel = useThrottleFn((event) => {
    const wheelEvent = event as WheelEvent;
    if (wheelEvent.deltaY > 0 && currentIndex < articlesRef.current.length - 1) {
      incrementCurrentIndex();
    } else if (wheelEvent.deltaY < 0 && currentIndex > 0) {
      decrementCurrentIndex();
    }
  }, 200)

  useEventListener('wheel', handleWheel, typeof window !== 'undefined' ? window : null, { passive: false });

  useEffect(() => {
    articlesRef.current = document.querySelectorAll(`.${style.article}`);
  }, []);

  useEffect(() => {
    articlesRef.current[currentIndex]?.scrollIntoView({ behavior: "smooth" });
  }, [currentIndex]);

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

    const sections = document.querySelectorAll(`.${style.article}:not([data-ref-idx])`) as NodeListOf<HTMLDivElement>;
    const subSections = document.querySelectorAll(`.${style.article}[data-ref-idx]`) as NodeListOf<HTMLDivElement>;

    sections.forEach((section, idx) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
        onEnter: () => updateActive(idx),
        onEnterBack: () => updateActive(idx)
      })

    })
    subSections.forEach((section) => {
      const refIdx = Number(section.dataset.refIdx);
      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
        onEnter: () => updateActive(refIdx),
        onEnterBack: () => updateActive(refIdx)
      })
    })

    function updateActive(idx: number) {
      document.querySelectorAll(`.${sidebarStyle.sidebar} li`).forEach((ele, i) => {
        if (ele instanceof HTMLLIElement) {
          gsap.to(ele, { color: i === idx ? 'yellow' : 'white', duration: 0.5 })
        }
      })
    }
  }, []);

  return (
    <>
        <div className={`${style.article} ${style.title}`} ref={titleRef} id={'title'} data-idx={0}>
            <article>
              <h2>개발을 좋아하고 호기심이 넘치는</h2>
              <span><h1 className={style.gradientTxt}>배창우</h1><h2>입니다.</h2></span>
              <p>새로운 기술을 배우고 적용해 보는 것을 즐깁니다.</p>
              <p>반복되는 일을 자동화하고 비효율적인 프로세스를 개선하는 것을 좋아합니다.</p>
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
            <div className={style.flexContainer} style={{ gap: "2rem" }}>
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
                <h2><span><FontAwesomeIcon icon={faPhone} />연락처</span></h2>
                <h3>- 010-6632-4496</h3>
              </div>
              <div>
                <h2><span><FontAwesomeIcon icon={faEnvelope} />이메일</span></h2>
                <h3>- <a href={"mailto:skan134679@gmail.com"}>skan134679@gmail.com</a></h3>
              </div>
              <div>
                <h2><span><FontAwesomeIcon icon={faUserGraduate} />학력</span></h2>
                <h3>- 계명대학교 (일본학과) 학사</h3>
              </div>
              <div><span><SvgImages name={'github'} /><h2><a
                href={"https://github.com/san1313"}>Github</a></h2></span>
                </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'skill'} data-idx={2}>
          <article>
            <h1>활용 기술<hr /></h1>
            <div className={style.flexContainer} style={{ gap: "2rem" }}>
              <div className={style.flexContainer}>
                <h2>백엔드</h2>
                <span style={{ gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  <CustomBadge name={'Java'} colorCode={"FF7800"} logoColor={"white"} />
                  <CustomBadge name={'Spring'} colorCode={"6DB33F"} logoColor={"white"} />
                  <CustomBadge name={'Spring Boot'} colorCode={"6DB33F"} logoColor={"white"} />
                  <CustomBadge name={'Spring Security'} colorCode={"6DB33F"} logoColor={"white"} />
                  <CustomBadge name={'JSP/Servlet'} colorCode={"FF7800"} logoColor={"white"} />
                  <CustomBadge name={'ThymeLeaf'} colorCode={"005F0F"} logoColor={"white"} />
                  <CustomBadge name={'Oracle'} colorCode={"F80000"} logoColor={"white"} />
                  <CustomBadge name={'MySQL'} colorCode={"4479A1"} logoColor={"white"} />
                  <CustomBadge name={'MyBatis'} colorCode={"000000"} logoColor={"white"} />
                  <CustomBadge name={'Anyframe'} colorCode={"1428A0"} logoColor={"white"} />
                </span>
              </div>
              <div className={style.flexContainer}>
                <h2>프론트엔드</h2>
                <span style={{ gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  <CustomBadge name={'HTML5'} colorCode={"E34F26"} logoColor={"white"} />
                  <CustomBadge name={'CSS'} colorCode={"1572B6"} logoColor={"white"} />
                  <CustomBadge name={'JavaScript'} colorCode={"F7DF1E"} logoColor={"white"} />
                  <CustomBadge name={'TypeScript'} colorCode={"3178C6"} logoColor={"white"} />
                  <CustomBadge name={'React'} colorCode={"61DAFB"} logoColor={"white"} />
                  <CustomBadge name={'jQuery'} colorCode={"0769AD"} logoColor={"white"} />
                  <CustomBadge name={'BootStrap'} colorCode={"7952B3"} logoColor={"white"} />
                  <CustomBadge name={'Toast UI Grid'} colorCode={"515ce6"} logoColor={"white"} />
                  <CustomBadge name={'MiPlatform'} colorCode={"3abcd4"} logoColor={"white"} />
                </span>
              </div>
              <div className={style.flexContainer}>
                <h2>기타</h2>
                <span style={{ gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  <CustomBadge name={'Next.js'} colorCode={"000000"} logoColor={"white"} />
                  <CustomBadge name={'Git'} colorCode={"F05032"} logoColor={"white"} />
                  <CustomBadge name={'SVN'} colorCode={"809CC9"} logoColor={"white"}
                               logoName={'subversion'} />
                  <CustomBadge name={'Docker'} colorCode={"2496ED"} logoColor={"white"} />
                  <CustomBadge name={'Jenkins'} colorCode={"D24939"} logoColor={"white"} />
                  <CustomBadge name={'Apache Jmeter'} colorCode={"D22128"} logoColor={"white"} />
                </span>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'work'} data-idx={3}>
          <article>
            <h1>경력<hr /></h1>
            <div className={style.flexContainer}>
              <div>
                <span><h2>㈜ 아이티아이즈</h2><p>&ensp;(2023. 09. 25 ~ 2024. 05. 03)</p></span>
                <h3 style={{ marginTop: "0.5rem" }}>학점은행제 복수기관 학습자 대출시스템 등 구축(1, 2차) - 한국장학재단</h3>
              </div>
              <div>
                <h3>■ 수행 업무</h3>
                <div className={style.indent}>
                  <p>1. <b>Spring</b> 및 <b>Samsung Anyframe</b> 프레임워크를 사용한 웹 풀스택 개발</p>
                  <p className={style.sub}>- 고도화 작업 및 신규 로직을 위한 DB 쿼리 작성/수정</p>
                  <p className={style.sub}>- 신규 페이지 작성 및 로직 연결, 데이터 검증 로직 개발</p>
                  <p>2. <b>MIPLATFORM</b>을 사용한 내부 프로그램 UI개발</p>
                  <p className={style.sub}>- 사내 업무망 프로그램 신규 화면 기획/작성 및 기능 작성</p>
                  <p>3. 보안 취약점 검사 및 코드 수정</p>
                  <p>4. 신규 API 연결에 따른 데이터 처리 Batch 개발</p>
                  <p>5. 개발단 서버 JEUS 컨테이너 관리</p>
                  <p>6. <b>Apache Jmeter</b>를 사용한 주요 로직 부하테스트</p>
                  <p>7. AngularJS 기반 모바일 페이지 유지보수</p>
                </div>
              </div>
              <div>
                <h3>■ 주요 성과</h3>
                <div className={style.indent}>
                  <p>1. 고객의 요구사항을 꼼꼼히 확인하여 차후 페이지 구성과 로직을 변경하는 일이 적도록 하였습니다.</p>
                  <p>2. 신규 외부 API 연결에 문제가 발생하였을 때, 주도적으로 원인을 분석하여 IT현업과 소통하였고, 프로젝트 진행에 차질이 없도록 하였습니다.</p>
                  <p>3. Javascript를 이용해 간단한 툴을 제작, 팀원들에게 배포하여 업무의 효율을 증가시켰습니다.</p>
                  <p>4. 부하테스트 진행간 인력 및 기간 상의 문제가 있었으나, 지속적인 진행 상황 보고와 의견 제시로 고객과 원만한 합의를 이끌어내었고, 테스트를 성공적으로 진행시켜 고객이 만족할 수 있도록 하였습니다.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'project'} data-idx={4}>
          <article>
            <h1>프로젝트<hr /></h1>
            <div className={style.flexContainer}>
              <div className={style.projectContainer}>
                <ProjectSection pNo={0} />
              </div>
              <div className={style.projectContainer}>
                <ProjectSection pNo={1} />
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} data-idx={5} data-ref-idx={4}>
          <article>
            <h1>프로젝트<hr /></h1>
            <div className={style.flexContainer}>
              <ProjectSection pNo={2} />
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'education'} data-idx={6}>
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
                  <p className='mt-0'>클라우드 기반 Java 개발자 양성과정</p>
                </div>
                <div>
                  <h2>우아한테크코스 7기 프리코스</h2>
                  <h3>2024.10.15 ~ 2024.11.12</h3>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className={`${style.article}`} id={'certificate'} data-idx={7}>
          <article>
            <h1>자격증<hr /></h1>
            <div className={style.flexContainer}>
              <div className={style.flexContainer}>
                <h2><big>■ 어학</big></h2>
                <div>
                  <h2>일본어 JLPT 2급</h2>
                  <h3>2015.08.</h3>
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
    </>
  )
}