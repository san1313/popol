'use client'
import SideBar from '@/component/SideBar';
import style from '@/styles/page.module.css'
import { useEffect, useState } from 'react';
import Content from '@/component/content';
import TopBtn from '@/component/topBtn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import COMMON from '@/constants/common';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [sidebarWidth] = useState({opened: '15vw', closed: '50px'});
  const [viewport, setViewport] = useState(COMMON.DEFAULT_VIEWPORT);
  const [currentIndex, setCurrentIndex] = useState(0);
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
        <Content currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} viewport={viewport} sidebarIsOpen={sidebarIsOpen} sidebarWidth={sidebarWidth}></Content>
        <TopBtn/>
        <SideBar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} viewport={viewport} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen}></SideBar>
      </div>
    </>
  );
}
