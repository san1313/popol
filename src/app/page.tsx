'use client'
import style from '@/styles/page.module.css'
import { useEffect } from 'react';
import TopBtn from '@/components/topBtn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageDataStore }  from '@/stores/PageDataStore';
import { useEventListener } from '@/hooks/useEventListener';
import Content from '@/containers/Content';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const { setViewport } = usePageDataStore((state) => state);

  useEffect(() => {
    setViewport(window.innerWidth);
  }, [setViewport]);

    useEventListener(
      'resize',
      () => {
        setViewport(window.innerWidth);
      },
      typeof window !== 'undefined' ? window : undefined,
      { passive: true }
    )
  return (
    <>
      <div className={style.container}>
        <Content />
        <TopBtn />
      </div>
    </>
  );
}
