import gsap from 'gsap';

export const animatePageIn = (onComplete: VoidFunction) => {
  const templateDiv = document.getElementsByClassName('animateOnLogIn');

  if (templateDiv) {
    const pageTimeline = gsap.timeline({ onComplete: onComplete });

    pageTimeline
      .set([templateDiv], {
        backdropFilter: 'blur(0px)',
        zIndex: '50',
      })
      .to([templateDiv], {
        backdropFilter: 'blur(100px)',
        opacity: '100',
        duration: 3,
      });
  }
};

export const animatePageOut = () => {};

export const animateCreateEventContentOut = (className: string) => {
  const contentDiv = document.getElementsByClassName(className);

  if (contentDiv) {
    const contentTimeline = gsap.timeline();

    contentTimeline
      .to([contentDiv], {
        opacity: '0',
        duration: 1,
      })
      .set([contentDiv], {
        display: 'none',
      });
  }
};
