import gsap from "gsap";

export let detailMoveFromAside = (imageElement: HTMLElement | null) => {
  let tl = gsap.timeline({ defaults: { duration: 3, ease: "none" } });
  tl.from(imageElement, { x: 500, rotate: 180, ease: "ease" }).to(
    imageElement,
    {
      rotate: "-=60",
      duration: 7,
    }
  );
};

export let detailRotating = (imageElement: HTMLElement | null) => {
  gsap.to(imageElement, { rotate: "-=60", ease: "none", duration: 10 });
};
