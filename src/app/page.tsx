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
        <Content viewport={viewport} sidebarIsOpen={sidebarIsOpen} sidebarWidth={sidebarWidth}></Content>
        <TopBtn/>
        <SideBar viewport={viewport} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen}></SideBar>
      </div>
    </>
  );
}
