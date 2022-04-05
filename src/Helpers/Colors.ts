class Colors {
    testColors: any
    constructor(public primColors: string[], public mainColors: string[], public secondColors: string[]) {
        this.primColors = primColors
        this.mainColors = mainColors
        this.secondColors = { ...secondColors }
    }
}

export let blackColors = new Colors(
    [
        'hsla(236, 43%, 62%, 1)',
        'hsla(236, 57%, 68%, 1)',
        'hsla(236, 79%, 75%, 1)',
        'hsla(244, 100%, 83%, 1)',
        'hsla(239, 100%, 81%, 1)',
        'hsla(250, 100%, 84%, 1)'
    ],
    [
        'hsla(0, 8%, 16%)',
        'hsla(0, 8%, 16%, 0.8)',
        'hsla(0, 0%, 72%)',
        'hsla(240, 13%, 95%)'
    ],
    [
        'hsla(260, 97%, 85%, 1)',
        'hsla(271, 92%, 85%, 1)',
        'hsla(270, 91%, 86%, 1)',
        'hsla(271, 90%, 88%, 1)'
    ]
)


