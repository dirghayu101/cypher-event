const video = document.getElementById("introVideo")
const vd = document.getElementsByClassName("vd")
const nextbtn = document.querySelectorAll(".gameStartBtn")
const playBtn = document.querySelectorAll(".vd span")


vd[0].addEventListener('click',()=>{
    var timeout = setTimeout(function() {
        console.log("video took too long to load")
      }, 10000); 
 if(video.readyState===4){
    clearTimeout(timeout)
    playBtn[0].style.display="none"
    video.play();
 }
})

video.addEventListener("ended",()=>{
video.style.display="none";
nextbtn[0].style.display="flex"
    
})
nextbtn[0].addEventListener("click",()=>{

    window.location.href="http://localhost:5500/user/chatScreen"
})