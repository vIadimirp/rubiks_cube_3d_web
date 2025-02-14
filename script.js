const n = 3;
const defaultColors = ['#f00', '#f80', '#fff', '#ff0', '#0f0', '#00f'];
const currentColors = defaultColors;
const mouseFollowSpeed = 1.3;
let scale = 1;

const rc = document.querySelector('div#rc');
const rcWrapper = document.querySelector('div#rc-wrapper');
const rcSides = document.querySelectorAll('div.rc__side');
const rcSideTop = document.querySelector('div#rc__top');
const rcSideBottom = document.querySelector('div#rc__bottom');
const rcSideLeft = document.querySelector('div#rc__left');
const rcSideRight = document.querySelector('div#rc__right');
const rcSideFront = document.querySelector('div#rc__front');
const rcSideBack = document.querySelector('div#rc__back');
const style = document.querySelector('style');



function createRCStructure() {
    for (let rcSideIndex = 0; rcSideIndex < rcSides.length; rcSideIndex++) {
        let rcSide = rcSides[rcSideIndex];
        for (let rcSquareIndex = 0; rcSquareIndex < n*n; rcSquareIndex++) {
            let rcSquare = document.createElement('div');
            rcSquare.classList.add('rc__square');
            rcSide.appendChild(rcSquare);
        }
    }
}
function fillSidesColors() {
    for (let rcSideIndex = 0; rcSideIndex < rcSides.length; rcSideIndex++) {
        let rcSide = rcSides[rcSideIndex];
        rcSide.querySelectorAll('div.rc__square').forEach(rcSquare => {
            rcSquare.classList.add(`rc-color-${rcSideIndex}`);
        });
    }
}
function rotateSide(side, direction) {
    let rcSquares = side.querySelectorAll('div.rc__square');
    let rcSquaresColors = [];
    rcSquares.forEach(rcSquare => rcSquaresColors.push(rcSquare.classList[1]));
    for (let i = 0; i < rcSquares.length; i++) {
        rcSquares[i].classList.remove(rcSquaresColors[i]);
        if (direction < 0) {
            rcSquares[i].classList.add(rcSquaresColors[i+n < n*4 ? i+n : (i+n)-(n*4)])
        } else if (direction > 0) {
            rcSquares[i].classList.add(rcSquaresColors[i-n+1 > 0 ? i-n : (i-n)+(n*4)])
        }
    }
}
function rotateSlice(axis, order, direction) {
    const rcSquaresTop = rcSideTop.querySelectorAll('div.rc__square');
    const rcSquaresBottom = rcSideBottom.querySelectorAll('div.rc__square');
    const rcSquaresLeft = rcSideLeft.querySelectorAll('div.rc__square');
    const rcSquaresRight = rcSideRight.querySelectorAll('div.rc__square');
    const rcSquaresFront = rcSideFront.querySelectorAll('div.rc__square');
    const rcSquaresBack = rcSideBack.querySelectorAll('div.rc__square');
    let rcSquares = [];
    let rcSquaresColors = [];
    if (axis === 'x') {
        for (let i = 0; i < n; i++) {
            rcSquares.push(rcSquaresTop[i*n+order-1]);
        }
        for (let i = 0; i < n; i++) {
            rcSquares.push(rcSquaresFront[i*n+order-1]);
        }
        for (let i = 0; i < n; i++) {
            rcSquares.push(rcSquaresBottom[i*n+order-1]);
        }
        for (let i = n; i > 0; i--) {
            rcSquares.push(rcSquaresBack[i*n-order]);
        }
        rcSquares.forEach(rcSquare => rcSquaresColors.push(rcSquare.classList[1]));
        for (let i = 0; i < rcSquares.length; i++) {
            rcSquares[i].classList.remove(rcSquaresColors[i]);
            if (direction < 0) {
                rcSquares[i].classList.add(rcSquaresColors[i+n < n*4 ? i+n : (i+n)-(n*4)])
            } else if (direction > 0) {
                rcSquares[i].classList.add(rcSquaresColors[i-n+1 > 0 ? i-n : (i-n)+(n*4)])
            }
        }
    } else if (axis === 'y') {
        for (let i = (order*n-n); i < (order*n); i++) {
            rcSquares.push(rcSquaresBack[i]);
            rcSquares.push(rcSquaresLeft[i]);
            rcSquares.push(rcSquaresFront[i]);
            rcSquares.push(rcSquaresRight[i]);
        }
        rcSquares.forEach(rcSquare => rcSquaresColors.push(rcSquare.classList[1]));
        for (let i = 0; i < rcSquares.length; i++) {
            rcSquares[i].classList.remove(rcSquaresColors[i]);
            if (direction < 0) {
                rcSquares[i].classList.add(rcSquaresColors[i+n < n*4 ? i+n : (i+n)-(n*4)])
            } else if (direction > 0) {
                rcSquares[i].classList.add(rcSquaresColors[i-n+1 > 0 ? i-n : (i-n)+(n*4)])
            }
        }
    } else if (axis === 'z') {
        for (let i = (n*n - order*n); i < (n*n - order*n + n); i++) {
            rcSquares.push(rcSquaresTop[i]);
        }
        for (let i = 0; i < n; i++) {
            rcSquares.push(rcSquaresRight[i*n+order-1]);
        }
        for (let i = (order*n-n); i < (order*n); i++) {
            rcSquares.push(rcSquaresBottom[i]);
        }
        for (let i = n; i > 0; i--) {
            rcSquares.push(rcSquaresLeft[i*n-order]);
        }
        rcSquares.forEach(rcSquare => rcSquaresColors.push(rcSquare.classList[1]));
        for (let i = 0; i < rcSquares.length; i++) {
            rcSquares[i].classList.remove(rcSquaresColors[i]);
            if (direction < 0) {
                rcSquares[i].classList.add(rcSquaresColors[i+n < n*4 ? i+n : (i+n)-(n*4)])
            } else if (direction > 0) {
                rcSquares[i].classList.add(rcSquaresColors[i-n+1 > 0 ? i-n : (i-n)+(n*4)])
            }
        }
        if (order == 1) {

        }
    }
}
function mouseController() {
    const xDeg = window.innerWidth / 360;
    const yDeg = window.innerHeight / 360;
    const xCenter = window.innerWidth / 2;
    const yCenter = window.innerHeight / 2;
    document.addEventListener('drag', e => {
        let rotateY = (e.clientX - xCenter) / xDeg * mouseFollowSpeed;
        rc.style.transform = `rotateX(${0}deg) rotateY(${rotateY}deg) rotateZ(${0}deg)`;
    })
    document.addEventListener('wheel', e => {

  scale += e.deltaY * -0.01;

  // Restrict scale
  scale = Math.min(Math.max(.125, scale), 4);

  // Apply scale transform
  rcWrapper.style.transform = `scale(${scale})`;
    })
}
function init() {
    style.innerHTML += `:root{--n:${n};}`
    for (let i = 0; i < 6; i++) {
        style.innerHTML += `div.rc__square.rc-color-${i}{background-color:${defaultColors[i]}}`
    }
    createRCStructure();
    fillSidesColors();
    mouseController();
    document.addEventListener('keydown', e => {
        if (e.key === 'f') {
            rotateSlice('z', 1, 1)
        }
        if (e.key === 'F') {
            rotateSlice('z', 1, -1)
        }
        if (e.key === 'b') {
            rotateSlice('z', n, 1)
        }
        if (e.key === 'B') {
            rotateSlice('z', n, -1)
        }
        if (e.key === 't') {
            rotateSlice('y', 1, 1)
        }
        if (e.key === 'T') {
            rotateSlice('y', 1, -1)
        }
        if (e.key === 'd') {
            rotateSlice('y', n, 1)
        }
        if (e.key === 'D') {
            rotateSlice('y', n, -1)
        }
        if (e.key === 'l') {
            rotateSlice('x', 1, 1)
        }
        if (e.key === 'L') {
            rotateSlice('x', 1, -1)
        }
        if (e.key === 'r') {
            rotateSlice('x', n, 1)
        }
        if (e.key === 'R') {
            rotateSlice('x', n, -1)
        }
    })
}
init();
