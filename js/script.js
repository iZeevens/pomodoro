document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    // Buttons
    const buttonWork = document.querySelector('.btn__work'),
          buttonBreak = document.querySelector('.btn__break'),
          buttonRun = document.querySelector('.play'),
          buttonReset = document.querySelector('.back-arrow');
  
    // Timer fields
    const minutesElement = document.querySelector('.minutes'),
          secondsElement = document.querySelector('.seconds');
  
    // Timer
    let countDownDate = 0,
        x,
        isBreakTime = false;

  
    buttonRun.addEventListener('click', () => { 
        countDownDate = new Date().getTime() + (isBreakTime ? 5 : 25) * 60 * 1000;
        hideButton(buttonRun, buttonReset);
        x = setInterval(updateTime, 1000);
    })

    buttonReset.addEventListener('click', () => { 
        hideButton(buttonReset, buttonRun)
        if (buttonBreak.classList.contains('btn__active')) {
            clearInterval(x);
            timeElementSwitch(5, 0)
            countDownDate = new Date().getTime() + 5 * 60 * 1000;
        }
        
        if (buttonWork.classList.contains('btn__active')) {
            clearInterval(x);
            timeElementSwitch(25, 0)
            countDownDate = new Date().getTime() + 25 * 60 * 1000;
        }
    })
  

    buttonBreak.addEventListener('click', () => {
        clearInterval(x);
        if (!buttonReset.classList.contains('hide')) {
            x = setInterval(updateTime, 1000);
        }
        timeElementSwitch(5, 0);
        countDownDate = new Date().getTime() + 5 * 60 * 1000;
        switchToBreak();
    })

    buttonWork.addEventListener('click', () => {
        clearInterval(x);
        if (!buttonReset.classList.contains('hide')) {
            x = setInterval(updateTime, 1000);
        } 
        timeElementSwitch(25, 0);
        countDownDate = new Date().getTime() + 25 * 60 * 1000;
        switchToWork();
    }) 

    function updateTime() {
        const now = new Date().getTime(),
              distance = countDownDate - now,
              minutes = Math.floor(distance / 60000),
              seconds = Math.floor((distance % 60000) / 1000);
    
        minutesElement.innerText = String(minutes).padStart(2, '0');
        secondsElement.innerText = String(seconds).padStart(2, '0');
        
        if (distance <= 0) {
            if (!isBreakTime) {
                switchToBreak();
            } else {
                switchToWork();
            }
            countDownDate = new Date().getTime() + 5 * 60 * 1000;
            updateTime();
            x = setInterval(updateTime, 1000);
        }
    }
      

    function hideButton(add, remove) {
        add.classList.add('hide');
        remove.classList.remove('hide');
    }

    function switchToBreak() {
        buttonWork.classList.remove('btn__active');
        buttonBreak.classList.add('btn__active');
        isBreakTime = true;
    }

    function switchToWork() {
        buttonWork.classList.add('btn__active');
        buttonBreak.classList.remove('btn__active');
        isBreakTime = false;
    }

    function timeElementSwitch(minutes, seconds) {
        minutesElement.innerText = minutes.toString().padStart(2, '0');
        secondsElement.innerText = seconds.toString().padStart(2, '0');
    }
});