import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles,
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser, faUserGraduate
} from '@fortawesome/free-solid-svg-icons';
import SvgImages from '@/components/SvgImages';
import { useRef } from 'react';
import useOpacityAnimation from '@/hooks/useOpacityAnimation';

export default function About() {
  const articleRef = useRef<HTMLElement>(null);
  useOpacityAnimation(articleRef.current);

  return (
    <article className='w-4/5 min-h-screen flex flex-col' ref={articleRef}>
      <h1 className='py-4 mt-4 md:mt-8 text-4xl md:text-7xl font-black'>저는요<hr
        className='mb-2 mt-1 md:mb-4' /></h1>
      <div className='pb-[5vh] flex flex-col grow justify-start gap-8'>
      <div>
        <h2 className='text-[1.7rem] md:text-3xl font-bold'><span
          className='flex flex-col md:flex-row justify-start'><FontAwesomeIcon
          className='w-5 h-5 mr-4' icon={faUser} />이름</span></h2>
      <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>- 배창우</h3>
      </div>
      <div>
      <h2 className='text-[1.7rem] md:text-3xl font-bold'><span
        className='flex flex-col md:flex-row justify-start'><FontAwesomeIcon
        className='w-5 h-5 mr-4' icon={faCakeCandles} />생년월일</span></h2>
      <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>- 1997.08.11</h3>
      </div>
      <div>
      <h2 className='text-[1.7rem] md:text-3xl font-bold'><span
        className='flex flex-col md:flex-row justify-start'><FontAwesomeIcon
        className='w-5 h-5 mr-4' icon={faLocationDot} />위치</span></h2>
      <h3
        className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>- 서울특별시 영등포구 여의도동</h3>
      </div>
      <div>
      <h2 className='text-[1.7rem] md:text-3xl font-bold'><span
        className='flex flex-col md:flex-row justify-start'><FontAwesomeIcon
        className='w-5 h-5 mr-4' icon={faPhone} />연락처</span></h2>
      <h3
        className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>- 010-6632-4496</h3>
      </div>
      <div>
      <h2 className='text-[1.7rem] md:text-3xl font-bold'><span
        className='flex flex-col md:flex-row justify-start'><FontAwesomeIcon
        className='w-5 h-5 mr-4' icon={faEnvelope} />이메일</span></h2>
      <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>- <a
        href={"mailto:skan134679@gmail.com"}>skan134679@gmail.com</a></h3>
      </div>
      <div>
      <h2 className='text-[1.7rem] md:text-3xl font-bold'><span
        className='flex flex-col md:flex-row justify-start'><FontAwesomeIcon
        className='w-5 h-5 mr-4' icon={faUserGraduate} />학력</span></h2>
      <h3
        className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>- 계명대학교 (일본학과) 학사</h3>
      </div>
      <div><span
        className='flex flex-col md:flex-row justify-start'><SvgImages
        className='w-6 h-6 mr-4' name={'github'} /><h2
        className='text-[1.7rem] md:text-3xl font-bold'><a className='underline'
                                                           href={"https://github.com/san1313"}>Github</a></h2></span>
      </div>
    </div>
  </article>
  )
}