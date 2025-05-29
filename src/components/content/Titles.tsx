import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Titles() {
  const arrowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.set(arrowsRef.current, { opacity: 0 });
    const tl = gsap.timeline({ repeat: -1, ease: "power1.inOut" });
    tl.to(arrowsRef.current, {opacity: 1, duration: 0.6, stagger: 0.1})
      .to(arrowsRef.current, { opacity: 0, duration: 0.6, stagger: 0.1});
  }, []);

  return (
    <div className='w-full min-h-screen relative flex justify-center items-center text-white'>
      <div className='absolute inset-0 opacity-80 brightness-50 bg-cover bg-[url("/images/title_bg.jpg")] -z-1'></div>
      <article className='w-4/5 flex-col justify-center items-center'>
        <h2 className='text-6xl text-center font-bold drop-shadow-[3px_3px_4px_#171717]'>개발을 좋아하고 호기심이 넘치는</h2>
        <span className='flex justify-center items-baseline'><h1 className='p-2 mt-0 text-9xl text-center font-black drop-shadow-[3px_3px_4px_#171717] gradient'>배창우</h1><h2 className='text-6xl text-center font-bold drop-shadow-[3px_3px_4px_#171717]'>입니다.</h2></span>
        <p className='mt-[0.8rem] py-1 text-4xl text-center font-medium drop-shadow-[2px_1px_2px_#171717]'>새로운 기술을 배우고 적용해 보는 것을 즐깁니다.</p>
        <p className='mt-[0.8rem] py-1 text-4xl text-center font-medium drop-shadow-[2px_1px_2px_#171717]'>반복되는 일을 자동화하고 비효율적인 프로세스를 개선하는 것을 좋아합니다.</p>
        <p className='mt-[0.8rem] py-1 text-4xl text-center font-medium drop-shadow-[2px_1px_2px_#171717]'>배운 것을 다른 사람과 이야기하는 것을 좋아합니다.</p>
        <div>
          {[19, 17, 15].map((bottom, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) arrowsRef.current[index] = el;
              }}
              className="scrollArrow"
              style={{ bottom: `${bottom}vh`}}
            ></div>
          ))}
        </div>
      </article>
    </div>
  );
}