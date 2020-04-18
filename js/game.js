import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const chooseField = GAME.querySelector(".choose-card")

const lostScreen = document.querySelector(".lost-screen")

const chooseCardScreen = document.querySelector(".choose-card")
const cardSelectText = document.querySelector(".choose-one")
const turnCounter = document.querySelector(".turn-counter")
// ******Coose card slots*******
const slot1 = document.querySelector(".slot.first")
const slot2 = document.querySelector(".slot.second")
const slot3 = document.querySelector(".slot.third")
const slot4 = document.querySelector(".slot.fourth")
// ******Changable HTML elements*******
const mana = document.querySelector(".mana")
// ******Buttons*******
// const toggleShop = GAME.querySelector(".end-select")
const battle = document.querySelector(".start-battle")
const generateCard = document.querySelector(".generate-card")



class Game{
    constructor(level,playerCount){
        this.level = level
        this.playerCount = playerCount
        this.playerTurn = true
        this.mana = null
        this.playerCards = null
        this.enemyCards = null
        this.playerCardObjects = []
        this.playerTokenObjects = []
        this.enemyCardObjects = []
        this.cardIndex = 0
        this.battleCry = 0
        this.cardIndexToAttack = 0
        this.levelCeck()
        this.eventListeners()
    }
    cardsLeftToChoose(){
        setTimeout(()=>{
            if(this.level === 1){
                if(chooseCardScreen.querySelectorAll(".card").length == 3){
                    chooseCardScreen.classList.add("hidden")
                }
            }
            if(this.level === 2){
                if(chooseCardScreen.querySelectorAll(".card").length == 2){
                    chooseCardScreen.classList.add("hidden")
                }
            }
            if(this.level === 3){
                if(chooseCardScreen.querySelectorAll(".card").length == 1){
                    chooseCardScreen.classList.add("hidden")
                }
            }
            if(this.level === 4){
                if(chooseCardScreen.querySelectorAll(".card").length == 0){
                    chooseCardScreen.classList.add("hidden")
                }
            }
        },10)
    }

    eventListeners(){
        console.log("button events added");
        
        // generateCard.addEventListener("click",()=>{
        //     this.createPlayerCard()
        // })
        
        battle.addEventListener("click", ()=>{
            if(this.playerTurn){
                this.playerTurn = false
                this.levelCeck()
            }else{
                this.battle()
            }
        })
        lostScreen.addEventListener("click", ()=>{
            location.reload()
        })
    }

    levelCeck(){  
        if(document.querySelector(".choose-card").classList.contains("hidden")){
            document.querySelector(".choose-card").classList.remove("hidden")
        }
        if(this.playerCount === 1){
            this.createEnemyCard(this.level)
            this.setMana(this.level)
            this.createPlayerCard()
            this.cardIndexToAttack = 0
            battle.innerText = "Battle"
        }
        if(this.playerCount === 2){
            if(this.playerTurn){
                battle.innerText = "End Turn"
                cardSelectText.innerText = "First Player Select yor Card"
                turnCounter.innerText = `Turn: ${this.level}`
                this.setMana(this.level)
                this.createPlayerCard(true)
                this.cardIndexToAttack = 0
            }else{
                cardSelectText.innerText = "Second Player Select yor Card"
                turnCounter.innerText = `Turn: ${this.level}`
                this.setMana(this.level)
                this.createPlayerCard(false)
                this.cardIndexToAttack = 0
                battle.innerText = "Battle"
            }
        }
    }

    setMana(num){
        this.mana = num;
    }

    createPlayerCard(playerTurn){
        console.log("setting cards for first player", playerTurn);
        console.log(this, playerTurn);
       
        if(playerTurn){
            slot1.innerHTML = ""
            slot2.innerHTML = ""
            slot3.innerHTML = ""
            slot4.innerHTML = ""
            console.log("Generating card1");
            new Card(1,3, slot1, true, GAME, this, 1, true)
            console.log("Generating card2");
            new Card(1,3, slot2, true, GAME, this, 1, true)
            console.log("Generating card3");
            new Card(1,3, slot3, true, GAME, this, 1, true)
            console.log("Generating card4");
            new Card(1,3, slot4, true, GAME, this, 1, true)
        }else{
            slot1.innerHTML = ""
            slot2.innerHTML = ""
            slot3.innerHTML = ""
            slot4.innerHTML = ""
            new Card(1,3, slot1, true, GAME, this, 1, false)
            new Card(1,3, slot2, true, GAME, this, 1, false)
            new Card(1,3, slot3, true, GAME, this, 1, false)
            new Card(1,3, slot4, true, GAME, this, 1, false)
        }

        // if(this.mana>0){
        //     new Card(1,3, playerHand, true, GAME, this, 1)
        //     this.mana--
        //     mana.innerHTML = `Gold: <span style="color: #DAA520; font-size: 30px;">${this.mana}</span>`
        // }else{
        //     generateCard.innerHTML = `Not enough GOLD!`
        //     setTimeout(function(){
        //         generateCard.innerText = "Generate card"
        //     },1000)
        // }
    }

    createEnemyCard(number){
        if(number == 1){
            this.enemyCardObjects.push(new Card(2,2,enemyField, false, GAME, this, 12))
        }
        if(number == 2){
            this.enemyCardObjects.push(new Card(4,4,enemyField, false, GAME, this, 13))
        }
        if(number == 3){
            this.enemyCardObjects.push(new Card(4,4,enemyField, false, GAME, this, 13))
            this.enemyCardObjects.push(new Card(4,4,enemyField, false, GAME, this, 13))
        }
        if(number == 4){
            this.enemyCardObjects.push(new Card(8,8,enemyField, false, GAME, this, 14))
            this.enemyCardObjects.push(new Card(8,8,enemyField, false, GAME, this, 14))
            this.enemyCardObjects.push(new Card(2,2,enemyField, false, GAME, this, 12))
        }
        if(number == 5){
            this.enemyCardObjects.push(new Card(10,10,enemyField, false, GAME, this, 11))
        }
        if(number == 6){
            this.enemyCardObjects.push(new Card(12,12,enemyField, false, GAME, this, 11))
        }
        
    }

    battle(){
        let playerBattlefield = []
        let enemyBattlefield = []
        this.playerCards = playerField.querySelectorAll(".card")
        this.enemyCards = enemyField.querySelectorAll(".card")

        // Player Field to array****************
       for(let i =0;i<this.playerCards.length;i++){
        playerBattlefield.push([this.playerCards[i].querySelector(".attack").innerText, this.playerCards[i].querySelector(".defence").innerText])

            if(this.playerCards[i].classList.contains("shield")){
                playerBattlefield[i].push(1)
            }
       }
        // ************************************
        // Enemy Field to array****************   
       for(let i=0;i<this.enemyCards.length;i++){
        enemyBattlefield.push([this.enemyCards[i].querySelector(".attack").innerText, this.enemyCards[i].querySelector(".defence").innerText])

            if(this.enemyCards[i].classList.contains("shield")){
                enemyBattlefield[i].push(1)
            }
       }
        // ************************************
        let randomEnemy = Math.floor(Math.random()*enemyBattlefield.length)

        // ********Shield**********************
        this.ckeckForShield(playerBattlefield[this.cardIndexToAttack], enemyBattlefield[randomEnemy], this.playerCards[this.cardIndexToAttack])
        this.ckeckForShield(enemyBattlefield[randomEnemy], playerBattlefield[this.cardIndexToAttack], this.enemyCards[randomEnemy])
        // ************************************

        playerBattlefield[this.cardIndexToAttack][1] = playerBattlefield[this.cardIndexToAttack][1] - enemyBattlefield[randomEnemy][0]
        enemyBattlefield[randomEnemy][1] = enemyBattlefield[randomEnemy][1] - playerBattlefield[this.cardIndexToAttack][0]
        this.playerCards[this.cardIndexToAttack].classList.add("animation")
       
        if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText != playerBattlefield[this.cardIndexToAttack][1]){
            this.playerCards[this.cardIndexToAttack].querySelector(".defence.stat-box").classList.add("red-text")
        }
        this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText = playerBattlefield[this.cardIndexToAttack][1]
        
        
        if(this.enemyCards[randomEnemy].querySelector(".defence").innerText != enemyBattlefield[randomEnemy][1]){
            this.enemyCards[randomEnemy].querySelector(".defence.stat-box").classList.add("red-text")
        }
        this.enemyCards[randomEnemy].querySelector(".defence").innerText = enemyBattlefield[randomEnemy][1]


        this.enemyCards[randomEnemy].classList.add("hit-animation")
        
         //    ********Deathrattle*************
        this.checkDeathrattle(this.playerCards[this.cardIndexToAttack], this.cardIndexToAttack, playerField, this.playerCards)
        this.checkDeathrattle(this.enemyCards[randomEnemy], randomEnemy, enemyField, this.enemyCards)
        //    *********************************
        this.checkWhoWon(playerField, enemyField)

       setTimeout(()=>{
        if(this.enemyCards[randomEnemy].classList.contains("hit-animation")){
            this.enemyCards[randomEnemy].classList.remove("hit-animation")
        }
        
        if(this.playerCards[this.cardIndexToAttack].classList.contains("animation")){
            this.playerCards[this.cardIndexToAttack].classList.remove("animation")
        }
        
       
        if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText <= 0){
            this.playerCards[this.cardIndexToAttack].remove()
            if(this.cardIndexToAttack == playerField.querySelectorAll(".card").length && this.cardIndexToAttack > 0){
                this.cardIndexToAttack = 0
            }
        }else{
            if(playerField.querySelectorAll(".card").length > 0){
                if(playerField.querySelectorAll(".card").length-1 <= this.cardIndexToAttack){
                    this.cardIndexToAttack = 0
                }else{
                    this.cardIndexToAttack++
                }
            }
        }

        if(this.enemyCards[randomEnemy].querySelector(".defence").innerText <= 0){
            this.enemyCards[randomEnemy].remove()
        }
        this.checkLost()
        if(enemyField.querySelectorAll(".card").length == 0 || playerField.querySelectorAll(".card").length == 0 ){
            this.level++
            this.playerTurn = true
            this.levelCeck()
        }else if (enemyField.querySelectorAll(".card").length !== 0 && playerField.querySelectorAll(".card").length !== 0)(
            this.battle()
        )
        },1500)
    }
    checkWhoWon(playerField, enemyField){
        console.log("checking who won");
        let friendlyAliveCards = []
        let enemyAliveCards = []
        let allFriendlyCards = playerField.querySelectorAll(".card")
        let allEnemyCards = enemyField.querySelectorAll(".card")
        for(let i = 0;i<allFriendlyCards.length;i++){
            if(allFriendlyCards[i].querySelector(".defence").innerText >0){
                friendlyAliveCards.push(i)
            }
        }
        for(let i = 0;i<allEnemyCards.length;i++){
            if(allEnemyCards[i].querySelector(".defence").innerText >0){
                enemyAliveCards.push(i)
            }
        }

        if(friendlyAliveCards.length == 0 && enemyAliveCards.length > 0){
            console.log("enemy won");

            let likusiosKortos = enemyAliveCards.length
            let HealthHTML = document.querySelector(".player-health")
            for(let i=0; i<likusiosKortos;i++){
                let cardAttack = allEnemyCards[enemyAliveCards[i]].querySelector(".attack").innerText
                console.log(cardAttack, "tiek dmg turi gaut")
                HealthHTML.innerText = parseInt(HealthHTML.innerText,10) - parseInt(cardAttack,10)
                HealthHTML.classList.add("red-text")
            }
        }

        if(friendlyAliveCards.length > 0 && enemyAliveCards.length == 0){
            console.log("player won");

            let likusiosKortos = friendlyAliveCards.length
            let HealthHTML = document.querySelector(".enemy-health")
            for(let i=0; i<likusiosKortos;i++){

                console.log(allFriendlyCards[friendlyAliveCards[i]], "index kortos kurios reikia imt dmg");
                console.log(allFriendlyCards[friendlyAliveCards[i]].querySelector(".attack").innerText, "kortos attack reioksme");
                
                let cardAttack = allFriendlyCards[friendlyAliveCards[i]].querySelector(".attack").innerText
                console.log(cardAttack, "tiek dmg turi gaut")
                HealthHTML.innerText = parseInt(HealthHTML.innerText,10) - parseInt(cardAttack,10)
                HealthHTML.classList.add("red-text")
            }
        }
    }

    ckeckForShield(cardInArr, randomEnemyArr, checkedCard){
        if( cardInArr[2] === 1){
            cardInArr[1] = parseInt(cardInArr[1],10) + parseInt(randomEnemyArr[0],10)
            checkedCard.classList.remove("shield")
            cardInArr[2] = 0
        }
    }
    addShield(ilgis, indexas, zaidejas){
        let randomindex = Math.floor(Math.random()*ilgis)
        if(randomindex != indexas){
            zaidejas[randomindex].classList.add("shield")
        }else{
            this.addShield(ilgis, indexas, zaidejas) 
        }
    }
    checkDeathrattle(checkedCard, checkedCardIndex, checkedCardField, checkedFieldCards){
        if( checkedCard.querySelector(".defence").innerText <=0 &&
            checkedCard.classList.contains("deathrattle") && 
            checkedCard.classList.contains("addShield")){
            if(checkedCardField.querySelectorAll(".card").length > 1){
                this.addShield(checkedCardField.querySelectorAll(".card").length, checkedCardIndex, checkedFieldCards)
            }
        }
    }
    checkLost(){

    let playerHealth = document.querySelector(".player-health").innerText
    let enemyHealth = document.querySelector(".enemy-health").innerText
        
    if( playerHealth <=0 || enemyHealth<=0 ){
            let textField = lostScreen.querySelector(".defeat-text")
            lostScreen.classList.remove("hidden")
            if(playerHealth<=0){
                textField.innerText = `Second player WON!`
            }
            if(enemyHealth<=0){
                textField.innerText = `First player WON!`
            }
            
        } 
        
    }
}

let newGame = new Game(1,2)

