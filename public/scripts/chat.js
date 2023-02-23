const menue = document.querySelectorAll(".menue")
const seconds = document.querySelector("#seconds")
const min = document.querySelector("#min")
const zero = document.querySelector("#justZero")
min.innerText=minutes
if(!document.cookie){

// Set the cookie name
var cookieName = "my_cookie";

var currentDate = new Date();
var currentDateTimeString = currentDate.toISOString(); 

 expirationTime = new Date(currentDate.getTime() + (90 * 60 * 1000));

var expirationTimeString = expirationTime.toUTCString();
document.cookie = cookieName + "=" + currentDateTimeString + "; expires=" + expirationTimeString;
}


let x = document.cookie;

var cookieString = document.cookie;
var cookiePairs = cookieString.split("; ");


var cookieValue = null;
for (var i = 0; i < cookiePairs.length; i++) {
  var pair = cookiePairs[i].split("=");
  if (pair[0] === "my_cookie") { 
    cookieValue = pair[1];
    break;
  }
}

// Extract the time from the cookie value
var dateObject = new Date(cookieValue);
var hours = dateObject.getHours();
var minutes = dateObject.getMinutes();
var seconds1 = dateObject.getSeconds();


var curTime = new Date();
var timeDifference = Math.abs(curTime.getTime() - dateObject.getTime());


var minus = Math.floor(timeDifference / 60000); 
var secons = Math.floor((timeDifference % 60000) / 1000); 
var minutes = 89-minus
var secon = 60- secons
min.innerText=minutes;
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


