import Asteroid from "./Asteroid.js"
import Bull from "./Bull.js"
import Collider from "./Collider.js"
import { getRandomInt, pxToNum } from "./tools.js"


let listBullet = []
let listAsteroid = []

let time = 0
let point = 0

let start = true


const setPoint = () =>{
    $("#points").text( `Puntaje : ${point}` )
}

const deadPlayer = () =>{
    const ast = $(".asteroid")
    const blt = $(".bullet")
    //console.log( ast );
    for (let i = ast.length - 1; i >=  0; i--) {
        ast[i].remove();
    }
    for (let i = blt.length - 1; i >=  0; i--) {
        blt[i].remove();
    }

    listBullet = []
    listAsteroid = []
    point = 0
    $("#points").text( `Puntaje : ${point}` )
}



$(document).ready( () =>{

    //console.log($("#screen").width() );
    listAsteroid.push( new Asteroid() )
    setPoint()

    const player = $("#player")
    const collidetPlayer = new Collider(player, true)

    const mScreen = pxToNum( $("#room").css("margin") )
    
    let gameLoop = setInterval(
        ()=>{
            if( start ){
                listBullet.forEach( (e, i) => {
                    if( e.live > 0 ) e.update()
                    else {
                        e.died()
                        listBullet.shift()
                    }
                });
    
                listAsteroid.forEach( (e, i) => {
                    const obj = e.colliderAsteroit.reaction( listBullet )
                    if( isNaN( obj ) ){
                        e.update()
                    }
                    else{
                        listAsteroid[i].entity.remove()
                        listAsteroid.splice( i, 1 )
                        point++
                        setPoint()
                    }
                });
                
                const diedPlayer = collidetPlayer.reaction( listAsteroid )
                if( isNaN( diedPlayer ) ){
                    collidetPlayer.update()
                }
                else{
                    alert("mueres")
                    deadPlayer()
                }

                time += 20
    
                if( time % 1060  == 0 ){
                    if( getRandomInt(10) % 2 == 0 ){
                        listAsteroid.push( new Asteroid() )
                        listAsteroid.push( new Asteroid() )
                    }
                    else{
                        listAsteroid.push( new Asteroid() )
                    }
                }
            }
        }, 20
    )

    $("#room").on('mousemove', e =>{
        if( start ){
            let posX = e.clientX - 20 - mScreen[1] < 0 
            ? 0
            : e.clientX - 30 + mScreen[1]
        
            let posY = e.clientY - 20 + mScreen[1] < 0 
                ? 0
                : e.clientY - 30 + mScreen[1]
            
            player.css({
                top:  posY,    
                left: posX
            })

        }
        
    })

    /*
    hacer lista que contengan clase
    hacer una iteracion cada ciclo para que hacer que se muevan
    cuando cumplan su ciclo destruirla
    */

    $("#room").click( e =>{
        if( start ){
            if (listBullet.length <= 3) listBullet.push(new Bull())
        }
    })

    document.addEventListener("keypress", e =>{
        if( e.key === "s" ){
            start = !start
        }
    })

})

