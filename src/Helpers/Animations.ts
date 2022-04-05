import gsap from "gsap"

export class Appearances {

    static fromTop = (fromY: number, element: Element | null) => {
        gsap.set(element, { y: 0, opacity: 1 })
        gsap.from(element, { opacity: 0, y: -fromY, ease: 'ease' })
    }

    static fromBottom = (fromY: number, element: Element | null) => {
        gsap.set(element, { y: 0, opacity: 1 })
        gsap.from(element, { opacity: 0, y: fromY, ease: 'ease' })
    }

    static fromLeft = (fromX: number, element: Element | null) => {
        gsap.set(element, { x: 0, opacity: 1 })
        gsap.from(element, { opacity: 0, x: -fromX, ease: 'ease' })
    }

    static fromRight = (fromX: number, element: Element | null) => {
        gsap.set(element, { x: 0, opacity: 1 })
        gsap.from(element, { opacity: 0, x: fromX, ease: 'ease' })
    }

    static toRight = (toX: number, element: Element | null) => {
        gsap.to(element, { opacity: 0, x: toX, ease: 'ease' })
    }

    static toLeft = (toX: number, element: Element | null) => {
        gsap.to(element, { opacity: 0, x: -toX, ease: 'ease' })
    }

    static toBottom = (toY: number, element: Element | null) => {
        gsap.to(element, { opacity: 0, y: toY, ease: 'ease' })
        gsap.set(element, { y: 0 })
    }

    static setPosition = (pos: number, element: Element | null) => {
        gsap.set(element, { x: pos, opacity: 0, delay: 0, duration: 0 })
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

export let circlesMovement = (circle: number, arrayOfCircles: never[] | Element[]) => {
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

export let hoverEffectOnText = (element: Element | null, color: string) => {
    gsap.to(element, { color: color, ease: 'back' })
}

export let hoverTransformScale = (element: Element | null, scalePercentage: number) => {
    gsap.to(element, { scale: scalePercentage / 100, ease: 'back' })
}