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
        "image": "https://i.imgur.com/0bQzPZH.jpeg",
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
    },
    "concluded": {
        "title": "A Boss has been Felled",
        "color": "#FF88C5",
        "image": "https://i.imgur.com/aFC4ZSf.png"
    }
}

const getLQData = (description) => {
    let p = description.includes("vanquishing")
    let d = { data: p ? lqData["default"] : lqData["concluded"], ping: !p}
    if (!p){
        if (description.includes("Zyxxryth")) d:data = lqData["zyxxryth"]
        if (description.includes("Polyphemus")) d:data = lqData["polyphemus"]
        if (description.includes("Bauhdyre")) d:data = lqData["bauhdyre"]
        if (description.includes("Gauntlet")) d:data = lqData["gauntlet"]
        if (description.includes("gander")) d:data = lqData["gander"]
        if (description.includes("Entremitis")) d:data = lqData["entremitis"]
        if (description.includes("Henteko")) d:data = lqData["yinyang"]
    }
    return d
}

module.exports = {lqData, getLQData};