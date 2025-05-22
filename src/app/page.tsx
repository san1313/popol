'use client'
import style from '@/styles/page.module.css'
import { useEffect } from 'react';
import Content from '@/components/content';
import TopBtn from '@/components/topBtn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageDataStore } from '@/providers/PageDataProvider';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const { setViewport } = usePageDataStore((state) => state);

  useEffect(() => {
    setViewport(window.innerWidth);
    const resizeViewportWidth = () => {
      setViewport(window.innerWidth);
    }
    window.addEventListener('resize', resizeViewportWidth);

    return () => {
      window.removeEventListener('resize', resizeViewportWidth);
    }
  }, []);
  return (
    <>
      <div className={style.container}>
        <Content />
        <TopBtn />
      </div>
    </>
  );
}
