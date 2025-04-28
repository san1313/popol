'use client'
import SideBar from '@/component/SideBar';
import style from '@/styles/page.module.css'
import { useState } from 'react';
import Content from '@/component/content';
import TopBtn from '@/component/topBtn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [sidebarWidth] = useState({opened: '15vw', closed: '50px'});
  return (
    <>
      <div className={style.container}>
        <SideBar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen}></SideBar>
        <Content sidebarIsOpen={sidebarIsOpen} sidebarWidth={sidebarWidth}></Content>
        <TopBtn/>
      </div>
    </>
  );
}
