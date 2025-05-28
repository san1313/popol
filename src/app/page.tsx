'use client'
import style from '@/styles/page.module.css'
import TopBtn from '@/components/topBtn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Content from '@/containers/main/Content';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  return (
    <>
      <div className={style.container}>
        <Content />
        <TopBtn />
      </div>
    </>
  );
}
