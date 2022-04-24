import gsap from "gsap";

export let AnimationFlickeringOnText = (brokenLetter: HTMLElement | null) => {
  let flickerTimeLime = gsap.timeline({
    repeat: 0,
    defaults: { duration: 3, ease: "elastic" },
  });
  flickerTimeLime
    .set(brokenLetter, { color: "#005ef1" })
    .to(brokenLetter, {
      textShadow: "0 0 180px #005ef1",
      color: "#005ef1",
      duration: 0.2,
    })
    .to(brokenLetter, {
      textShadow: "0 0 0px #005ef1",
      color: "rgba(255, 255, 255, 0.5)",
      duration: 0.2,
    })
    .to(brokenLetter, {
      textShadow: "0 0 180px #005ef1",
      color: "#005ef1",
      duration: 0.8,
    })
    .to(brokenLetter, {
      textShadow: "0 0 180px #005ef1",
      color: "#005ef1",
      duration: 0.2,
    })
    .to(brokenLetter, {
      textShadow: "0 0 0px #005ef1",
      color: "rgba(255, 255, 255, 0.5)",
      duration: 0.8,
    });
  gsap.delayedCall(5, () => {
    gsap.to(brokenLetter, {
      rotation: 35,
      y: 10,
      ease: "bounce",
      duration: 1,
    });
  });
};
