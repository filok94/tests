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

export let useFlickeringOnText = (brokenLetter, textBcg) => {
    let flickerTimeLime = gsap.timeline({
        repeat: 0,
        defaults: { duration: 3, ease: "elastic" },
    });
    flickerTimeLime
        .set(brokenLetter, { color: "#005ef1" })
        .set(textBcg, { textShadow: "0 0 280px #005ef1" })
        .to(textBcg, { textShadow: "0 0 260px #005ef1" })
        .to(textBcg, { textShadow: "0 0 300px #6025c3" })
        .to(textBcg, { textShadow: "0 0 280px #6025c3" })
        .to(textBcg, { textShadow: "0 0 260px #005ef1" })
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