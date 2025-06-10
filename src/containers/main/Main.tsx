'use client'
import { usePageDataStore } from '@/stores/PageDataStore';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import COMMON from '@/constants/common';
import { useEventListener } from '@/hooks/useEventListener';

export default function Main({ children }: { children: React.ReactNode }) {
  const { sidebarIsOpen, viewport } = usePageDataStore((state) => state);
  const { setViewport } = usePageDataStore((state) => state);
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
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

  useEffect(() => {
    if (viewport > COMMON.MAX_VIEWPORT_MOBILE) {
      const computedMargin = window.getComputedStyle(mainRef.current!).marginLeft;
      gsap.fromTo(mainRef.current,
        { marginLeft: computedMargin },
        {
          marginLeft: sidebarIsOpen
            ? 'var(--sidebar-width)'
            : 'var(--sidebar-width-closed)',
          duration: 0.4,
          ease: 'sine.inOut',
        })
    } else if (mainRef.current) {
      mainRef.current.style = '';
      mainRef.current.className = '';
    }
  }, [sidebarIsOpen, viewport]);

  return (
    <>
      <main ref={mainRef} className={'ml-[var(--sidebar-width)]'}>
        {children}
      </main>
    </>
  )
}