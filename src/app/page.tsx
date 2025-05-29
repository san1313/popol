'use client'
import style from '@/styles/page.module.css'
import TopBtn from '@/components/topBtn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Content from '@/containers/main/Content';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  return (
      <ReactQueryProvider>
          <div className={style.container}>
            <Content />
            <TopBtn />
          </div>
      </ReactQueryProvider>
  );
}
