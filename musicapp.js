var tracks = [];
var players = [];

document.addEventListener("DOMContentLoaded", (event) => {
    //carga el stream en la pagina
    //load();
    //boton de play
    document.getElementById("playBtn").addEventListener("click", () => {
        playTrack(currentSong);
        console.log("Prueba");
    });

    //boton de pausa
    document.getElementById("pauseBtn").addEventListener("click", () => {
        players[currentSong].pause();
    });
    
    //boton de stop
    document.getElementById("stopBtn").addEventListener("click", () => {
        players[currentSong].pause();
        players[currentSong].seek(0);
    });

    //boton para la proxima cancion
    document.getElementById("fowardBtn").addEventListener("click", () => {
        currentSong++;
        if (currentSong >= tracks.length) {//si la cancion supera la cantidad de tracks existentes
            currentSong = 0; //vuelve al principio
        }
        playTrack(currentSong); //reproduce
    });

    //boton para la cancion anterior
    document.getElementById("rewindBtn").addEventListener("click", () => {
        currentSong--;
        if (currentSong < 0) {//si es negativo porque ya no hay nada ya que es la primera cancion
            currentSong = tracks.length-1; //vuelve a reproducir el que se anteriormente
        }
        playTrack(currentSong); //reproduce
    });

    SC.initialize({
        client_id: 'fd4e76fc67798bfa742089ed619084a6'
    });

    document.addEventListener("DOMContentLoaded", () => {
        console.log("contenido cargado DOM satisfactorio");
        document.querySelector("form").addEventListener("submit", (event) => {
            event.preventDefault() //inve
            console.log(event);
            SC.get("/tracks", {
                q: document.getElementById("input").value
            }).then((response) => {
                console.log(response);
                tracks = response;
                document.getElementById("description").innerHTML = tracks[currentSong].title + tracks[currentSong].genre + tracks[currentSong].permalink + tracks[currentSong].description
                document.getElementById("artwork").src = tracks[currentSong].artwork_url || "http//" + q + ".jpg.to"
                playTrack(currentSong);
            });
        });
    });
});
var currentSong =0;
function playTrack(songID) {
    document.getElementById("description").innerHTML = tracks[currentSong].title + " . " +"Genre:" + tracks[currentSong].genre +" . " + "Permalink:" + tracks[currentSong].permalink + " . "+ "Description:" + tracks[currentSong].description
    if (!players[songID]) {
        SC.stream('/tracks/' + tracks[songID].id).then((player) => {
            console.log(player);
            players[songID] = player;
            players[songID].play();
        });
    } else {
        players[songID].play();
    }
}

function stopAudio2(){
    players[currentSong].seek(0); //soundcloud usa SEEK para pausar o parar
    players[currentSong].pause();
}

function playAudio2(){
    players[currentSong].play();
}

function pauseAudio2(){
    players[currentSong].pause();
}

function fowardAudio2(){
    stopAudio2();
    currentSong +=1;
    players[currentSong].play();
}

function fowardAudio2(){
    stopAudio2();
    currentSong = -1;
    players[currentSong].play();
}

function SetVolume(val) {
    var player = tracks[currentSong];
    player.volume = val / 100;
    console.log('Despues: ' + player.volume);
    players[currentSong].setVolume(player.volume);
}