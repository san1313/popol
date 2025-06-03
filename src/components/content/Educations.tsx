import { useRef } from 'react';
import useOpacityAnimation from '@/hooks/useOpacityAnimation';

export default function Educations() {
  const articleRef = useRef<HTMLElement>(null);
  useOpacityAnimation(articleRef.current);

  return (
    <article className='w-4/5 min-h-screen flex flex-col' ref={articleRef}>
          <h1 className='py-4 mt-4 md:mt-8 text-4xl md:text-7xl font-black'>학력 및 교육<hr
            className='mb-2 mt-1 md:mb-4' /></h1>
          <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
            <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
              <h2 className='text-[1.7rem] md:text-3xl font-bold'><big>■ 학력</big></h2>
              <div>
                <h2 className='text-[1.7rem] md:text-3xl font-bold'>대구 강북고등학교 (졸업)</h2>
                <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>2014.03. ~ 2016.02.</h3>
              </div>
              <div>
                <h2 className='text-[1.7rem] md:text-3xl font-bold'>계명대학교 일본학과 (학사 졸업)</h2>
                <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>2016.03. ~ 2022.02.</h3>
              </div>
            </div>
            <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
              <h2 className='text-[1.7rem] md:text-3xl font-bold'><big>■ 교육</big></h2>
              <div>
                <h2 className='text-[1.7rem] md:text-3xl font-bold'>㈜예담직업전문학교 (수료)</h2>
                <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>2022.12. ~ 2023.06.</h3>
                <p className='font-medium mt-0 md:text-xl'>클라우드 기반 Java 개발자 양성과정</p>
              </div>
              <div>
                <h2 className='text-[1.7rem] md:text-3xl font-bold'>우아한테크코스 7기 프리코스</h2>
                <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>2024.10.15 ~ 2024.11.12</h3>
              </div>
            </div>
          </div>
        </article>
  )
};