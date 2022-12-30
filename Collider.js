const TEST = $(".eye")


/**
 * built whit a id $("#this")
 * you can collide 2 entity to make something
 */
class Collider{
    constructor( entity = TEST, isPlayer = false ){

        this.entity = entity
        this.isPlayer = isPlayer

        this.collider = {
            //size
            w : this.entity.width(),
            h : this.entity.height(),

            //position
            posY : this.entity.position().top,
            posX : this.entity.position().left,
        }

        //console.log( this.collider );
    }

    //collider
    get c () {
        return this.collider
    }

    actualPosition(){
        this.collider.posY = this.entity.position().top
        this.collider.posX = this.entity.position().left
    }

    /**
     * return Number if the objetive had inpacted
     * @param { Array[ Objet ] } othersEntity 
    */

    reaction ( othersEntity ){

        let dead = NaN

        const objet = this.collider

        // e => entity
        othersEntity.forEach( (e, i) => {

            const posY = e.c.posY + 80
            const posX = e.c.posX + e.c.w

            if( this.isPlayer ){
                objet.posY += 160
                objet.posX += 40
            }
            
            if( posX >= objet.posX 
                && e.c.posX <= objet.posX + objet.w
                && posY + e.c.h >= objet.posY
                && posY <= objet.posY + objet.h){
                    //console.log(e.num);
                    dead = e.num
            }
        });

        return dead
    }

    update(){
        this.actualPosition()
    }
}

export default Collider