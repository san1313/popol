'use client'
import TopBtn from '@/components/topBtn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Content from '@/containers/main/Content';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { useThrottleFn } from '@/hooks/useThrottleFn';
import { useEffect, WheelEvent } from 'react';
import { useEventListener } from '@/hooks/useEventListener';
import { usePageDataStore } from '@/stores/PageDataStore';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  const {currentIndex, incrementCurrentIndex, decrementCurrentIndex} = usePageDataStore((state) => state);

  const handleWheel = useThrottleFn((event) => {
    const wheelEvent = event as WheelEvent;
    const sections = document.querySelectorAll('article');
    if (wheelEvent.deltaY > 0 && currentIndex < sections.length - 1) {
      incrementCurrentIndex();
    } else if (wheelEvent.deltaY < 0 && currentIndex > 0) {
      decrementCurrentIndex();
    }
  }, 200)

  useEventListener('wheel',
    handleWheel,
    typeof window !== 'undefined' ? window : null,
    { passive: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: currentIndex * window.innerHeight,
    })
  }, [currentIndex]);

  return (
      <ReactQueryProvider>
          <div className='flex flex-col'>
            <Content />
          </div>
          <TopBtn />
      </ReactQueryProvider>
  );
}
