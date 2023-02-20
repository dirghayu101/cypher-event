const video = document.getElementById("introVideo")
const vd = document.getElementsByClassName("vd")
const ins = document.getElementsByClassName("instructionContainer")
const nextbtn = document.querySelectorAll(".gameStartBtn")
const playBtn = document.querySelectorAll(".vd span")

console.log(vd)
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
    console.log("ended")
vd[0].style.display="none";
ins[0].style.display="flex"

nextbtn[0].style.display="flex"
    
})
nextbtn[0].addEventListener("click",()=>{

    window.location.href="http://34.93.8.48/user/chatScreen"
})