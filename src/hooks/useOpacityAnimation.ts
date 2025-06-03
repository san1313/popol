import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useOpacityAnimation(targetElement: HTMLElement | null | (HTMLElement | null)[]) {
  const gsapContext = useRef<gsap.Context>(null);

  useEffect(() => {
    if (targetElement === null) return;

    gsapContext.current = gsap.context(() => {
      const applyOpacity = (element: HTMLElement) => {
        gsap.fromTo(element,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.5,
            delay: 0.3,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'top 30%',
            }
          })
      }
      if (Array.isArray(targetElement)) {
        targetElement.forEach(el => {
          if (el instanceof HTMLElement) {
            applyOpacity(el);
          }
        })
      } else {
        applyOpacity(targetElement);
      }
    })

    return () => {
      gsapContext.current?.revert();
    }
  }, [targetElement]);
}