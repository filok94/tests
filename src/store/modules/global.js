const state = {
    user: '',
    email: '',
    isAuthed: false,
    banners: [{
        id: 1,
        img: '',
        title: 'SJW',
        subtitle: 'Тест о СЖВ героях нашего времени',
        route: 'QuestionNumber',
        questionId: '1'
    }, {
        id: 2,
        img: '',
        title: 'Политический',
        subtitle: 'Тест о самых честных людях земли',
        route: 'Politic',
        questionId: '1'
    }],
    imageStyles: [{
        name: 'avataaars',
        optionCollection: [{
                uri: 'top',
                alias: 'Волосы',
                collection: ["longHair", "shortHair", "eyepatch", "hat", "hijab", "turban", "bigHair", "bob", "bun", "curly", "curvy", "dreads", "frida", "fro", "froAndBand", "miaWallace", "longButNotTooLong", "shavedSides", "straight01", "straight02", "straightAndStrand", "dreads01", "dreads02", "frizzle", "shaggy", "shaggyMullet", "shortCurly", "shortFlat", "shortRound", "shortWaved", "sides", "theCaesar", "theCaesarAndSidePart", "winterHat01", "winterHat02", "winterHat03", "winterHat04"]
            },
            {
                uri: 'hairColor',
                alias: 'Цвет волос',
                collection: ["auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", "pastel", "pastelPink", "platinum", "red", "gray", "silverGray"]
            },
            {
                uri: 'facialHair',
                alias: 'Растительность на лице',
                collection: ["medium", "beardMedium", "light", "beardLight", "majestic", "beardMajestic", "fancy", "moustaceFancy", "magnum", "moustacheMagnum"]
            },
            {
                uri: 'skin',
                alias: 'Кожа',
                collection: ["tanned", "yellow", "pale", "light", "brown", "darkBrown", "black"]
            },
            {
                uri: 'mouth',
                alias: 'Рот',
                collection: ["concerned", "default", "disbelief", "eating", "grimace", "sad", "scream", "screamOpen", "serious", "smile", "tongue", "twinkle", "vomit"]
            },
            {
                uri: 'eyes',
                alias: 'Глаза',
                collection: ["close", "closed", "cry", "default", "dizzy", "xDizzy", "roll", "eyeRoll", "happy", "hearts", "side", "squint", "surprised", "wink", "winkWacky"]
            },
            {
                uri: 'clothes',
                alias: 'Одежда',
                collection: ["blazer", "blazerAndShirt", "blazerAndSweater", "sweater", "collarAndSweater", "shirt", "graphicShirt", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck", "hoodie", "overall"]
            }
        ]
    }, {
        name: 'big-ears',
        optionCollection: [{
                uri: 'hair',
                alias: 'Волосы',
                collection: ["long20", "long19", "long18", "long17", "long16", "long15", "long14", "long13", "long12", "long11", "long10", "long09", "long08", "long07", "long06", "long05", "long04", "long03", "long02", "long01", "short20", "short19", "short18", "short17", "short16", "short15", "short14", "short13", "short12", "short11", "short10", "short09", "short08", "short07", "short06", "short05", "short04", "short03", "short02", "short01"]
            },
            {
                uri: 'face',
                alias: 'Лицо',
                collection: ["variant10", "variant09", "variant08", "variant07", "variant06", "variant05", "variant04", "variant03", "variant02", "variant01"]
            },
            {
                uri: 'mouth',
                alias: 'Рот',
                collection: ["variant0708", "variant0707", "variant0706", "variant0705", "variant0704", "variant0703", "variant0702", "variant0701", "variant0405", "variant0605", "variant0604", "variant0603", "variant0602", "variant0601", "variant0505", "variant0504", "variant0503", "variant0502", "variant0501", "variant0404", "variant0403", "variant0402", "variant0401", "variant0305", "variant0304", "variant0303", "variant0302", "variant0301", "variant0205", "variant0204", "variant0203", "variant0202", "variant0201", "variant0105", "variant0104", "variant0103", "variant0102", "variant0101"]
            },
            {
                uri: 'ear',
                alias: 'Уши',
                collection: ["variant08", "variant07", "variant06", "variant05", "variant04", "variant03", "variant02", "variant01"]
            },
            {
                uri: 'frontHair',
                alias: 'Челка',
                collection: ["variant12", "variant11", "variant10", "variant09", "variant08", "variant07", "variant06", "variant05", "variant04", "variant03", "variant02", "variant01"]
            },
            {
                uri: 'hairColor',
                alias: 'Цвет волос',
                collection: ["variant10", "variant09", "variant08", "variant07", "variant06", "variant05", "variant04", "variant03", "variant02", "variant01"]
            },
            {
                uri: 'skinColor',
                alias: 'Кожа',
                collection: ["variant05", "variant04", "variant03", "variant02", "variant01"]
            }
        ]
    }, {
        name: 'big-smile',
        optionCollection: [{
                uri: 'hair',
                alias: 'Волосы',
                collection: ["shortHair", "mohawk", "wavyBob", "bowlCutHair", "curlyBob", "straightHair", "braids", "shavedHead", "bunHair", "froBun", "bangs", "halfShavedHead", "curlyShortHair"]
            },
            {
                uri: 'mouth',
                alias: 'Рот',
                collection: ["openedSmile", "unimpressed", "gapSmile", "openSad", "teethSmile", "awkwardSmile", "braces", "kawaii"]
            },
            {
                uri: 'eyes',
                alias: 'Глаза',
                collection: ["cheery", "normal", "confused", "starstruck", "winking", "sleepy", "sad", "angry"]
            },
            {
                uri: 'accessories',
                alias: 'Аксессуар',
                collection: ["catEars", "glasses", "sailormoonCrown", "clownNose", "sleepMask", "sunglasses", "faceMask", "mustache"]
            },
            {
                uri: 'skinColor',
                alias: 'Кожа',
                collection: ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08"]
            },
            {
                uri: 'hairColor',
                alias: 'Цвет волос',
                collection: ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08"]
            }
        ]
    }, {
        name: 'croodles',
        optionCollection: [{
                uri: 'face',
                alias: 'Лица',
                collection: ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08"]
            },
            {
                uri: 'nose',
                alias: 'Нос',
                collection: ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08", "variant09"]
            },
            {
                uri: 'beard',
                alias: 'Борода',
                collection: ["variant01", "variant02", "variant03", "variant04", "variant05"]
            },
            {
                uri: 'mouth',
                alias: 'Рот',
                collection: ["variant18", "variant17", "variant16", "variant15", "variant14", "variant13", "variant12", "variant11", "variant10", "variant09", "variant08", "variant07", "variant06", "variant05", "variant04", "variant03", "variant02", "variant01"]
            },
            {
                uri: 'top',
                alias: 'Волосы',
                collection: ["variant30", "variant29", "variant28", "variant27", "variant26", "variant25", "variant24", "variant23", "variant22", "variant21", "variant20", "variant19", "variant18", "variant17", "variant16", "variant15", "variant14", "variant13", "variant12", "variant11", "variant10", "variant09", "variant08", "variant07", "variant06", "variant05", "variant04", "variant03", "variant02", "variant01"]
            },
            {
                uri: 'mustache',
                alias: 'Усы',
                collection: ["variant01", "variant02", "variant03", "variant04"]
            },
            {
                uri: 'topColor',
                alias: 'Цвет волос',
                collection: ["yellow", "purple", "red", "blue", "green", "black"]
            }
        ]
    }, {
        name: 'micah',
        optionCollection: [{
                uri: 'mouth',
                alias: 'Рот',
                collection: ["surprised", "laughing", "nervous", "smile", "sad", "pucker", "frown", "smirk"]
            },
            {
                uri: 'hair',
                alias: 'Волосы',
                collection: ["fonze", "mrT", "dougFunny", "mrClean", "dannyPhantom", "full", "turban", "pixie"]
            },
            {
                uri: 'eyes',
                alias: 'Глаза',
                collection: ["eyes", "round", "eyesShadow", "smiling"]
            },
            {
                uri: 'nose',
                alias: 'Нос',
                collection: ["curve", "pointed", "tound"]
            },
            {
                uri: 'facialHair',
                alias: 'Растительность на лице',
                collection: ["beard", "scruff"]
            },
            {
                uri: 'baseColor',
                alias: 'Кожа',
                collection: ["apricot", "coast", "topaz", "lavender", "sky", "salmon", "canary", "calm", "azure", "seashell", "mellow", "black", "white"]
            },
            {
                uri: 'facialHairColor',
                alias: 'Цвет растительности на лице',
                collection: ["apricot", "azure", "black", "calm", "canary", "coast", "lavender", "mellow", "salmon", "seashell", "sky", "topaz", "white"]
            }
        ]
    }, {
        name: 'open-peeps',
        optionCollection: [{
                uri: 'head',
                alias: 'Голова',
                collection: ["afro", "bangs", "bangs2", "bantuKnots", "bear", "bun", "bun2", "buns", "cornrows", "cornrows2", "dreads1", "dreads2", "flatTop", "flatTopLong", "grayBun", "grayMedium", "grayShort", "hatBeanie", "hatHip", "hijab", "long", "longAfro", "longBangs", "longCurly", "medium1", "medium2", "medium3", "mediumBangs", "mediumBangs2", "mediumBangs3", "mediumStraight", "mohawk", "mohawk2", "noHair1", "noHair2", "noHair3", "pomp", "shaved1", "shaved2", "shaved3", "short1", "short2", "short3", "short4", "short5", "turban", "twists", "twists2"]
            },
            {
                uri: 'face',
                alias: 'Лица',
                collection: ["angryWithFang", "awe", "blank", "calm", "cheeky", "concerned", "concernedFear", "contempt", "cute", "cyclops", "driven", "eatingHappy", "explaining", "eyesClosed", "fear", "hectic", "lovingGrin1", "lovingGrin2", "monster", "old", "rage", "serious", "smile", "smileBig", "smileLOL", "smileTeethGap", "solemn", "suspicious", "tired", "veryAngry"]
            },
            {
                uri: 'facialHair',
                alias: 'Растительность на лице',
                collection: ["chin", "full", "full2", "full3", "full4", "goatee1", "goatee2", "moustache1", "moustache2", "moustache3", "moustache4", "moustache5", "moustache6", "moustache7", "moustache8", "moustache9"]
            },
            {
                uri: 'mask',
                alias: 'Маска',
                collection: ["medicalMask", "respirator"]
            },
            {
                uri: 'accessories',
                alias: 'Аксессуар',
                collection: ["eyepatch", "glasses", "glasses2", "glasses3", "glasses4", "glasses5", "sunglasses", "sunglasses2"]
            },
            {
                uri: 'skinColor',
                alias: 'Кожа',
                collection: ["variant01", "variant02", "variant03", "variant04", "variant05"]
            },
            {
                uri: 'hairColor',
                alias: 'Цвет волос',
                collection: ["variant01", "variant02", "variant03", "variant04", "variant05", "variant06", "variant07", "variant08", "variant09", "variant10"]
            }
        ]
    }],
    choosenOptions: [{
            uri: '',
            value: ''
        },
        {
            uri: '',
            value: ''
        },
        {
            uri: '',
            value: ''
        },
        {
            uri: '',
            value: ''
        },
        {
            uri: '',
            value: ''
        },
        {
            uri: '',
            value: ''
        },
        {
            uri: '',
            value: ''
        }
    ]
}

const mutations = {
    changeChoosenOptions(state, payload) {
        state.choosenOptions[payload[2]].uri = payload[0]
        state.choosenOptions[payload[2]].value = payload[1]
    },
    STATE_AUTH_CHECK(state, payload) {
        state.email = payload.email
        state.isAuthed = payload.isAuthed
    }
}

export default {
    state,
    mutations
}