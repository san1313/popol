'use client'
import { useState } from 'react';
import ProjectModal from './ProjectModal';
import styles from '@/styles/ProjectSection.module.css';
import { projectType } from '@/types/ProjectSection';

export default function ProjectSection({ pNo }: { pNo: number }) {
  const [selectedProject, setSelectedProject] = useState<projectType>({ deployment: '', environment: '', id: '', imgCount: 0, languages: '', libraries: '', period: '', roles: [], title: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = [[
    {
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
        "Toast UI Grid의 API 문서를 읽어보며 여러 기능을 접해보았습니다.",
        "사용자 입력 값의 예외처리를 많이 고려하며 작성했습니다.",
        "사용자의 입장에서 생각해보며 기능뿐만 아니라 여러 비주얼적인 처리가 필요함을 느꼈습니다."
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
        "저의 첫 프로젝트입니다.",
        "프로젝트 기간이 길지 않아서 디자인보다는 기능에 집중하기로 했습니다.",
        "게시판의 경우 관리자 페이지를 분리하지 않고 같은 페이지에서 동적으로 구성되도록 해보았습니다."
      ],
      imgCount: 6,
    }],
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
        "포트폴리오를 작성하는 겸 React를 조금 더 사용해 보기 위해 만들게 되었습니다.",
        "모바일 / 태블릿 환경에서의 쾌적한 경험을 위해 반응형 웹으로 작성하였습니다.",
        '"깔끔한 ppt느낌이 나도록 하면 디자인적으로 좋지 않을까?" 라는 생각으로 디자인 해보았습니다.',
        "프로젝트를 진행하며 적절한 컴포넌트 및 모듈의 사용에 대해 조금 더 생각해 볼 필요성을 느꼈습니다."
      ],
      imgCount: 3,
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
    <div className={styles.projectSection}>
      <div className={styles.projectList}>
        {projects[pNo].map((project) => (
          <div key={project.id} className={styles.projectCard} onClick={() => openModal(project)}>
            <h2
              className={styles.projectTitle}
            >
              ■ {project.title}
            </h2>

            <div className={styles.projectDetails}>
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