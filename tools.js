const pxToNum = ( str ) =>{
    let y = /\d+/g
    let a = str.match(y)
    let numbers = []

    for (const i of a) {
        numbers.push( parseInt(i) )
    }
    return numbers
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export { pxToNum, getRandomInt }