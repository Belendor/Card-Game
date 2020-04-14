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
        this.addEvents()
    }

    generateCard(){
        if(this.cardLevel === 1){
            
            let radomCard = 0
            // Math.floor(Math.random()*4)
            let selectedCard = cards.level1[radomCard]
            this.attack = selectedCard.attack
            this.defence = selectedCard.defence
            this.canSummon = selectedCard.canSummon
            this.hasShield = selectedCard.hasShield
            this.deathrattle = selectedCard.deathrattle
   
        
            let HTML = `<div class="card player" id="Nr${this.game.cardIndex}" draggable="${this.dragable}">
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

            let HTML = `<div class="card token" id="Nr${this.game.cardIndex}" draggable="${this.dragable}">
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

    addEvents(){
        let cards = this.game.playerCardObjects

        let tokens = this.DOM.querySelectorAll(".card.token")
        let fields = this.DOM.querySelectorAll(".field")

        let dragedCard = ''
        for (let i = 0;i<cards.length;i++){
 
            let card = cards[i].HTML
            card.addEventListener("dragstart", ()=>{
                dragedCard = card
                setTimeout(function(){
                    card.classList.add("hidden")
                },0)
            })
            
            card.addEventListener("dragend", ()=>{
                setTimeout(()=>{
                    card.classList.remove("hidden")
                    // card.setAttribute("draggable", false)
                    dragedCard = ''
                },0)
            })

            for(let j = 0;j<fields.length; j++){
                let field = fields[j]
                field.addEventListener("dragover",function(e){
                    e.preventDefault()
                })
                field.addEventListener("dragenter", function(){

                })
                field.addEventListener("dragleave", function(){

                })
                field.addEventListener("drop",()=>{
                    try{
                    if(dragedCard.classList.contains("summonCat")){
                        if(field.classList.contains("player-field")){
                            
                            this.sumonCat()
                            
                            dragedCard.classList.remove("summonCat")
                        }
                    }
                    } catch(err){
                        console.log("nieko tokio. shhh.....")
                    }    
                  
                    field.append(dragedCard)
                })
            }     
        }
    }
    sumonCat(){
        if(this.canSummon)
        this.game.playerTokenObjects.push(new Card(1,1, this.DOM.querySelector('.player-field'), true, this.DOM, this.game,2))
    }
}

export default Card