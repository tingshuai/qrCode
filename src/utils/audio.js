const  audio = document.createElement('audio');
       
export default {
    setUrl(url,voice,curr){
        audio.src = url;
        if(voice&&curr!==voice){
            voice.isplay = false;
        }
    },
    play(){
        audio.play();
    },
    onEnded(fun){
        audio.onended=fun
    }
}