import Collider from "./Collider.js"
import { pxToNum } from "./tools.js"

let numBulletInScreen = 0

//velocity bullet
const vBullet = 5

class Bull {
    constructor(){

        this.entity = $("#player")

        numBulletInScreen += 1

        //number of bulelt
        this.number = numBulletInScreen

        this.limitLive = 100

        const bull = `<div class=\"bullet\" id=bull_${numBulletInScreen} ></div>`

        this.cord = `${this.entity.css("top")} ${this.entity.css("left")}`
        this.cord = pxToNum( this.cord )

        this.sizePlayer = `${$("#player").css("width")} ${$("#player").css("height")}`

        this.sizePlayer = pxToNum( this.sizePlayer )

        //console.log( x, y );
        //console.log( e );

        if( $(`#bull_${numBulletInScreen}`).length >= 1 ){
            for (let i = 0; i < $(`#bull_${numBulletInScreen}`).length; i++) {
                $(`#bull_${numBulletInScreen}`)[i].remove()
            }
        }

        $("#room").append( bull )

        const [ y, x ] = this.cord

        this.obj = $(`#bull_${numBulletInScreen}`)

        this.obj.css({
            left: x - 15,
            top: y - ( this.sizePlayer[0] / 2 ) - 60
        });

        this.colliderBullet = new Collider( this.obj )
    }

    get live(){
        return this.limitLive
    }

    get num(){
        return this.number
    }

    //collider
    get c(){
        return this.colliderBullet.c
    }

    died() {
        this.obj.remove()
        numBulletInScreen--
    }

    position(){
        let newCord = `${this.obj.css("top")} ${this.obj.css("left")}`
        newCord = pxToNum( newCord )
        this.cord = newCord
    }


    //continue the ball trayectori
    update(){

        let [ y, x ] = this.cord

        x += vBullet

        this.obj.css({
            left: x
        });
        this.position()


        this.limitLive -= 1


        this.colliderBullet.update()
    }
}

export default Bull