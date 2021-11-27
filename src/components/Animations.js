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