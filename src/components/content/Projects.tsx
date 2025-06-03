import ProjectSection from '@/components/content/ProjectSection';
import { useRef } from 'react';
import useOpacityAnimation from '@/hooks/useOpacityAnimation';

export default function Projects() {
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  const projects = [0, 1, 2];
  useOpacityAnimation(articleRefs.current);
  return projects.map((project, idx) => {
    if (idx % 2 === 0) {
      return (
        <article className='w-4/5 min-h-screen flex flex-col' ref={(el) => {
          if (el) articleRefs.current[idx] = el;
        }} key={idx}>
          <h1 className='py-4 mt-4 md:mt-8 text-4xl md:text-7xl font-black'>프로젝트<hr
            className='mb-2 mt-1 md:mb-4' /></h1>
          <div className='pb-[5vh] flex flex-col grow justify-start gap-4'>
            <div className='flex flex-col gap-4 justify-start grow'>
              <ProjectSection pNo={projects[idx]} />
            </div>
            {projects[idx + 1] && <div className='flex flex-col gap-4 justify-start grow'>
              <ProjectSection pNo={projects[idx + 1]} />
            </div>}
          </div>
        </article>
      )
    }
    return null;
  }).filter(Boolean);
}