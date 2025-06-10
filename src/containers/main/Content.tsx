'use client'
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skills from '@/components/content/Skills';
import Titles from '@/components/content/Titles';
import About from '@/components/content/About';
import Certificates from '@/components/content/Certificates';
import Educations from '@/components/content/Educations';
import Projects from '@/components/content/Projects';
import Works from '@/components/content/Works';

export default function Content() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const updateActive = (idx: number) => {
      document.querySelectorAll('#sidebar li').forEach((ele, i) => {
        if (ele instanceof HTMLLIElement) {
          gsap.to(ele, { color: i === idx ? 'yellow' : 'white', duration: 0.5 })
        }
      })
    }

    const triggers = sectionRefs.current.map((section, idx) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
        onEnter: () => updateActive(idx),
        onEnterBack: () => updateActive(idx),
      })
    )

    return () => {
      triggers.forEach((trigger) => {
        trigger.kill()
      })
    }
  }, []);

  const sections = [
    { id: 'title', content: <Titles /> },
    { id: 'about', content: <About /> },
    { id: 'skill', content: <Skills /> },
    { id: 'work', content: <Works /> },
    { id: 'project', content: <Projects /> },
    { id: 'education', content: <Educations /> },
    { id: 'certificate', content: <Certificates /> }
  ];

  return (
    <>
    {
      sections.map((section, idx) => (
        <div className='min-h-screen relative flex flex-col items-center justify-start'
             id={section.id} key={idx} ref={(el) => {
          if (el) sectionRefs.current[idx] = el;
        }}>
          {section.content}
        </div>
      ))
    }
    </>
  )
}