import { useRef } from 'react';
import useOpacityAnimation from '@/hooks/useOpacityAnimation';

export default function Works() {
  const articleRef = useRef<HTMLDivElement>(null);
  useOpacityAnimation(articleRef.current);

  return (
    <article className='w-4/5 min-h-screen flex flex-col' ref={articleRef}>
      <h1 className='py-4 mt-4 md:mt-8 text-4xl md:text-7xl font-black'>경력<hr
        className='mb-2 mt-1 md:mb-4' /></h1>
      <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
        <div>
          <span className='flex flex-col md:flex-row items-baseline md:justify-start'><h2
            className='text-[1.7rem] md:text-3xl font-bold'>㈜ 아이티아이즈</h2><p
            className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>&ensp;(2023. 09. 25 ~ 2024. 05. 03)</p></span>
          <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>학점은행제 복수기관 학습자 대출시스템 등 구축(1, 2차) - 한국장학재단</h3>
        </div>
        <div>
          <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>■ 수행 업무</h3>
          <div className='ml-8'>
            <p
              className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>1. <b>Spring</b> 및 <b>Samsung Anyframe</b> 프레임워크를 사용한 웹 풀스택 개발</p>
            <p className='ml-8 mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>- 신규 대출 심사 데이터 검증 및 조건분기 로직 개발</p>
            <p className='ml-8 mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>- 신규 API 연결에 따른 데이터 처리 Batch 개발</p>
            <p className='ml-8 mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>- 고도화 작업 및 신규 로직을 위한 DB 쿼리 작성/수정</p>
            <p
              className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>2. <b>MIPLATFORM</b>을 사용한 내부 프로그램 UI개발</p>
            <p className='ml-8 mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>- 사내 업무망 프로그램 신규 화면 기획/작성 및 기능 작성</p>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>3. 보안 취약점 검사 및 코드 수정</p>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>4. 개발단 서버 JEUS 컨테이너 관리</p>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>5. <b>Apache Jmeter</b>를 사용한 주요 로직 부하테스트</p>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>6. AngularJS 기반 모바일 앱 업무 지원</p>
          </div>
        </div>
        <div>
          <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>■ 주요 성과</h3>
          <div className='ml-8'>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>1. 고객의 요구사항을 꼼꼼히 확인하여 차후 페이지 구성과 로직을 변경하는 일이 적도록 하였습니다.</p>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>2. 신규 외부 API 연결에 문제가 발생하였을 때, 로그 분석, 통신 라이브러리 분석 등 주도적으로 원인을 분석하여 IT현업과 소통하였고, 프로젝트 진행에 차질이 없도록 하였습니다.</p>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>3. Javascript를 이용해 간단한 툴을 제작, 팀원들에게 배포하여 반복적인 업무의 효율을 증가시켰습니다.</p>
            <p className='mt-1 lg:mt-1.5 sm:text-xl md:text-base lg:text-xl font-medium'>4. 부하테스트 진행간 인력 및 기간 상의 문제가 있었으나, 지속적인 진행 상황 보고와 의견 제시로 고객과 원만한 합의를 이끌어내었고, 테스트를 성공적으로 진행시켜 고객이 만족할 수 있도록 하였습니다.</p>
          </div>
        </div>
      </div>
    </article>
  )
}