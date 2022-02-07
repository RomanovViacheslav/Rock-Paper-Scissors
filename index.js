const userButton = document.querySelectorAll('.user-button');

const buttons = document.querySelector('.user__block');
const place = document.querySelector('.user-arena');
const compButton = document.querySelectorAll('.computer-button');
const placeComp = document.querySelector('.computer-arena');

let userScore = document.querySelector('.user__score');
let userСount = 0;
let compScore = document.querySelector('.computer__score');
let compСount = 0;

let timeCount = document.querySelector('.time');
let time = 90;
let message = document.querySelector('.time__message');

const popup = document.querySelector('.popup');
let popupMessage = document.querySelector('.popup__message');
const restart = document.querySelector('.popup__button');


let interval = setInterval(getTime, 1000);


function getTime() {   
      let minute = Math.floor(time / 60)
      let second = time % 60 
      if (second < 10){
         second = '0' + second
      } 
      timeCount.innerHTML = `${minute}:${second}`;
      time --;     
      if (time <= 0)  {              
         clearTimeout(interval);               
         showWinner();

      }      
   
}

getTime()

function stepUser ()  {  

   userButton.forEach((elem) => {  
      elem.addEventListener('click', function clickButton () {   
         elem.querySelector('svg').classList.toggle('user_svg--activ');
         let clone = elem.cloneNode(true)
         clone.classList.add('clone')
         place.appendChild(clone)
         elem.style.display='none'
         let choiceUser = elem.dataset.choice
         
         
         if (place.querySelector('.game-button') !== null){
            setTimeout (function () {
               clone.querySelector('.user__circle').classList.add('cir--activ');
               userButton.forEach((elem) =>{
                  elem.disabled = true;                 
                  elem.querySelector('svg').classList.add('user_svg--activ');
               })
            }, 100)
            stepComputer (choiceUser)            
         }          
      })      
      
   })  
}


function stepComputer (choiceUser) {
   if (popup.classList.contains('popup--active')){
      return false;
   }   
   compButton.forEach((elem) => {        
      if (elem.classList.contains("rock")){   
      elem.classList.add('animation')
      } else if (elem.classList.contains("scissors")) {
         setTimeout(function () {
            elem.classList.add('animation');
          }, 500)
      } else {
         setTimeout(function () {
            elem.classList.add('animation');
          }, 1000)
      }      
   })
   let compArr=Array.from(compButton);  
   compArr = compArr[Math.floor(Math.random() * compArr.length)]  
   setTimeout(function () {      
      let clone = compArr.cloneNode(true)
      clone.classList.add('clone')
      placeComp.appendChild(clone);
      compArr.style.display='none'
      setTimeout (function () {clone.querySelector('.computer__circle').classList.add('cir--activ');}, 70)
    }, 2500);
    let choiceComp = compArr.dataset.choice;   
   
    getScore (choiceUser, choiceComp);
}

function getScore (choiceUser, choiceComp) {
   if (popup.classList.contains('popup--active')){
      return false;
   }
   setTimeout (function () {
   if ((choiceUser === "rock" && choiceComp === "rock") || 
   (choiceUser === "paper" && choiceComp === "paper") || 
   (choiceUser === "scissors" && choiceComp === "scissors")){
      console.log('ничья');
   } else if((choiceUser === "rock" && choiceComp === "paper") || 
   (choiceUser === "scissors" && choiceComp === "rock") ||
   (choiceUser === "paper" && choiceComp === "scissors")){
      compСount++;
      compScore.textContent = compСount;
      placeComp.querySelector('.arena').classList.add('arena--win')
      place.querySelector('.arena').classList.add('arena--loss');
   } else {
      userСount++;
      userScore.textContent = userСount;
      place.querySelector('.arena').classList.add('arena--win');
      placeComp.querySelector('.arena').classList.add('arena--loss')
   }
   // startAgain ()
   setTimeout(buttonRestart, 2000)
   },2700)
   
}

function buttonRestart (){   
      place.removeChild(document.querySelector('.clone'));
      place.querySelector('.arena').classList.remove('arena--loss');
      place.querySelector('.arena').classList.remove('arena--win');      
      userButton.forEach((elem) => {    
         elem.style.display='block'
         elem.querySelector('svg').classList.remove('user_svg--activ');
         elem.disabled = false;
      })
      placeComp.removeChild(document.querySelector('.clone'));
      placeComp.querySelector('.arena').classList.remove('arena--loss');
      placeComp.querySelector('.arena').classList.remove('arena--win'); 
      compButton.forEach((elem) => {    
         elem.style.display='block'
      })  
   
}



function showWinner() {   
   popup.classList.add('popup--active');
   
   if (userСount > compСount) {
      popupMessage.textContent = 'Вы победили! Победа была достойная!';
   } else if (userСount < compСount) {
      popupMessage.textContent = 'Вы проиграли! Компьютер уничтожил Вас...';
   } else {
      popupMessage.textContent = 'Ничья';
   }
   
   restart.addEventListener("click", () => {
      location.reload()
   })


}


stepUser() 





