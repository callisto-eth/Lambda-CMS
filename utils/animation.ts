import gsap from 'gsap';

export const animatePageIn = () => {
  const templateDiv = document.getElementsByClassName('animateOnLogIn');

  if (templateDiv) {
    const pageTimeline = gsap.timeline();

    pageTimeline
      .set([templateDiv], {
        backdropFilter: 'blur(0px)',
      })
      .to([templateDiv], {
        backdropFilter: 'blur(100px)',
        opacity: '100',
        duration: 3,
      })
      .to([templateDiv], {
        opacity: '0',
        duration: 4,
      })
      .set([templateDiv], {
        display: 'none',
      });
  }
};

export const animatePageOut = () => {};
