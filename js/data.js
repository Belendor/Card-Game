let cards = {
    level1: [
        {name: "Alleycat",
        attack: 1,
        defence: 1,
        ability: "Summon 1/1 Tabbycat",
        picture: 'url(https://i.imgur.com/NA6dbE6.png)',
        pictureAlt: "url(../Card-Game/img/alleycat.png)",
        canSummon: true,
        hasShield: false,
        deathrattle: false,},

        {name: "Dragonspawn",
        attack: 2,
        defence: 3,
        ability: "Taunt",
        picture: 'url(https://i.imgur.com/FKnXZNQ.png)',
        pictureAlt: "url(../Card-Game/img/dragonspawn-lieutenant.png)",
        canSummon: false,
        hasShield: false,
        deathrattle: false,
        },
        {
        name: "Righteous Protector",
        attack: 1,
        defence: 1,
        ability: "Divine shield",
        picture: 'url(https://i.imgur.com/2EUdR4x.png)',
        pictureAlt: "url(../Card-Game/img/righteuos-protector.png)",
        canSummon: false,
        hasShield: true,
        deathrattle: false,
        },

        {
        name: "Selfless hero",
        attack: 2,
        defence: 1,
        ability: "When killed, gives random friendly card Shield",
        picture: 'url(https://i.imgur.com/4Q23Z9J.png)',
        pictureAlt: "url(../Card-Game/img/selfless-hero.png)",
        deathrattle: true,
        canSummon: false,
        hasShield: false,
        },

    ],
    tokens: [
        {name: "Tobbycat",
        attack: 1,
        defence: 1,
        picture: 'url(https://i.imgur.com/VlqJyBw.png)',
        pictureAlt: "url(../Card-Game/img/tabbycat.png)",
        ability: ""},
        
        {name: "dust-devil",
        attack: 2,
        defence: 2,
        picture: 'url(https://i.imgur.com/9J9WXlB.png)',
        pictureAlt: "url(../Card-Game/img/dust-devil.png)",
        ability: ""},

        {name: "windswept-elemntal",
        attack: 4,
        defence: 4  ,
        picture: 'url(https://i.imgur.com/LbY8DzV.png)',
        pictureAlt: "url(../Card-Game/img/windswept-elemntal.png)",
        ability: ""},

        {name: "living-storm",
        attack: 8,
        defence: 8,
        picture: 'url(https://i.imgur.com/FNjZ9gP.png)',
        pictureAlt: "url(../Card-Game/img/living-storm.png)",
        ability: ""},
    ]
}

export default cards