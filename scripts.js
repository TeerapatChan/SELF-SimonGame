var play = false
var color = {
    1:"green", 2:"red", 3:"yellow", 4:"blue"
}
var sequene = []
var my_sequene = []
var current_color = null
document.addEventListener("keypress", (event) => {
    if (event.key == "a" || event.key == "A" && !play ){
        $("h1").text("Level 1")
        startGame()
        randomColor()
    }
})
const startGame = () => {
    play = true
}
const gameEnd = () => {
    play = false
    playAudio('wrong')
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 200)
    $("h1").text("Game Over, Press A to Restart")
    my_sequene = []
    sequene = []
}

const randomColor = () => {
    var random = Math.floor(Math.random() * 4) + 1
    current_color = color[random]
    sequene.push(current_color)
    console.log("random =",sequene)
    var button = $(`#${current_color}`)
    button.addClass("pressed")
    playAudio(current_color)
    setTimeout(() => {
        button.removeClass("pressed")
    }, 200)
    return current_color
}

const playAudio = (color) => {
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}


$(".btn").click((event) => {
    var button_color = event.target.id
    var button_id = event.target.id
    var button = $(`#${button_id}`)
    button.addClass("pressed")
    setTimeout(() => {
        button.removeClass("pressed")
    }, 200)
    my_sequene.push(button_id)
    if (!play){
        playAudio('wrong')
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("pgame-over")
        }, 200)
    }
    playAudio(button_color)
    console.log("pressed =",my_sequene)
    var my_len = my_sequene.length
    var len = sequene.length
    if (my_len == len || my_sequene[my_len-1] != sequene[my_len-1]){
        if (my_sequene.toString() == sequene.toString()){
            $("h1").text(`Level ${sequene.length+1}`)
            setTimeout(() => { 
                my_sequene = []
                current_color = randomColor()
            }, 1000)
        }else {
            gameEnd()
        }
    }
})