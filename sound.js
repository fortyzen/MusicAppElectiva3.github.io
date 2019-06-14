var currentTracks = "";
var currentSong = 0;
function playSomeSound(genre){ 
    SC.get('/tracks', {
     genres: genre, bpm: { from: 120 }
    }).then(function(tracks) {
        console.log(tracks);
        currentTracks = tracks;
        //var ramdon = Math.floor(Math.random() * tracks.length);
        var id_track= tracks[currentSong].id;
        track_id = id_track;
        playIt(id_track);
    });
    
}

    function playIt(id_track){ 
        var id=id_track;
        var getMusic='/tracks/'+id;

        SC.stream(getMusic).then(function(player){
            mysound = player;
            mysound.play().then(function(){
            console.log('Playback started!');
            console.log( 'in '+ mysound.getDuration());
        }).catch(function(e){
            console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
        //mysound.on('finish', playSomeSound(currentTracks));
    });
    }
    document.addEventListener("DOMContentLoaded", (event) => {
        document.querySelector("form").addEventListener("submit", (event) => {
            event.preventDefault() //cancela el evento por un problema dado
            console.log(event);
            //theFunction(document.getElementById("search_music").value);
            SC.get('/tracks', {
                q: document.getElementById("search_music").value
            }).then( function(response){
                console.log(response);
                tracks = response;
                //var ramdon = Math.floor(Math.random() * tracks.length);
                var id_track=tracks[currentSong].id;
                track_id = id_track;
                playIt(id_track);
            });
        });
    });

    function theFunction (e) { 
    var genre=e.innerHTML;
    playSomeSound(genre);     
    }

    function next() {
        currentSong +=1;
        playIt(currentTracks[currentSong].id);
    }

    function prevStop () { 
    //var getMusic='/tracks/'+track_id;
    mysound.pause();
    mysound.seek(0); 
    currentSong = 0;   
    }
    function prevPause () { 
    //var getMusic='/tracks/'+track_id;
    mysound.pause();   
    }
    function prevReplay () { 
    //var getMusic='/tracks/'+track_id;
    mysound.play();   
    }
    window.onload = function(){
    let track_id=0;
    var mysound; 
    SC.initialize({
        client_id: "b8f06bbb8e4e9e201f9e6e46001c3acb",
    });
    };
    function SetVolume(val) {
        var player = currentTracks[currentSong];
        player.volume = val / 100;
        console.log('Despues: ' + player.volume);
        players[currentSong].setVolume(player.volume);
    }