class Card{
    constructor(attack, defence, target, DOM){
        this.DOM = DOM;
        this.target = target
        this.attack = attack
        this.defence = defence
        this.HTML = null
        this.generateCard()
        this.addEvents()
    }
    generateCard(){
        this.HTML = `<div class="card" draggable="true">
                        <div class="card-footer">
                            <div class="stat-box atack">${this.attack}</div>
                            <div class="stat-box defence">${this.defence}</div>
                        </div>
                    </div>`
        this.target.insertAdjacentHTML("beforeend", this.HTML )
    }
    addEvents(){
        let cards = this.DOM.querySelectorAll(".card")
        let fields = this.DOM.querySelectorAll(".field")
        let dragedCard = null
        for (let i = 0;i<cards.length;i++){
            let card = cards[i]
            card.addEventListener("dragstart", function(e){
                dragedCard = e.target
                console.log("dragstart")

                setTimeout(function(){
                    card.classList.add("hidden")
                },0)
            })
            card.addEventListener("dragend", function(e){
                setTimeout(function(){
                    card.classList.remove("hidden")
                },0)
                console.log("dragend")
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
                field.addEventListener("drop",function(){
                    console.log("drop")
                    this.append(dragedCard)
                })
            }   
        }
    }   
}

export default Card