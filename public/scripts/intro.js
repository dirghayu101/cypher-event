const video = document.getElementById("introVideo")
const vd = document.getElementsByClassName("vd")


vd[0].addEventListener('click',()=>{
    var timeout = setTimeout(function() {
        console.log("video took too long to load")
      }, 10000); 
 if(video.readyState===4){
    clearTimeout(timeout)
    video.play();
 }
})

video.addEventListener("ended",()=>{
    window.location.href="http://localhost:5500/user/chatScreen"
})
