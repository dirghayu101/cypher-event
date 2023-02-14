

const seconds = document.querySelector("#seconds")
const min = document.querySelector("#min")
var minutes = 89;
var secon = 60;
min.innerText=minutes

let x = document.cookie;
console.log(x,"fsdf")
function countdown() {
 secon--;
    if(secon==0){
        minutes--
        min.innerText=minutes;
        secon=60;
    }
    
  seconds.innerText = secon;
  

  
}
var intervalId = setInterval(countdown, 1000);

