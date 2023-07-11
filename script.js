const timeLeftDisplay = document.querySelector('#timeLeftDisplay');
const resultDisplay = document.querySelector('#resultDisplay');
const startPauseButton = document.querySelector('#start-pause-button');

const squares = document.querySelectorAll('.grid div');
const logLeft = document.querySelectorAll('.log-left');
const logRight = document.querySelectorAll('.log-right');
const carLeft = document.querySelectorAll('.car-left');
const carRight = document.querySelectorAll('.car-right');
let currentTimer = 20;
let timerId;
let currentIndex = 76;
squares[currentIndex].classList.add('frog');

moveFrog = (e) => {

    squares[currentIndex].classList.remove('frog');

    switch(e.key) {
        case 'ArrowLeft' :
            if (currentIndex % 9 !== 0) {
                currentIndex--
            };
            break;
        
        case 'ArrowRight' :
            if (currentIndex % 9 < 8) {
                currentIndex++
            };
            break;

        case 'ArrowUp' :
            if (currentIndex - 9 >= 0) {
                currentIndex -= 9
            };
            break;

        case 'ArrowDown' :
            if (currentIndex + 9 < 81) {
                currentIndex += 9
            };
            break;
    }

    squares[currentIndex].classList.add('frog');
}

moveLogLeft = (log) => {
    switch(true) {
        case log.classList.contains('l1') :
            log.classList.remove('l1');
            log.classList.add('l2');
            break;

        case log.classList.contains('l2') :
            log.classList.remove('l2');
            log.classList.add('l3');
            break;

        case log.classList.contains('l3') :
            log.classList.remove('l3');
            log.classList.add('l4');
            break;

        case log.classList.contains('l4') :
            log.classList.remove('l4');
            log.classList.add('l5');
            break;

        case log.classList.contains('l5') :
            log.classList.remove('l5');
            log.classList.add('l1');
            break;
    }
}

moveLogRight = (log) => {
    switch(true) {
        case log.classList.contains('l1') :
            log.classList.remove('l1');
            log.classList.add('l5');
            break;

        case log.classList.contains('l2') :
            log.classList.remove('l2');
            log.classList.add('l1');
            break;

        case log.classList.contains('l3') :
            log.classList.remove('l3');
            log.classList.add('l2');
            break;

        case log.classList.contains('l4') :
            log.classList.remove('l4');
            log.classList.add('l3');
            break;

        case log.classList.contains('l5') :
            log.classList.remove('l5');
            log.classList.add('l4');
            break;
    }
}

moveCarLeft = (car) => {
    switch(true) {
        case car.classList.contains('c1') :
            car.classList.remove('c1');
            car.classList.add('c2');
            break;

        case car.classList.contains('c2') :
            car.classList.remove('c2');
            car.classList.add('c3');
            break;

        case car.classList.contains('c3') :
            car.classList.remove('c3');
            car.classList.add('c1');
            break;
    }
}

moveCarRight = (car) => {
    switch(true) {
        case car.classList.contains('c1') :
            car.classList.remove('c1');
            car.classList.add('c3');
            break;

        case car.classList.contains('c2') :
            car.classList.remove('c2');
            car.classList.add('c1');
            break;

        case car.classList.contains('c3') :
            car.classList.remove('c3');
            car.classList.add('c2');
            break;
    }
}


autoMove = () => {
    currentTimer--;
    timeLeftDisplay.textContent = currentTimer;
    lose();
    logLeft.forEach(log => moveLogLeft(log));
    logRight.forEach(log => moveLogRight(log));
    carLeft.forEach(car => moveCarLeft(car));
    carRight.forEach(car => moveCarRight(car));
    win();
}

lose = () => {
    if (
        (squares[currentIndex].classList.contains('c1')) ||
        (squares[currentIndex].classList.contains('l4')) ||
        (squares[currentIndex].classList.contains('c5')) ||
        (currentTimer <= 0)
    ) {
        resultDisplay.innerHTML = 'LOSE!';
        clearInterval(timerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keydown', moveFrog);
    }
}

win = () => {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.innerHTML = 'WIN!';
        clearInterval(timerId);
        document.removeEventListener('keydown', moveFrog);
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        document.removeEventListener('keydown', moveFrog);
        timerId = null;
    } else {
        timerId = setInterval(autoMove, 1000);
        document.addEventListener('keydown', moveFrog);
    }
});