var tID;
var sleepID;
var  xpos = 0;
var  ypos = 0;
var isHole = false;
var isSleep = false;
var isAnimating = false;

const interval = 100; //100 ms of interval for the setInterval()
const xdiff = 167;
const ydiff = 125;

const xbase = 0; 
const ybase = 0;
const xhole = 1*xdiff; 
const yhole = 0;

const seal = document.getElementById("seal");

const sleepTimer = 30*1000;

idle();

// play random animation when idle
function startSleepTimer() {
    sleepID = setTimeout(function() {
        startSleep();
    }, sleepTimer);
}

seal.onmouseenter = function() {
    if (isAnimating) return;
    if (!isSleep && !isHole) {
        clearTimeout(sleepID);
        blink();
}}

seal.onclick = function() {

    fetch('https://icanhazdadjoke.com/')
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Work with JSON data here
        alert("boop");
    })
    .catch(err => {
        // Do something for an error here
    })

    if(isAnimating) return;
    clearTimeout(sleepID);
    if (isSleep) {
        wake();
    } else if (isHole) {
        playHoleAnimation();
    } else {
        playRandomAnimation();
    }
}

function playHoleAnimation() {
    switch(Math.floor(Math.random()*2)) {
        case 0:
            holeMorph();
            break;
        case 1:
            holePeek();
            break;
        default:
    }
}

function playRandomAnimation() {
    // rand math floor of 4 different options
    switch(Math.floor(Math.random()*6)) {
        case 0:
            scream();
            break;
        case 1:
            lookAround();
            break;
        case 2:
            sneeze();
            break;
        case 3:
            beg();
            break;
        case 4:
            dive();
            break;
        case 5:
            flappy();
            break;
        default:
            blink();
    }
}

// ANIMATIONS==============================

// idle animation, starts sleep timer
function idle() {
    clearInterval(tID);
    startSleepTimer();
    isAnimating = false;
    isHole = false;
    xpos = xbase + xdiff;
    ypos = ybase;
    tID = setInterval( () => {
        seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == xbase) {
            xpos = xpos + xdiff;
        } else {
            xpos = xbase;
        }
    }, 2*interval);  
}

// sets bg as a hole
function beHole(){
    clearInterval(tID);
    clearTimeout(sleepID);
    isHole = true;
    isAnimating = false;
    xpos = 0;
    ypos = 14*ydiff;
    seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
}

// blinks once then goes to idle
function blink() {
    clearInterval(tID);
    clearTimeout(sleepID);
    xpos = 1*xdiff;
    ypos = 1*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == xbase) {
            idle();
        } else {
            xpos = xbase;
            ypos = ybase;
        }
    }, interval);  
}

// transition into sleep position and plays rockrub
function startSleep() {
    isAnimating = true;
    clearInterval(tID);
    clearTimeout(sleepID);
    xpos = 0*xdiff;
    ypos = 7*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 6*xdiff) {
            rockRub();
        } else {
            xpos = xpos + xdiff;
        }
    }, interval);  
}

// rubs rock for random time then plays sleep loop
// can be interrupted
function rockRub() {
    isSleep = true;
    isAnimating = false;
    clearInterval(tID);
    const delay = Math.ceil(Math.random()*5 + 2);
    var i = 0;
    xpos = 0*xdiff;
    ypos = 8*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 0*xdiff) {
            xpos = 1*xdiff;
        } else {
            if(i < delay) {
                xpos = 0*xdiff;
                i++;
            } else {
                sleepLoop();
            }
        }
    }, interval*5);  
}

// sleeping loop
function sleepLoop() {
    clearInterval(tID);
    var i = 0;
    xpos = 0*xdiff;
    ypos = 9*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 0*xdiff) {
            xpos = 1*xdiff;
        } else {
            xpos = 0*xdiff;
        }
    }, interval*5);  
}

// sets isSleep to false at end of animation
function wake() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 10*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 6*xdiff) {
            xpos = xbase;
            ypos = ybase;    
            isSleep = false; 
            idle();   
        } else {
            xpos = xpos + xdiff;
        }
    }, interval);  
}

function holeMorph() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 15*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 4*xdiff) {
            xpos = xbase;
            ypos = ybase;    
            isHole = false; 
            idle();   
        } else {
            xpos = xpos + xdiff;
        }
    }, interval);  
}

function holePeek() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 1*xdiff;
    ypos = 16*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 0*xdiff) {
            beHole();
        } else if (xpos == 3*xdiff) {
            xpos = 0*xdiff;
        } else {
            xpos = xpos + xdiff;
        }
    }, interval*5);  
}

function scream() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 12*ydiff;

    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 4*xdiff) {
            idle();
        } else {
            if (xpos == 2*xdiff) {
                fetch('https://icanhazdadjoke.com/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/plain',
                    },
                })
                .then((res) => res.text())
                .then((data) => alert(data));            
            }
            xpos = xpos + xdiff;
        }
    }, interval);  
}

function lookAround() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 1*xdiff;
    ypos = 6*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos >= 2*xdiff) {
            xpos = 0*xdiff;
        } else if (xpos == 0*xdiff) {
            idle();
        } else {
            xpos = xpos + xdiff;
        }
    }, interval*5);  
}

function sneeze() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 11*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 4*xdiff) {
            idle();
        } else {
            xpos = xpos + xdiff;
        }
    }, interval);  
}

function dive() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 13*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 6*xdiff) {
            beHole();
        } else {
            xpos = xpos + xdiff;
        }
    }, interval);  
}

function beg() {
    isAnimating = true;
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 2*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 3*xdiff) {
            begLoop();
        } else {
            xpos = xpos + xdiff;
        }
    }, interval);  
}
function begLoop() {
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 3*ydiff;
    const delay = 3 + Math.ceil(Math.random()*4);
    var i = 0;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 0*xdiff) {
            xpos = 1*xdiff;
        } else {
            if (i < delay) {
                i++;
                xpos = 0*xdiff;
            } else {
                exitBeg();
            }
        }
    }, interval);  
}
function exitBeg() {
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 4*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 2*xdiff) {
            idle();
        } else {
            xpos = xpos + xdiff;
        }
    }, interval);  
}

// can be interrupted anytime
function flappy() {
    clearInterval(tID);
    xpos = 0*xdiff;
    ypos = 5*ydiff;
    tID = setInterval ( () => {
		seal.style.backgroundPosition = `-${xpos}px -${ypos}px`; 
        if (xpos == 2*xdiff) {
            xpos = 1*xdiff;
        } else {
            xpos = 2*xdiff;
        }
    }, interval);   
}