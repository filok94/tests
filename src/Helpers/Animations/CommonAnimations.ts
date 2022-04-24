import gsap from "gsap";

type EASE = "ease" | "elastic" | "bounce" | "back" | "power4";
export class Animations {
  static fromTop = (fromY: number, element: HTMLElement | null) => {
    gsap.set(element, { y: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, y: -fromY, ease: "ease" });
  };

  static fromBottom = (fromY: number, element: HTMLElement | null) => {
    gsap.set(element, { y: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, y: fromY, ease: "ease" });
  };

  static fromLeft = (fromX: number, element: HTMLElement | null) => {
    gsap.set(element, { x: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, x: -fromX, ease: "ease" });
  };

  static fromRight = (fromX: number, element: HTMLElement | null) => {
    gsap.set(element, { x: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, x: fromX, ease: "ease" });
  };

  static fromTopRight = (
    fromX: number,
    fromY: number,
    element: HTMLElement | null
  ) => {
    gsap.set(element, { x: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, x: fromX, y: -fromY, ease: "ease" });
  };
  static fromTopLeft = (
    fromX: number,
    fromY: number,
    element: HTMLElement | null
  ) => {
    gsap.set(element, { x: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, x: -fromX, y: -fromY, ease: "ease" });
  };
  static fromBottomLeft = (
    fromX: number,
    fromY: number,
    element: HTMLElement | null
  ) => {
    gsap.set(element, { x: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, x: -fromX, y: fromY, ease: "ease" });
  };
  static fromBottomRight = (
    fromX: number,
    fromY: number,
    element: HTMLElement | null
  ) => {
    gsap.set(element, { x: 0, opacity: 1 });
    gsap.from(element, { opacity: 0, x: fromX, y: fromY, ease: "ease" });
  };

  static toRight = (toX: number, element: HTMLElement | null) => {
    gsap.to(element, { opacity: 0, x: toX, ease: "ease" });
  };

  static toLeft = (
    toX: number,
    element: HTMLElement | null,
    opacity: number = 0
  ) => {
    gsap.to(element, { opacity: opacity, x: -toX, ease: "ease" });
  };

  static toBottom = (toY: number, element: HTMLElement | null) => {
    gsap.to(element, { opacity: 0, y: toY, ease: "ease" });
    gsap.set(element, { y: 0 });
  };

  static setPosition = (pos: number, element: HTMLElement | null) => {
    gsap.set(element, { x: pos, opacity: 0, delay: 0, duration: 0 });
  };

  static setScaleToDefault = (element: HTMLElement | null) => {
    gsap.set(element, { scale: 1 });
  };

  static changeBorderAndScale = (
    border: string,
    scale: number,
    element: HTMLElement | null,
    ease: EASE
  ) => {
    gsap.to(element, { borderRadius: border, scale: scale, ease: ease });
  };

  static toOpacity = (opacity: number, element: HTMLElement | null) => {
    gsap.to(element, { opacity: opacity });
  };

  static fromToHorizontal = (
    fromX: number,
    toX: number,
    element: HTMLElement | null
  ) => {
    gsap.fromTo(element, { x: fromX, opacity: 1 }, { x: toX, opacity: 1 });
  };
}

export const GOING_ASIDE = {
  left: "left",
  right: "right",
} as const;

// eslint-disable-next-line no-redeclare
export type GOING_ASIDE = typeof GOING_ASIDE[keyof typeof GOING_ASIDE];

export let AnimationCardGoingAside = async (
  side: GOING_ASIDE,
  duration: number,
  element: HTMLElement | null
) => {
  let dividedDuration = duration / 1000;
  switch (side) {
    case GOING_ASIDE.right: {
      let tlRight = gsap.timeline({
        defaults: { duration: dividedDuration, ease: "power2.inOut" },
      });
      tlRight
        .to(element, { x: 30, y: 5, opacity: 0 })
        .to(element, { x: -30, y: 5, opacity: 0 })
        .to(element, { opacity: 1, x: 0, y: 0 })
        .set(element, { opacity: 1, x: 0, y: 0 });
      break;
    }
    case GOING_ASIDE.left: {
      let tlLeft = gsap.timeline({
        defaults: { duration: dividedDuration, ease: "power2.inOut" },
      });
      tlLeft
        .to(element, { x: -30, y: 5, opacity: 0 })
        .to(element, { x: 30, y: 5, opacity: 0 })
        .to(element, { opacity: 1, x: 0, y: 0 })
        .set(element, { opacity: 1, x: 0, y: 0 });
      break;
    }
  }
};

export let AnimationShakingElement = (element: HTMLElement | null) => {
  let shakingTimeLine = gsap.timeline({ defaults: { duration: 0.1 } });
  shakingTimeLine
    .to(element, { x: 5 })
    .to(element, { x: -5 })
    .to(element, { x: 5 })
    .to(element, { x: -5 })
    .to(element, { x: 5 })
    .to(element, { x: -5 })
    .set(element, { x: 0 });
};

export let circlesMovement = (
  circle: number,
  arrayOfCircles: never[] | HTMLElement[]
) => {
  let timeline = gsap.timeline({
    repeat: -1,
    delay: circle / 5,
    defaults: { duration: 0.3, ease: "circ" },
  });
  timeline
    .to(arrayOfCircles[circle], { x: -50, background: "#005ef1" })
    .to(arrayOfCircles[circle], { y: 50, background: "#6025c3" })
    .to(arrayOfCircles[circle], { x: 0, background: "#005ef1" })
    .to(arrayOfCircles[circle], { y: 0, background: "#6025c3" });
};

export let hoverEffectOnText = (element: HTMLElement | null, color: string) => {
  gsap.to(element, { color: color, ease: "back" });
};

export let hoverTransformScale = (
  element: HTMLElement | null,
  scalePercentage: number
) => {
  gsap.to(element, { scale: scalePercentage / 100, ease: "back" });
};
