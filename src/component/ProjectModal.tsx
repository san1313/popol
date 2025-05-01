'use client'
import { useState, useEffect, useMemo, useRef } from 'react';
import styles from '@/styles/ProjectModal.module.css';
import { projectType } from '@/types/ProjectSection';
import gsap from 'gsap';
import SvgImages from '@/component/SvgImages';
import Image from 'next/image';

export default function ProjectModal({ isOpen, onClose, project, imgCount = 0 }: {
  isOpen: boolean;
  onClose: () => void;
  project: projectType;
  imgCount: number;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const projectImages = useMemo(() => {
    const imagesArr = [];
    for (let i = 1; i <= imgCount; i++) {
      imagesArr.push(`/images/projects/${project.id}/${i}.webp`);
    }
    return imagesArr;
  }, [imgCount, project.id]);

  useEffect(() => {
    if (isOpen) {
      projectImages.forEach((imageSrc) => {
        const img = new window.Image();
        img.src = imageSrc;
      })
    }
  }, [isOpen, projectImages]);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      );
    }

    const handleEsc = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === 'Escape') onClose();
    };

    const disableScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('touchmove', disableScroll, { passive: false });
      document.addEventListener('wheel', disableScroll, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('touchmove', disableScroll);
      document.removeEventListener('wheel', disableScroll);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.modalOverlay} ref={modalRef}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{project.title}</h2>
          <div className={styles.buttons}>
            {project.href
              ? <a href={project.href} target={"_blank"}><SvgImages name={'github'}
                                                                    style={{ width: '32px' }} /></a>
              : <></>
            }
            <button
              onClick={onClose}
              className={styles.closeButton}
            >
            ✕
          </button>
          </div>
        </div>

        <div className={styles.sliderContainer}>
          <Image
            src={projectImages[currentImageIndex]}
            alt={`${project.title} 스크린샷 ${currentImageIndex + 1}`}
            className={styles.sliderImage}
            fill
            unoptimized
          />

          <button
            onClick={prevImage}
            className={`${styles.navButton} ${styles.prevButton}`}
          >
            &#10094;
          </button>

          <button
            onClick={nextImage}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            &#10095;
          </button>

          <div className={styles.indicators}>
            {projectImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`${styles.indicator} ${
                  index === currentImageIndex ? styles.activeIndicator : ''
                }`}
              />
            ))}
          </div>
        </div>

        <div className={styles.projectInfo}>
          {
            project.roles
            ?
            <div>
              <h3 className={styles.sectionTitle}>역할</h3>
              <ul className={styles.rolesList}>
                {project.roles && project.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
            : <></>
          }
          {
            project.comments
            ?
            <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>코멘트</h3>
            <div className={styles.comment}>
              <div>
                <ul>
                  {
                    project.comments.map((comment, index) => (
                      <li key={index} className={styles.commentList}>{comment}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
            : <></>
          }
        </div>
      </div>
    </div>
  );
}