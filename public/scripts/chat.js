
const menue = document.querySelectorAll(".menue")
const seconds = document.querySelector("#seconds")
const min = document.querySelector("#min")
const zero = document.querySelector("#justZero")
var minutes = 89;
document.cookie=""
var secon = 60;
min.innerText=minutes


let x = document.cookie;
function countdown() {
  
 secon--;
    if(secon==0){
        minutes--
        min.innerText=minutes;
        secon=60;
    }

    if(secon<10){
      seconds.innerText = `0${secon}`;
      
    }
    else{
      // zero.style.display="none"
      
      seconds.innerText = secon;

    }
    
  
  

  
}
var intervalId = setInterval(countdown, 1000);
var called = true
menue[0].addEventListener("click",()=>{
  if(called){
    document.querySelector('.menueOptions').style.display="flex"
  document.querySelector('.menueOptions').classList.add('show');
}
  else{
    // document.querySelector('.menueOptions').style.display="none"
    document.querySelector('.menueOptions').classList.remove('show')
  }
  called=!called
})


