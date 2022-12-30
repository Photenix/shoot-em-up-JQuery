import Collider from "./Collider.js";
import { getRandomInt } from "./tools.js";

let numAsteroidInScreen = 0

class Asteroid{
    constructor(){

        this.initPosX = $("#screen").width()
        //console.log( this.initPosX );
        this.posX = this.initPosX

        numAsteroidInScreen++

        //number of arteroid
        this.number = numAsteroidInScreen

        const asteroit = `<div class=\"asteroid\" id=ast_${numAsteroidInScreen} ></div>`


        $("#screen").append( asteroit )

        this.obj = $(`#ast_${numAsteroidInScreen}`)

        this.obj.css({
            left: this.posX,
            top: getRandomInt( $("#screen").height() - 50 ) + 100
        });

        this.colliderAsteroit = new Collider( this.obj )

        //console.log( this.number  );
    }

    //collider
    get c(){
        return this.colliderAsteroit.c
    }

    get num(){
        return this.number
    }

    get entity(){
        return this.obj.remove()
    }

    update(){
        this.posX -= 4

        if( this.posX <= 5 ){
            this.posX = this.initPosX
        }

        this.obj.css({
            left: this.posX,
        });

        this.colliderAsteroit.update()
    }
}


export default Asteroid