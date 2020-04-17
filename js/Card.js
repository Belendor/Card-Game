import cards from "./data.js"

class Card{
    constructor(attack, defence, target, dragable, DOM, game, cardLevel){
        this.attack = attack
        this.defence = defence
        this.target = target
        this.dragable = dragable
        this.cardLevel = cardLevel;
        this.game = game;
        this.DOM = DOM;
        this.index = 0;
        this.HTML = null
        this.canSummon = false
        this.hasShield = false
        this.deathrattle = false
        this.battleCryReduced = false
        this.generateCard()
        this.clickEvent()
    }
    generateCard(){
        if(this.cardLevel === 1){
            
            let radomCard = Math.floor(Math.random()*4)
            let selectedCard = cards.level1[radomCard]
            this.attack = selectedCard.attack
            this.defence = selectedCard.defence
            this.canSummon = selectedCard.canSummon
            this.hasShield = selectedCard.hasShield
            this.deathrattle = selectedCard.deathrattle
   
        
            let HTML = `<div class="card player" style="background-image: ${selectedCard.pictureAlt}; background-size: cover; " class="card player" id="Nr${this.game.cardIndex}" draggable="${this.dragable}">
            <div class="card-description">${selectedCard.ability}</div>
            <div class="card-footer">
                <div class="stat-box attack">${selectedCard.attack}</div>
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
            if(this.deathrattle){
                this.HTML.classList.add("deathrattle", "addShield")
            } 
            if(this.canSummon){
                this.HTML.classList.add("summonCat")
            }
            
            this.game.playerCardObjects.push(this)
        }else{
            let tokenNr = this.cardLevel - 11
            let selectedToken = cards.tokens[tokenNr]

            let HTML = `<div style="background-image: ${selectedToken.pictureAlt}; background-size: cover;" class="card token" id="Nr${this.game.cardIndex}" draggable="${this.dragable}">
            <div class="card-footer">
                <div class="stat-box attack">${this.attack}</div>
                <div class="stat-box defence">${this.defence}</div>
            </div>
            </div>`
            this.target.insertAdjacentHTML("beforeend", HTML )

            let id = "#Nr" + this.game.cardIndex
            
            this.HTML = this.target.querySelector(id)
            
            this.game.playerCardObjects.push(this)
            this.game.cardIndex++
        } 
    }
    clickEvent(){
        this.HTML.addEventListener("mousedown", ()=> { this.addEvents()} )
    }

    addEvents(){
        console.log("events added", this.HTML, this.game.mana);
        
        let playerHand = document.querySelector('.field.player-hand')
        let playerField = document.querySelector('.player-field')
        let dragedCard = ""
        this.HTML.addEventListener("dragstart", ()=>{
            setTimeout(()=>{
                console.log(this.HTML);
                dragedCard = this.HTML
                this.HTML.classList.add("hidden")
            },0)
        })
        this.HTML.addEventListener("dragend", ()=>{
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
        })
        playerField.addEventListener("dragleave", function(){
        })
        playerField.addEventListener("drop",(e)=>{
  
            if(this.HTML.classList.contains("summonCat")){
                dragedCard.classList.remove("summonCat")
                    
                this.sumonCat()
                return playerField.append(dragedCard)
            }
             
            playerField.append(dragedCard)
        })
    }
    sumonCat(){
        if(this.canSummon)
        setTimeout(()=>{
            this.game.playerTokenObjects.push(new Card(1,1, this.DOM.querySelector('.player-field'), true, this.DOM, this.game,11))
        }, 0)
    }   
}

export default Card