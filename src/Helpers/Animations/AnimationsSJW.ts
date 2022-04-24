import gsap from "gsap";
export let cardScrolling = (
  toOpacity: number,
  fromOpacity: number,
  fromX: number,
  element: HTMLElement | null
) => {
  let tl = gsap.timeline({ defaults: { duration: 0.2, ease: "ease" } });
  tl.to(element, { opacity: toOpacity });
  tl.from(element, { x: fromX, opacity: fromOpacity });
};
