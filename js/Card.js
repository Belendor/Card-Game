import cards from "./data.js"

class Card{
    constructor(attack, defence, target, dragable, DOM, game, cardLevel, playerTurn){
        this.attack = attack
        this.defence = defence
        this.target = target
        this.dragable = dragable
        this.cardLevel = cardLevel;
        this.playerTurn = playerTurn
        this.game = game;
        this.DOM = DOM;
        this.index = 0;
        this.HTML = null
        this.canSummon = false
        this.hasShield = false
        this.deathrattle = false
        this.battleCryReduced = false
        this.tount = false
        this.deal1DmgAll = false
        this.gives1a1d = false
        this.addShield = false
        this.generateCard()
        this.clickEvent()

    }

    generateCard(){
        let radomCard = 0 
        //  Math.floor(Math.random()*6)
        let selectedCard = cards.level1[radomCard]

        if(this.cardLevel === 0){selectedCard = cards.level0[0]}
            
           
            this.attack = selectedCard.attack
            this.defence = selectedCard.defence
            this.canSummon = selectedCard.canSummon
            this.hasShield = selectedCard.hasShield
            this.deathrattle = selectedCard.deathrattle
            this.taunt = selectedCard.taunt
            this.deal1DmgAll = selectedCard.deal1DmgAll
            this.gives1a1d = selectedCard.gives1a1d
            this.addShield = selectedCard.addShield

            let klasesName = ""
            if(this.playerTurn){
                klasesName = "player"
            }else{
                klasesName = "enemy"
            }
   
        
            let HTML = `<div class=" card ${klasesName}" style="background-image: ${selectedCard.pictureAlt}; background-size: cover; " class="card player" id="Nr${this.game.cardIndex}" draggable="${this.dragable}">
            <div class="card-description">${selectedCard.ability}</div>
            <div class="card-footer">
                <div class="stat-box attack player">${selectedCard.attack}</div>
                <div class="class-box"></div>
                <div class="stat-box defence">${selectedCard.defence}</div>
            </div>
            </div>`
            this.game.cardIndex++
            

            this.target.insertAdjacentHTML("beforeend", HTML )

            let id = "#Nr"+ (this.game.cardIndex - 1)
        
            this.HTML = this.target.querySelector(id)

            
            if(this.hasShield){
                this.HTML.classList.add("shield")
            }
            if(this.taunt){
                this.HTML.querySelector(".card-description").classList.add("taunt")
            }
            if(this.deathrattle){
                this.HTML.classList.add("deathrattle")
            } 
            if(this.addShield){
                this.HTML.classList.add("addShield")
            } 
            if(this.canSummon){
                this.HTML.classList.add("summonCat")
            }
            if( this.deal1DmgAll){
                this.HTML.classList.add("deal1DmgAll")
            }
            if(  this.gives1a1d ){
                this.HTML.classList.add("gives1a1d")
            }

            this.game.playerCardObjects.push(this)
    }
    clickEvent(){
        this.HTML.addEventListener("mousedown", ()=> { this.addEvents()} )
    }

    addEvents(){

        if(this.playerTurn){
            let playerField = document.querySelector('.player-field')
            let playerHand = document.querySelector('.field.player-hand')
            let numberOfCardsInBattlefield = playerField.querySelectorAll(".card").length
            let dragedCard = ""
            this.HTML.addEventListener("dragstart", ()=>{
                setTimeout(()=>{
                    dragedCard = this.HTML
                    this.HTML.classList.add("hidden")
                },0)
                
                if(this.HTML.classList.contains("player") && this.HTML.classList.contains("card")){
                    playerHand.classList.add("green-field")
                    if(document.querySelector(".choose-card").classList.contains("hidden")){
                        playerField.classList.add("green-field")
                    }
                }
            })

            this.HTML.addEventListener("dragend", ()=>{
                if(this.HTML.classList.contains("player") && this.HTML.classList.contains("card")){
                    playerHand.classList.remove("green-field")
                    playerField.classList.remove("green-field")
                }
                setTimeout(()=>{
                    this.HTML.classList.remove("hidden")
                    dragedCard = ""
                },0)
            })
    
            playerHand.addEventListener("dragover",(e)=>{
                e.preventDefault()
                if(this.HTML.classList.contains("player") && this.HTML.classList.contains("card")){
                    if(playerHand.classList.contains("green-field")){
                        playerHand.classList.remove("green-field")
                    }
                }
            })
            playerHand.addEventListener("dragenter", function(){
            })
            playerHand.addEventListener("dragleave", function(){
            })
            playerHand.addEventListener("drop",(e)=>{
                this.game.cardsLeftToChoose()
                playerHand.append(dragedCard)
            })
            
                if(document.querySelector(".choose-card").classList.contains("hidden")){
                    playerField.addEventListener("dragover",function(e){
                        e.preventDefault()
                        playerField.classList.remove("green-field")
                    })
                    playerField.addEventListener("dragenter", function(){
                    })
                    playerField.addEventListener("dragleave", function(){
                    })
                    playerField.addEventListener("drop",(e)=>{
                        if(numberOfCardsInBattlefield <=5){
                        if(this.HTML.classList.contains("summonCat")){
                            dragedCard.classList.remove("summonCat")
                                
                            this.sumonCat()
                            return playerField.append(dragedCard)
                        }
                         
                        playerField.append(dragedCard)
                        }
                    })
                }
            
        }else{
            let playerHand = document.querySelector('.field.player-hand')
            let playerField = document.querySelector('.enemy-field')
            let numberOfCardsInBattlefield = playerField.querySelectorAll(".card").length
            let dragedCard = ""

            this.HTML.addEventListener("dragstart", ()=>{
                setTimeout(()=>{
                    dragedCard = this.HTML
                    this.HTML.classList.add("hidden")
                },0)

                if(this.HTML.classList.contains("enemy") && this.HTML.classList.contains("card")){
                    playerHand.classList.add("green-field")
                    if(document.querySelector(".choose-card").classList.contains("hidden")){
                        playerField.classList.add("green-field")
                    }
                }
            })
            this.HTML.addEventListener("dragend", ()=>{

                playerHand.classList.remove("green-field")
                setTimeout(()=>{
                    this.HTML.classList.remove("hidden")
                    dragedCard = ""
                },0)
            })
    
            playerHand.addEventListener("dragover",function(e){
                e.preventDefault()   
            })
            playerHand.addEventListener("dragenter", function(){
               
            })
            playerHand.addEventListener("dragleave", function(){
            })
            playerHand.addEventListener("drop",(e)=>{
                this.game.cardsLeftToChoose()
                playerHand.append(dragedCard)
            })
     
                playerField.addEventListener("dragover",function(e){
                    e.preventDefault()
                })
                playerField.addEventListener("dragenter", function(){
                    playerField.classList.remove("green-field")
                })
                playerField.addEventListener("dragleave", function(){
                })
                playerField.addEventListener("drop",(e)=>{
                if(numberOfCardsInBattlefield <=2){

                    if(this.HTML.classList.contains("summonCat")){
                        dragedCard.classList.remove("summonCat")
                            
                        this.sumonCat()
                        return playerField.append(dragedCard)
                    }
                        
                    playerField.append(dragedCard)
                    }
                })
        }
    }
    sumonCat(){
        if(this.canSummon){   
            if(this.game.playerTurn){
                if(this.DOM.querySelector('.player-field').querySelectorAll(".card").length < 5){
                    setTimeout(()=>{
                        new Card(1,1, this.DOM.querySelector('.player-field'), true, this.GAME, this.game, 0,true)
                    }, 0)
                }
            }else{
                if(this.DOM.querySelector('.enemy-field').querySelectorAll(".card").length < 5){
                    setTimeout(()=>{
                        new Card(1,1, this.DOM.querySelector('.enemy-field'), true, this.GAME, this.game, 0,false)
                    }, 0)
                }
            }
        }
    }   
}

export default Card