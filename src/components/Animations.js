import gsap from "gsap"

export let useAppearenceFromTop = (element, fromY) => {
    gsap.set(element, { y: 0, opacity: 1 })
    gsap.from(element, { opacity: 0, y: -fromY, ease: 'ease' })
}

export let useAppearenceFromBottom = (element, fromY) => {
    gsap.set(element, { y: 0, opacity: 1 })
    gsap.from(element, { opacity: 0, y: fromY, ease: 'ease' })
}

export let useAppearenceFromLeft = (element, fromX) => {
    gsap.set(element, { x: 0, opacity: 1 })
    gsap.from(element, { opacity: 0, x: -fromX, ease: 'ease' })
}

export let useAppearenceFromRight = (element, fromX) => {
    gsap.set(element, { x: 0, opacity: 1 })
    gsap.from(element, { opacity: 0, x: fromX, ease: 'ease' })
}

export let useGoAwayToRight = (element, toX) => {
    gsap.to(element, { opacity: 0, x: toX, ease: 'ease' })
}

export let useSetPosition = (element, pos) => {
    gsap.set(element, { x: pos, opacity: 0, delay: 0, duration: 0 })
}