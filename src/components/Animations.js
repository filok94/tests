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

export let useGoAwayToLeft = (element, toX) => {
    gsap.to(element, { opacity: 0, x: -toX, ease: 'ease' })
}

export let useSetPosition = (element, pos) => {
    gsap.set(element, { x: pos, opacity: 0, delay: 0, duration: 0 })
}

export let useCardGoingAside = async (side, duration, element) => {
    let dividedDuration = duration / 1000
    switch (side) {
        case "right":
            let tlRight = gsap.timeline({ defaults: { duration: dividedDuration, ease: "power2.inOut" } })
            tlRight
                .to(element, { x: 30, y: 5, opacity: 0 })
                .to(element, { x: -30, y: 5, opacity: 0 })
                .to(element, { opacity: 1, x: 0, y: 0 })
                .set(element, { opacity: 1, x: 0, y: 0 })
            break
        case "left":
            let tlLeft = gsap.timeline({ defaults: { duration: dividedDuration, ease: "power2.inOut" } })
            tlLeft
                .to(element, { x: -30, y: 5, opacity: 0 })
                .to(element, { x: 30, y: 5, opacity: 0 })
                .to(element, { opacity: 1, x: 0, y: 0 })
                .set(element, { opacity: 1, x: 0, y: 0 })
            break
    }
}

export let useShakingElement = (element) => {
    let shakingTimeLine = gsap.timeline({ defaults: { duration: 0.1 } })
    shakingTimeLine
        .to(element, { x: 5 })
        .to(element, { x: -5 })
        .to(element, { x: 5 })
        .to(element, { x: -5 })
        .to(element, { x: 5 })
        .to(element, { x: -5 })
        .set(element, { x: 0 })
}