// data for individual Live Quests for the bot to
// format cooler messages

const lqData = {
    "zyxxryth": {
        "title": "Zander's Spaceship - Zyxxryth",
        "color": "#4F116F",
        "image": "https://i.imgur.com/KSaQM9Z.jpeg",
    },
    "yinyang": {
        "title": "Henteko - Yin & Yang",
        "color": "#AC47FF",
        "image": "https://i.imgur.com/Df0NryW.jpeg",
    },
    "bauhdyre": {
        "title": "Mount Ire - Bauhdyre",
        "color": "#FF4800",
        "image": "https://i.imgur.com/VI0p8lQ.jpeg",
    },
    "entremitis": {
        "title": "Fields of Valor - Entremitis",
        "color": "#43D9C0",
        "image": "blob:https://imgur.com/343816d9-f183-4cb3-ad7f-207b0dcda3d6",
    },
    "gander": {
        "title": "Khaytsi Farms - Mad Gander",
        "color": "#FFA200",
        "image": "https://i.imgur.com/3YzxM6H.jpeg",        
    },
    "polyphemus": {
        "title": "Desecrated Temple - Polyphemus",
        "color": "#FFFFFF",
        "image": "https://i.imgur.com/yRfvtlW.jpeg",
    },
    "gauntlet": {
        "title": "The Gauntlet",
        "color": "#A90400",
        "image": "https://i.imgur.com/YxoZYAh.jpeg",
    },
    "default": {
        "title": "Automated Live Quest",
        "color": "#8FAFAF",
        "image": "https://i.pinimg.com/550x/65/e3/4b/65e34b409feb6d86376b9de87e4c08c3.jpg",
    }
}

const getLQData = (description) => {
    if (description.includes("Zyxxryth")) return lqData["zyxxryth"]
    if (description.includes("Polyphemus")) return lqData["polyphemus"]
    if (description.includes("Bauhdyre")) return lqData["bauhdyre"]
    if (description.includes("Gauntlet")) return lqData["gauntlet"]
    if (description.includes("gander")) return lqData["gander"]
    if (description.includes("Entremitis")) return lqData["entremitis"]
    if (description.includes("Henteko")) return lqData["yinyang"]
    return lqData["default"]
}

module.exports = {lqData, getLQData};