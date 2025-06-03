'use client'
import { useState } from 'react';
import ProjectModal from './ProjectModal';
import { projectType } from '@/types/ProjectSection';

export default function ProjectSection({ pNo }: { pNo: number }) {
  const [selectedProject, setSelectedProject] = useState<projectType>({ deployment: '', environment: '', id: '', imgCount: 0, languages: '', libraries: '', period: '', roles: [], title: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = [
    [{
      id: 'popol',
      title: '포트폴리오 페이지',
      href: "https://github.com/san1313/popol",
      period: "2025.04.28. ~ 2025.05.02.",
      environment: "Nextjs, React",
      languages: "TypeScript, HTML5, CSS",
      libraries: "FontAwesome, gsap",
      deployment: "Github, Vercel",
      comments: [
        "- 포트폴리오를 작성하는 겸 React를 조금 더 사용해 보기 위해 만들게 되었습니다.",
        "- 모바일 / 태블릿 환경에서의 쾌적한 경험을 위해 반응형 웹으로 작성하였습니다.",
        '- "깔끔한 ppt느낌이 나도록 하면 디자인적으로 좋지 않을까?" 라는 생각으로 디자인 해보았습니다.',
        "- 프로젝트를 진행하며 적절한 컴포넌트 및 모듈의 사용에 대해 조금 더 생각해 볼 필요성을 느꼈습니다.",
        "- 지금껏 HTML CSS는 단순하다고 생각했는데, 반응형이나 다크모드 등 변수가 많다는 것을 느꼈습니다."
      ],
      imgCount: 3,
    }],
    [{
      id: 'penservice',
      title: "PenService - 볼펜공장 MES 시스템",
      href: "https://github.com/san1313/PenService",
      period: "2023.04.19. ~ 2023.06.14.",
      environment: "SpringBoot, Oracle, AWS, Ubuntu, Maven, ThymeLeaf",
      languages: "Java, HTML5, CSS, JavaScript",
      libraries: "Spring Security, Lombok, MyBatis, jQuery, BootStrap, TUI Grid 등",
      deployment: "Docker, Jenkins, Github",
      roles: [
        "팀원 보조 및 모듈 통합 등 팀장으로서의 역할과 개발 계획 작성",
        "데이터 베이스 모델링, AWS를 활용한 Oracle 데이터베이스 구축",
        "MVC2 패턴을 활용한 개발환경 구축, GIT관리",
        "ThymeLeaf를 활용한 레이아웃 구성",
        "Spring Security를 활용한 접속 권한 관리, 공통 관리 기능 및 품질 관리 기능 작성"
      ],
      comments: [
        "- 처음에는 Toast UI Grid라는 라이브러리를 통해 단순히 Grid UI를 생성하고 데이터는 Ajax요청 후 수동으로 채워넣는 방식을 사용하였습니다. 이후 개인적으로 API 문서를 확인해보니 라이브러리 자체적으로 Ajax요청 및 데이터 수정 기능이 있다는 것을 확인하여 해당 기능을 사용해보기 위한 DTO와 대략적인 모듈을 작성하여 실제로 접목해보았습니다.",
        "- 사용자 입력 값의 예외처리를 많이 고려하며 작성했습니다.",
        "- 사용자의 입장에서 생각해보며 기능뿐만 아니라 여러 비주얼적인 처리가 필요함을 느꼈습니다."
      ],
      imgCount: 6,
    }],
    [{
      id: 'hotelInEarth',
      title: "Hotel-in-Earth - 숙소 예약 플랫폼",
      href: "https://github.com/san1313/Hotel-in-Earth",
      period: "2023.03.13. ~ 2023.03.24.",
      environment: "Oracle, Apache Tomcat, Servlet",
      languages: "Java, HTML5, CSS, JavaScript",
      libraries: "Lombok, MyBatis, Tiles, jQuery, BootStrap, Google Maps 등",
      deployment: "Docker, Jenkins, Github",
      roles: [
        "팀원 보조 및 모듈 통합 등 팀장으로서의 역할과 개발 계획 작성",
        "데이터 베이스 모델링, MVC 패턴을 활용한 개발환경 구축",
        "GIT관리, Oracle 데이터베이스와 ajax를 활용한 동적 웹 게시판 구축",
        "Tiles를 활용한 레이아웃 구성",
      ],
      comments: [
        "- 첫 프로젝트입니다.",
        "- 프로젝트 기간이 길지 않아, 디자인보다는 기능 구현에 집중하여 개발을 진행 했습니다.",
        "- 게시판의 경우 관리자 페이지를 분리하지 않고 게시글 내 답변 없을 시에는 게시글 삭제 및 수정 외 글쓰기 버튼을 활성화하고, 있을 시에는 답변 수정 및 삭제 버튼을 활성화 하는 등 같은 페이지 내에서 동적으로 메뉴가 구성되도록 했습니다.",
        "- ::after 가상요소를 사용하여 답변이 존재하는 게시글의 경우 답변완료 표시가 나타나도록 했습니다."
      ],
      imgCount: 6,
    }]
  ];

  const openModal = (project: projectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='py-4'>
      <div className='flex flex-col gap-6'>
        {projects[pNo].map((project) => (
          <div key={project.id}
               className='p-6 border border-[#e5e5e5] rounded-[8px] bg-[#FAF6F1] dark:bg-[#374c6d] shadow-[0_2px_5px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.5)] dark:inset-shadow-[0_1px_3px_rgba(255,255,255,0.15)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.8)] transition-shadow duration-300 ease-linear cursor-pointer'
               onClick={() => openModal(project)}>
            <h2
              className='mb-3 text-4xl font-bold text-[#3182ce] inline-block'
            >
              ■ {project.title}
            </h2>

            <div className='mt-2 flex flex-col gap-4 text-xl font-medium'>
              <p>개발 기간: {project.period}</p>
              <p>개발 환경: {project.environment}</p>
              <p>사용 언어: {project.languages}</p>
              <p>사용 라이브러리: {project.libraries}</p>
              <p>배포: {project.deployment}</p>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
        imgCount={selectedProject?.imgCount}
      />
    </div>
  );
}