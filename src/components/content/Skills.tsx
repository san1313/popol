import CustomBadge from '@/components/CustomBadge';
import { GetStaticProps } from 'next';
import { SkillType } from '@/app/api/skills/route';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import { useRef } from 'react';
import useOpacityAnimation from '@/hooks/useOpacityAnimation';

const titles: Record<string, string> = {
  backend: '백엔드',
  frontend: '프론트엔드',
  others: '기타',
};

const fetchSkills = async (): Promise<Record<string, SkillType[]>> => {
  const res = await fetch('/api/skills');
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600,
  };
};

export default function Skills() {
  const articleRef = useRef<HTMLElement>(null);
  useOpacityAnimation(articleRef.current);

  const { data: skills, isLoading, error } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  })
  if (isLoading) return <p>로딩중...</p>;
  if (error instanceof Error) return <p>에러: {error.message}</p>;

  return (
      <article className='w-4/5 min-h-screen flex flex-col' ref={articleRef}>
        <h1 className='py-4 mt-4 md:mt-8 text-4xl md:text-7xl font-black'>활용 기술<hr className='mb-2 mt-1 md:mb-4' /></h1>
        <div className='pb-[5vh] flex flex-col grow justify-start gap-8'>
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div className='pb-[5vh] flex flex-col grow justify-start gap-4' key={category}>
              <h2 className='text-[1.7rem] md:text-3xl font-bold'>{titles[category]}</h2>
              <span className='mt-2 flex flex-col flex-wrap gap-1.5 md:flex-row items-baseline md:justify-start' style={{ gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {skillList.map((skill) => (
                  <CustomBadge
                    key={skill.id}
                    name={skill.name}
                    colorCode={skill.colorCode}
                    logoColor="white"
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
      </article>
  );
}