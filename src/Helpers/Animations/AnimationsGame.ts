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

export let cardFadingWithText = (el: HTMLElement | null) => {
  let tl = gsap.timeline({ defaults: { ease: "ease", duration: 0.3 } });
  tl.to(el, { color: "transparent", zIndex: -2 })
    .to(
      el,
      {
        opacity: 0,
        y: -50,
      },
      "<25%"
    )
    .set(el, { y: 0 });
};
