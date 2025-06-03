import { useRef } from 'react';
import useOpacityAnimation from '@/hooks/useOpacityAnimation';

export default function Certificates() {
  const articleRef = useRef<HTMLElement>(null);
  useOpacityAnimation(articleRef.current);
  return (
    <article className='w-4/5 min-h-screen flex flex-col' ref={articleRef}>
          <h1 className='py-4 mt-4 md:mt-8 text-4xl md:text-7xl font-black'>자격증<hr
            className='mb-2 mt-1 md:mb-4' /></h1>
          <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
            <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
              <h2 className='text-[1.7rem] md:text-3xl font-bold'><big>■ 어학</big></h2>
              <div>
                <h2 className='text-[1.7rem] md:text-3xl font-bold'>일본어 JLPT 2급</h2>
                <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>2015.08.</h3>
                <p className='font-medium mt-0 md:text-xl'>일본국제교류기금</p>
              </div>
            </div>
            <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
              <h2 className='text-[1.7rem] md:text-3xl font-bold'><big>■ 자격증</big></h2>
              <div>
                <h2 className='text-[1.7rem] md:text-3xl font-bold'>운전면허 1종 보통</h2>
                <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>2016. 01.</h3>
                <p className='font-medium mt-0 md:text-xl'>도로교통공단</p>
              </div>
              <div>
                <h2 className='text-[1.7rem] md:text-3xl font-bold'>ITQ 아래한글 (A)</h2>
                <h3 className='mt-2.5 md:mt-0 text-[1.2rem] md:text-2xl font-medium'>2008. 09.</h3>
                <p className='font-medium mt-0 md:text-xl'>한국생산성본부</p>
              </div>
            </div>
          </div>
        </article>
  )
}