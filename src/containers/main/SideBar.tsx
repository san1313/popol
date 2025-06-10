"use client";
import ArrowBtn from "@/components/ArrowBtn";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import COMMON from "@/constants/common";
import { usePageDataStore } from "@/stores/PageDataStore";

export default function SideBar() {
  const {
    viewport,
    sidebarIsOpen,
    toggleSidebarIsOpen,
    setCurrentIndex
  } = usePageDataStore(state => state);
  const linkRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewport >= COMMON.MAX_VIEWPORT_MOBILE && tagRef.current && linkRef.current) {
      gsap.to([tagRef.current, linkRef.current], {
        opacity: 1,
        duration: 1.0,
        delay: 0.3,
        overwrite: "auto"
      });
    }
  }, [viewport]);

  const handleArrowClick = () => {
    arrowRef.current = !arrowRef.current;
    if (sidebarRef.current) {
      if (sidebarIsOpen) {
        gsap.to([sidebarRef.current], {
          xPercent: -100,
          x: "50px",
          ease: "sine.inOut",
          duration: 0.5,
        });
        gsap.to([tagRef.current, linkRef.current], { opacity: 0, duration: 0.4 });
        gsap.to([tagRef.current, linkRef.current],
          { visibility: "hidden", delay: 0.3 });
      } else {
        gsap.to([sidebarRef.current], {
          xPercent: 0,
          x: 0,
          ease: "sine.inOut",
          duration: 0.35,
        });
        gsap.to([tagRef.current, linkRef.current], { opacity: 1, duration: 0.5 });
        gsap.to([tagRef.current, linkRef.current], { visibility: "visible" });
      }
    }
    toggleSidebarIsOpen();
  };

  const fixAnchorEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const hash = (e.target as HTMLAnchorElement).hash;
    const targetSection = document.querySelector(hash);
    if (targetSection instanceof HTMLDivElement) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(Number(targetSection.dataset.idx));
    }
  };

  const index = [
    { id: "title", txt: "홈" },
    { id: "about", txt: "저는요" },
    { id: "skill", txt: "활용 기술" },
    { id: "work", txt: "경력" },
    { id: "project", txt: "프로젝트" },
    { id: "education", txt: "학력 및 교육" },
    { id: "certificate", txt: "자격증" }
  ];

  return (
    <>
    <div ref={sidebarRef}
         id="sidebar"
         className="w-screen md:w-[var(--sidebar-width)] h-[20vh] md:h-screen relative md:fixed md:top-0 md:float-left flex flex-col justify-center md:justify-between md:items-center bg-[#202224] text-white">
      {viewport <= COMMON.MAX_VIEWPORT_MOBILE
        ?
        <></>
        :
        <>
          <ArrowBtn onClick={handleArrowClick}></ArrowBtn>
          <div className="mt-[10vh] relative font-medium text-[2rem] md:text-3xl lg:text-[2rem]"
               ref={tagRef}>
            <ul>
              {index.map((item, idx) =>
                <li key={idx} className="py-[1vh]"><a href={`#${item.id}`} onClick={fixAnchorEvent}>{item.txt}</a></li>
              )}
            </ul>
          </div>
        </>
      }
      <div
        className="mb-0 md:mb-[10vh] relative flex justify-center flex-col font-black text-2xl md:opacity-0"
        ref={linkRef}>
        <a href={"mailto:skan143679@gmail.com"}
           className='w-full my-[1vh] text-center hover:text-white/70'><span
          className='block font-medium text-base text-center break-all'>skan134679@gmail.com</span></a>
        <a href={"https://github.com/san1313"}
           className='w-full my-[1vh] text-4xl text-center break-all hover:text-white/70'>Github</a>
      </div>
    </div>
  </>
  );
}