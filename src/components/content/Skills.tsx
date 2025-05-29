import style from '@/styles/content.module.css';
import CustomBadge from '@/components/CustomBadge';
import { GetStaticProps } from 'next';
import { SkillType } from '@/app/api/skills/route';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';

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
  const { data: skills, isLoading, error } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  })
  if (isLoading) return <p>로딩중...</p>;
  if (error instanceof Error) return <p>에러: {error.message}</p>;

  return (
      <article>
        <h1>활용 기술<hr /></h1>
        <div className={style.flexContainer} style={{ gap: '2rem' }}>
          {Object.entries(skills || {}).map(([category, skillList]) => (
            <div className={style.flexContainer} key={category}>
              <h2>{titles[category]}</h2>
              <span style={{ gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
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