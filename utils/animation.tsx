import gsap from 'gsap';

export const animatePageIn = (onComplete: VoidFunction, innerContent: Node) => {
  const templateDiv = document.getElementsByClassName('animateModal');
  templateDiv[0].appendChild(innerContent);

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
      })
      .to([templateDiv], {
        opacity: '0',
        duration: 1,
      })
      .set([templateDiv], {
        display: 'none',
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

export const animateCreateEventContentIn = (className: string) => {
  const contentDiv = document.getElementsByClassName(className);

  if (contentDiv) {
    const contentTimeline = gsap.timeline();

    contentTimeline
      .set([contentDiv], {
        opacity: '0',
      })
      .to([contentDiv], {
        opacity: '100',
        duration: 1,
      })
      .set([contentDiv], {
        opacity: '100',
      });
  }
};
