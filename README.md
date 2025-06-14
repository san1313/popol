# 개발자 배창우의 포트폴리오입니다.
***
## 목차
- [개요](#개요)
- [설명](#설명)
- [추후예정](#추후-예정)
***
## 개요
- 프로젝트명 : popol
- 개발 기간 : 2025.04.28 ~ 2025.05.02
- IDE : IntelliJ
- 사용 언어 : HTML, CSS, TypeScript
- 프레임워크 : Next.js
- 라이브러리 : React, zustand, React-Query, tailwindcss, gsap, font-awesome
- DB : MongoDB
- ORM : prisma
- 배포 및 CI/CD : Vercel
## 설명
***
포트폴리오를 작성하고, React 사용에 익숙해지기 위해 제작하게 되었습니다.  
- UI  
사용자의 피로감을 고려하여 전체적인 색감을 결정하고, 페이지를 넓게 사용하여 개방감과 깔끔함을 더하였습니다.  
####
- 애니메이션  
첫 화면 강조를 위해 애니메이션을 삽입하고, 단조로움을 줄이기 위해 각 섹션에 간단한 애니메이션을 추가하였습니다.  
####
- 사이드바  
사용자가 내용을 확인하기 편하도록 사이드바에 목차를 배치하고, 필요하지 않은 경우에는 접어두어 더 넓게 볼 수 있도록 하였습니다. 또한 PC 환경에서 스크롤 시 이전/다음 섹션으로 부드럽게 이동하여 자연스럽게 읽을 수 있도록 하였습니다.  
####
- 접근성  
반응형 웹으로 작성하여 모바일 및 태블릿 환경에서도 쾌적하게 내용을 확인할 수 있도록 하였습니다. 다크모드 환경 또한 고려하여 작성하였습니다.  
####
- 성능  
쾌적한 경험을 위해 프로젝트 모달의 이미지는 lazy loading방식을 택하고, 사용자 경험 향상을 위해 이미지를 미리 webp형식으로 변환하였습니다.
####
- 상태관리
  - Front : Zustand를 사용, 전역관리가 필요한 부분(viewport, 사이드바 상태 등)을 관리하여 props drilling을 막고, 불필요한 재렌더링을 줄였습니다.
  - Back : React-Query를 사용, 서버 API와 통신 후 데이터를 캐싱하여 1시간 간격으로 정적 페이지를 제공할 수 있도록 하였습니다.
####
## 추후 예정
***
- article 내용 DB에 저장 및 페이지 내에서 CRUD 가능하도록
- project 항목을 모달 기반에서 동적 컴포넌트로 수정