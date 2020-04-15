let cards = {
    level1: [
        {name: "Alleycat",
        attack: 1,
        defence: 1,
        ability: "Summon 1/1 Tabbycat",
        picture: 'url(../img/Cards/alleycat.png)',
        canSummon: true,
        hasShield: false,
        deathrattle: false,},
        
        {name: "Dragonspawn",
        attack: 2,
        defence: 3,
        ability: "Taunt",
        picture: 'url(../img/Cards/dragonspawn-lieutenant.png)',
        canSummon: false,
        hasShield: false,
        deathrattle: false,
        },

        {
        name: "Righteous Protector",
        attack: 1,
        defence: 1,
        ability: "Divine shield",
        picture: 'url(../img/Cards/righteuos-protector.png)',
        canSummon: false,
        hasShield: true,
        deathrattle: false,
        },

        {
        name: "Selfless hero",
        attack: 2,
        defence: 1,
        ability: "When killed, gives random friendly card Shield",
        picture: 'url(../img/Cards/selfless-hero.png)',
        deathrattle: true,
        canSummon: false,
        hasShield: false,
        },

    ],
    tokens: [
        {name: "Tobbycat",
        attack: 1,
        defence: 1,
        picture: 'url(../img/Tokens/tabbycat.png)',
        ability: ""},
        
        {name: "dust-devil",
        attack: 2,
        defence: 2,
        picture: 'url(https://i.imgur.com/9J9WXlB.png)',
        ability: ""},

        {name: "windswept-elemntal",
        attack: 4,
        defence: 4  ,
        picture: 'url(../img/Tokens/windswept-elemntal.png)',
        ability: ""},

        {name: "living-storm",
        attack: 8,
        defence: 8,
        picture: 'url(../img/Tokens/living-storm.png)',
        ability: ""},
    ]
}

export default cards