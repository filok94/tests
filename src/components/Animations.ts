import gsap from "gsap"

export class Appearances {
    element: Element | null
    constructor(element: Element | null) {
        this.element = element
    }

    fromTop = (fromY: number) => {
        gsap.set(this.element, { y: 0, opacity: 1 })
        gsap.from(this.element, { opacity: 0, y: -fromY, ease: 'ease' })
    }

    fromBottom = (fromY: number) => {
        gsap.set(this.element, { y: 0, opacity: 1 })
        gsap.from(this.element, { opacity: 0, y: fromY, ease: 'ease' })
    }

    fromLeft = (fromX: number) => {
        gsap.set(this.element, { x: 0, opacity: 1 })
        gsap.from(this.element, { opacity: 0, x: -fromX, ease: 'ease' })
    }

    fromRight = (fromX: number) => {
        gsap.set(this.element, { x: 0, opacity: 1 })
        gsap.from(this.element, { opacity: 0, x: fromX, ease: 'ease' })
    }

    toRight = (toX: number) => {
        gsap.to(this.element, { opacity: 0, x: toX, ease: 'ease' })
    }

    toLeft = (toX: number) => {
        gsap.to(this.element, { opacity: 0, x: -toX, ease: 'ease' })
    }

    setPosition = (pos: number) => {
        gsap.set(this.element, { x: pos, opacity: 0, delay: 0, duration: 0 })
    }
}

export enum GoingAsideType {
    left = "left",
    right = 'right'
}
export let useCardGoingAside = async (side: GoingAsideType, duration: number, element: Element | null) => {
    let dividedDuration = duration / 1000
    switch (side) {
        case GoingAsideType.right:
            let tlRight = gsap.timeline({ defaults: { duration: dividedDuration, ease: "power2.inOut" } })
            tlRight
                .to(element, { x: 30, y: 5, opacity: 0 })
                .to(element, { x: -30, y: 5, opacity: 0 })
                .to(element, { opacity: 1, x: 0, y: 0 })
                .set(element, { opacity: 1, x: 0, y: 0 })
            break
        case GoingAsideType.left:
            let tlLeft = gsap.timeline({ defaults: { duration: dividedDuration, ease: "power2.inOut" } })
            tlLeft
                .to(element, { x: -30, y: 5, opacity: 0 })
                .to(element, { x: 30, y: 5, opacity: 0 })
                .to(element, { opacity: 1, x: 0, y: 0 })
                .set(element, { opacity: 1, x: 0, y: 0 })
            break
    }
}

export let useShakingElement = (element: Element | null) => {
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

export let useFlickeringOnText = (brokenLetter: Element | null) => {
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
    })
}