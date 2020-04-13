let cards = {
    level1: [
        {name: "Alleycat",
        attack: 1,
        defence: 1,
        ability: "Summon 1/1",
        canSummon: true,
        hasShield: false,
        deathrattle: false,},
        
        {name: "Dragonspawn",
        attack: 2,
        defence: 3,
        ability: "Taunt",
        canSummon: false,
        hasShield: false,
        deathrattle: false,
        },

        {
        name: "Righteous Protector",
        attack: 1,
        defence: 1,
        ability: "Divine shield",
        canSummon: false,
        hasShield: true,
        deathrattle: false,
        },

        {
        name: "Selfless hero",
        attack: 2,
        defence: 1,
        ability: "Gives Shield to next Card when dead",
        deathrattle: true,
        canSummon: false,
        hasShield: false,
        },

    ],
    tokens: [
        {name: "cat",
        attack: 1,
        defence: 1,
        ability: "Token"}
    ]
}

export default cards