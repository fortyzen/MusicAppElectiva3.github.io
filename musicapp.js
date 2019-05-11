var tracks, players = [];

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

    document.getElementById("stopBtn").addEventListener("click", () => {
        playTrack(currentSong);
        console.log("Prueba");
    });
});